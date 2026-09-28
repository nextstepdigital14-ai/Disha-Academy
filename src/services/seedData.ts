import { SiteSettings, Course, NoteItem, Question, TestItem, Announcement, Testimonial } from '../types';

export const initialSettings: SiteSettings = {
  academyName: "Disha Academy & Olympiad School",
  tagline: "Your Journey to CET, JEE & NEET Success Starts Here",
  heroSubtitle: "Comprehensive classroom coaching, rigorous chapter-wise tests, expert doubt resolution, and personalized mentorship in Kolhapur.",
  address: "Plot No. 4, Radhanagari Road, Behind Bank of Maharashtra, Sane Guruji Vasahat, Kanerkar Nagar, Kolhapur, Maharashtra 416011",
  googleMapsUrl: "https://maps.app.goo.gl/txmmyLExVxMXhjzbA?g_st=ac",
  phone: "+91 9028321505",
  whatsappNumber: "919028321505",
  email: "dishaacademykolhapur@gmail.com",
  officeTimings: "Mon - Sat: 8:00 AM - 8:30 PM | Sun: 9:00 AM - 2:00 PM",
  announcementTicker: "⚡ Admissions Open for 2026-27 Batches (11th, 12th & Droppers) for MHT-CET, JEE & NEET. Limited seats per batch for personal mentoring!",
  isTickerActive: true,
  facultyList: [
    {
      id: "fac-1",
      name: "Prof. S. R. Patil",
      role: "Head of Physics Department",
      subject: "Physics",
      experience: "14+ Years",
      qualification: "M.Sc. Physics (Gold Medalist), NET Qualified",
      bio: "Specializes in simplifying Mechanics, Electrodynamics, and Modern Physics for CET and JEE aspirants."
    },
    {
      id: "fac-2",
      name: "Dr. A. V. Kulkarni",
      role: "Senior Chemistry Faculty",
      subject: "Chemistry",
      experience: "16+ Years",
      qualification: "Ph.D. in Organic Chemistry",
      bio: "Expert in Organic Reaction Mechanisms and Physical Chemistry numerical techniques."
    },
    {
      id: "fac-3",
      name: "Prof. M. B. Joshi",
      role: "Head of Mathematics",
      subject: "Mathematics",
      experience: "12+ Years",
      qualification: "M.Sc. Applied Mathematics",
      bio: "Known for quick shortcut methods, Coordinate Geometry, and Calculus mastery for JEE & CET."
    },
    {
      id: "fac-4",
      name: "Dr. P. S. Deshmukh",
      role: "Chief Biology Mentor",
      subject: "Biology",
      experience: "15+ Years",
      qualification: "MBBS / M.Sc. Life Sciences",
      bio: "Line-by-line NCERT specialist with high conversion rates for NEET aspirants in Botany and Zoology."
    }
  ],
  galleryImages: [
    {
      id: "gal-1",
      title: "Interactive Classroom Session",
      category: "Classroom",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      description: "Smart classroom lectures with multimedia projections and interactive problem solving."
    },
    {
      id: "gal-2",
      title: "Physics & Chemistry Demonstration Lab",
      category: "Lab",
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      description: "Hands-on conceptual demonstrations helping students visualize abstract physical concepts."
    },
    {
      id: "gal-3",
      title: "Dedicated Study & Doubt-Solving Hall",
      category: "Campus",
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      description: "Distraction-free environment with faculty available for one-on-one doubt solving."
    },
    {
      id: "gal-4",
      title: "Olympiad & Foundation Workshop",
      category: "Olympiad",
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      description: "Specialized training for junior science and mathematical Olympiad competitions."
    },
    {
      id: "gal-5",
      title: "Weekly Mock Test Examination",
      category: "Events",
      url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      description: "Simulated exam conditions following the exact NTA and State CET cell patterns."
    },
    {
      id: "gal-6",
      title: "Parent & Teacher Guidance Seminar",
      category: "Events",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
      description: "Periodic counseling sessions to track student mental wellness and performance."
    }
  ]
};

