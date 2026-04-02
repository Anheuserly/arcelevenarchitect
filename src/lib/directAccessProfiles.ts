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
    heroImage: "/profiles/shashank/shashank-saini-portrait.jpg",
    heroAlt: "Portrait of Shashank Saini",
    heroCaption:
      "Founder portrait paired with a practice built through residential, commercial, interior, and technically detailed architectural work.",
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
    noteTitle: "Studio Perspective",
    noteBody:
      "Shashank's studio approach combines presentation clarity, working drawings, material understanding, and site-linked follow-through so concepts stay grounded in execution.",
    nextStepTitle: "Ready to discuss a live brief?",
    nextStepBody:
      "Use Start a Project when there is a site, budget, or timeline to review. For a lighter introduction, vendor query, or follow-up, use the contact page instead.",
    nextStepHref: "/contact",
    nextStepLabel: "Open Contact",
  },
  shubham: {
    slug: "shubham",
    name: "Shubham Kumar",
    role: "Electrical Engineer and Technical Support Profile",
    headline:
      "Electrical systems, service coordination, and communication-led support grounded in practical training and on-site responsibility.",
    summary:
      "The latest resume positions Shubham as an electrical-engineering profile with Diploma Electrical studies, ITI Electrician training, Electrical Design Engineer certification, and current experience at Shree Ganesh Enterprises. The work spans firefighting and plumbing-system execution, fire detection, marketing support, electrical design calculations, and a practical command of tools such as AutoCAD, C#, DIALux, MS Excel, and MS Office.",
    location: "New Delhi, India",
    heroImage: "/brand/geometry-study.jpeg",
    heroAlt: "Abstract geometry study for Shubham Kumar profile",
    heroCaption:
      "A cleaner technical profile direction focused on training, systems thinking, and communication-led support.",
    actions: [
      {
        kind: "email",
        label: "Send Email",
        href: "mailto:shubham2808kumar@gmail.com",
        variant: "primary",
      },
      {
        kind: "document",
        label: "Open Resume PDF",
        href: "/documents/shubham-kumar-resume-edd.pdf",
        placement: "shubham_resume_pdf",
        variant: "secondary",
      },
      {
        kind: "link",
        label: "Open LinkedIn",
        href: "https://www.linkedin.com/in/shubham-kumar-54b4a5145/",
        variant: "secondary",
      },
    ],
    facts: [
      {
        label: "Current Experience",
        value: "Electrical Engineer",
        detail: "Working at Shree Ganesh Enterprises from June 14, 2024 to present.",
      },
      {
        label: "Technical Base",
        value: "Diploma Electrical + ITI Electrician",
        detail: "Also backed by Electrical Design Engineer and multi-skill technician certifications.",
      },
      {
        label: "Tools",
        value: "AutoCAD, C#, DIALux",
        detail: "Also works with MS Excel and MS Office in day-to-day technical documentation.",
      },
      {
        label: "Working Style",
        value: "Site Coordination and Communication",
        detail: "Handles services execution, safety systems, teamwork, and marketing-led client support.",
      },
    ],
    principlesTitle: "Professional Profile",
    principles: [
      {
        title: "Professional Summary",
        description:
          "Dedicated electrical-engineering profile with experience in designing and implementing electrical systems, supported by strong problem solving and a passion for technology.",
      },
      {
        title: "Current Responsibilities",
        description:
          "Supervises firefighting and plumbing installations, oversees testing, maintains fire-detection systems, and supports marketing initiatives for client acquisition.",
      },
      {
        title: "Certifications and Training",
        description:
          "Certified Multi Skill Technician through LG Hope Technical Skill Academy and Certified Electrical Design Engineer through Dhanush MEP Center.",
      },
      {
        title: "Professional Skills",
        description:
          "Problem-solving, team collaboration, effective communication, time management, and a comfort with technical drawings, schematics, and applied design calculations.",
      },
    ],
    timelineTitle: "Experience and Education",
    timeline: [
      {
        period: "June 14, 2024 - Present",
        title: "Electrical Engineer, Shree Ganesh Enterprises",
        description:
          "Current role involving firefighting systems, plumbing systems, fire detection, marketing initiatives, and project support at Vadheda Builders, Kutub Hotel, Delhi.",
      },
      {
        period: "2019 - 2021",
        title: "Diploma Electrical",
        description:
          "Anuranchal University of Studies.",
      },
      {
        period: "2017 - 2019",
        title: "ITI Electrician",
        description:
          "NCVT.",
      },
    ],
    showcaseTitle: "Resume Highlights",
    showcaseIntro:
      "The PDF gives a clearer professional direction, so this page now surfaces current employment, service responsibilities, electrical-design exposure, certifications, and direct-reference material in one place.",
    showcases: [
      {
        eyebrow: "Current Role",
        title: "Services, Safety Systems, and Site Support",
        description:
          "Current responsibilities include firefighting, plumbing, fire detection, testing, compliance-minded support, and client-facing marketing coordination.",
        href: "#profile-journey",
        linkLabel: "View Experience",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Abstract services and technical support visual",
        tags: ["Electrical Engineer", "Services", "On-Site Support"],
      },
      {
        eyebrow: "Design Exposure",
        title: "Electrical Design and Calculation Work",
        description:
          "The resume lists hospital and generic building electrical design work, including connected-load calculations, cable sizing, tripping time, voltage drop, short circuit, earth pit, bus bar, cable tray, and lightning-rod requirements.",
        href: "#profile-principles",
        linkLabel: "View Skill Focus",
        imageSrc: "/brand/proportion-study.png",
        imageAlt: "Abstract technical design visual",
        tags: ["Electrical Design", "Calculations", "AutoCAD"],
      },
      {
        eyebrow: "Reference",
        title: "Resume PDF and Career Summary",
        description:
          "The full PDF remains available for a deeper review of qualifications, certifications, and current work responsibilities.",
        href: "/documents/shubham-kumar-resume-edd.pdf",
        linkLabel: "Open Resume PDF",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Abstract resume reference visual",
        kind: "document",
        placement: "shubham_resume_showcase_pdf",
        tags: ["Resume PDF", "Reference", "Profile"],
      },
    ],
    contactTitle: "Professional Snapshot",
    contactIntro:
      "A concise read of current role, active work context, technical focus, and tools without turning the page into a full personal resume sheet.",
    contactPoints: [
      {
        label: "Current Role",
        value: "Electrical Engineer at Shree Ganesh Enterprises",
      },
      {
        label: "Active Project",
        value: "Vadheda Builders, Kutub Hotel, Delhi",
      },
      {
        label: "Technical Focus",
        value: "Firefighting systems, plumbing services, fire detection, and electrical design support",
      },
      {
        label: "Software and Tools",
        value: "AutoCAD, DIALux, C#, MS Excel, and MS Office",
      },
    ],
    socialTitle: "Social Profiles",
    socialIntro:
      "Public profiles and handles tied to Shubham across personal and professional presence.",
    socialLinks: [
      {
        platform: "GitHub",
        handle: "shubhamkumar",
        href: "https://github.com/shubhamkumar",
      },
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
    noteTitle: "Profile Perspective",
    noteBody:
      "Beyond technical training, the resume shows interests in coding, software development, technical reading, chess, and travel, alongside a profile shaped by communication, adaptability, and practical learning.",
    nextStepTitle: "Want the full resume version?",
    nextStepBody:
      "Open the PDF for the full formatted resume, or use the contact and social blocks above for direct reach.",
    nextStepHref: "/documents/shubham-kumar-resume-edd.pdf",
    nextStepLabel: "Open Resume PDF",
  },
};

export function getDirectAccessProfile(slug: string) {
  return directAccessProfiles[slug] ?? null;
}

export function listDirectAccessSlugs() {
  return Object.keys(directAccessProfiles);
}
