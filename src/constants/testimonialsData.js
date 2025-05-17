// src/constants/testimonialsData.js

/**
 * @typedef {object} Testimonial
 * @property {string|number} id - Unique identifier for the testimonial.
 * @property {string} text - The main text of the testimonial.
 * @property {string} author - The name of the author.
 * @property {string} [authorTitle] - The job title or role of the author.
 * @property {string} [companyName] - The name of the author's company.
 * @property {string} [authorAvatar] - URL or path to the author's avatar image.
 * @property {string} serviceId - The slug of the service this testimonial relates to (matches service.slug in allServices.js).
 * @property {number} [rating] - Optional rating (e.g., 1-5 stars).
 * @property {string} [date] - Optional date of the testimonial (e.g., "YYYY-MM-DD").
 */

/** @type {Testimonial[]} */
export const testimonialsData = [
    {
      id: "testimonial-1",
      text: "Their web design transformed our online presence! Our customers love the new look and feel.",
      author: "John Doe",
      authorTitle: "CEO",
      companyName: "Acme Corp",
      authorAvatar: "/assets/images/avatars/john-doe.jpg", // Example path
      serviceId: "web-design-development", // Matches the 'id' in allServices
      rating: 5,
    },
    {
      id: "testimonial-2",
      text: "Incredible branding work. Our new logo and brand guidelines are fantastic and truly represent our values.",
      author: "Jane Smith",
      authorTitle: "Marketing Manager",
      companyName: "Beta Industries",
      authorAvatar: "/assets/images/avatars/jane-smith.jpg", // Example path
      serviceId: "branding-identity",
      rating: 5,
    },
    {
      id: "testimonial-3",
      text: "Their digital marketing strategies significantly boosted our leads and sales. We're seeing real results!",
      author: "Peter Jones",
      authorTitle: "Owner",
      companyName: "Gamma Solutions",
      authorAvatar: "/assets/images/avatars/peter-jones.jpg", // Example path
      serviceId: "digital-marketing",
      rating: 5,
    },
    {
      id: "testimonial-4",
      text: "RocVille truly understands our needs. Their web development team is top-notch and delivered exactly what we envisioned.",
      author: "Sarah Miller",
      authorTitle: "CTO",
      companyName: "Delta Innovations",
      authorAvatar: "/assets/images/avatars/sarah-miller.jpg", // Example path
      serviceId: "web-design-development",
      rating: 5,
    },
    {
      id: "testimonial-5",
      text: "From logo design to a complete brand overhaul, their branding expertise is exceptional. Highly recommended!",
      author: "David Brown",
      authorTitle: "Founder",
      companyName: "Epsilon Group",
      authorAvatar: "/assets/images/avatars/david-brown.jpg", // Example path
      serviceId: "branding-identity",
      rating: 5,
    },
    {
      id: "testimonial-6",
      text: "We've seen a significant increase in engagement since partnering with RocVille for our social media marketing.",
      author: "Linda Green",
      authorTitle: "Marketing Director",
      companyName: "Zeta Corp",
      authorAvatar: "/assets/images/avatars/linda-green.jpg", // Example path
      serviceId: "digital-marketing",
      rating: 5,
    },
    // …add more testimonials here
  ];