export const initialCourses: Course[] = [
  {
    id: "course-mht-cet",
    slug: "mht-cet",
    name: "MHT-CET Comprehensive Program",
    badge: "Most Popular in Maharashtra",
    shortDesc: "Targeted coaching for Maharashtra State Board syllabus (11th + 12th) with rapid problem-solving drills.",
    fullDesc: "Our MHT-CET program is meticulously crafted to help students secure top percentiles in PCM (Engineering/Pharmacy) and PCB (Pharmacy/Agriculture). We emphasize State Board textbook thoroughness, speed-building tricks, and full-length simulated CBTs.",
    targetAudience: "Class 11, Class 12, and Droppers aiming for COEP, VJTI, ICT, SPIT, and top engineering/pharmacy colleges in Maharashtra.",
    duration: "1 Year / 2 Years Integrated",
    eligibility: "Students appearing for or passed Class 10/11 Board exams with Science stream.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    features: [
      "100% coverage of Maharashtra Board 11th (20%) & 12th (80%) syllabus",
      "Shortcut techniques & time-management strategies for 90-second questions",
      "Chapter-wise question banks with 15+ years Maharashtra CET PYQs",
      "Bi-weekly Computer Based Tests (CBT) matching State CET cell UI",
      "Daily 1-on-1 doubt solving sessions with senior mentors",
      "Regular parent counseling and detailed score card analysis"
    ],
    examPattern: {
      format: "Computer-Based Online Test (CBT)",
      totalMarks: 200,
      markingScheme: "Math: +2 per question | Physics/Chem/Bio: +1 per question",
      negativeMarking: "No negative marking",
      duration: "180 minutes (90 mins PCM Paper 1 & 2 / PCB Paper 1 & 3)"
    },
    batches: [
      {
        id: "batch-cet-1",
        name: "Morning CET Ranker Batch (12th + CET)",
        timing: "07:30 AM - 11:30 AM",
        startDate: "15 April 2026",
        seatsTotal: 40,
        seatsAvailable: 12,
        mode: "Offline Classroom"
      },
      {
        id: "batch-cet-2",
        name: "Evening CET Foundation Batch (11th)",
        timing: "04:30 PM - 08:00 PM",
        startDate: "02 May 2026",
        seatsTotal: 40,
        seatsAvailable: 19,
        mode: "Offline Classroom"
      },
      {
        id: "batch-cet-3",
        name: "CET Repeater / Crash Batch",
        timing: "10:00 AM - 03:00 PM",
        startDate: "01 June 2026",
        seatsTotal: 35,
        seatsAvailable: 14,
        mode: "Offline Classroom"
      }
    ],
    feeStructure: {
      tuitionFee: "₹45,000 - ₹75,000 / year (Editable in Admin)",
      registrationFee: "₹5,000 (included in total)",
      installments: "Flexible 3-stage installment options available",
      scholarshipInfo: "Up to 50% merit scholarships through Disha Talent Search Exam (DTSE)"
    },
    syllabusOverview: [
      {
        subject: "Physics",
        chapters: [
          "Rotational Dynamics", "Mechanical Properties of Fluids", "Kinetic Theory & Thermodynamics",
          "Oscillations & Wave Optics", "Electrostatics & Current Electricity", "Magnetic Effects & EMI",
          "AC Circuits & Modern Physics", "Semiconductors & Logic Gates"
        ]
      },
      {
        subject: "Chemistry",
        chapters: [
          "Solid State & Solutions", "Ionic Equilibria & Thermodynamics", "Electrochemistry & Kinetics",
          "p-Block, d-Block & f-Block Elements", "Coordination Compounds", "Halogen Derivatives & Alcohols",
          "Aldehydes, Ketones & Carboxylic Acids", "Biomolecules & Polymers"
        ]
      },
      {
        subject: "Mathematics",
        chapters: [
          "Mathematical Logic & Matrices", "Trigonometric Functions & Vectors", "3D Geometry & Linear Programming",
          "Differentiation & Applications of Derivatives", "Definite & Indefinite Integration",
          "Differential Equations", "Probability Distribution & Binomial Distribution"
        ]
      },
      {
        subject: "Biology",
        chapters: [
          "Reproduction in Plants and Animals", "Genetics & Inheritance", "Molecular Basis of Inheritance",
          "Human Health and Diseases", "Biotechnology & Its Applications", "Ecosystem & Biodiversity Conservation"
        ]
      }
    ],
    faqs: [
      {
        question: "Is MHT-CET coaching sufficient for State Board exams too?",
        answer: "Yes, our curriculum seamlessly integrates Board theory with CET objective drills so students excel in both HSC Board exams and MHT-CET."
      },
      {
        question: "How many mock tests are included in the CET series?",
        answer: "Students undertake 30+ chapter tests, 10 unit tests, and 20 full-length simulated CBTs with rank analysis."
      },
      {
        question: "Is study material provided or do we need to buy books?",
        answer: "Comprehensive printed theory modules, question banks, and access to online PDF notes and test series are provided."
      }
    ],
    isPublished: true
  },
  {
    id: "course-jee",
    slug: "jee",
    name: "JEE (Main & Advanced) Elite Program",
    badge: "Premier Engineering Track",
    shortDesc: "Rigorous analytical problem-solving and conceptual depth for IITs, NITs, and top technological institutes.",
    fullDesc: "Our JEE Main & Advanced program builds rock-solid conceptual foundations in Physics, Chemistry, and Mathematics. Focus is given to multi-concept problems, graphical interpretation, and advanced level problem synthesis.",
    targetAudience: "Students targeting IITs, NITs, IIITs, BITS, and premier central institutes.",
    duration: "2-Year Integrated (11th + 12th) / 1-Year Droppers",
    eligibility: "Science stream with PCM, strong curiosity and dedication for mathematics and sciences.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    features: [
      "In-depth concept building from fundamental laws to advanced problem analysis",
      "Special focus on multi-concept questions asked in JEE Advanced",
      "Weekly All-India simulated JEE testing with detailed question-level time analytics",
      "Specialized numerical response and matrix-match problem practice",
      "Regular personal mentoring sessions by veteran JEE educators",
      "Exclusive revision bootcamps before January & April sessions"
    ],
    examPattern: {
      format: "Computer-Based Test (CBT by NTA)",
      totalMarks: 300,
      markingScheme: "+4 for correct response, -1 for incorrect response",
      negativeMarking: "-1 mark deduction for wrong answers",
      duration: "180 minutes"
    },
    batches: [
      {
        id: "batch-jee-1",
        name: "Super 30 JEE Main & Advanced (Class 11th)",
        timing: "08:00 AM - 01:30 PM",
        startDate: "20 April 2026",
        seatsTotal: 30,
        seatsAvailable: 8,
        mode: "Offline Classroom"
      },
      {
        id: "batch-jee-2",
        name: "JEE Main Booster Batch (Class 12th)",
        timing: "03:30 PM - 08:00 PM",
        startDate: "10 April 2026",
        seatsTotal: 35,
        seatsAvailable: 11,
        mode: "Offline Classroom"
      },
      {
        id: "batch-jee-3",
        name: "JEE Dropper / Repeater Achievers",
        timing: "09:00 AM - 04:00 PM",
        startDate: "15 June 2026",
        seatsTotal: 30,
        seatsAvailable: 15,
        mode: "Offline Classroom"
      }
    ],
    feeStructure: {
      tuitionFee: "₹65,000 - ₹95,000 / year (Editable in Admin)",
      registrationFee: "₹5,000",
      installments: "Quarterly installment plans available",
      scholarshipInfo: "Up to 75% fee concession based on DTSE rank and 10th Board percentage"
    },
    syllabusOverview: [
      {
        subject: "Physics",
        chapters: [
          "Kinematics & Newton's Laws of Motion", "Work, Power & Energy", "Rotational Dynamics & Gravitation",
          "Thermodynamics & Kinetic Theory", "Electrostatics, Capacitors & Current",
          "Magnetism, EMI & AC Circuits", "Optics (Ray & Wave)", "Modern Physics & Nuclear Physics"
        ]
      },
      {
        subject: "Chemistry",
        chapters: [
          "Mole Concept & Atomic Structure", "Periodic Properties & Chemical Bonding",
          "Thermodynamics, Thermochemistry & Equilibrium", "Coordination Chemistry & Metallurgy",
          "Hydrocarbons, Haloalkanes & Carbonyl Compounds", "Polymers, Biomolecules & Practical Chemistry"
        ]
      },
      {
        subject: "Mathematics",
        chapters: [
          "Complex Numbers, Quadratic Equations & Sequences", "Binomial Theorem & Permutation/Combination",
          "Coordinate Geometry (Circles, Parabola, Ellipse, Hyperbola)", "Limits, Continuity & Differentiability",
          "Integral Calculus & Area Under Curves", "Vectors & 3D Geometry", "Matrices & Determinants"
        ]
      }
    ],
    faqs: [
      {
        question: "How do you prepare students for the JEE Advanced format?",
        answer: "Alongside JEE Main preparation, we conduct dedicated JEE Advanced workshops covering multi-correct, integer-type, and paragraph-based questions."
      },
      {
        question: "What is the batch size for JEE?",
        answer: "We strictly limit JEE batches to 30-35 students to guarantee individual attention and customized doubt clearance."
      }
    ],
    isPublished: true
  },
  {
    id: "course-neet",
    slug: "neet",
    name: "NEET-UG Medical Pinnacle Program",
    badge: "Dedicated Medical Track",
    shortDesc: "Thorough NCERT-centric coaching with high-speed memory retention drills for MBBS & BDS aspirants.",
    fullDesc: "Our NEET-UG Pinnacle program offers systematic mastery of Physics, Chemistry, and Biology (Botany & Zoology). With rigorous NCERT line-by-line analyses, diagram drills, and speed-oriented tests, we train students to target 650+ marks.",
    targetAudience: "Students aspiring for top Government Medical Colleges (AIIMS, GMCs, KEM, BJMC, etc.).",
    duration: "2-Year Integrated / 1-Year Repeater Batch",
    eligibility: "Science stream with PCB, minimum 50% in Class 10/11.",
    subjects: ["Physics", "Chemistry", "Biology"],
    features: [
      "Exhaustive line-by-line NCERT decoding for Botany & Zoology",
      "Special numerical problem-solving sessions tailored for NEET Physics",
      "Over 10,000+ NCERT-based MCQs practiced across the academic year",
      "OMR-sheet physical testing + online CBT practice for exam temperament",
      "One-on-one mentor allocation to track score progression and study habits",
      "Special revision modules on high-weightage chapters and previous 20 years questions"
    ],
    examPattern: {
      format: "Pen and Paper OMR / Online Practice Simulation",
      totalMarks: 720,
      markingScheme: "+4 for each correct answer, -1 for each incorrect answer",
      negativeMarking: "-1 mark deducted per incorrect response",
      duration: "200 minutes (3 hours 20 minutes)"
    },
    batches: [
      {
        id: "batch-neet-1",
        name: "NEET Aspirants Batch (Class 11th)",
        timing: "08:00 AM - 01:30 PM",
        startDate: "25 April 2026",
        seatsTotal: 35,
        seatsAvailable: 9,
        mode: "Offline Classroom"
      },
      {
        id: "batch-neet-2",
        name: "NEET Target Batch (Class 12th)",
        timing: "02:30 PM - 07:30 PM",
        startDate: "15 April 2026",
        seatsTotal: 35,
        seatsAvailable: 7,
        mode: "Offline Classroom"
      },
      {
        id: "batch-neet-3",
        name: "NEET Droppers / Repeaters Intensive",
        timing: "09:00 AM - 04:30 PM",
        startDate: "05 June 2026",
        seatsTotal: 35,
        seatsAvailable: 12,
        mode: "Offline Classroom"
      }
    ],
    feeStructure: {
      tuitionFee: "₹60,000 - ₹90,000 / year (Editable in Admin)",
      registrationFee: "₹5,000",
      installments: "3 convenient installment options",
      scholarshipInfo: "Merit concessions available through Disha Scholarship Test"
    },
    syllabusOverview: [
      {
        subject: "Biology",
        chapters: [
          "Diversity in Living World & Biological Classification", "Structural Organisation in Animals & Plants",
          "Cell: Structure and Functions & Cell Cycle", "Plant Physiology (Photosynthesis, Respiration)",
          "Human Physiology (Digestion, Circulation, Nervous System)", "Reproduction & Sexual Reproduction in Flowering Plants",
          "Genetics and Molecular Biology", "Biotechnology & Ecology / Environmental Biology"
        ]
      },
      {
        subject: "Physics",
        chapters: [
          "Units and Measurements & Motion in 1D/2D", "Laws of Motion & Work-Energy-Power",
          "Thermodynamics & Kinetic Theory of Gases", "Oscillations and Waves",
          "Electrostatics, Current & Circuits", "Magnetic Effects of Current & EMI",
          "Ray Optics and Optical Instruments", "Dual Nature of Matter & Atoms/Nuclei"
        ]
      },
      {
        subject: "Chemistry",
        chapters: [
          "Structure of Atom & Chemical Bonding", "States of Matter & Thermodynamics",
          "Equilibrium & Redox Reactions", "Coordination Chemistry & d-block Elements",
          "Organic Chemistry: Some Basic Principles & Techniques", "Hydrocarbons, Haloalkanes & Biomolecules"
        ]
      }
    ],
    faqs: [
      {
        question: "How do you help NEET students master Physics numericals?",
        answer: "We offer special Physics problem-solving workshops focused on dimensional analysis, shortcut formulas, and recurring NEET question archetypes."
      },
      {
        question: "Are tests conducted on physical OMR sheets?",
        answer: "Yes, regular weekly tests are conducted on actual OMR sheets so students avoid bubbling mistakes and develop rapid exam pace."
      }
    ],
    isPublished: true
  }
];

