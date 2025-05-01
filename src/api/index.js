// src/api/index.js
export async function fetchBlogPosts() {
    const res = await fetch('/api/blog');
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  }