// app/estimator/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { databases } from "../../lib/appwrite";
import { DATABASE_ID, COLLECTIONS } from "../../lib/appwrite";
import { ID } from "appwrite";
import { COUNTRIES, CURRENCIES, DEFAULT_EXCHANGE_RATES } from "../../lib/currencyConfig";

export default function EstimatorPage() {
  const router = useRouter();
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimate, setEstimate] = useState<{
    inr: number;
    local: number;
    currency: string;
    breakdown: any;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    // Project Details
    project_type: "residential",
    property_type: "house",
    project_size: "",
    project_size_unit: "sqft",
    number_of_floors: "1",
    number_of_rooms: "",
    number_of_bathrooms: "",
    
    // Specifications
    quality_level: "standard",
    construction_type: "new_construction",
    timeline_months: "6",
    site_conditions: "flat",
    
    // Features & Services
    special_features: [] as string[],
    design_services_required: ["conceptual", "schematic", "design_development"],
    
    // Currency
    selected_country: "IN",
  });

  // Get selected currency based on country
  const selectedCountry = COUNTRIES.find(c => c.code === formData.selected_country);
  const selectedCurrency = CURRENCIES[selectedCountry?.currency as keyof typeof CURRENCIES] || CURRENCIES.INR;

  // Construction rates per sqft in INR (adjust as needed)
  const constructionRates = {
    economy: { residential: 1500, commercial: 1800, industrial: 2000, institutional: 2200 },
    standard: { residential: 2500, commercial: 3000, industrial: 3200, institutional: 3500 },
    premium: { residential: 4000, commercial: 4500, industrial: 4800, institutional: 5000 },
    luxury: { residential: 6000, commercial: 6500, industrial: 7000, institutional: 7500 },
  };

  // Design fees as percentage of construction cost
  const designFees = {
    conceptual: 0.05,
    schematic: 0.08,
    design_development: 0.07,
    construction_docs: 0.10,
    permit_approval: 0.03,
    site_supervision: 0.05,
  };

  // Feature costs in INR
  const featureCosts = {
    smart_home: 500000,
    solar: 800000,
    pool: 1500000,
    garden: 300000,
    basement: 1200000,
    elevator: 2000000,
    parking: 800000,
    security: 300000,
  };

  // Site condition multipliers
  const siteMultipliers = {
    flat: 1.0,
    sloping: 1.2,
    challenging: 1.5,
    urban: 1.1,
    rural: 0.9,
  };

  // Timeline multipliers
  const timelineMultipliers = {
    3: 1.2,
    6: 1.0,
    9: 0.9,
    12: 0.85,
    18: 0.8,
    24: 0.75,
  };

  const calculateEstimate = async () => {
    setIsCalculating(true);
    
    try {
      const size = parseFloat(formData.project_size) || 0;
      const floors = parseInt(formData.number_of_floors) || 1;
      const timeline = parseInt(formData.timeline_months) || 6;
      
      // Get base construction rate
      const baseRate = constructionRates[formData.quality_level as keyof typeof constructionRates]?.[formData.project_type as keyof typeof constructionRates.standard] || 2500;
      
      // Calculate construction cost
      let constructionCost = size * baseRate * floors;
      
      // Apply site condition multiplier
      constructionCost *= siteMultipliers[formData.site_conditions as keyof typeof siteMultipliers];
      
      // Apply timeline multiplier
      const timelineKey = timeline <= 3 ? 3 : timeline <= 6 ? 6 : timeline <= 9 ? 9 : timeline <= 12 ? 12 : timeline <= 18 ? 18 : 24;
      constructionCost *= timelineMultipliers[timelineKey as keyof typeof timelineMultipliers];
      
      // Add feature costs
      let featuresCost = 0;
      formData.special_features.forEach(feature => {
        featuresCost += featureCosts[feature as keyof typeof featureCosts] || 0;
      });
      constructionCost += featuresCost;
      
      // Calculate design fees
      let designCost = 0;
      formData.design_services_required.forEach(service => {
        designCost += constructionCost * (designFees[service as keyof typeof designFees] || 0);
      });
      
      // Add contingency (10%)
      const contingency = constructionCost * 0.1;
      
      // Calculate total in INR
      const totalInr = Math.round(constructionCost + designCost + contingency);
      
      // Convert to local currency
      const exchangeRate = DEFAULT_EXCHANGE_RATES[selectedCurrency.code as keyof typeof DEFAULT_EXCHANGE_RATES] || 1;
      const totalLocal = Math.round(totalInr * exchangeRate);
      
      // Create breakdown
      const breakdown = {
        construction: Math.round(constructionCost),
        design: Math.round(designCost),
        features: Math.round(featuresCost),
        contingency: Math.round(contingency),
        subtotal: Math.round(constructionCost + designCost + featuresCost),
        total: totalInr,
      };
      
      setEstimate({
        inr: totalInr,
        local: totalLocal,
        currency: selectedCurrency.code,
        breakdown,
      });
      
      // Save to localStorage for contact page
      localStorage.setItem("projectEstimate", JSON.stringify({
        ...formData,
        estimate: { inr: totalInr, local: totalLocal, currency: selectedCurrency.code },
        breakdown,
      }));
      
      // Save to Appwrite anonymously
      try {
        const submissionData = {
          project_type: formData.project_type,
          property_type: formData.property_type,
          project_size: parseFloat(formData.project_size) || 0,
          project_size_unit: formData.project_size_unit,
          number_of_floors: parseInt(formData.number_of_floors) || 1,
          number_of_rooms: parseInt(formData.number_of_rooms) || 0,
          number_of_bathrooms: parseInt(formData.number_of_bathrooms) || 0,
          quality_level: formData.quality_level,
          construction_type: formData.construction_type,
          timeline_months: parseInt(formData.timeline_months) || 6,
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
        };
        
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.ESTIMATOR_SUBMISSIONS,
          ID.unique(),
          submissionData
        );
      } catch (error) {
        console.error("Failed to save to Appwrite:", error);
        // Continue even if Appwrite save fails
      }
      
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("estimate-results")?.scrollIntoView({ 
          behavior: "smooth" 
        });
      }, 100);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      special_features: prev.special_features.includes(feature)
        ? prev.special_features.filter(f => f !== feature)
        : [...prev.special_features, feature]
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      design_services_required: prev.design_services_required.includes(service)
        ? prev.design_services_required.filter(s => s !== service)
        : [...prev.design_services_required, service]
    }));
  };

  const handleReset = () => {
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
  };

  const handleContactClick = () => {
    // Store estimate in localStorage for contact form
    if (estimate) {
      localStorage.setItem("projectEstimate", JSON.stringify({
        ...formData,
        estimate: { inr: estimate.inr, local: estimate.local, currency: estimate.currency },
        breakdown: estimate.breakdown,
      }));
    }
    router.push("/contact");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Ubin_Sans']">
            Project Cost Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a preliminary estimate for your architectural project. 
            This tool provides an approximate cost based on industry averages and our experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Ubin_Sans']">
              Project Details
            </h2>

            {/* Country Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Country (For Currency)
              </label>
              <select
                value={formData.selected_country}
                onChange={(e) => handleInputChange('selected_country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.currency})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Estimates will be shown in {selectedCurrency.name} ({selectedCurrency.symbol})
              </p>
            </div>

            {/* Project Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'residential', label: 'Residential' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'industrial', label: 'Industrial' },
                  { id: 'institutional', label: 'Institutional' },
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInputChange('project_type', type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.project_type === type.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Property Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'house', label: 'House' },
                  { id: 'apartment', label: 'Apartment' },
                  { id: 'villa', label: 'Villa' },
                  { id: 'office', label: 'Office' },
                  { id: 'retail', label: 'Retail' },
                  { id: 'hotel', label: 'Hotel' },
                  { id: 'hospital', label: 'Hospital' },
                  { id: 'school', label: 'School' },
                ].map(property => (
                  <button
                    key={property.id}
                    type="button"
                    onClick={() => handleInputChange('property_type', property.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.property_type === property.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{property.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size and Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Area (Square Feet)
                </label>
                <input
                  type="number"
                  value={formData.project_size}
                  onChange={(e) => handleInputChange('project_size', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 2000"
                  min="100"
                  step="50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Floors
                </label>
                <input
                  type="number"
                  value={formData.number_of_floors}
                  onChange={(e) => handleInputChange('number_of_floors', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 2"
                  min="1"
                />
              </div>
            </div>

            {/* Rooms and Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Rooms (Optional)
                </label>
                <input
                  type="number"
                  value={formData.number_of_rooms}
                  onChange={(e) => handleInputChange('number_of_rooms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 4"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Bathrooms (Optional)
                </label>
                <input
                  type="number"
                  value={formData.number_of_bathrooms}
                  onChange={(e) => handleInputChange('number_of_bathrooms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 3"
                  min="0"
                />
              </div>
            </div>

            {/* Construction Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Construction Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'new_construction', label: 'New Construction' },
                  { id: 'renovation', label: 'Renovation' },
                  { id: 'extension', label: 'Extension' },
                  { id: 'interior', label: 'Interior Only' },
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInputChange('construction_type', type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.construction_type === type.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Level */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Desired Quality Level
              </label>
              <div className="space-y-3">
                {[
                  { id: 'economy', label: 'Economy', desc: 'Basic finishes, standard materials' },
                  { id: 'standard', label: 'Standard', desc: 'Good quality materials, modern finishes' },
                  { id: 'premium', label: 'Premium', desc: 'High-end materials, custom features' },
                  { id: 'luxury', label: 'Luxury', desc: 'Premium materials, bespoke design' },
                ].map(quality => (
                  <div
                    key={quality.id}
                    onClick={() => handleInputChange('quality_level', quality.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.quality_level === quality.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{quality.label}</h3>
                        <p className="text-sm text-gray-600">{quality.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.quality_level === quality.id
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.quality_level === quality.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline and Site Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Timeline (Months)
                </label>
                <select
                  value={formData.timeline_months}
                  onChange={(e) => handleInputChange('timeline_months', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="9">9 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Site Conditions
                </label>
                <select
                  value={formData.site_conditions}
                  onChange={(e) => handleInputChange('site_conditions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="flat">Flat Land</option>
                  <option value="sloping">Sloping Land</option>
                  <option value="challenging">Challenging Terrain</option>
                  <option value="urban">Urban Site</option>
                  <option value="rural">Rural Site</option>
                </select>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Additional Features (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'smart_home', label: 'Smart Home' },
                  { id: 'solar', label: 'Solar System' },
                  { id: 'pool', label: 'Swimming Pool' },
                  { id: 'garden', label: 'Landscape Garden' },
                  { id: 'basement', label: 'Basement' },
                  { id: 'elevator', label: 'Elevator' },
                  { id: 'parking', label: 'Multi-level Parking' },
                  { id: 'security', label: 'Advanced Security' },
                ].map(feature => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.special_features.includes(feature.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{feature.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Services */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Design Services Required
              </label>
              <div className="space-y-3">
                {[
                  { id: 'conceptual', label: 'Conceptual Design', desc: 'Initial design concepts and layouts' },
                  { id: 'schematic', label: 'Schematic Design', desc: 'Detailed floor plans and elevations' },
                  { id: 'design_development', label: 'Design Development', desc: 'Technical drawings and specifications' },
                  { id: 'construction_docs', label: 'Construction Documents', desc: 'Complete working drawings' },
                  { id: 'permit_approval', label: 'Permit Approval', desc: 'Assistance with building permits' },
                  { id: 'site_supervision', label: 'Site Supervision', desc: 'Construction monitoring' },
                ].map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.design_services_required.includes(service.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.label}</h3>
                        <p className="text-sm text-gray-600">{service.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.design_services_required.includes(service.id)
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.design_services_required.includes(service.id) && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={calculateEstimate}
                disabled={isCalculating || !formData.project_size}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  isCalculating || !formData.project_size
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  "Calculate Estimate"
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Right Column - Results & Info */}
          <div className="space-y-6">
            {/* Results Card */}
            <div id="estimate-results" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Ubin_Sans']">
                Your Estimate
              </h2>

              {estimate ? (
                <div className="text-center">
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Estimated Project Cost</p>
                    <div className="text-5xl md:text-6xl font-bold text-red-600 mb-2">
                      {selectedCurrency.format(estimate.local)}
                    </div>
                    <p className="text-gray-500 text-sm">
                      Equivalent to ₹{estimate.inr.toLocaleString('en-IN')} INR
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      *This is a preliminary estimate. Actual costs may vary.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Construction Cost</span>
                        <span className="font-semibold">
                          {selectedCurrency.format(Math.round(estimate.breakdown.construction * DEFAULT_EXCHANGE_RATES[selectedCurrency.code as keyof typeof DEFAULT_EXCHANGE_RATES]))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Design & Professional Fees</span>
                        <span className="font-semibold">
                          {selectedCurrency.format(Math.round(estimate.breakdown.design * DEFAULT_EXCHANGE_RATES[selectedCurrency.code as keyof typeof DEFAULT_EXCHANGE_RATES]))}
                        </span>
                      </div>
                      {estimate.breakdown.features > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Special Features</span>
                          <span className="font-semibold">
                            {selectedCurrency.format(Math.round(estimate.breakdown.features * DEFAULT_EXCHANGE_RATES[selectedCurrency.code as keyof typeof DEFAULT_EXCHANGE_RATES]))}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contingency (10%)</span>
                        <span className="font-semibold">
                          {selectedCurrency.format(Math.round(estimate.breakdown.contingency * DEFAULT_EXCHANGE_RATES[selectedCurrency.code as keyof typeof DEFAULT_EXCHANGE_RATES]))}
                        </span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg">
                          <span className="font-bold text-gray-900">Total Estimated Cost</span>
                          <span className="font-bold text-red-600">
                            {selectedCurrency.format(estimate.local)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleContactClick}
                      className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                    >
                      Get Detailed Quote
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Print Estimate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    Fill out the form and click "Calculate Estimate" to see your project cost.
                  </p>
                </div>
              )}
            </div>

            {/* Disclaimer Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Important Disclaimer</h3>
                  <p className="text-blue-800 text-sm">
                    This estimator provides a preliminary cost estimate based on industry averages and general assumptions. 
                    The actual cost may vary based on site conditions, material choices, design complexity, and other factors. 
                    For a detailed and accurate quote, please contact us for a consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-xl mb-4 font-['Ubin_Sans']">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Get Detailed Quote</h4>
                    <p className="text-gray-300 text-sm">Contact us for a comprehensive proposal based on your specific needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Initial Consultation</h4>
                    <p className="text-gray-300 text-sm">Discuss your vision, requirements, and budget in detail.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Design Development</h4>
                    <p className="text-gray-300 text-sm">Begin the creative process with concept development and planning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}