export const initialNotes: NoteItem[] = [
  {
    id: "note-1",
    title: "Rotational Dynamics - Comprehensive Formula Sheet & Derivations",
    description: "Detailed summary of moment of inertia, angular momentum conservation, rolling motion, and conical pendulum with CET/JEE formulas.",
    course: "MHT-CET",
    classLevel: "12th",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Moment of Inertia & Rolling Motion",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Rotational_Dynamics_Formula_Sheet_Disha.pdf",
    fileSize: "2.4 MB",
    fileType: "pdf",
    uploadedAt: "2026-08-15",
    uploadedBy: "Prof. S. R. Patil",
    isPublished: true,
    downloadCount: 142,
    isDemo: true
  },
  {
    id: "note-2",
    title: "Electrostatics & Capacitance - Core Concepts & PYQs",
    description: "Gauss Law applications, electric potential, dielectric slabs in capacitors, and shortcut methods for circuit reduction.",
    course: "JEE",
    classLevel: "12th",
    subject: "Physics",
    chapter: "Electrostatics",
    topic: "Capacitance & Dielectrics",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Electrostatics_Capacitance_JEE_Main.pdf",
    fileSize: "3.8 MB",
    fileType: "pdf",
    uploadedAt: "2026-08-20",
    uploadedBy: "Prof. S. R. Patil",
    isPublished: true,
    downloadCount: 198,
    isDemo: true
  },
  {
    id: "note-3",
    title: "Organic Reaction Mechanisms - Named Reactions Quick Chart",
    description: "Aldol condensation, Cannizzaro, Reimer-Tiemann, Kolbe's synthesis, and reaction charts essential for CET & NEET 12th.",
    course: "NEET",
    classLevel: "12th",
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    topic: "Named Reactions & Reagents",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Organic_Named_Reactions_Quick_Revision.pdf",
    fileSize: "1.9 MB",
    fileType: "pdf",
    uploadedAt: "2026-08-28",
    uploadedBy: "Dr. A. V. Kulkarni",
    isPublished: true,
    downloadCount: 310,
    isDemo: true
  },
  {
    id: "note-4",
    title: "Chemical Bonding & Molecular Structure - Hybridization Tricks",
    description: "VSEPR theory, hybridization shortcuts, dipole moment order, and MOT electronic configuration diagrams.",
    course: "JEE",
    classLevel: "11th",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    topic: "VSEPR & Molecular Orbital Theory",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Chemical_Bonding_Master_Notes.pdf",
    fileSize: "4.1 MB",
    fileType: "pdf",
    uploadedAt: "2026-09-02",
    uploadedBy: "Dr. A. V. Kulkarni",
    isPublished: true,
    downloadCount: 225,
    isDemo: true
  },
  {
    id: "note-5",
    title: "Definite Integration & Area Under Curves - CET Speed Notes",
    description: "Wallis formula, King's property, Leibniz rule for derivative of integrals, and standard area shortcuts for MHT-CET.",
    course: "MHT-CET",
    classLevel: "12th",
    subject: "Mathematics",
    chapter: "Definite Integration",
    topic: "Properties & Shortcuts",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Definite_Integration_CET_Shortcuts.pdf",
    fileSize: "2.1 MB",
    fileType: "pdf",
    uploadedAt: "2026-09-05",
    uploadedBy: "Prof. M. B. Joshi",
    isPublished: true,
    downloadCount: 184,
    isDemo: true
  },
  {
    id: "note-6",
    title: "Vectors & 3D Geometry - Formula Booklet & Solved Proofs",
    description: "Scalar and vector triple product, shortest distance between skew lines, plane equations, and angle between lines.",
    course: "JEE",
    classLevel: "12th",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Skew Lines & Planes",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Vectors_3D_Geometry_Disha_Notes.pdf",
    fileSize: "3.5 MB",
    fileType: "pdf",
    uploadedAt: "2026-09-10",
    uploadedBy: "Prof. M. B. Joshi",
    isPublished: true,
    downloadCount: 156,
    isDemo: true
  },
  {
    id: "note-7",
    title: "Human Reproduction & Reproductive Health - NCERT High-Yield Points",
    description: "Gametogenesis flowcharts, menstrual cycle hormonal curves, embryonic development stages, and assisted reproductive technologies (ART).",
    course: "NEET",
    classLevel: "12th",
    subject: "Biology",
    chapter: "Human Reproduction",
    topic: "Gametogenesis & Hormonal Control",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Human_Reproduction_NCERT_Revision_Disha.pdf",
    fileSize: "5.2 MB",
    fileType: "pdf",
    uploadedAt: "2026-09-12",
    uploadedBy: "Dr. P. S. Deshmukh",
    isPublished: true,
    downloadCount: 420,
    isDemo: true
  },
  {
    id: "note-8",
    title: "Genetics: Principles of Inheritance & Variation - Diagrammatic Notes",
    description: "Monohybrid/Dihybrid crosses, incomplete dominance, sex-linked disorders, pedigree analysis guide, and chromosomal aberrations.",
    course: "NEET",
    classLevel: "12th",
    subject: "Biology",
    chapter: "Genetics and Evolution",
    topic: "Mendelian Genetics & Pedigree Analysis",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "Genetics_Principles_Inheritance_HighYield.pdf",
    fileSize: "4.8 MB",
    fileType: "pdf",
    uploadedAt: "2026-09-15",
    uploadedBy: "Dr. P. S. Deshmukh",
    isPublished: true,
    downloadCount: 388,
    isDemo: true
  }
];

