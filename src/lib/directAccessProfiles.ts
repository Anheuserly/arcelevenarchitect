export type DirectAccessProfile = {
  slug: string;
  name: string;
  title: string;
  description: string;
  focusAreas: string[];
  featuredProjectSlug: string;
  documentHref: string;
  documentLabel: string;
};

const directAccessProfiles: Record<string, DirectAccessProfile> = {
  shubham: {
    slug: "shubham",
    name: "Shubham",
    title: "A quieter way into Arc 11 Architect.",
    description:
      "A direct studio route prepared for Shubham to review selected work, open the company profile, and begin a project conversation without moving through the public navigation.",
    focusAreas: [
      "Open a concise studio profile before the first conversation",
      "Review a selected architectural reference from the work archive",
      "Start a project brief directly with the Arc 11 team",
    ],
    featuredProjectSlug: "mr-tushar-faridabad",
    documentHref: "/documents/company-profile.pdf",
    documentLabel: "Open Company Profile",
  },
  shashank: {
    slug: "shashank",
    name: "Shashank",
    title: "A direct studio route with portfolio access.",
    description:
      "A discreet page prepared for Shashank to access the studio portfolio, review selected work, and connect with Arc 11 Architect outside the main public site flow.",
    focusAreas: [
      "Open the principal portfolio PDF immediately",
      "See a selected case study with drawings and visualization cues",
      "Move straight into a live project or inquiry conversation",
    ],
    featuredProjectSlug: "mira-bagh-builder-floor",
    documentHref: "/documents/portfolio-shashank-saini.pdf",
    documentLabel: "Open Portfolio PDF",
  },
};

export function getDirectAccessProfile(slug: string) {
  return directAccessProfiles[slug] ?? null;
}

export function listDirectAccessSlugs() {
  return Object.keys(directAccessProfiles);
}
