/* Change this file to get your personal Porfolio */

const settings = {
  isSplash: false,
};

const seo = {
  title: "Zhang Gu's Portfolio",
  description:
    "Master's student at HUST, researching LLM and AI Agents in industrial manufacturing.",
  og: {
    title: "Zhang Gu Portfolio",
    type: "website",
    url: "https://Piedpiper777.github.io",
  },
};

const greeting = {
  title: "Zhang Gu",
  logo_name: "ZhangGu",
  nickname: "Piedpiper",
  subTitle:
    "Master's student at Huazhong University of Science and Technology, researching LLM and AI Agents in industrial manufacturing.",
  resumeLink: "",
  portfolio_repository:
    "https://github.com/Piedpiper777/Piedpiper777.github.io",
  githubProfile: "https://github.com/Piedpiper777",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/Piedpiper777",
    fontAwesomeIcon: "fa-github",
    backgroundColor: "#181717",
  },
  {
    name: "Gmail",
    link: "mailto:zhanggu@hust.edu.cn",
    fontAwesomeIcon: "fa-google",
    backgroundColor: "#D14836",
  },
];

const skills = {
  data: [
    {
      title: "Large Language Models & AI Agents",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Research on LLM fine-tuning, prompt engineering, and RAG pipelines",
        "⚡ Building AI agents for industrial manufacturing automation",
        "⚡ Experience with LangChain, Transformers, and model deployment",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: { backgroundColor: "transparent", color: "#3776AB" },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: { backgroundColor: "transparent" },
        },
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:chainlink",
          style: { color: "#375BD2" },
        },
        {
          skillName: "HuggingFace",
          fontAwesomeClassname: "simple-icons:huggingface",
          style: { color: "#FFD21E" },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: { backgroundColor: "#000000", color: "#F7DF1E" },
        },
        {
          skillName: "React",
          fontAwesomeClassname: "simple-icons:react",
          style: { color: "#61DAFB" },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#1488C6" },
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: { color: "#F05032" },
        },
      ],
    },
    {
      title: "Industrial Engineering & Manufacturing",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Applying AI/ML to optimize manufacturing processes",
        "⚡ Data-driven decision making in industrial systems",
        "⚡ Integration of LLM agents with industrial software",
      ],
      softwareSkills: [
        {
          skillName: "MATLAB",
          fontAwesomeClassname: "simple-icons:matlab",
          style: { color: "#0076A8" },
        },
        {
          skillName: "SQL",
          fontAwesomeClassname: "simple-icons:mysql",
          style: { color: "#4479A1" },
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "simple-icons:linux",
          style: { color: "#FCC624" },
        },
      ],
    },
  ],
};

const competitiveSites = {
  competitiveSites: [
    {
      siteName: "LeetCode",
      iconifyClassname: "simple-icons:leetcode",
      style: { color: "#F79F1B" },
      profileLink: "https://leetcode.com/",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Huazhong University of Science and Technology",
      subtitle: "M.S. in Industrial Engineering",
      logo_path: "",
      alt_name: "HUST",
      duration: "2024 - Present",
      descriptions: [
        "⚡ Research on Large Language Models and AI Agents for industrial manufacturing",
        "⚡ Focus on applying AI to optimize production processes and decision-making",
      ],
      website_link: "https://www.hust.edu.cn/",
    },
    {
      title: "Tianjin University",
      subtitle: "B.S. in Engineering Management",
      logo_path: "",
      alt_name: "TJU",
      duration: "2019 - 2023",
      descriptions: [
        "⚡ Studied engineering management and industrial systems",
        "⚡ Foundation in data analysis and operations research",
      ],
      website_link: "https://www.tju.edu.cn/",
    },
  ],
};

const certifications = {
  certifications: [],
};

const experience = {
  title: "Blog",
  subtitle: "Articles and technical writings",
  description:
    "Sharing knowledge about LLM, AI Agents, and industrial manufacturing applications.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Latest Posts",
      work: false,
      experiences: [],
    },
  ],
};

const projectsHeader = {
  title: "Projects",
  description: "My open source projects and research work on GitHub.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Diary",
  description: "Daily learning journal and study notes.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [],
};

const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "avatar.jpg",
    description:
      "Feel free to reach out if you're interested in my research or want to collaborate!",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "Technical blog posts about LLM, AI Agents, and industrial manufacturing.",
    link: "https://Piedpiper777.github.io/#/blog",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Location",
    subtitle: "Wuhan, Hubei, China",
    locality: "Wuhan",
    country: "China",
    region: "Hubei",
    postalCode: "",
    streetAddress: "",
    avatar_image_path: "address_image.svg",
    location_map_link: "",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};