export const initialQuestions: Question[] = [
  // Physics Questions
  {
    id: "q-phy-1",
    exam: "MHT-CET",
    subject: "Physics",
    chapter: "Rotational Dynamics",
    topic: "Moment of Inertia",
    difficulty: "Medium",
    questionText: "A solid sphere of mass M and radius R rolls without slipping on a horizontal surface. What fraction of its total kinetic energy is rotational kinetic energy?",
    options: ["1/2", "2/5", "2/7", "5/7"],
    correctOptionIndex: 2,
    explanation: "Total KE = Translational KE + Rotational KE = (1/2)Mv² + (1/2)Iω². For a solid sphere, I = (2/5)MR² and v = Rω. Rotational KE = (1/2)(2/5 MR²)(v/R)² = (1/5)Mv². Total KE = (1/2 + 1/5)Mv² = (7/10)Mv². Fraction = (1/5) / (7/10) = 2/7.",
    positiveMarks: 1,
    negativeMarks: 0
  },
  {
    id: "q-phy-2",
    exam: "JEE",
    subject: "Physics",
    chapter: "Electrostatics",
    topic: "Electric Field",
    difficulty: "Hard",
    questionText: "A non-conducting solid sphere of radius R has a uniform volume charge density ρ. The electric field at a distance r (where r < R) from the center is proportional to:",
    options: ["r⁻²", "r⁻¹", "r", "Independent of r"],
    correctOptionIndex: 2,
    explanation: "By Gauss's Law, enclosing a Gaussian sphere of radius r < R: E · (4πr²) = q_enclosed / ε₀ = (ρ · (4/3)πr³) / ε₀. Hence, E = (ρ · r) / (3ε₀), which is directly proportional to r.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-phy-3",
    exam: "NEET",
    subject: "Physics",
    chapter: "Current Electricity",
    topic: "Wheatstone Bridge",
    difficulty: "Easy",
    questionText: "In a balanced Wheatstone bridge, if the positions of the galvanometer and the cell are interchanged, the balance condition:",
    options: [
      "Remains unchanged",
      "Is completely disturbed",
      "Depends on the resistance of the galvanometer",
      "Changes by a factor of 2"
    ],
    correctOptionIndex: 0,
    explanation: "The conjugate arms property of a Wheatstone bridge states that interchanging the positions of the galvanometer and battery does not affect the balance condition.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-phy-4",
    exam: "MHT-CET",
    subject: "Physics",
    chapter: "Thermodynamics",
    topic: "Carnot Engine",
    difficulty: "Medium",
    questionText: "A Carnot engine works between temperatures 27°C and 327°C. Its efficiency is:",
    options: ["50%", "25%", "66.7%", "75%"],
    correctOptionIndex: 0,
    explanation: "T₁ = 327 + 273 = 600 K, T₂ = 27 + 273 = 300 K. Efficiency η = 1 - (T₂/T₁) = 1 - (300/600) = 1 - 0.5 = 0.5 or 50%.",
    positiveMarks: 1,
    negativeMarks: 0
  },
  {
    id: "q-phy-5",
    exam: "JEE",
    subject: "Physics",
    chapter: "Wave Optics",
    topic: "Young's Double Slit Experiment",
    difficulty: "Medium",
    questionText: "In Young's double slit experiment, if the entire apparatus is immersed in water of refractive index 4/3, the fringe width will:",
    options: ["Increase by 33%", "Decrease to 3/4 of its original value", "Remain unchanged", "Double"],
    correctOptionIndex: 1,
    explanation: "Fringe width β = λD / d. In a medium of refractive index μ, the wavelength becomes λ' = λ / μ. Therefore, β' = β / μ = β / (4/3) = (3/4)β.",
    positiveMarks: 4,
    negativeMarks: 1
  },

  // Chemistry Questions
  {
    id: "q-chem-1",
    exam: "MHT-CET",
    subject: "Chemistry",
    chapter: "Solid State",
    topic: "Crystal Lattices",
    difficulty: "Easy",
    questionText: "The coordination number of a constituent particle in a face-centered cubic (FCC) lattice is:",
    options: ["6", "8", "12", "4"],
    correctOptionIndex: 2,
    explanation: "In an FCC lattice (cubic close packing), each atom is surrounded by 12 nearest neighbors: 4 in its own plane, 4 in the plane above, and 4 in the plane below.",
    positiveMarks: 1,
    negativeMarks: 0
  },
  {
    id: "q-chem-2",
    exam: "JEE",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    topic: "Molecular Orbital Theory",
    difficulty: "Medium",
    questionText: "According to Molecular Orbital Theory, which of the following species is paramagnetic and has a bond order of 2?",
    options: ["N₂", "O₂", "C₂", "B₂"],
    correctOptionIndex: 1,
    explanation: "O₂ has 16 electrons. Its electronic configuration in MOT puts two unpaired electrons in the degenerate antibonding π*2px and π*2py orbitals, giving it paramagnetism. Bond order = (10 - 6)/2 = 2.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-chem-3",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    topic: "Cannizzaro Reaction",
    difficulty: "Medium",
    questionText: "Which of the following compounds does NOT undergo Cannizzaro reaction upon heating with concentrated NaOH?",
    options: ["Formaldehyde (HCHO)", "Benzaldehyde (C₆H₅CHO)", "Acetaldehyde (CH₃CHO)", "Trimethylacetaldehyde ((CH₃)₃CCHO)"],
    correctOptionIndex: 2,
    explanation: "Cannizzaro reaction is given only by aldehydes lacking an α-hydrogen. Acetaldehyde (CH₃CHO) has 3 α-hydrogens, so it undergoes Aldol condensation instead.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-chem-4",
    exam: "MHT-CET",
    subject: "Chemistry",
    chapter: "Ionic Equilibria",
    topic: "Buffer Solutions",
    difficulty: "Medium",
    questionText: "What is the pH of a solution containing 0.1 M acetic acid (CH₃COOH) and 0.1 M sodium acetate (CH₃COONa)? (Given: pKa of acetic acid = 4.74)",
    options: ["4.74", "5.74", "3.74", "7.00"],
    correctOptionIndex: 0,
    explanation: "Using Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]) = 4.74 + log(0.1/0.1) = 4.74 + log(1) = 4.74.",
    positiveMarks: 1,
    negativeMarks: 0
  },
  {
    id: "q-chem-5",
    exam: "NEET",
    subject: "Chemistry",
    chapter: "Coordination Compounds",
    topic: "Crystal Field Splitting",
    difficulty: "Hard",
    questionText: "Which of the following complexes is diamagnetic and has d²sp³ hybridization?",
    options: ["[CoF₆]³⁻", "[Co(NH₃)₆]³⁺", "[NiCl₄]²⁻", "[Fe(H₂O)₆]²⁺"],
    correctOptionIndex: 1,
    explanation: "In [Co(NH₃)₆]³⁺, Co is in the +3 oxidation state (3d⁶). NH₃ acts as a strong field ligand, forcing pairing of electrons in 3d: t₂g⁶ eg⁰. All electrons are paired (diamagnetic) and the two vacant 3d orbitals combine with 4s and 4p to form d²sp³ inner orbital complex.",
    positiveMarks: 4,
    negativeMarks: 1
  },

  // Mathematics Questions
  {
    id: "q-math-1",
    exam: "MHT-CET",
    subject: "Mathematics",
    chapter: "Mathematical Logic",
    topic: "Truth Tables",
    difficulty: "Easy",
    questionText: "The negation of the statement 'p ∧ (q → r)' is logically equivalent to:",
    options: [
      "~p ∨ (q ∧ ~r)",
      "~p ∧ (~q ∨ r)",
      "~p ∨ (~q ∨ r)",
      "p ∨ (q ∧ ~r)"
    ],
    correctOptionIndex: 0,
    explanation: "~[p ∧ (q → r)] ≡ ~p ∨ ~(q → r). Since ~(q → r) ≡ q ∧ ~r, the result is ~p ∨ (q ∧ ~r).",
    positiveMarks: 2,
    negativeMarks: 0
  },
  {
    id: "q-math-2",
    exam: "JEE",
    subject: "Mathematics",
    chapter: "Definite Integration",
    topic: "Definite Integrals",
    difficulty: "Medium",
    questionText: "The value of the definite integral ∫₀^(π/2) (sin³x) / (sin³x + cos³x) dx is:",
    options: ["π", "π/2", "π/4", "0"],
    correctOptionIndex: 2,
    explanation: "Using the property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx: I = ∫₀^(π/2) (cos³x) / (cos³x + sin³x) dx. Adding both equations gives 2I = ∫₀^(π/2) 1 dx = π/2. Therefore, I = π/4.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-math-3",
    exam: "MHT-CET",
    subject: "Mathematics",
    chapter: "Matrices",
    topic: "Inverse of Matrix",
    difficulty: "Medium",
    questionText: "If A is a 3 × 3 non-singular matrix such that |A| = 4, then the value of |adj(A)| is:",
    options: ["4", "16", "64", "1/4"],
    correctOptionIndex: 1,
    explanation: "For an n × n matrix, |adj(A)| = |A|^(n - 1). Here n = 3 and |A| = 4. Therefore, |adj(A)| = 4^(3 - 1) = 4² = 16.",
    positiveMarks: 2,
    negativeMarks: 0
  },
  {
    id: "q-math-4",
    exam: "JEE",
    subject: "Mathematics",
    chapter: "Vectors & 3D Geometry",
    topic: "Shortest Distance",
    difficulty: "Hard",
    questionText: "If two unit vectors a and b are inclined at an angle θ such that |a - b| < 1, then θ must lie in the interval:",
    options: ["[0, π/6)", "[0, π/3)", "(π/3, π/2]", "(π/2, π]"],
    correctOptionIndex: 1,
    explanation: "|a - b|² = |a|² + |b|² - 2|a||b|cosθ = 1 + 1 - 2cosθ = 2(1 - cosθ) = 4sin²(θ/2). So |a - b| = 2sin(θ/2) < 1 ⇒ sin(θ/2) < 1/2 ⇒ θ/2 < π/6 ⇒ θ < π/3. Hence θ ∈ [0, π/3).",
    positiveMarks: 4,
    negativeMarks: 1
  },

  // Biology Questions
  {
    id: "q-bio-1",
    exam: "NEET",
    subject: "Biology",
    chapter: "Genetics and Evolution",
    topic: "Mendelian Genetics",
    difficulty: "Easy",
    questionText: "In a test cross involving F₁ dihybrid flies, more parental-type offspring were produced than recombinant-type offspring. This indicates that:",
    options: [
      "The two genes are linked and present on the same chromosome",
      "Both of the characters are controlled by more than one gene",
      "The two genes are located on different chromosomes",
      "Chromosomes failed to separate during meiosis"
    ],
    correctOptionIndex: 0,
    explanation: "When parental gene combinations are significantly higher than recombinants (deviation from 1:1:1:1), it demonstrates genetic linkage where genes lie close to each other on the same chromosome (Morgan's fruit fly experiments).",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-bio-2",
    exam: "NEET",
    subject: "Biology",
    chapter: "Human Reproduction",
    topic: "Menstrual Cycle",
    difficulty: "Medium",
    questionText: "During the human menstrual cycle, the rapid secretion of LH leading to its maximum level (LH surge) induces:",
    options: [
      "Development of corpus luteum",
      "Rupture of Graafian follicle and release of ovum",
      "Immediate shedding of uterine endometrium",
      "Secretion of high amount of progesterone from placenta"
    ],
    correctOptionIndex: 1,
    explanation: "The mid-cycle LH surge around day 14 triggers the rupture of the mature Graafian follicle and the release of an ovum (ovulation) into the fallopian tube.",
    positiveMarks: 4,
    negativeMarks: 1
  },
  {
    id: "q-bio-3",
    exam: "MHT-CET",
    subject: "Biology",
    chapter: "Plant Physiology",
    topic: "Photosynthesis",
    difficulty: "Medium",
    questionText: "In C₄ plants, the primary CO₂ acceptor is phosphoenolpyruvate (PEP) and it is located in:",
    options: [
      "Mesophyll cells",
      "Bundle sheath cells",
      "Epidermal cells",
      "Vascular cambium"
    ],
    correctOptionIndex: 0,
    explanation: "In C₄ plants having Kranz anatomy, the primary fixation of atmospheric CO₂ occurs in mesophyll cells catalyzed by PEP carboxylase, forming oxaloacetic acid (OAA).",
    positiveMarks: 1,
    negativeMarks: 0
  },
  {
    id: "q-bio-4",
    exam: "NEET",
    subject: "Biology",
    chapter: "Biotechnology",
    topic: "Recombinant DNA Technology",
    difficulty: "Medium",
    questionText: "Which enzyme is commonly termed as 'molecular scissors' in recombinant DNA technology?",
    options: ["DNA Ligase", "Restriction Endonuclease", "DNA Polymerase I", "Reverse Transcriptase"],
    correctOptionIndex: 1,
    explanation: "Restriction endonucleases recognize specific palindromic nucleotide sequences in double-stranded DNA and cleave them at defined sites, earning the name 'molecular scissors'.",
    positiveMarks: 4,
    negativeMarks: 1
  }
];

export const initialTests: TestItem[] = [
  {
    id: "test-cet-1",
    title: "MHT-CET High Yield Physics & Chemistry Booster",
    description: "Timed mock test covering Rotational Motion, Thermodynamics, Solid State and Ionic Equilibria tailored for MHT-CET format.",
    exam: "MHT-CET",
    subject: "Full Syllabus",
    chapters: ["Rotational Dynamics", "Thermodynamics", "Solid State", "Ionic Equilibria"],
    questionIds: ["q-phy-1", "q-phy-4", "q-chem-1", "q-chem-4", "q-math-1", "q-math-3"],
    durationMinutes: 15,
    totalMarks: 8,
    markingScheme: {
      positive: 1,
      negative: 0
    },
    isPublished: true,
    createdAt: "2026-09-01"
  },
  {
    id: "test-jee-1",
    title: "JEE Main PCM Diagnostic Test - Analytical Sprint",
    description: "NTA pattern simulation with negative marking (+4 / -1) testing analytical depth across Physics, Chemistry, and Mathematics.",
    exam: "JEE",
    subject: "Full Syllabus",
    chapters: ["Electrostatics", "Wave Optics", "Chemical Bonding", "Definite Integration", "Vectors & 3D Geometry"],
    questionIds: ["q-phy-2", "q-phy-5", "q-chem-2", "q-math-2", "q-math-4"],
    durationMinutes: 20,
    totalMarks: 20,
    markingScheme: {
      positive: 4,
      negative: 1
    },
    isPublished: true,
    createdAt: "2026-09-05"
  },
  {
    id: "test-neet-1",
    title: "NEET Biology & Chemistry Mastery Sprint",
    description: "Strict NCERT alignment testing Genetics, Reproduction, Coordination Chemistry and Reaction Mechanisms with NEET (+4 / -1) grading.",
    exam: "NEET",
    subject: "Biology",
    chapters: ["Genetics and Evolution", "Human Reproduction", "Biotechnology", "Aldehydes, Ketones and Carboxylic Acids"],
    questionIds: ["q-bio-1", "q-bio-2", "q-bio-4", "q-chem-3", "q-chem-5", "q-phy-3"],
    durationMinutes: 18,
    totalMarks: 24,
    markingScheme: {
      positive: 4,
      negative: 1
    },
    isPublished: true,
    createdAt: "2026-09-10"
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "⚡ Admissions Open: Academic Year 2026-2027 Batches",
    content: "Admissions are actively underway for 11th Science Integrated, 12th Board + Entrance, and Repeaters batches for MHT-CET, JEE & NEET. Limited seats per batch to ensure individual doubt resolution.",
    category: "Admissions",
    priority: "Urgent",
    targetAudience: "All",
    createdAt: "2026-09-20",
    linkText: "Enquire Online Now",
    linkUrl: "/admissions",
    isActive: true
  },
  {
    id: "ann-2",
    title: "📝 All-Kolhapur CET & NEET Grand Diagnostic Mock Test",
    content: "Scheduled for Sunday at the Sane Guruji Vasahat campus. Free registration for registered students and open test for external aspirants.",
    category: "Test Schedule",
    priority: "High",
    targetAudience: "12th",
    createdAt: "2026-09-22",
    linkText: "Practice MCQs Online",
    linkUrl: "/mcq-practice",
    isActive: true
  },
  {
    id: "ann-3",
    title: "📚 New Chapter Formula Handbooks Uploaded in Notes Portal",
    content: "Physics and Chemistry revision booklets with 15-year PYQ analyses have been published in the Student Notes Library. Download and print your copies.",
    category: "General",
    priority: "Normal",
    targetAudience: "All",
    createdAt: "2026-09-24",
    linkText: "View Study Material",
    linkUrl: "/notes",
    isActive: true
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    studentName: "Aditya S. Kadam",
    exam: "MHT-CET",
    scoreOrRank: "99.42 Percentile",
    college: "COEP Technological University, Pune (Computer Engineering)",
    content: "The consistent mock tests and personal doubt clearance at Disha Academy made a huge difference. The faculty was always approachable after class.",
    year: "2025",
    isDemo: true
  },
  {
    id: "testi-2",
    studentName: "Sanika R. Bhosale",
    exam: "NEET",
    scoreOrRank: "668 / 720 Marks",
    college: "RCSM Government Medical College, Kolhapur (MBBS)",
    content: "Line-by-line NCERT breakdown by the Biology mentors and weekly test discipline built my confidence without any last-minute stress.",
    year: "2025",
    isDemo: true
  },
  {
    id: "testi-3",
    studentName: "Prathamesh P. Patil",
    exam: "JEE",
    scoreOrRank: "99.18 Percentile (Main) & IIT-JEE Qualified",
    college: "NIT Surathkal (Electrical & Electronics)",
    content: "Mathematics shortcut techniques and rigorous multi-concept Physics problems helped me solve tough questions quickly in the actual CBT.",
    year: "2024",
    isDemo: true
  }
];
