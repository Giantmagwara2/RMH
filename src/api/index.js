// src/api/index.js

/**
 * A helper function to make fetch requests and handle common error scenarios.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options] - Optional fetch options (method, headers, body, etc.).
 * @param {string} [entityName='data'] - A descriptive name for the data being fetched, used in error messages.
 * @returns {Promise<any>} The JSON response from the API.
 * @throws {Error} If the network response is not ok.
 */
async function fetchData(url, options = {}, entityName = 'data') {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.text(); // Try to get more info from error response
      console.error(`Failed to fetch ${entityName}: ${response.status} ${response.statusText}`, errorData);
      throw new Error(`Failed to fetch ${entityName}. Status: ${response.status}`);
    }
    // Handle cases where the response might be empty (e.g., for a 204 No Content on POST/PUT/DELETE)
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${entityName} from ${url}:`, error);
    // Re-throw the error so it can be caught by React Query or other callers
    // If it's already an Error object from the `throw new Error` above, just rethrow it.
    // Otherwise, wrap it in a new Error.
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Network error or issue fetching ${entityName}.`);
  }
}

/**
 * Fetches all blog posts.
 * @returns {Promise<import('../types').BlogPost[]>} A promise that resolves to an array of blog posts.
 */
export async function fetchBlogPosts() {
  return fetchData('/api/blog', {}, 'blog posts');
}

/**
 * Fetches a single blog post by its ID or slug.
 * @param {string | number} id - The ID or slug of the blog post.
 * @returns {Promise<import('../types').BlogPost>} A promise that resolves to a single blog post.
 */
export async function fetchBlogPost(id) {
  return fetchData(`/api/blog/${id}`, {}, `blog post with id ${id}`);
}

/**
 * Fetches all services.
 * @returns {Promise<import('../types').Service[]>} A promise that resolves to an array of services.
 */
export async function fetchServices() {
  return fetchData('/api/services', {}, 'services');
}

/**
 * Fetches all portfolio projects.
 * @returns {Promise<import('../types').Project[]>} A promise that resolves to an array of portfolio projects.
 */
export async function fetchPortfolioProjects() {
  return fetchData('/api/portfolio', {}, 'portfolio projects');
}

/**
 * Fetches a single portfolio project by its ID.
 * @param {string | number} id - The ID of the portfolio project.
 * @returns {Promise<import('../types').Project>} A promise that resolves to a single portfolio project.
 */
export async function fetchPortfolioProject(id) {
  return fetchData(`/api/portfolio/${id}`, {}, `portfolio project with id ${id}`);
}

/**
 * Fetches all case studies.
 * @returns {Promise<import('../types').CaseStudy[]>} A promise that resolves to an array of case studies.
 */
export async function fetchCaseStudies() {
  return fetchData('/api/case-studies', {}, 'case studies');
}

/**
 * Fetches a single case study by its ID.
 * @param {string | number} id - The ID of the case study.
 * @returns {Promise<import('../types').CaseStudy>} A promise that resolves to a single case study.
 */
export async function fetchCaseStudy(id) {
  return fetchData(`/api/case-studies/${id}`, {}, `case study with id ${id}`);
}

/**
 * Submits contact form data.
 * @param {Omit<import('../types').ContactMessage, 'id' | 'submittedAt' | 'isRead'>} formData - The contact form data.
 * @returns {Promise<import('../types').ContactMessage | null>} A promise that resolves to the submitted contact message data or null.
 */
export async function submitContactForm(formData) {
  return fetchData('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }, 'contact form submission');
}

/**
 * Fetches all testimonials.
 * @returns {Promise<import('../types').Testimonial[]>} A promise that resolves to an array of testimonials.
 */
export async function fetchTestimonials() {
  return fetchData('/api/testimonials', {}, 'testimonials');
}

/**
 * Fetches all team members.
 * @returns {Promise<import('../types').TeamMember[]>} A promise that resolves to an array of team members.
 */
export async function fetchTeamMembers() {
  return fetchData('/api/team', {}, 'team members');
}

// You can continue to add more API functions here as needed,
// e.g., for fetching leads, specific service details, etc.