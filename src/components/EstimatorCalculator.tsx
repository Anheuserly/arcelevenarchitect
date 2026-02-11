"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/appwriteClient";
import { trackEvent } from "@/lib/analytics";
import { COUNTRIES, CURRENCIES, DEFAULT_EXCHANGE_RATES, type CurrencyCode } from "@/lib/currencyConfig";

type Breakdown = {
  construction: number;
  design: number;
  features: number;
  contingency: number;
  subtotal: number;
  total: number;
};

type Estimate = {
  inr: number;
  local: number;
  currency: CurrencyCode;
  breakdown: Breakdown;
};

const estimatorCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_ESTIMATOR_SUBMISSIONS_COLLECTION_ID || "estimator_submissions";
const publicDocumentPermissions = ['read("any")', 'update("any")', 'delete("any")'];

const constructionRates = {
  economy: { residential: 1500, commercial: 1800, industrial: 2000, institutional: 2200 },
  standard: { residential: 2500, commercial: 3000, industrial: 3200, institutional: 3500 },
  premium: { residential: 4000, commercial: 4500, industrial: 4800, institutional: 5000 },
  luxury: { residential: 6000, commercial: 6500, industrial: 7000, institutional: 7500 },
} as const;

const designFees = {
  conceptual: 0.05,
  schematic: 0.08,
  design_development: 0.07,
  construction_docs: 0.1,
  permit_approval: 0.03,
  site_supervision: 0.05,
} as const;

const featureCosts = {
  smart_home: 500000,
  solar: 800000,
  pool: 1500000,
  garden: 300000,
  basement: 1200000,
  elevator: 2000000,
  parking: 800000,
  security: 300000,
} as const;

const siteMultipliers = {
  flat: 1.0,
  sloping: 1.2,
  challenging: 1.5,
  urban: 1.1,
  rural: 0.9,
} as const;

const timelineMultipliers = {
  3: 1.2,
  6: 1.0,
  9: 0.9,
  12: 0.85,
  18: 0.8,
  24: 0.75,
} as const;

type FormDataState = {
  project_type: "residential" | "commercial" | "industrial" | "institutional";
  property_type: string;
  project_size: string;
  project_size_unit: "sqft";
  number_of_floors: string;
  number_of_rooms: string;
  number_of_bathrooms: string;
  quality_level: keyof typeof constructionRates;
  construction_type: string;
  timeline_months: string;
  site_conditions: keyof typeof siteMultipliers;
  special_features: string[];
  design_services_required: string[];
  selected_country: string;
};

function getTimelineKey(timeline: number): 3 | 6 | 9 | 12 | 18 | 24 {
  if (timeline <= 3) return 3;
  if (timeline <= 6) return 6;
  if (timeline <= 9) return 9;
  if (timeline <= 12) return 12;
  if (timeline <= 18) return 18;
  return 24;
}

