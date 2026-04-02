export type DirectAccessActionKind = "startProject" | "link" | "email" | "document";

export type DirectAccessAction = {
  kind: DirectAccessActionKind;
  label: string;
  href?: string;
  placement?: string;
  source?: string;
  variant?: "primary" | "secondary";
};

export type DirectAccessFact = {
  label: string;
  value: string;
  detail: string;
};

export type DirectAccessEntry = {
  title: string;
  description: string;
};

export type DirectAccessTimelineItem = {
  period: string;
  title: string;
  description: string;
};

export type DirectAccessShowcase = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  imageSrc: string;
  imageAlt: string;
  kind?: "link" | "document";
  placement?: string;
  tags: string[];
};

export type DirectAccessContactPoint = {
  label: string;
  value: string;
  href?: string;
};

export type DirectAccessSocialLink = {
  platform: string;
  handle: string;
  href?: string;
};

export type DirectAccessProfile = {
  slug: string;
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  heroImage: string;
  heroAlt: string;
  heroCaption: string;
  actions: DirectAccessAction[];
  facts: DirectAccessFact[];
  principlesTitle: string;
  principles: DirectAccessEntry[];
  timelineTitle: string;
  timeline: DirectAccessTimelineItem[];
  showcaseTitle: string;
  showcaseIntro: string;
  showcases: DirectAccessShowcase[];
  contactTitle: string;
  contactIntro: string;
  contactPoints: DirectAccessContactPoint[];
  socialTitle: string;
  socialIntro: string;
  socialLinks: DirectAccessSocialLink[];
  noteTitle: string;
  noteBody: string;
  nextStepTitle: string;
  nextStepBody: string;
  nextStepHref: string;
  nextStepLabel: string;
};

