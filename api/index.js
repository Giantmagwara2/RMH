// src/api/index.js
export async function fetchBlogPosts() {
    const res = await fetch('/api/blog');
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  }
  
  export async function fetchServices() {
    try {
      const response = await fetch('/api/services'); // Replace '/api/services' with your actual API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }