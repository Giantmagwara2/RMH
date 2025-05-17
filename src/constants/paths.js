// src/constants/paths.js

/**
 * @typedef {object} PathDefinitions
 * @property {string} HOME - Path for the homepage.
 * @property {string} SERVICES - Path for the Services page.
 * @property {string} PORTFOLIO - Path for the Portfolio page.
 * @property {string} ABOUT - Path for the About Us page.
 * @property {string} CONTACT - Path for the Contact Us page.
 * @property {string} BLOG - Path for the main Blog page.
 * @property {string} BLOG_POST_PARAM - Path template for a single blog post, expecting a parameter (e.g., slug or ID).
 * @property {(slugOrId: string) => string} BLOG_POST - Function to generate the path for a specific blog post.
 * @property {string} CASE_STUDY_PARAM - Path template for a single case study, expecting a parameter.
 * @property {(slugOrId: string) => string} CASE_STUDY - Function to generate the path for a specific case study.
 * @property {string} NOT_FOUND - Path for the Not Found page (wildcard).
 */

/** @type {PathDefinitions} */
export const PATHS = {
  HOME: '/',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  ABOUT: '/about-us', // Updated to match router configuration
  CONTACT: '/contact-us', // Updated to match router configuration
  BLOG: '/blog',
  BLOG_POST_PARAM: '/blog/:postId', // Parameterized route, matching main.jsx
  BLOG_POST: (postId) => `/blog/${postId}`, // Function to generate specific blog post path
  CASE_STUDY_PARAM: '/case-study/:studyId', // Parameterized route, matching main.jsx
  CASE_STUDY: (studyId) => `/case-study/${studyId}`, // Function to generate specific case study path
  NOT_FOUND: '*',
};