const directAccessProfiles: Record<string, DirectAccessProfile> = {
  shashank: {
    slug: "shashank",
    name: "Shashank Saini",
    role: "Proprietor Director, Arc 11 Architect",
    headline: "Architecture grounded in drawings, site reality, and a calm visual language.",
    summary:
      "B.Arch graduate from Guru Gobind Singh Indraprastha University and current proprietor-director of Arc 11 Architect. His portfolio spans residential and commercial design, interiors, visualization, technical working drawings, and site-linked coordination across Delhi NCR and beyond.",
    location: "New Delhi, India",
    heroImage: "/portfolio/residential/mr-vikram-residence/gallery/mr-vikram-exterior-01.png",
    heroAlt: "Arc 11 Architect residential exterior study",
    heroCaption:
      "Residential, commercial, and technical work carried from concept direction into execution-ready detail.",
    actions: [
      {
        kind: "startProject",
        label: "Start a Project",
        source: "shashank_hidden_profile",
        variant: "primary",
      },
      {
        kind: "document",
        label: "Open Portfolio PDF",
        href: "/documents/portfolio-shashank-saini.pdf",
        placement: "shashank_hidden_profile_portfolio",
        variant: "secondary",
      },
      {
        kind: "email",
        label: "Email Studio",
        href: "mailto:arcelevenarchitect@gmail.com",
        variant: "secondary",
      },
    ],
    facts: [
      {
        label: "Current Position",
        value: "Arc 11 Architect",
        detail: "Leads the studio as proprietor director.",
      },
      {
        label: "Education",
        value: "B.Arch, GGSIPU",
        detail: "Architecture degree completed between 2017 and 2022.",
      },
      {
        label: "Practice Range",
        value: "Residential, Commercial, Interiors",
        detail: "Builder floors, residences, facades, technical sets, and workplace studies.",
      },
      {
        label: "Working Strength",
        value: "Drawings to Site",
        detail: "Visualization, technical coordination, finish detailing, and supervision.",
      },
    ],
    principlesTitle: "Working Method",
    principles: [
      {
        title: "Analyze",
        description:
          "Reads a space through population, requirement, functionality, and form before shaping the design direction.",
      },
      {
        title: "Planning",
        description:
          "Converts ideas into layouts and recordable drawings that can move clearly into execution.",
      },
      {
        title: "Visualize",
        description:
          "Develops concept direction through renders, moodboards, and material-driven presentation.",
      },
      {
        title: "Creation",
        description:
          "Carries the work into site reality with close detailing, management, and design follow-through.",
      },
    ],
    timelineTitle: "Experience Timeline",
    timeline: [
      {
        period: "Current",
        title: "Arc 11 Architect",
        description:
          "Leads client conversations, design direction, visualization, and project development as proprietor director of the studio.",
      },
      {
        period: "2021-2022",
        title: "42 MM Architecture",
        description:
          "Architectural studio exposure focused on presentation quality, detail development, and design communication.",
      },
      {
        period: "2019-2021",
        title: "S.S. Engineers & Consultants",
        description:
          "Worked around technical drawings, site coordination, finish documentation, and execution-facing deliverables.",
      },
      {
        period: "2019-2020",
        title: "Orionn Architects, Noida",
        description:
          "Contributed to residential and commercial design development with working-detail responsibilities.",
      },
      {
        period: "2016-2019",
        title: "Freelance Graphic Designer & Logo Artist",
        description:
          "Built an early visual foundation through identity work, graphics, and composition-led communication.",
      },
    ],
    showcaseTitle: "Selected Portfolio View",
    showcaseIntro:
      "A direct edit of Shashank's work should show both design thinking and technical range, so this page pairs published studio projects with the broader PDF archive.",
    showcases: [
      {
        eyebrow: "Published Work",
        title: "Builder Floor, Mira Bagh",
        description:
          "A calm interior case study with layered ceilings, joinery detailing, and visualization-led decision making across residential spaces.",
        href: "/work/mira-bagh-builder-floor",
        linkLabel: "Open Case Study",
        imageSrc: "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-19.jpeg",
        imageAlt: "Builder Floor, Mira Bagh interior",
        tags: ["Residential", "Interiors", "Visualization"],
      },
      {
        eyebrow: "Published Work",
        title: "Institutional and Exterior Planning",
        description:
          "Large-format campus and exterior studies that show massing, approach logic, and the spatial reading required for bigger sites.",
        href: "/work/aiims-extension-block",
        linkLabel: "Open Project",
        imageSrc: "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
        imageAlt: "AIIMS Extension Block exterior",
        tags: ["Institutional", "Landscape", "Planning"],
      },
      {
        eyebrow: "Portfolio Archive",
        title: "Technical Drawings, Facades, and Working Sets",
        description:
          "The full portfolio extends beyond the published site into staircase details, electrical layouts, kitchen drawings, private residences, commercial facades, and moodboards.",
        href: "/documents/portfolio-shashank-saini.pdf",
        linkLabel: "Open Portfolio PDF",
        imageSrc: "/portfolio/residential/mr-tushar-faridabad/gallery/front-elevation.png",
        imageAlt: "Facade drawing and residential elevation",
        kind: "document",
        placement: "shashank_hidden_profile_showcase_pdf",
        tags: ["Technical Drawings", "Facades", "Portfolio PDF"],
      },
    ],
    contactTitle: "Connect with Shashank",
    contactIntro:
      "Use the studio route for project discussions, consultations, and first-level conversations around architecture, interiors, or execution support.",
    contactPoints: [
      {
        label: "Studio Email",
        value: "arcelevenarchitect@gmail.com",
        href: "mailto:arcelevenarchitect@gmail.com",
      },
      {
        label: "Portfolio Email",
        value: "sainishashank04@gmail.com",
        href: "mailto:sainishashank04@gmail.com",
      },
      {
        label: "Phone",
        value: "+91 8368566537",
        href: "tel:+918368566537",
      },
      {
        label: "Location",
        value: "Chhatarpur, New Delhi",
      },
    ],
    socialTitle: "Social Profiles",
    socialIntro:
      "Public-facing links for studio presence, professional background, and direct profile context.",
    socialLinks: [
      {
        platform: "Instagram",
        handle: "@shashaankk",
        href: "https://www.instagram.com/shashaankk/",
      },
      {
        platform: "Facebook",
        handle: "shashank.saini.161",
        href: "https://www.facebook.com/shashank.saini.161",
      },
      {
        platform: "LinkedIn",
        handle: "ar-shashank-saini-a0830b19b",
        href: "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
      },
    ],
    noteTitle: "Direct Route Note",
    noteBody:
      "This page is intended for direct sharing and review. It is not surfaced in the main navigation and is omitted from the public sitemap.",
    nextStepTitle: "Ready to discuss a live brief?",
    nextStepBody:
      "Use Start a Project when there is a site, budget, or timeline to review. For a lighter introduction, vendor query, or follow-up, use the contact page instead.",
    nextStepHref: "/contact",
    nextStepLabel: "Open Contact",
  },
  shubham: {
    slug: "shubham",
    name: "Shubham Kumar",
    role: "Website Developer, Arc 11 Architect",
    headline: "Digital systems, premium UX, and front-end execution for the studio's online presence.",
    summary:
      "Shubham develops the Arc 11 Architect website and shapes how the studio reads online: interface systems, motion, portfolio structure, lead-capture flows, SEO/share behavior, hidden access pages, and content organization across the site.",
    location: "Digital build layer for Arc 11 Architect",
    heroImage: "/brand/geometry-study.jpeg",
    heroAlt: "Arc 11 Architect geometry study",
    heroCaption:
      "A digital portfolio focused on structure, motion, discoverability, and clean implementation rather than generic template work.",
    actions: [
      {
        kind: "link",
        label: "Open Studio Website",
        href: "/",
        variant: "primary",
      },
      {
        kind: "link",
        label: "Browse Work Archive",
        href: "/work",
        variant: "secondary",
      },
      {
        kind: "link",
        label: "Use Contact",
        href: "/contact",
        variant: "secondary",
      },
    ],
    facts: [
      {
        label: "Role",
        value: "Website Developer",
        detail: "Translates studio direction into a working digital product.",
      },
      {
        label: "Focus",
        value: "UX, Motion, Structure",
        detail: "Premium interface systems across desktop and mobile.",
      },
      {
        label: "Built Here",
        value: "Portfolio, SEO, Intake Flows",
        detail: "Asset mapping, route architecture, forms, previews, and metadata.",
      },
      {
        label: "Best Used For",
        value: "Brand-Led Web Delivery",
        detail: "Websites that need both visual polish and technical clarity.",
      },
    ],
    principlesTitle: "Digital Practice",
    principles: [
      {
        title: "Interface Architecture",
        description:
          "Builds screens, components, and hierarchy that feel intentional instead of theme-driven or generic.",
      },
      {
        title: "Motion and Page Flow",
        description:
          "Uses transitions, scroll behavior, and UI feedback to make the site feel smarter and more considered.",
      },
      {
        title: "Content Systems",
        description:
          "Organizes uploads, project structures, reusable routes, and data layers so the site can grow cleanly.",
      },
      {
        title: "Search and Sharing",
        description:
          "Tunes metadata, image previews, sitemap behavior, verification files, and SEO-facing details for better reach.",
      },
    ],
    timelineTitle: "Website Work",
    timeline: [
      {
        period: "Foundation",
        title: "Structured the Core Experience",
        description:
          "Turned the site into a responsive Next.js experience with a stronger visual system and architectural presentation language.",
      },
      {
        period: "Portfolio Layer",
        title: "Mapped Real Assets into the Website",
        description:
          "Connected uploaded files to the public portfolio, case-study pages, category grouping, and richer content presentation.",
      },
      {
        period: "Lead Flow",
        title: "Separated Inquiry and Project Intake",
        description:
          "Reworked contact vs start-project logic, added the popup intake flow, and aligned request handling more clearly.",
      },
      {
        period: "Search and Share",
        title: "Improved Visibility and Preview Behavior",
        description:
          "Handled social previews, image discovery tuning, Discord verification, sitemap polish, and structured metadata.",
      },
      {
        period: "Control Layer",
        title: "Added Access Routing and Media Controls",
        description:
          "Built direct-access pages, image-protection deterrents, and cleaner control over how portfolio content is surfaced.",
      },
    ],
    showcaseTitle: "Selected Digital Contributions",
    showcaseIntro:
      "Shubham's page works best as a build portfolio, so it highlights the systems and decisions that shaped the live website rather than pretending to be an architectural CV.",
    showcases: [
      {
        eyebrow: "UI System",
        title: "Design Language and Homepage Direction",
        description:
          "Navigation refinement, material-like surfaces, typographic hierarchy, and an architectural visual tone across the core site.",
        href: "/",
        linkLabel: "Open Homepage",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Arc 11 Architect brand geometry study",
        tags: ["UI/UX", "Responsive", "Brand Direction"],
      },
      {
        eyebrow: "Portfolio System",
        title: "Asset Mapping and Case Study Structure",
        description:
          "Connected uploaded folders to project pages, galleries, hidden routes, and content-driven sections so the work can scale cleanly.",
        href: "/work",
        linkLabel: "Open Work Archive",
        imageSrc: "/portfolio/residential/mr-vikram-residence/gallery/mr-vikram-exterior-02.png",
        imageAlt: "Arc 11 Architect project archive visual",
        tags: ["Routing", "Content System", "Case Studies"],
      },
      {
        eyebrow: "SEO and Conversion",
        title: "Share Previews, Forms, and Discoverability",
        description:
          "Handled direct-sharing behavior, verification routes, page metadata, and the split between general inquiry and project-ready intake.",
        href: "/contact",
        linkLabel: "Open Contact Flow",
        imageSrc: "/brand/proportion-study.png",
        imageAlt: "Arc 11 Architect logo asset",
        tags: ["SEO", "Forms", "Metadata"],
      },
    ],
    contactTitle: "Best Way to Connect",
    contactIntro:
      "For digital-facing conversations, website refinement, or broader studio coordination, route through the studio contact page and the live website itself.",
    contactPoints: [
      {
        label: "Inquiry Route",
        value: "Use the Contact page",
        href: "/contact",
      },
      {
        label: "Live Build",
        value: "Review the current studio website",
        href: "/",
      },
      {
        label: "Focus Area",
        value: "Front-end systems, motion, SEO, and content structure",
      },
      {
        label: "Collaboration Mode",
        value: "Works through Arc 11 Architect's digital layer",
      },
    ],
    socialTitle: "Social Profiles",
    socialIntro:
      "Public profiles and handles connected to Shubham across personal, studio, and professional presence.",
    socialLinks: [
      {
        platform: "Facebook",
        handle: "notshubham4u",
        href: "https://www.facebook.com/notshubham4u",
      },
      {
        platform: "Discord",
        handle: "anheuserly",
      },
      {
        platform: "Instagram",
        handle: "@shubham.arc11",
        href: "https://www.instagram.com/shubham.arc11/",
      },
      {
        platform: "Instagram Alt",
        handle: "@itznotshubham",
        href: "https://www.instagram.com/itznotshubham/",
      },
      {
        platform: "Instagram Archive",
        handle: "@oh.wow.nice",
        href: "https://www.instagram.com/oh.wow.nice/",
      },
      {
        platform: "LinkedIn",
        handle: "shubham-kumar-54b4a5145",
        href: "https://www.linkedin.com/in/shubham-kumar-54b4a5145/",
      },
    ],
    noteTitle: "Digital Perspective",
    noteBody:
      "The website layer is treated as part of the studio identity, where structure, presentation, performance, and discoverability need to feel equally considered.",
    nextStepTitle: "Want to review the implementation?",
    nextStepBody:
      "Browse the live website, open the work archive, or use contact if the conversation is about a new digital requirement or a studio-facing web update.",
    nextStepHref: "/work",
    nextStepLabel: "Open Work Archive",
  },
};

export function getDirectAccessProfile(slug: string) {
  return directAccessProfiles[slug] ?? null;
}

export function listDirectAccessSlugs() {
  return Object.keys(directAccessProfiles);
}
