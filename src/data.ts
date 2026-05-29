import { Project, Testimonial, Service, Stat, SocialLink, ContactChannel } from "./types";

export const DEFAULT_BIO = {
  name: "Mihji George Chaka",
  shortRole: "Full Stack Developer & Systems Architect",
  tagline: "Unifying responsive user interfaces, robust multi-stack software, and secure enterprise networking.",
  longBio: "Dynamic and resourceful multipotentialite combining cross-functional expertise spanning responsive frontend designs, robust backend systems, enterprise networking, and automated cloud systems. Thriving at the intersection of beautiful user-facing applications and secure, optimized infrastructure.",
  subBio: "A multi-stack systems architect and developer equipped with specialized credentials in CCNP Enterprise Advanced Routing, PHP/Laravel MVC frameworks, React/TypeScript frontends, and Python data staging. Thrives on engineering complete end-to-end web applications, designing high-throughput REST APIs, and orchestrating secure, high-uptime IT infrastructures.",
  email: "mihjigeorgechaka@gmail.com",
  phone: "+260977572626",
  altPhone: "+260766845885",
  location: "House No. 753, Kalongwezi, Chipata, Zambia"
};

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
  category: "Software" | "Networks" | "Cloud" | "Compliance";
  skills: string[];
}

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: "diploma-computing",
    name: "Diploma in Computing (NCC Level 4, Ofqual-regulated UK)",
    issuer: "National College of IT",
    year: "2018 - 2020",
    url: "https://www.nccedu.com/study-centres/national-college-of-it-skills-centre-lilongwe-nacit/",
    category: "Software",
    skills: ["Databases", "Software Engineering", "Algorithms", "Object-Oriented Programming", "Database Design", "Mathematical Concepts"]
  },
  {
    id: "aspnet-specialization",
    name: "ASP.NET for Experienced Developers Specialization",
    issuer: "Coursera, Board Infinity",
    year: "2023",
    url: "https://coursera.org/verify/specialization/A3CZQBYTBBW8",
    category: "Software",
    skills: ["C# .NET Developers", "ASP.NET Core", "Backend Development", "Microservices & Docker", "DevOps Practices"]
  },
  {
    id: "ccnp-advanced-routing",
    name: "CCNP Enterprise: Advanced Routing",
    issuer: "Cisco Networking Academy",
    year: "2023",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["Complex Routing Configs", "Enterprise Deployments", "Infrastructure Automation", "BGP / OSPF / EIGRP"]
  },
  {
    id: "ccnp-core-networking",
    name: "CCNP Enterprise: Core Networking",
    issuer: "Cisco Networking Academy",
    year: "2023",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["Infrastructure Automation", "QoS", "SD-WAN", "Layer 3 Routing", "Enterprise Networks"]
  },
  {
    id: "software-engineering-coursera",
    name: "Software Engineering Specialization",
    issuer: "Coursera, HKUST",
    year: "2023",
    url: "https://coursera.org/verify/specialization/BFBZGM9TBUM9",
    category: "Software",
    skills: ["Agile Development", "Test-Driven Design (TDD)", "DevOps Workflows", "Scalable Code", "Collaborative Lifecycles"]
  },
  {
    id: "ccna-enterprise-automation",
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    year: "2021",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["Enterprise Routing", "Network Security Protocols", "Foundational Network Automation", "Cisco Switching"]
  },
  {
    id: "ccnav7-switching-routing",
    name: "CCNAv7 Switching, Routing and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    year: "2021",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["LAN/WAN Configs", "VLANs", "Wireless Protocols", "Network Fault Diagnostics"]
  },
  {
    id: "cyber-ops-associate",
    name: "Cyber Ops Associate",
    issuer: "Cisco Networking Academy",
    year: "2021",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["Threat Response & Containment", "Log File Analysis", "SIEM Tools", "SOC Live Incident Handling"]
  },
  {
    id: "network-security-cisco",
    name: "Network Security Certification",
    issuer: "Cisco Networking Academy",
    year: "2021",
    url: "https://www.netacad.com/",
    category: "Networks",
    skills: ["Firewall Implementations", "Virtual Private Networks (VPNs)", "Intrusion Prevention Systems (IPS)"]
  },
  {
    id: "azure-data-engineering",
    name: "Microsoft Azure for Data Engineering",
    issuer: "Coursera, Microsoft",
    year: "2022",
    url: "https://coursera.org/verify/D3F4XCHQ46AP",
    category: "Cloud",
    skills: ["Azure Data Lake", "Azure Data Factory", "Azure Synapse", "ETL Processing", "Cloud Security Best Practices"]
  },
  {
    id: "sysadmin-it-infra",
    name: "System Administration & IT Infrastructure",
    issuer: "Coursera, Google",
    year: "2022",
    url: "https://coursera.org/verify/QWKMTNTL3HEA",
    category: "Compliance",
    skills: ["Linux & Windows Managing", "DNS, DHCP Setup", "Enterprise Networks Diagnostic", "Security Protocols"]
  },
  {
    id: "infosec-auditing",
    name: "Information Systems Auditing, Controls and Assurance",
    issuer: "Coursera, HKUST",
    year: "2022",
    url: "https://coursera.org/verify/JQSKZCHBS2D3",
    category: "Compliance",
    skills: ["System Risk Evaluation", "Internal Controls Auditing", "IT Audit Documentation", "COBIT & Governance"]
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "software-engineering",
    name: "Full-Stack Software Development",
    description: "Engineering responsive web interfaces and resilient multi-stack applications. Expert in React, TypeScript, PHP/Laravel, Python (Django, Flask), and ASP.NET Core.",
    items: ["Modern SPAs (React, TypeScript, Tailwinds)", "PHP Laravel, Symfony & CodeIgniter platforms", "Python web apps & data ingestion pipelines", "Dockerized Container Deployments"]
  },
  {
    id: "databases-apis",
    name: "Databases, APIs & Microservices",
    description: "Architecting high-density data pipelines, relational storage schemas, and integration gateways with extreme indexing precision.",
    items: ["Relational Databases (SQL, MySQL, PostgreSQL)", "NoSQL databases (MongoDB, Redis)", "RESTful API Design & Integration", "Postman validation, GraphQL endpoints"]
  },
  {
    id: "netops-cybersec",
    name: "Enterprise Networking & Cybersecurity",
    description: "Building production Cisco networks, secure VPN tunnels, firewalls, and automated systems configurations with high uptime.",
    items: ["Cisco CCNP Enterprise Routing & Switching", "SD-WAN, Virtual Private Networks (VPNs) & IPsec", "Firewalls & Intrusion Prevention Systems (IPS)", "Network Automation / Infrastructure Automation"]
  }
];

