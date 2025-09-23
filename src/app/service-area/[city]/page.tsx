import { notFound } from "next/navigation";

const cities = {
  delhi: {
    title: "Fire Safety Services in Delhi",
    description: "Complete fire safety & AMC services in Delhi.",
  },
  gurgaon: {
    title: "Fire Safety Services in Gurgaon",
    description: "Fire extinguisher refilling, AMC, and hydrants in Gurgaon.",
  },
  faridabad: {
    title: "Fire Safety Services in Faridabad",
    description: "Reliable AMC & fire protection services in Faridabad.",
  },
  noida: {
    title: "Fire Safety Services in Noida",
    description: "End-to-end fire safety & annual maintenance in Noida.",
  },
  "greater-noida": {
    title: "Fire Safety Services in Greater Noida",
    description: "Full fire AMC & protection systems in Greater Noida.",
  },
  ghaziabad: {
    title: "Fire Safety Services in Ghaziabad",
    description: "Professional AMC services across Ghaziabad.",
  },
};

type Params = {
  city: string;
};

// Generate metadata - params is a Promise
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const cityData = (cities as Record<string, { title: string; description: string }>)[city];
  if (!cityData) return { title: "Service Area | amcmep.in" };
  return { title: cityData.title, description: cityData.description };
}

// Page component - params is a Promise
export default async function ServiceAreaPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const cityData = (cities as Record<string, { title: string; description: string }>)[city];

  if (!cityData) {
    return notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{cityData.title}</h1>
      <p className="mb-4">{cityData.description}</p>
      <p>
        Need fire safety services in{" "}
        {city.charAt(0).toUpperCase() + city.slice(1)}?{" "}
        <a href="/contact" className="text-indigo-600 hover:underline">
          Contact us
        </a>{" "}
        today.
      </p>
    </main>
  );
}