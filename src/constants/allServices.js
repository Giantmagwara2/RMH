// src/constants/allServices.js

/**
 * @typedef {object} Service
 * @property {string} name - The display name of the service.
 * @property {string} slug - A URL-friendly slug for the service (should be unique).
 * @property {string} description - A short, concise description or tagline for the service, suitable for cards or summaries.
 * @property {string} [longDescription] - A more detailed description of the service, suitable for a dedicated service page.
 * @property {string} [icon] - An identifier for an icon representing the service (e.g., an SVG component name, a class name for an icon font, or a simple emoji).
 * @property {string} [featuredImage] - URL or path to a representative image for the service.
 * @property {string[]} [tags] - An array of keywords or tags associated with the service, useful for filtering or SEO.
 */

/** @type {Service[]} */
export const allServices = [
  {
    name: "Web Design & Development",
    slug: "web-design-development",
    description: "Crafting stunning, responsive, and functional websites that drive results and elevate your online presence.",
    longDescription: "Our web design and development services focus on creating user-centric digital experiences. We build everything from custom landing pages to complex web applications, ensuring they are fast, secure, and optimized for all devices. We work with modern technologies like React, Vue, and Node.js to deliver cutting-edge solutions.",
    icon: "ComputerDesktopIcon", // Example: Heroicon name
    featuredImage: "/assets/images/services/web-design.jpg", // Example path
    tags: ["web design", "development", "ux/ui", "responsive", "e-commerce", "frontend", "backend"],
  },
  {
    name: "Branding & Identity",
    slug: "branding-identity",
    description: "Building memorable and impactful brands that connect with your target audience and tell your unique story.",
    longDescription: "We help businesses define and articulate their brand identity. This includes logo design, color palette selection, typography, brand guidelines, and overall visual strategy to ensure a cohesive and compelling brand presence across all touchpoints.",
    icon: "SparklesIcon", // Example: Heroicon name
    featuredImage: "/assets/images/services/branding.jpg", // Example path
    tags: ["branding", "logo design", "visual identity", "strategy", "graphic design"],
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Driving growth and engagement through data-driven, strategic online marketing campaigns.",
    longDescription: "Our digital marketing services encompass SEO, content marketing, social media management, PPC advertising, and email marketing. We create tailored strategies to increase your visibility, attract qualified leads, and convert them into loyal customers.",
    icon: "ChartBarIcon", // Example: Heroicon name
    featuredImage: "/assets/images/services/digital-marketing.jpg", // Example path
    tags: ["seo", "content marketing", "social media", "ppc", "email marketing", "analytics"],
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Developing intuitive and high-performance mobile applications for iOS and Android platforms.",
    longDescription: "We design and build native and cross-platform mobile apps that offer seamless user experiences. From concept to launch and beyond, we guide you through the entire app development lifecycle, focusing on innovation and quality.",
    icon: "DevicePhoneMobileIcon", // Example: Heroicon name
    featuredImage: "/assets/images/services/mobile-app.jpg", // Example path
    tags: ["mobile apps", "ios", "android", "react native", "swift", "kotlin"],
  },
  {
    name: "Content Creation & Strategy",
    slug: "content-creation-strategy",
    description: "Producing compelling content that captivates your audience and supports your marketing goals.",
    longDescription: "Our team creates high-quality content, including blog posts, articles, website copy, video scripts, and social media updates. We develop content strategies that align with your brand voice and objectives to engage your audience effectively.",
    icon: "PencilSquareIcon", // Example: Heroicon name
    featuredImage: "/assets/images/services/content-creation.jpg", // Example path
    tags: ["content strategy", "copywriting", "blogging", "video production", "storytelling"],
  },
  // Add more services here following the same structure
  // Example:
  // {
  //   name: "E-commerce Solutions",
  //   slug: "ecommerce-solutions",
  //   description: "Building robust e-commerce platforms to help you sell online effectively.",
  //   longDescription: "...",
  //   icon: "ShoppingCartIcon",
  //   featuredImage: "/assets/images/services/ecommerce.jpg",
  //   tags: ["ecommerce", "shopify", "woocommerce", "online store"],
  // },
];