export const DEFAULT_STATS: Stat[] = [
  {
    id: "experience",
    number: "4+ Yrs",
    label: "Continuous Experience",
    description: "Active industry deployment spanning full-stack software, data staging, and compliance tasks."
  },
  {
    id: "code",
    number: "25K+",
    label: "Lines of Backend Code",
    description: "PHP Laravel/Symfony, Python Django, C# .NET Core, and extensive SQL database schemas deployed."
  },
  {
    id: "users",
    number: "200+",
    label: "Platform Users Supported",
    description: "Ensuring zero-downtime, sub-second queries, and stable secure networks for remote agents."
  }
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "good-nature-agro",
    title: "Good Nature Agro",
    role: "Data & Tech Support Associate",
    year: "Jan 2025 - Present",
    description: "Leading tech infrastructure and data integration staging operations. Drives comprehensive database synchronization and software platform support to 200+ platform agents. Collaborates with system developers to conduct integration tests, isolate bugs, validate data for accuracy, coordinate bulk messaging, and sustain IT hardware/software networks across field offices.",
    companyUrl: "https://goodnatureagro.com/",
    image: "/src/assets/images/good_nature_agro_logo_1779790581820.png",
    tagline: "Product testing, staff enablement & user operations pipelines",
    services: ["Software/System Testing", "Data Integrity Auditing", "IT Hardware & Network Maintenance", "Bulk Messaging Campaigns"],
    challenge: "Handling complex system platform rollouts across distributed staff with minimum latency issues, while verifying accuracy for mission-critical reports.",
    solution: "Established structured ticketing pathways, formulated strict data accuracy parameters, and delivered staff training alongside exhaustive operational guides.",
    impact: "Dramatically raised software update adoption rates, cut ticketing resolution times, and secured stable networks across rural field offices.",
    gitLogs: [
      "feat: coordinate bulk messaging & user engagement triggers",
      "test: execute system integration UAT scripts",
      "fix: correct field connectivity routes and network gateways",
      "docs: author automated digital platform training playbook"
    ]
  },
  {
    id: "good-nature-agro-accounts",
    title: "Good Nature Agro",
    role: "Account Associate",
    year: "Jan 2024 - Dec 2024",
    description: "Engineered robust cross-departmental data integrations to support inventory stock reconciliation and high-stakes corporate financial audit reviews. Provided system-operations assistance and maintained transactional control schedules for thousands of dispatched assets.",
    companyUrl: "https://goodnatureagro.com/",
    image: "/src/assets/images/good_nature_agro_logo_1779790581820.png",
    tagline: "Cross-departmental coordinate engines & stock controls",
    services: ["Data System Integrations", "Accounts Reconciliation", "Control Schedules", "BI Farmer Data Verification"],
    challenge: "Fragmented inventory databases made it difficult to synchronize dispatched seed stocks with real-time field admin accounts.",
    solution: "Constructed custom spreadsheet macros, unified reporting schemas, and partnered with the Business Intelligence squad for double-entry ledger audits.",
    impact: "Passed corporate audits with zero stock leaks and maintained precise coordination profiles for all dispatched products.",
    gitLogs: [
      "feat: automate double-entry ledger database imports",
      "refactor: coordinate control schedule reconciliation keys",
      "test: validate BI farmer data pipeline exceptions list",
      "docs: draft standard operating guidelines for stock dispatch"
    ]
  },
  {
    id: "good-nature-agro-finance",
    title: "Good Nature Agro",
    role: "Finance Admin Assistant & FISP Warehouse Manager",
    year: "Jan 2023 - Dec 2023",
    description: "Managed regional financial assets and direct seed stock distribution allocations for hundreds of local farming cooperatives. Conducted rigorous quality control checks on warehouse dispatches and organized secure data archives for external operations audits.",
    companyUrl: "https://goodnatureagro.com/",
    image: "/src/assets/images/good_nature_agro_logo_1779790581820.png",
    tagline: "Warehouse logistics, seed custody & regional asset indexing",
    services: ["Seed Stock Distribution", "Warehouse Management (FISP)", "Data Archiving & Auditing", "Quality Control Inspections"],
    challenge: "Safeguarding massive inventory caches from damage or tracking errors under challenging, high-volume seasonal dispatch peaks.",
    solution: "Introduced meticulous tracking numbers, daily balance audits, and designed optimized digital archiving files.",
    impact: "Successfully distributed peak payloads on time, secured 100% warehouse inventory matching records, and passed every local audit.",
    gitLogs: [
      "feat: design inventory balance checker & log aggregator",
      "security: configure access-control criteria for warehouse terminal",
      "docs: report weekly regional stock distribution analytics"
    ]
  },
  {
    id: "good-nature-agro-intern",
    title: "Good Nature Agro",
    role: "Finance Field Administrator",
    year: "Apr 2022 - Dec 2022",
    description: "Conducted exhaustive data auditing tasks, localized financial evaluations, and flagged accounts discrepancies. Prepared detailed weekly error diagnostic summaries for regional leads and preserved secure archival systems.",
    companyUrl: "https://goodnatureagro.com/",
    image: "/src/assets/images/good_nature_agro_logo_1779790581820.png",
    tagline: "Deep discrepancy diagnostics & archives verification",
    services: ["Discrepancy Troubleshooting", "Weekly Error Reporting", "Files System Administration", "Data Audits"],
    challenge: "Manual ledger errors from remote field admins slowed down critical operational evaluations and financial planning cycles.",
    solution: "Created standardized verification algorithms and automated reports to detect input anomalies in real-time.",
    impact: "Eliminated the historical backlog of unresolved ledger variations and trimmed analysis cycles down to hours.",
    gitLogs: [
      "feat: set up database error scanner formulas",
      "docs: create organized digital registry for easy evaluations"
    ]
  },
  {
    id: "cttbd",
    title: "Center for Ticks & Diseases",
    role: "Software Developer",
    year: "Jun 2020 - Sep 2020",
    description: "Designed, coded, and implemented a high-performance backend C# application specifically for institutional livestock vaccine preservation management. Conducted rigorous unit testing, UAT scripts, and drafted extensive system blueprints.",
    companyUrl: "https://www.cttbd.org/en/",
    image: "/src/assets/images/cttbd_science_logo_1779790602201.png",
    tagline: "C# backend core for public health logistics & testing",
    services: ["C# Backend Apps", "Unit Testing (UAT)", "Software Architecture Planning", "Bug Troubleshooting"],
    challenge: "Manual tracking led to cold storage threshold breaches and vaccine batch failures across remote laboratories.",
    solution: "Engineered an object-oriented desktop application featuring state management triggers, active stock validation guards, and a secure local database.",
    impact: "Created stable, verifiable cold-chain temperature and inventory records, passing strict scientific stakeholder tests.",
    gitLogs: [
      "feat: construct cold-chain safety validation core in C#",
      "test: write extensive mock tests for vaccination logs",
      "release: deploy stable compiled executable v1.0.0"
    ]
  },
  {
    id: "chipata-hospital",
    title: "Chipata General Hospital ART Clinic",
    role: "Data Entry Clerk",
    year: "Mar 2019 - May 2019",
    description: "Managed highly sensitive medical database systems (SmartCare HMIS). Maintained strict patient confidentiality procedures and assisted the local network administrator in executing critical daily data backups.",
    companyUrl: "https://www.moh.gov.zm/?page_id=6504",
    image: "/src/assets/images/chipata_hospital_logo_1779790619485.png",
    tagline: "Strict medical registry integrity & server backup operations",
    services: ["SmartCare HMIS Care Systems", "Confidential Database Administration", "System Data Backups", "Infrastructure Triage"],
    challenge: "Frequent power variations and older hardware posed direct risks to patient record stability and file safety.",
    solution: "Implemented automated off-peak backup tasks, clean indexing parameters, and optimized clinic terminals.",
    impact: "Guaranteed 100% record security with zero data losses during system outages, enabling continuous critical healthcare operations.",
    gitLogs: [
      "sysadmin: configure automatic off-peak database dump script",
      "security: harden patient SmartCare access control policies"
    ]
  },
  {
    id: "impact-enterprises",
    title: "Impact Enterprises",
    role: "IT Data Specialist",
    year: "Feb 2015 - Aug 2016",
    description: "Successfully processed high-volume digital cleansing and data validation lists to support international campaigns. Developed reliable validation methods and automated lead generation verifications.",
    companyUrl: "https://www.impactenterprises.org/",
    image: "/src/assets/images/impact_enterprises_logo_1779790637488.png",
    tagline: "High-volume data cleansing & structured pipeline testing",
    services: ["Large Dataset Filtering", "Cleansing Automations", "Lead Validation Checkpoints", "Data Best Practices"],
    challenge: "Incoming datasets had high bounce coordinates and corrupted metadata, risking client project outreach success.",
    solution: "Set up master data pipeline checkers and custom filtering schemas to isolate low-accuracy inputs.",
    impact: "Delivered highly optimized lead sets, resulting in high client retention ratios and successful international campaigns.",
    gitLogs: [
      "feat: automate dirty data parser filtering regex",
      "docs: document standardized QA data ingestion rules"
    ]
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Dr. Fredah Banda",
    title: "Software Engineering Manager @ Good Nature Agro",
    comment: "Mihji possesses stellar developer intuition and a strict commitment to system stability. He bridges the gap perfectly between high-volume operational field data and programmatic logic. His automated pipelines and code validation metrics have significantly streamlined our product environments."
  },
  {
    id: "2",
    author: "Mr. Mathews Banda",
    title: "Lead Systems Operations @ Good Nature Agro",
    comment: "Whether tracking network bottlenecks, configuring complex VLAN routing, or managing SQL warehouses under pressure, Mihji delivers flawless execution. His technical insight kept our user systems on active status with remarkable consistency."
  },
  {
    id: "3",
    author: "Mr. Peter Mfune",
    title: "Human Resource Manager @ Impact Enterprises",
    comment: "Mihji brought incredible precision to our data scrubbing and processing services. His systematic approaches to automating data quality validation raised the bar for our entire department and helped secure key international client accounts."
  }
];

// Desktop Portfolio URL (Change this to your actual desktop-like portfolio link when ready)
export const DESKTOP_PORTFOLIO_URL = "https://github.com/mihjichaka";

export const SOCIALS: SocialLink[] = [
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/mihji-george-chaka-72a8a1221/", label: "li" },
  { id: "github", name: "Hub", url: "https://github.com/mihjichaka", label: "git" },
  { id: "email", name: "Email Address", url: "mailto:mihjigeorgechaka@gmail.com", label: "dev" }
];

export const CHANNELS: ContactChannel[] = [
  { id: "phone", name: "Phone (Primary)", url: "tel:+260977572626", label: "+260 977 572 626" },
  { id: "alt-phone", name: "Phone (Secondary)", url: "tel:+260766845885", label: "+260 766 845 885" }
];