export default function EstimatorCalculator() {
  const router = useRouter();
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const [formData, setFormData] = useState<FormDataState>({
    project_type: "residential",
    property_type: "house",
    project_size: "",
    project_size_unit: "sqft",
    number_of_floors: "1",
    number_of_rooms: "",
    number_of_bathrooms: "",
    quality_level: "standard",
    construction_type: "new_construction",
    timeline_months: "6",
    site_conditions: "flat",
    special_features: [],
    design_services_required: ["conceptual", "schematic", "design_development"],
    selected_country: "IN",
  });

  const selectedCountry = COUNTRIES.find((country) => country.code === formData.selected_country);
  const selectedCurrencyCode = (selectedCountry?.currency || "INR") as CurrencyCode;
  const selectedCurrency = CURRENCIES[selectedCurrencyCode];

  function handleInputChange<K extends keyof FormDataState>(field: K, value: FormDataState[K]) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFeatureToggle(feature: string) {
    setFormData((prev) => ({
      ...prev,
      special_features: prev.special_features.includes(feature)
        ? prev.special_features.filter((item) => item !== feature)
        : [...prev.special_features, feature],
    }));
  }

  function handleServiceToggle(service: string) {
    setFormData((prev) => ({
      ...prev,
      design_services_required: prev.design_services_required.includes(service)
        ? prev.design_services_required.filter((item) => item !== service)
        : [...prev.design_services_required, service],
    }));
  }

  function handleReset() {
    setFormData({
      project_type: "residential",
      property_type: "house",
      project_size: "",
      project_size_unit: "sqft",
      number_of_floors: "1",
      number_of_rooms: "",
      number_of_bathrooms: "",
      quality_level: "standard",
      construction_type: "new_construction",
      timeline_months: "6",
      site_conditions: "flat",
      special_features: [],
      design_services_required: ["conceptual", "schematic", "design_development"],
      selected_country: "IN",
    });
    setEstimate(null);
  }

  function handleContactClick() {
    if (estimate) {
      localStorage.setItem(
        "projectEstimate",
        JSON.stringify({
          ...formData,
          estimate: { inr: estimate.inr, local: estimate.local, currency: estimate.currency },
          breakdown: estimate.breakdown,
        })
      );
    }
    router.push("/contact");
  }

  async function calculateEstimate() {
    setIsCalculating(true);

    try {
      const size = Number.parseFloat(formData.project_size) || 0;
      const floors = Number.parseInt(formData.number_of_floors, 10) || 1;
      const timeline = Number.parseInt(formData.timeline_months, 10) || 6;

      const baseRate = constructionRates[formData.quality_level][formData.project_type] || 2500;
      let constructionCost = size * baseRate * floors;

      constructionCost *= siteMultipliers[formData.site_conditions];
      constructionCost *= timelineMultipliers[getTimelineKey(timeline)];

      let featuresCost = 0;
      formData.special_features.forEach((feature) => {
        const key = feature as keyof typeof featureCosts;
        featuresCost += featureCosts[key] || 0;
      });
      constructionCost += featuresCost;

      let designCost = 0;
      formData.design_services_required.forEach((service) => {
        const key = service as keyof typeof designFees;
        designCost += constructionCost * (designFees[key] || 0);
      });

      const contingency = constructionCost * 0.1;
      const totalInr = Math.round(constructionCost + designCost + contingency);
      const exchangeRate = DEFAULT_EXCHANGE_RATES[selectedCurrency.code] || 1;
      const totalLocal = Math.round(totalInr * exchangeRate);

      const breakdown: Breakdown = {
        construction: Math.round(constructionCost),
        design: Math.round(designCost),
        features: Math.round(featuresCost),
        contingency: Math.round(contingency),
        subtotal: Math.round(constructionCost + designCost + featuresCost),
        total: totalInr,
      };

      const nextEstimate: Estimate = {
        inr: totalInr,
        local: totalLocal,
        currency: selectedCurrency.code,
        breakdown,
      };
      setEstimate(nextEstimate);
      trackEvent("estimator_calculate", {
        project_type: formData.project_type,
        quality_level: formData.quality_level,
        currency: selectedCurrency.code,
        estimated_cost_inr: totalInr,
      });

      localStorage.setItem(
        "projectEstimate",
        JSON.stringify({
          ...formData,
          estimate: { inr: totalInr, local: totalLocal, currency: selectedCurrency.code },
          breakdown,
        })
      );

      try {
        await createDocument({
          collectionId: estimatorCollectionId,
          permissions: publicDocumentPermissions,
          data: {
            project_type: formData.project_type,
            property_type: formData.property_type,
            project_size: Number.parseFloat(formData.project_size) || 0,
            project_size_unit: formData.project_size_unit,
            number_of_floors: Number.parseInt(formData.number_of_floors, 10) || 1,
            number_of_rooms: Number.parseInt(formData.number_of_rooms, 10) || 0,
            number_of_bathrooms: Number.parseInt(formData.number_of_bathrooms, 10) || 0,
            quality_level: formData.quality_level,
            construction_type: formData.construction_type,
            timeline_months: Number.parseInt(formData.timeline_months, 10) || 6,
            site_conditions: formData.site_conditions,
            special_features: formData.special_features,
            design_services_required: formData.design_services_required,
            selected_country: formData.selected_country,
            selected_currency: selectedCurrency.code,
            estimated_cost_inr: totalInr,
            estimated_cost_local: totalLocal,
            conversion_rate: exchangeRate,
            status: "calculated",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        });
      } catch {
        // Keep UI functional even when storage write fails.
      }
    } finally {
      setIsCalculating(false);
      setTimeout(() => {
        document.getElementById("estimate-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  const exchangeRate = DEFAULT_EXCHANGE_RATES[selectedCurrency.code];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h2 className="text-3xl">Quick Estimate</h2>
        <p className="mt-2 text-sm">Use the basic fields below. Advanced options are optional.</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Country</label>
            <select
              value={formData.selected_country}
              onChange={(event) => handleInputChange("selected_country", event.target.value)}
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.currency})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Project Type</label>
            <select
              value={formData.project_type}
              onChange={(event) =>
                handleInputChange("project_type", event.target.value as FormDataState["project_type"])
              }
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="institutional">Institutional</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Area (sqft)</label>
            <input
              type="number"
              min={100}
              step={50}
              value={formData.project_size}
              onChange={(event) => handleInputChange("project_size", event.target.value)}
              placeholder="2000"
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Floors</label>
            <input
              type="number"
              min={1}
              value={formData.number_of_floors}
              onChange={(event) => handleInputChange("number_of_floors", event.target.value)}
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Quality</label>
            <select
              value={formData.quality_level}
              onChange={(event) =>
                handleInputChange("quality_level", event.target.value as FormDataState["quality_level"])
              }
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="economy">Economy</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Timeline (months)</label>
            <select
              value={formData.timeline_months}
              onChange={(event) => handleInputChange("timeline_months", event.target.value)}
              className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>

        <details className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.24em] text-[var(--muted-2)]">
            Advanced Inputs
          </summary>
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Property Type</label>
                <input
                  value={formData.property_type}
                  onChange={(event) => handleInputChange("property_type", event.target.value)}
                  placeholder="House, apartment, office"
                  className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Site Condition</label>
                <select
                  value={formData.site_conditions}
                  onChange={(event) =>
                    handleInputChange(
                      "site_conditions",
                      event.target.value as FormDataState["site_conditions"]
                    )
                  }
                  className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="flat">Flat</option>
                  <option value="sloping">Sloping</option>
                  <option value="challenging">Challenging</option>
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Rooms</label>
                <input
                  type="number"
                  min={0}
                  value={formData.number_of_rooms}
                  onChange={(event) => handleInputChange("number_of_rooms", event.target.value)}
                  className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Bathrooms</label>
                <input
                  type="number"
                  min={0}
                  value={formData.number_of_bathrooms}
                  onChange={(event) => handleInputChange("number_of_bathrooms", event.target.value)}
                  className="mt-2 w-full rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Special Features</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {[
                  { id: "smart_home", label: "Smart Home" },
                  { id: "solar", label: "Solar" },
                  { id: "pool", label: "Swimming Pool" },
                  { id: "garden", label: "Landscape Garden" },
                  { id: "basement", label: "Basement" },
                  { id: "elevator", label: "Elevator" },
                  { id: "parking", label: "Parking" },
                  { id: "security", label: "Security" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFeatureToggle(item.id)}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      formData.special_features.includes(item.id)
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                        : "border-[var(--line)] bg-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">Design Services</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {[
                  { id: "conceptual", label: "Conceptual" },
                  { id: "schematic", label: "Schematic" },
                  { id: "design_development", label: "Design Development" },
                  { id: "construction_docs", label: "Construction Docs" },
                  { id: "permit_approval", label: "Permit Approval" },
                  { id: "site_supervision", label: "Site Supervision" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleServiceToggle(item.id)}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      formData.design_services_required.includes(item.id)
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                        : "border-[var(--line)] bg-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </details>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isCalculating || !formData.project_size}
            onClick={calculateEstimate}
            className="rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.22em] text-white disabled:opacity-60"
          >
            {isCalculating ? "Calculating..." : "Calculate Estimate"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-xs uppercase tracking-[0.22em]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div id="estimate-results" className="card p-6 md:p-8">
          <h2 className="text-3xl">Your Estimate</h2>
          {!estimate ? (
            <p className="mt-4 text-sm">Complete the form and calculate to see your estimate.</p>
          ) : (
            <>
              <p className="mt-4 text-sm text-[var(--muted)]">Estimated Project Cost</p>
              <p className="mt-2 text-5xl">{selectedCurrency.format(estimate.local)}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Equivalent to ₹{estimate.inr.toLocaleString("en-IN")} INR
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Conversion rate used: {exchangeRate} ({selectedCurrency.code})
              </p>

              <div className="subtle-card mt-6 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-2)]">
                  Breakdown
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Construction</span>
                    <span>{selectedCurrency.format(Math.round(estimate.breakdown.construction * exchangeRate))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Design</span>
                    <span>{selectedCurrency.format(Math.round(estimate.breakdown.design * exchangeRate))}</span>
                  </div>
                  {estimate.breakdown.features > 0 ? (
                    <div className="flex justify-between">
                      <span>Features</span>
                      <span>{selectedCurrency.format(Math.round(estimate.breakdown.features * exchangeRate))}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between">
                    <span>Contingency (10%)</span>
                    <span>
                      {selectedCurrency.format(Math.round(estimate.breakdown.contingency * exchangeRate))}
                    </span>
                  </div>
                  <div className="border-t border-[var(--line)] pt-3 text-base">
                    <div className="flex justify-between">
                      <strong>Total</strong>
                      <strong>{selectedCurrency.format(estimate.local)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="rounded-full bg-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.22em] text-white"
                >
                  Get Detailed Quote
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-xs uppercase tracking-[0.22em]"
                >
                  Print
                </button>
              </div>
            </>
          )}
        </div>

        <div className="subtle-card p-6">
          <h3 className="text-2xl">Important Note</h3>
          <p className="mt-3 text-sm">
            This tool gives a preliminary estimate based on broad assumptions and typical cost
            ranges. Final costing depends on design complexity, exact materials, approvals,
            location constraints, and execution scope.
          </p>
        </div>
      </div>
    </div>
  );
}
