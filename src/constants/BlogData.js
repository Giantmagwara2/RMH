// src/constants/blogData.js

/**
 * @typedef {object} BlogPost
 * @property {string|number} id - Unique identifier for the blog post.
 * @property {string} title - The title of the blog post.
 * @property {string} slug - URL-friendly slug for the blog post (should be unique).
 * @property {string} excerpt - A short summary or introduction to the blog post.
 * @property {string} datePublished - The date the blog post was published (e.g., "YYYY-MM-DD").
 * @property {string} [lastUpdated] - The date the blog post was last updated (e.g., "YYYY-MM-DD").
 * @property {string} author - The name of the author.
 * @property {string} [authorImage] - URL or path to the author's avatar/image.
 * @property {string[]} tags - An array of keywords or tags associated with the blog post.
 * @property {string} [featuredImage] - URL or path to the main image for the blog post.
 * @property {string[]} content - An array of strings, where each string can represent a paragraph or a block of content.
 *                                 Alternatively, this could be a single string of Markdown or HTML.
 * @property {string[]} categories - An array of categories the blog post belongs to.
 * @property {string} [readingTime] - Estimated reading time (e.g., "5 min read").
 * @property {string} [metaDescription] - A short description for SEO meta tags.
 * @property {boolean} [isFeatured=false] - Whether the blog post is featured.
 */

/** @type {BlogPost[]} */
export const blogPosts = [
  {
    id: 1,
    title: "AI Simulated Behavior: Changing the Future",
    slug: "ai-simulated-behavior",
    excerpt: "How AI-driven personalization is reshaping digital interactions...",
    metaDescription: "Explore the impact of AI-simulated behavior on digital interactions and the future of technology and personalization.",
    datePublished: "2025-04-20",
    lastUpdated: "2025-04-22",
    author: "Tebogo Skosana",
    authorImage: "/assets/images/authors/tebogo-skosana.jpg", // Example path
    tags: ["AI", "Technology", "Innovation", "Personalization"],
    featuredImage: "/images/ai-future.jpg", // Example path
    featuredImage: "/assets/images/blog/ai-future.jpg", // Example path
    content: [
      "The rise of artificial intelligence has ushered in an era of unprecedented technological advancement. AI is no longer a futuristic concept but a present-day reality, influencing various sectors from healthcare to finance, and entertainment to customer service.",
      "One of the most fascinating and potentially transformative areas within AI is simulated behavior. This involves creating AI models that can mimic, predict, and even influence human-like behaviors in digital environments. The implications are vast, ranging from hyper-personalized user experiences to more sophisticated training simulations and ethical considerations that we must navigate carefully.",
      // ... more content paragraphs
    ],
    categories: ["Technology", "AI"],
    readingTime: "7 min read",
    isFeatured: true,
  },
  {
    id: 2,
    title: "The Art of Branding: Creating a Lasting Impression",
    slug: "art-of-branding",
    excerpt: "Discover the key elements of building a strong and memorable brand identity...",
    metaDescription: "Learn the essential elements of effective branding, from logo design to brand voice, and how to create a lasting impression on your audience.",
    datePublished: "2025-04-15",
    author: "Nomusa Khumalo",
    authorImage: "/assets/images/authors/nomusa-khumalo.jpg", // Example path
    tags: ["Branding", "Marketing", "Strategy"],
    featuredImage: "/images/branding-art.jpg", // Example path
    featuredImage: "/assets/images/blog/branding-art.jpg", // Example path
    content: [
      "Branding is more than just a logo; it's the entire perception your audience has of your business. It's the story you tell, the values you embody, and the promise you make to your customers.",
      "A well-defined brand strategy can set you apart from the competition, build trust, and foster loyalty. Key elements include a compelling brand voice, consistent visual identity, and a deep understanding of your target market.",
      // ... more content paragraphs
    ],
    categories: ["Branding", "Marketing"],
    readingTime: "5 min read",
    isFeatured: false,
  },
  // Add more blog posts here following the same structure
];