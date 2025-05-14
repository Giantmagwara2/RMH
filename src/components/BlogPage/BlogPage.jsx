// src/components/BlogPage/BlogPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section.jsx'; // Updated import to Section
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '../../api'; // Ensure this path is correct
import { ROUTES } from '../../constants/index'; // Correct import path for ROUTES

const BlogPage = () => {
  const { data: posts, isLoading, isError, error } = useQuery(
    ['blogPosts'],
    fetchBlogPosts,
    { staleTime: 1000 * 60 * 5 } // Cache for 5 minutes
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Pagination logic
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;
  const paginatedPosts = posts
    ? posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <p className="py-12 text-center">Loading articles…</p>;
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-red-500">
        Error loading posts: {error?.message || 'Failed to load blog posts'}
      </p>
    );
  }

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container px-4 mx-auto">
          {/* Hero Section */}
          <Section
            className="text-center mb-section"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h1 className="mb-4 text-4xl font-bold font-display lg:text-5xl text-soft-white">
              Our Blog
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-soft-white">
              Insights, tips, and updates on creativity, branding, web development, and marketing.
            </p>
          </Section>

          {/* Posts List */}
          <div className="space-y-8">
            {paginatedPosts.map(post => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg dark:bg-dark-bg bg-opacity-90 shadow-card dark:shadow-none md:flex-row group hover:shadow-lg"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                {post.image && (
                  <div className="md:w-1/3 shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-48 transition-transform duration-300 md:h-full group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-grow p-6">
                  <h2 className="mb-2 text-2xl font-semibold text-midnight-blue dark:text-secondary">
                    <Link
                      to={`${ROUTES.BLOG}/${post.slug}`}
                      className="transition-colors duration-300 hover:text-electric-blue dark:hover:text-highlight-yellow"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    By <span className="font-medium">{post.author}</span> on{' '}
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`${ROUTES.BLOG}/${post.slug}`}
                    className="font-semibold transition-colors duration-300 text-electric-blue dark:text-highlight-yellow hover:underline"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More →
                  </Link>
                  {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.categories.map(cat => (
                        <span
                          key={cat}
                          className="px-2 py-1 text-xs font-medium rounded bg-electric-blue dark:bg-highlight-yellow bg-opacity-10 dark:bg-opacity-20 text-electric-blue dark:text-highlight-yellow"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-center mt-12 space-x-2"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow rounded-l-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2 font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow rounded-r-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogPage;