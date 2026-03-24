const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');
const dns = require('dns');

// Load env vars
dotenv.config({ path: '.env' });

// Override local DNS servers to fix 'querySrv ECONNREFUSED' errors
dns.setServers(['8.8.8.8', '8.8.4.4']);

const jobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    category: "Marketing",
    salary: "$40k–$55k",
    description: "We are looking for a creative and driven Social Media Assistant to join our marketing team.",
    responsibilities: [
      "Create and schedule social media content across all platforms",
      "Monitor and respond to comments and messages"
    ],
    requirements: [
      "1–2 years of experience in social media management",
      "Excellent written and verbal communication skills"
    ],
    tags: ["Marketing", "Design", "Senior"],
    logo: "N",
    logoColor: "#4640DE",
    logoBg: "#F8F8FD",
    featured: true,
    postedAt: "2024-03-20",
    companySize: "51–200",
    industry: "Startups / Tech",
  },
  {
    title: "Brand Designer",
    company: "Reddit",
    location: "New York, USA",
    type: "Remote",
    category: "Design",
    salary: "$80k–$110k",
    description: "Reddit is looking for a talented Brand Designer to help shape the visual identity.",
    responsibilities: [
      "Define and evolve Reddit's visual brand identity",
      "Design assets for marketing campaigns"
    ],
    requirements: [
      "4+ years of brand design experience",
      "Strong portfolio demonstrating brand identity work"
    ],
    tags: ["Design", "Junior", "Full-Time"],
    logo: "R",
    logoColor: "#FF4500",
    logoBg: "#FF4500",
    featured: true,
    postedAt: "2024-03-18",
    companySize: "1001–5000",
    industry: "Social Media",
  },
  {
    title: "Interactive Developer",
    company: "TeraFox",
    location: "New York, USA",
    type: "Full-Time",
    category: "Technology",
    salary: "$90k–$130k",
    description: "TeraFox is searching for an Interactive Developer to build cutting-edge web experiences.",
    responsibilities: [
      "Develop high-performance web animations",
      "Work with design team to polish UI/UX"
    ],
    requirements: [
      "Proficient in React, Three.js, GSAP",
      "Strong understanding of visual design principles"
    ],
    tags: ["Technology", "Design", "Marketing"],
    logo: "T",
    logoColor: "#26A4FF",
    logoBg: "#26A4FF10",
    featured: false,
    postedAt: "2024-03-15",
    companySize: "11–50",
    industry: "Design Agency",
  },
  {
    title: "Product Manager",
    company: "Stripe",
    location: "San Francisco, USA",
    type: "Full-Time",
    category: "Business",
    salary: "$120k–$180k",
    description: "Join Stripe as a Product Manager to lead the next generation of payment processing tools.",
    responsibilities: [
      "Define product roadmap and strategy",
      "Work with engineering to deliver complex features"
    ],
    requirements: [
      "Experience scaling B2B SaaS products",
      "Highly analytical and data-driven"
    ],
    tags: ["Business", "Finance", "Senior"],
    logo: "S",
    logoColor: "#635BFF",
    logoBg: "#635BFF10",
    featured: true,
    postedAt: "2024-03-12",
    companySize: "5001–10000",
    industry: "Fintech",
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected...');

    // Clear existing jobs
    await Job.deleteMany();
    console.log('Existing jobs removed');

    // Insert new jobs
    await Job.insertMany(jobs);
    console.log('Jobs seeded successfully');

    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

seedDB();
