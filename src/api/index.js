// src/api/index.js
export async function fetchBlogPosts() {
  try {
    const res = await fetch('/api/blog');
    if (!res.ok) {
      console.error('Failed to fetch blog posts:', res.statusText);
      throw new Error('Failed to fetch blog posts');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function fetchServices() {
  try {
    const response = await fetch('/api/services');
    if (!response.ok) {
      console.error('Failed to fetch services:', response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}