/**
 * Shared data store for the portfolio site.
 * All agents should import from here for consistent data access.
 * Uses localStorage for persistence (no backend needed for class project).
 */

const STORAGE_KEY = 'portfolio_site_data_v5';

const DEFAULT_DATA = {
  resume: {
    name: 'Santiago de Grandchant',
    title: 'Computer Science @ Georgia Tech',
    email: 'sgrandchant3@gatech.edu',
    phone: '+1 (404) 820-4649',
    location: 'Atlanta, GA',
    linkedin: 'https://www.linkedin.com/in/sgrandchant',
    github: 'https://www.github.com/sgrandchant1',
    summary: 'Computer Science student at Georgia Tech with concentrations in Intelligence and Information Internetworks. Experienced in building production AI systems, full-stack applications, and data pipelines  - from a patented developer tool at Bank of America to AI consulting for Latin American insurance and healthcare companies. Passionate about leveraging machine learning and natural language processing to solve real-world problems at scale. Outside of academics, I enjoy contributing to campus organizations like SHPE and the Big Data Club, where I collaborate with peers on projects that bridge technology and community impact.',
    education: [
      {
        id: 'edu-1',
        school: 'Georgia Institute of Technology',
        degree: 'Bachelor of Science in Computer Science',
        concentrations: 'Intelligence and Information Internetworks',
        dates: '2022 – May 2026 (Expected)',
        gpa: '3.8',
        coursework: 'Machine Learning, Natural Language Processing, Intro to AI, Perception and Robotics, Analysis and Design of Algorithms, Object and System Design, Databases, Systems and Networks, Computer Networks',
        clubs: 'SHPE, ALPHA, Big Data Club, Google Developer Student Club, Create-X: Startup Idea to Prototype',
        visible: true,
      },
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Bank of America',
        role: 'Software Engineer',
        location: 'New York City, NY',
        dates: 'Jun – Aug 2025',
        logo: '/logos/bank-of-america.webp',
        bullets: [
          'Invented and patented "disp," a Python tool that accelerated log analysis and reduced the learning curve for a 23-member team, cutting investigative time from minutes to seconds and becoming the default solution for the team',
          'Standardized sensitive data sharing by creating an IP blur tool that reduced ramp-up time for new engineers from learning 13 commands to executing one line, ensuring vendor-ready packages within seconds',
          'Saved the bank ~$200K annually by implementing an AES-based credit card tokenize/detokenize engine, allowing compliant tokenization during inserts and secure detokenization during reads',
        ],
        visible: true,
      },
      {
        id: 'exp-2',
        company: 'Mojix',
        role: 'Artificial Intelligence Intern',
        location: 'Boca Raton, FL',
        dates: 'Jun – Aug 2024',
        logo: '/logos/mojix.png',
        bullets: [
          'Prototyped product authenticity verifier using Vertex AI endpoints to distinguish real from counterfeit products by converting images into embeddings, using the cosine similarity function to cross reference distinguishing features',
          'Achieved a correct diagnostic for 88% of the simulated tests, beating the average human score by 13%',
          'Built a chatbot for querying consumer datasets using LangChain to classify questions and inject task specific prompts to Gemini\'s API, transforming natural language into SQL and eliminating the need for code',
          'Engineered data pipeline using the GCP ecosystem for seamless biweekly model retraining after more data became available, which facilitated management, scalability, and eliminated manual work',
        ],
        visible: true,
      },
      {
        id: 'exp-3',
        company: 'Banco Mercantil Santa Cruz',
        role: 'AI Engineering Intern',
        location: 'La Paz, Bolivia',
        dates: 'May – Jun 2024',
        logo: '/logos/bmsc-appicon.png',
        bullets: [
          'Engineered "Marce," an AI-powered customer service chatbot with 83 banking intent categories using a custom PyTorch neural network and OpenAI GPT-3.5-turbo integration for dynamic SQL query generation',
          'Optimized Spanish-language NLP pipeline with custom tokenization and stemming to handle regional linguistic variations, achieving 70%+ confidence accuracy with built-in feedback learning',
          'Structured comprehensive banking knowledge base covering authentication, transactions, security, and troubleshooting across BMSC\'s full service portfolio',
        ],
        visible: true,
      },
    ],
    skills: {
      languages: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML/CSS', 'SQL', 'Swift', 'Typescript', 'Linux', 'Rust'],
      frameworks: ['React.js', 'Flask', 'Pandas', 'Sci-kit Learn', 'PyTorch', 'matplotlib', 'LangChain', 'seaborn'],
      tools: ['Docker', 'PostgreSQL', 'Git', 'GitHub', 'OpenAPI', 'Google Cloud Platform', 'Figma', 'Claude Code'],
      databases: ['MongoDB', 'MySQL', 'BigQuery', 'Firebase', 'Relational Databases', 'Non-Relational Databases'],
    },
    sections: {
      education: { visible: true },
      experience: { visible: true },
      skills: { visible: true },
      projects: { visible: true },
    },
  },
  projects: [
    {
      id: 'proj-1',
      title: 'FarmaciaDigital Bolivia',
      slug: 'farmacia-digital',
      dates: '2026 – Present',
      role: 'Full-Stack Developer & Founder',
      shortDescription: 'Driving down pharmaceutical costs in Bolivia by giving consumers transparent, real-time price comparison across pharmacies nationwide. As the sole full-stack developer, I built a platform covering 10,000+ products with a 3-layer comparison engine spanning 70% of the Bolivian market  - featuring personalized portals with allergy/condition filtering, WhatsApp integration, and flexible search by molecule, brand, symptom, or plain language.',
      fullDescription: 'In Bolivia, medication prices can vary dramatically from one pharmacy to the next  - yet consumers have no easy way to compare before they buy. FarmaciaDigital was built to solve this problem. The platform aggregates real-time pricing data from pharmacies across Bolivia and presents it through an intuitive comparison interface, empowering patients and families to find the most affordable option for the medicines they need. By bringing transparency to a historically opaque market, FarmaciaDigital helps reduce healthcare costs for everyday Bolivians  - making essential medications more accessible regardless of income. The platform uses automated data collection pipelines and intelligent fuzzy matching algorithms to accurately pair identical products across pharmacies that use completely different naming conventions, ensuring reliable comparisons even across fragmented data sources.',
      techStack: ['FastAPI', 'Python', 'Firebase', 'Selenium', 'BeautifulSoup', 'Jinja2', 'Bootstrap', 'Docker', 'Google Gemini API', 'Leaflet.js'],
      features: [
        'Real-time price comparison across 70% of the Bolivian market with 10,000+ products and a 3-layer comparison engine',
        'Personalized portals with allergy and condition filtering for safe medication recommendations',
        'WhatsApp integration for convenient price lookups and medication reminders',
        'Flexible search by molecule, brand, symptom, or plain-language queries',
        'Interactive pharmacy locator map to find the nearest branch with the best price',
        'Automated data collection pipelines that keep pricing data fresh daily',
        'REST API with Swagger documentation for third-party integrations',
        'Admin dashboard with analytics, promotions, and content management',
      ],
      liveUrl: 'https://farmacia-digital.onrender.com',
      repoUrl: 'https://github.com/sgrandchant1/farmacia_digital',
      image: '/screenshots/farmacia-digital.png',
      screenshotPlaceholder: false,
      visible: true,
    },
    {
      id: 'proj-insure-u',
      title: 'Insure-U',
      slug: 'insure-u',
      dates: 'Jan – May 2025',
      role: 'Machine Learning Engineer',
      shortDescription: 'A proprietary insurance premium model that dynamically adjusts pricing using advanced risk segmentation and statistical estimation for Latin American markets. As the ML engineer, I applied HDBSCAN clustering, GLMs, and Gradient Boosted Machines in Python and Scikit-Learn  - reducing model loss by 12% over baseline and delivering a production-ready pricing engine for a Latin American insurer.',
      fullDescription: 'Insurance pricing in Latin American countries is often static and fails to account for individual risk profiles, leading to overpriced premiums for low-risk customers and underpriced ones for high-risk individuals. Insure-U solves this by leveraging historical, demographic, and personal claims data to dynamically adjust premiums according to each customer\'s selected price range. The system employs HDBSCAN for advanced risk segmentation  - grouping policyholders into meaningful clusters without requiring a predefined number of categories  - and Generalized Linear Models (GLMs) for precise estimation of claim frequency and severity. A Gradient Boosted Machine (GBM) further refines variable weighting, minimizing model loss by 12% over baseline approaches.',
      techStack: ['Python', 'Scikit-Learn', 'HDBSCAN', 'XGBoost', 'Pandas', 'GLMs'],
      features: [
        'Architected proprietary insurance premium model leveraging historical, demographic, and personal claims data to dynamically adjust premiums according to customers\' selected price ranges, employing HDBSCAN for advanced risk segmentation and GLMs for precise estimation of claim frequency and severity in Latin American countries',
        'Optimized the integration of a GBM to refine variable weighting and minimized loss of model by 12%',
      ],
      liveUrl: '',
      repoUrl: '',
      image: '/screenshots/insure-u.png',
      screenshotPlaceholder: false,
      demoVideo: '/screenshots/insure-u-demo.mp4',
      visible: true,
    },
    {
      id: 'proj-2',
      title: 'La Boliviana Ciacruz de Seguros',
      slug: 'lbc-rag-chat',
      dates: '2025 – Present',
      role: 'AI Consultant',
      shortDescription: 'Transforming how insurance professionals access policy knowledge  - instant, AI-grounded answers from thousands of pages of internal documents. As the AI engineer and consultant, I applied RAG architecture, Google Vertex AI, and semantic chunking with React and TypeScript  - cutting information lookup time from 2+ hours to seconds for the sales team.',
      fullDescription: 'Built as an AI consulting engagement for La Boliviana Ciacruz de Seguros, this production-grade RAG engine cut information lookup time for the sales team from 2+ hours to seconds. The system uses semantic document chunking to break thousands of pages of insurance policies and manuals into context-aware segments, then retrieves and synthesizes the most relevant passages in real time with full source citations and confidence scores. A translator agent converts non-expert queries into domain-specific insurance language, dramatically improving retrieval quality for agents without technical backgrounds. Google Document AI OCR integration enhances document parsing for scanned PDFs and handwritten forms. The platform reduced senior staff workload by autonomously resolving low-impact, high-frequency questions from agents, while giving stakeholders a comprehensive analytics dashboard to review every question, track usage patterns, and monitor response quality.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Vertex AI', 'Firebase', 'Firestore', 'Google Cloud Storage', 'Google Document AI', 'Vite'],
      features: [
        'Built a production-grade RAG engine for the sales team, cutting information lookup time from 2+ hours to seconds',
        'Reduced senior staff workload by autonomously resolving low-impact, high-frequency questions from agents',
        'Installed a translator agent that converts non-expert queries into domain-specific language to improve answer quality',
        'Integrated Google Document AI OCR to enhance document parsing and chunking for more accurate LLM retrieval',
        'Stakeholder dashboard to review all employee queries, usage metrics, and response quality',
        'CSV export of conversation history for compliance, training, and analytics',
      ],
      liveUrl: '',
      repoUrl: '',
      image: '',
      screenshotPlaceholder: true,
      visible: true,
    },
    {
      id: 'proj-gt-marketplace',
      title: 'GT Marketplace',
      slug: 'gt-marketplace',
      dates: 'May 2025',
      role: 'Mobile Developer',
      shortDescription: 'A Tinder-style mobile marketplace exclusively for Georgia Tech students  - swipe to discover, bid with credits, and chat to close the deal. As the mobile developer, I applied React Native, Expo, and gesture-based UI design to build a fully functional offline-first marketplace app with camera integration, real-time chat, and a credit-based bidding system.',
      fullDescription: 'GT Marketplace reimagines campus commerce by combining the familiar swipe-based discovery of dating apps with practical marketplace functionality. Built exclusively for Georgia Tech students (verified via @gatech.edu email), the React Native app lets users browse listings through an intuitive card interface  - swipe right to bid, left to skip. A credit-based economy gamifies the experience: new users receive 10 free credits to place bids, encouraging participation while keeping the trading environment fair. The app features integrated camera capture for listing photos, advanced filtering across 20+ product categories, real-time messaging between buyers and sellers, and full local data persistence through AsyncStorage for an offline-first experience.',
      techStack: ['React Native', 'Expo', 'AsyncStorage', 'NativeWind', 'Expo Camera', 'JavaScript'],
      features: [
        'Tinder-style swipe interface powered by PanResponder with smooth animated gestures',
        'Credit-based bidding system with gamified economy',
        'Georgia Tech email verification for exclusive campus community',
        'Integrated camera capture supporting up to 5 photos per listing',
        'Advanced filtering by category, condition, and price range',
        'Real-time chat between buyers and sellers after bid acceptance',
        'Offline-first architecture with AsyncStorage persistence',
        'Five-tab navigation: Browse, Bids, Add Listing, My Listings, Chat',
      ],
      liveUrl: '',
      repoUrl: '',
      image: '/logos/gt-marketplace.png',
      screenshotPlaceholder: false,
      demoVideo: '/screenshots/gt-marketplace-demo.mov',
      visible: true,
    },
  ],
  admin: {
    password: 'admin123', // Simple password for class project  - NOT production-safe
    isLoggedIn: false,
  },
};

/** Load all site data from localStorage, falling back to defaults.
 *  Merges top-level resume fields from defaults so new fields (e.g. linkedin)
 *  always appear even when localStorage has older data. */
export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Merge default resume scalar fields into stored data so newly-added
      // fields like linkedin/github are always present
      const defaults = DEFAULT_DATA.resume;
      for (const key of Object.keys(defaults)) {
        if (!(key in data.resume)) {
          data.resume[key] = defaults[key];
        }
      }
      return data;
    }
  } catch (e) {
    console.warn('Failed to load stored data, using defaults', e);
  }
  return structuredClone(DEFAULT_DATA);
}

/** Save entire site data to localStorage */
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save data', e);
  }
}

/** Update a nested section and persist */
export function updateSection(sectionPath, value) {
  const data = loadData();
  const keys = sectionPath.split('.');
  let obj = data;
  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
  saveData(data);
  return data;
}

/** Reset all data to defaults */
export function resetData() {
  const data = structuredClone(DEFAULT_DATA);
  saveData(data);
  return data;
}

/** Generate a unique ID */
export function generateId(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export { DEFAULT_DATA };
