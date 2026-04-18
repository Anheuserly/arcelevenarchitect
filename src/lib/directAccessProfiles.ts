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

const studioSocialLinks: DirectAccessSocialLink[] = [
  {
    platform: "Instagram",
    handle: "@arc11architect",
    href: "https://www.instagram.com/arc11architect/",
  },
  {
    platform: "LinkedIn",
    handle: "ar-shashank-saini-a0830b19b",
    href: "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b/",
  },
  {
    platform: "Facebook",
    handle: "Arc 11 Architect",
    href: "https://www.facebook.com/profile.php?id=61578009358525",
  },
  {
    platform: "Kolo",
    handle: "Shashank Saini",
    href: "https://koloapp.in/delhi/architects/shashank-saini--delhi",
  },
];

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
  "anil-saini": {
    slug: "anil-saini",
    name: "Anil Saini",
    role: "Project Leadership and Execution Coordination",
    headline:
      "Project delivery grounded in site coordination, vendor rhythm, and construction follow-through.",
    summary:
      "Anil Saini's profile represents the execution-facing side of Arc 11 Architect, where project movement depends on site supervision, vendor coordination, sequencing, procurement rhythm, and the discipline required to translate drawings into reliable built outcomes.",
    location: "New Delhi, India",
    heroImage: "/portfolio/residential/mr-vikram-residence/gallery/mr-vikram-exterior-01.png",
    heroAlt: "Residential exterior study representing execution coordination",
    heroCaption:
      "Execution-led oversight focused on site movement, contractor coordination, and keeping design intent intact through delivery.",
    actions: [
      {
        kind: "startProject",
        label: "Start a Project",
        source: "anil_saini_direct_profile",
        variant: "primary",
      },
      {
        kind: "link",
        label: "Open Work Archive",
        href: "/work",
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
        label: "Current Role",
        value: "Project Leadership",
        detail: "Supports execution flow, site coordination, and delivery-minded decision making.",
      },
      {
        label: "Core Strength",
        value: "Site and Vendor Control",
        detail: "Keeps consultants, contractors, and site activities moving with better alignment.",
      },
      {
        label: "Project Range",
        value: "Residential, Commercial, Renovation",
        detail: "Works across builder floors, residences, commercial interiors, and detail-heavy scopes.",
      },
      {
        label: "Delivery Lens",
        value: "Drawings to Handover",
        detail: "Execution discipline focused on sequencing, quality checks, and build reliability.",
      },
    ],
    principlesTitle: "Execution Method",
    principles: [
      {
        title: "Site Reading",
        description:
          "Reads real site conditions, constraints, and construction-stage risks before decisions are pushed forward.",
      },
      {
        title: "Coordination",
        description:
          "Keeps teams, vendors, and parallel activities aligned so the project moves with fewer disconnects.",
      },
      {
        title: "Procurement Rhythm",
        description:
          "Understands timing, materials, and purchase flow as part of delivery quality rather than an afterthought.",
      },
      {
        title: "Handover Discipline",
        description:
          "Focuses on finishing checks, resolution of loose ends, and a cleaner project closeout.",
      },
    ],
    timelineTitle: "Project Leadership View",
    timeline: [
      {
        period: "Current",
        title: "Execution Support at Arc 11 Architect",
        description:
          "Supports the movement of live projects from design intent into site action through close coordination and follow-up.",
      },
      {
        period: "Site",
        title: "On-Ground Monitoring",
        description:
          "Tracks progress, identifies gaps, and keeps site teams aligned with practical requirements and delivery quality.",
      },
      {
        period: "Vendor",
        title: "Contractor and Supplier Coordination",
        description:
          "Helps synchronize external contributors so timelines, material flow, and workmanship stay under control.",
      },
      {
        period: "Closeout",
        title: "Finishing and Handover Readiness",
        description:
          "Supports final corrections, clean detailing, and a more reliable handover stage.",
      },
    ],
    showcaseTitle: "Execution-Facing Work",
    showcaseIntro:
      "These published pages reflect the kind of work that depends on disciplined site follow-through, sequencing, and finishing control.",
    showcases: [
      {
        eyebrow: "Residential Delivery",
        title: "Mr. Vikram Residence",
        description:
          "Exterior composition, landscape edge, and arrival studies that benefit from close execution alignment and on-site sequencing.",
        href: "/work/mr-vikram-residence",
        linkLabel: "Open Case Study",
        imageSrc: "/portfolio/residential/mr-vikram-residence/gallery/mr-vikram-exterior-01.png",
        imageAlt: "Mr. Vikram Residence exterior study",
        tags: ["Execution", "Residential", "Exterior"],
      },
      {
        eyebrow: "Facade and Interior Scope",
        title: "Mr. Tushar Residence",
        description:
          "A project where facade, room-wise studies, and visual detailing need clear translation into site-ready action.",
        href: "/work/mr-tushar-faridabad",
        linkLabel: "Open Project",
        imageSrc: "/portfolio/residential/mr-tushar-faridabad/gallery/front-elevation.png",
        imageAlt: "Mr. Tushar Residence facade view",
        tags: ["Facade", "Coordination", "Residence"],
      },
      {
        eyebrow: "Studio Overview",
        title: "Company Profile",
        description:
          "A broader studio document useful for understanding the practice context around project delivery, sectors, and capabilities.",
        href: "/documents/company-profile.pdf",
        linkLabel: "Open Company Profile",
        imageSrc: "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
        imageAlt: "Institutional exterior study for company profile reference",
        kind: "document",
        placement: "anil_saini_company_profile",
        tags: ["Company Profile", "Studio", "Capabilities"],
      },
    ],
    contactTitle: "Connect Through Studio",
    contactIntro:
      "For live construction, execution support, or project coordination conversations, the studio route is the best first point of contact.",
    contactPoints: [
      {
        label: "Studio Email",
        value: "arcelevenarchitect@gmail.com",
        href: "mailto:arcelevenarchitect@gmail.com",
      },
      {
        label: "Studio Phone",
        value: "+91 8527378555",
        href: "tel:+918527378555",
      },
      {
        label: "Primary Base",
        value: "New Delhi, India",
      },
      {
        label: "Working Focus",
        value: "Execution coordination, site follow-through, and vendor rhythm",
      },
    ],
    socialTitle: "Studio Links",
    socialIntro:
      "Public studio links for profile context, published presence, and outward-facing practice visibility.",
    socialLinks: studioSocialLinks,
    noteTitle: "Role Perspective",
    noteBody:
      "This route is less about presentation and more about the quiet execution discipline that keeps projects moving from paper into built reality.",
    nextStepTitle: "Need execution support on a live brief?",
    nextStepBody:
      "Use the project intake flow when there is a site, budget, or active scope to review. For a lighter conversation, the contact page remains the right route.",
    nextStepHref: "/start-project",
    nextStepLabel: "Open Start a Project",
  },
  "mukesh-kumar": {
    slug: "mukesh-kumar",
    name: "Mukesh Kumar",
    role: "Accounts and Operations",
    headline:
      "Operations, billing, and studio control that keep project movement commercially clear and internally stable.",
    summary:
      "Mukesh Kumar's profile frames the operational side of Arc 11 Architect through accounts oversight, billing clarity, vendor paperwork, internal coordination support, and the back-office discipline that helps projects and studio workflows stay reliable.",
    location: "New Delhi, India",
    heroImage: "/brand/geometry-study.jpeg",
    heroAlt: "Abstract geometry study representing studio operations",
    heroCaption:
      "Operational structure, record discipline, and commercial clarity that support the studio behind the scenes.",
    actions: [
      {
        kind: "email",
        label: "Email Studio",
        href: "mailto:arcelevenarchitect@gmail.com",
        variant: "primary",
      },
      {
        kind: "document",
        label: "Open Company Profile",
        href: "/documents/company-profile.pdf",
        placement: "mukesh_kumar_company_profile",
        variant: "secondary",
      },
      {
        kind: "link",
        label: "Open Contact Page",
        href: "/contact",
        variant: "secondary",
      },
    ],
    facts: [
      {
        label: "Current Role",
        value: "Accounts and Operations",
        detail: "Supports financial clarity, internal records, and operational continuity for the studio.",
      },
      {
        label: "Core Strength",
        value: "Commercial Discipline",
        detail: "Keeps billing, documentation, and process flow more stable across active work.",
      },
      {
        label: "Support Scope",
        value: "Studio, Vendors, and Internal Systems",
        detail: "Connects the administrative layer between project activity, office records, and coordination support.",
      },
      {
        label: "Working Lens",
        value: "Reliability and Order",
        detail: "Focuses on clean tracking, timely handling, and fewer loose ends in operational flow.",
      },
    ],
    principlesTitle: "Operations Lens",
    principles: [
      {
        title: "Commercial Clarity",
        description:
          "Maintains a clear view of billing and document flow so project decisions are backed by stronger internal order.",
      },
      {
        title: "Record Discipline",
        description:
          "Treats records, entries, and supporting files as part of studio reliability rather than background admin work.",
      },
      {
        title: "Coordination Support",
        description:
          "Helps the studio and vendors stay aligned through steadier paperwork, process checks, and commercial support.",
      },
      {
        title: "Operational Stability",
        description:
          "Supports a calmer internal system so design and project teams can move with fewer avoidable bottlenecks.",
      },
    ],
    timelineTitle: "Operational View",
    timeline: [
      {
        period: "Current",
        title: "Operations at Arc 11 Architect",
        description:
          "Supports the studio's internal flow through accounts-led discipline, office coordination, and commercial clarity.",
      },
      {
        period: "Records",
        title: "Documentation and Billing Support",
        description:
          "Keeps paperwork, records, and financial flow organized for steadier internal decision making.",
      },
      {
        period: "Vendor",
        title: "Vendor and Process Coordination",
        description:
          "Supports the movement of vendor-facing paperwork and coordination systems tied to active work.",
      },
      {
        period: "Studio",
        title: "Back-Office Continuity",
        description:
          "Provides the operational steadiness that helps the wider practice stay dependable and responsive.",
      },
    ],
    showcaseTitle: "Operations Context",
    showcaseIntro:
      "This profile connects operations work to the wider practice, showing the studio-facing pages where administrative and commercial structure support design delivery.",
    showcases: [
      {
        eyebrow: "Studio Document",
        title: "Company Profile",
        description:
          "A concise studio overview useful for understanding the broader practice Mukesh supports from the operations side.",
        href: "/documents/company-profile.pdf",
        linkLabel: "Open Company Profile",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Abstract studio operations visual",
        kind: "document",
        placement: "mukesh_kumar_showcase_profile",
        tags: ["Operations", "Company Profile", "Studio"],
      },
      {
        eyebrow: "Client Route",
        title: "Contact and Inquiry Flow",
        description:
          "The contact page reflects the client-facing entry point that feeds into internal coordination and office response systems.",
        href: "/contact",
        linkLabel: "Open Contact",
        imageSrc: "/contact/contact-card.png",
        imageAlt: "Arc 11 Architect contact card",
        tags: ["Contact", "Operations", "Response Flow"],
      },
      {
        eyebrow: "Service Context",
        title: "Services Overview",
        description:
          "Studio services provide the broader context around the kind of projects, scopes, and teams that operations work supports.",
        href: "/services",
        linkLabel: "Open Services",
        imageSrc: "/brand/proportion-study.png",
        imageAlt: "Arc 11 Architect proportion study",
        tags: ["Services", "Studio Scope", "Support"],
      },
    ],
    contactTitle: "Operations Contact View",
    contactIntro:
      "The right route for commercial, office, and coordination communication is still the main studio contact system.",
    contactPoints: [
      {
        label: "Studio Email",
        value: "arcelevenarchitect@gmail.com",
        href: "mailto:arcelevenarchitect@gmail.com",
      },
      {
        label: "Studio Phone",
        value: "+91 96500 58444",
        href: "tel:+919650058444",
      },
      {
        label: "Primary Base",
        value: "New Delhi, India",
      },
      {
        label: "Working Focus",
        value: "Accounts, records, billing support, and office operations",
      },
    ],
    socialTitle: "Studio Links",
    socialIntro:
      "Studio-facing public profiles for context, references, and broader company visibility.",
    socialLinks: studioSocialLinks,
    noteTitle: "Role Perspective",
    noteBody:
      "Not every portfolio is visual. This one reflects the operational structure that quietly supports studio reliability, commercial clarity, and internal continuity.",
    nextStepTitle: "Need a studio contact route?",
    nextStepBody:
      "Use the contact page for office communication, general inquiries, and coordination-led outreach. For a live client brief, Start a Project remains the better path.",
    nextStepHref: "/contact",
    nextStepLabel: "Open Contact",
  },
  "ujjwal-sinha": {
    slug: "ujjwal-sinha",
    name: "Ujjwal Sinha",
    role: "Studio Director",
    headline:
      "Studio direction shaped through client alignment, internal orchestration, and a sharper overall project rhythm.",
    summary:
      "Ujjwal Sinha's profile represents the studio-director layer of Arc 11 Architect, where communication, decision flow, team alignment, review rhythm, and project momentum are held together so design and delivery stay in sync.",
    location: "New Delhi, India",
    heroImage: "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
    heroAlt: "Institutional exterior study representing studio direction",
    heroCaption:
      "Leadership focused on aligning client expectations, internal teams, and project movement across the wider studio.",
    actions: [
      {
        kind: "startProject",
        label: "Start a Project",
        source: "ujjwal_sinha_direct_profile",
        variant: "primary",
      },
      {
        kind: "link",
        label: "Open Services",
        href: "/services",
        variant: "secondary",
      },
      {
        kind: "link",
        label: "Open Contact",
        href: "/contact",
        variant: "secondary",
      },
    ],
    facts: [
      {
        label: "Current Role",
        value: "Studio Director",
        detail: "Supports project movement, communication flow, and internal alignment across the practice.",
      },
      {
        label: "Core Strength",
        value: "Client and Team Alignment",
        detail: "Keeps internal review, client communication, and project rhythm better connected.",
      },
      {
        label: "Studio Range",
        value: "Residential, Commercial, Institutional",
        detail: "Works across the wider practice rather than a single project type or service layer.",
      },
      {
        label: "Leadership Lens",
        value: "Clarity and Continuity",
        detail: "Builds steadier internal structure around delivery, conversation, and follow-through.",
      },
    ],
    principlesTitle: "Leadership Method",
    principles: [
      {
        title: "Brief Alignment",
        description:
          "Helps early conversations stay clear so client intent, internal understanding, and project direction begin with fewer gaps.",
      },
      {
        title: "Team Orchestration",
        description:
          "Supports the rhythm between architects, visual teams, execution support, and operations so outputs stay aligned.",
      },
      {
        title: "Review Structure",
        description:
          "Creates a steadier cadence for discussions, decisions, and follow-up instead of fragmented project movement.",
      },
      {
        title: "Delivery Clarity",
        description:
          "Keeps design and execution conversations connected so project momentum is easier to sustain.",
      },
    ],
    timelineTitle: "Studio Leadership View",
    timeline: [
      {
        period: "Current",
        title: "Studio Direction at Arc 11 Architect",
        description:
          "Supports the wider project ecosystem by keeping communication, reviews, and direction more coherent.",
      },
      {
        period: "Clients",
        title: "Client Coordination and Expectation Setting",
        description:
          "Helps shape conversations, response rhythm, and clarity around scope, next steps, and studio process.",
      },
      {
        period: "Team",
        title: "Internal Alignment",
        description:
          "Supports better movement across design, visualization, coordination, and support teams inside the practice.",
      },
      {
        period: "Flow",
        title: "Project Continuity",
        description:
          "Focuses on keeping project energy intact across early briefing, review cycles, and working progression.",
      },
    ],
    showcaseTitle: "Studio Leadership Context",
    showcaseIntro:
      "This page pairs leadership-facing routes with published work to show how studio direction connects outward presentation, service positioning, and active project flow.",
    showcases: [
      {
        eyebrow: "Studio Positioning",
        title: "Services Overview",
        description:
          "The services page reflects how the studio presents its wider scope, coordination structure, and delivery logic to clients.",
        href: "/services",
        linkLabel: "Open Services",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Studio services visual",
        tags: ["Studio", "Services", "Direction"],
      },
      {
        eyebrow: "Published Work",
        title: "AIIMS Extension Block",
        description:
          "A larger-format institutional page that reflects the kind of broader studio alignment required on bigger projects.",
        href: "/work/aiims-extension-block",
        linkLabel: "Open Project",
        imageSrc: "/portfolio/commercial/aiims-extension-block/gallery/aiims-extension-block-01.jpg",
        imageAlt: "AIIMS Extension Block study",
        tags: ["Institutional", "Leadership", "Coordination"],
      },
      {
        eyebrow: "Client Route",
        title: "Start a Project",
        description:
          "The intake flow is where studio direction, clarity, and project-fit conversations start for live briefs.",
        href: "/start-project",
        linkLabel: "Open Intake",
        imageSrc: "/portfolio/residential/mr-vikram-residence/gallery/mr-vikram-exterior-01.png",
        imageAlt: "Residential entry and arrival study",
        tags: ["Client Intake", "Direction", "Process"],
      },
    ],
    contactTitle: "Leadership Contact View",
    contactIntro:
      "Use the studio route when the conversation is about project fit, scope alignment, collaboration structure, or next-step clarity.",
    contactPoints: [
      {
        label: "Studio Email",
        value: "arcelevenarchitect@gmail.com",
        href: "mailto:arcelevenarchitect@gmail.com",
      },
      {
        label: "Studio Phone",
        value: "+91 8527378555",
        href: "tel:+918527378555",
      },
      {
        label: "Primary Base",
        value: "New Delhi, India",
      },
      {
        label: "Working Focus",
        value: "Client alignment, studio direction, and internal project rhythm",
      },
    ],
    socialTitle: "Studio Links",
    socialIntro:
      "Public-facing studio channels that give broader context around practice visibility and outward communication.",
    socialLinks: studioSocialLinks,
    noteTitle: "Role Perspective",
    noteBody:
      "This role is about holding project rhythm together at a studio level so communication, direction, and delivery move with more continuity.",
    nextStepTitle: "Need to discuss scope or project fit?",
    nextStepBody:
      "For a live commission, use the start-project flow. For a lighter inquiry or collaboration conversation, the contact page stays open as the studio's general route.",
    nextStepHref: "/start-project",
    nextStepLabel: "Open Start a Project",
  },
  "sohel-latif": {
    slug: "sohel-latif",
    name: "Sohel Latif",
    role: "Partner, Creative",
    headline:
      "Creative direction guided by mood, composition, presentation clarity, and a refined visual language.",
    summary:
      "Sohel Latif's profile highlights the creative side of Arc 11 Architect through concept framing, mood direction, visual communication, and the atmospheric thinking that helps both clients and teams understand a design more quickly and more clearly.",
    location: "New Delhi, India",
    heroImage: "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-19.jpeg",
    heroAlt: "Interior image representing creative direction",
    heroCaption:
      "Creative leadership shaped through presentation quality, material tone, mood direction, and visually coherent storytelling.",
    actions: [
      {
        kind: "link",
        label: "Open Instagram Feed",
        href: "/instagram",
        variant: "primary",
      },
      {
        kind: "link",
        label: "Open Work Archive",
        href: "/work",
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
        label: "Current Role",
        value: "Partner, Creative",
        detail: "Supports visual direction, concept framing, and the creative clarity of studio output.",
      },
      {
        label: "Core Strength",
        value: "Mood and Presentation",
        detail: "Builds stronger visual understanding through atmosphere, composition, and tone.",
      },
      {
        label: "Range",
        value: "Interiors, Visual Studies, Concept Direction",
        detail: "Works across concept alignment, material mood, presentations, and public-facing visual language.",
      },
      {
        label: "Creative Lens",
        value: "Atmosphere and Story",
        detail: "Treats visual coherence as a tool for both design clarity and client confidence.",
      },
    ],
    principlesTitle: "Creative Method",
    principles: [
      {
        title: "Mood and Material",
        description:
          "Uses atmosphere, finish language, and tone to make design intent easier to feel before it is fully built.",
      },
      {
        title: "Presentation Clarity",
        description:
          "Shapes visuals so clients and collaborators can understand direction quickly and make better decisions early.",
      },
      {
        title: "Narrative Framing",
        description:
          "Builds a clearer story around spaces, transitions, and focal elements instead of relying on disconnected images.",
      },
      {
        title: "Visual Consistency",
        description:
          "Keeps presentation quality, references, and design language aligned across the wider project set.",
      },
    ],
    timelineTitle: "Creative Scope",
    timeline: [
      {
        period: "Current",
        title: "Creative Direction at Arc 11 Architect",
        description:
          "Supports visual clarity, concept framing, and presentation quality across the practice.",
      },
      {
        period: "Concept",
        title: "Moodboards and Visual Alignment",
        description:
          "Helps early concept discussions land through references, tone setting, and stronger visual storytelling.",
      },
      {
        period: "Portfolio",
        title: "Presentation and Showcase Logic",
        description:
          "Shapes how work is edited, presented, and understood across case studies, social channels, and outward-facing material.",
      },
      {
        period: "Public Presence",
        title: "Studio Visual Voice",
        description:
          "Contributes to the visual consistency of the studio's outward presence across digital and presentation platforms.",
      },
    ],
    showcaseTitle: "Creative Portfolio View",
    showcaseIntro:
      "This page ties the role to mood, social presentation, and published studio imagery rather than treating creativity as a separate layer from the work itself.",
    showcases: [
      {
        eyebrow: "Published Work",
        title: "Builder Floor, Mira Bagh",
        description:
          "A calm interior project where tone, lighting, and joinery rhythm make the visual direction especially visible.",
        href: "/work/mira-bagh-builder-floor",
        linkLabel: "Open Case Study",
        imageSrc: "/portfolio/residential/mira-bagh-builder-floor/gallery/mira-bagh-interior-19.jpeg",
        imageAlt: "Builder Floor, Mira Bagh visual study",
        tags: ["Creative", "Interiors", "Atmosphere"],
      },
      {
        eyebrow: "Social Presence",
        title: "Instagram Feed",
        description:
          "The studio's Instagram wall reflects visual studies, posts, and reels that carry the practice's public-facing design voice.",
        href: "/instagram",
        linkLabel: "Open Instagram Page",
        imageSrc: "/brand/geometry-study.jpeg",
        imageAlt: "Instagram feed visual",
        tags: ["Instagram", "Visual Voice", "Public Presence"],
      },
      {
        eyebrow: "Studio Notes",
        title: "Journal and Material Thinking",
        description:
          "The journal route complements the creative side of the practice through notes, studies, and mood-led references.",
        href: "/journal",
        linkLabel: "Open Journal",
        imageSrc: "/brand/proportion-study.png",
        imageAlt: "Studio journal visual",
        tags: ["Journal", "Moodboards", "References"],
      },
    ],
    contactTitle: "Creative Contact View",
    contactIntro:
      "For concept conversations, presentation-led collaborations, and visually oriented studio communication, the main studio route remains the right entry point.",
    contactPoints: [
      {
        label: "Studio Email",
        value: "arcelevenarchitect@gmail.com",
        href: "mailto:arcelevenarchitect@gmail.com",
      },
      {
        label: "Studio Phone",
        value: "+91 8527378555",
        href: "tel:+918527378555",
      },
      {
        label: "Primary Base",
        value: "New Delhi, India",
      },
      {
        label: "Working Focus",
        value: "Creative direction, mood setting, and visual communication",
      },
    ],
    socialTitle: "Studio Links",
    socialIntro:
      "Public studio channels that best reflect the visual and presentation-oriented side of the practice.",
    socialLinks: studioSocialLinks,
    noteTitle: "Role Perspective",
    noteBody:
      "Creative clarity is not decoration here. It is used to make ideas easier to understand, align, and carry forward into the wider project process.",
    nextStepTitle: "Want to see the public visual layer of the studio?",
    nextStepBody:
      "The Instagram page and the work archive are the quickest routes into the studio's visual voice. For a live brief, use Start a Project next.",
    nextStepHref: "/instagram",
    nextStepLabel: "Open Instagram",
  },
};

export function getDirectAccessProfile(slug: string) {
  return directAccessProfiles[slug] ?? null;
}

export function listDirectAccessSlugs() {
  return Object.keys(directAccessProfiles);
}
