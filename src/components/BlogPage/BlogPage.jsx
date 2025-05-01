// src/components/BlogPage/BlogPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section'; // Updated import
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '../../api'; // Ensure this path is correct
import { ROUTES } from '../../constants'; // Assuming ROUTES is defined here

const BlogPage = () => {
  const { data: posts, isLoading, isError, error } = useQuery(
    ['blogPosts'],
    fetchBlogPosts,
    { staleTime: 1000 * 60 * 5 } // Cache for 5 minutes
  );

  if (isLoading) {
    return <p className="text-center py-12">Loading articles…</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-12 text-red-500">
        Error loading posts: {error?.message || 'Failed to load blog posts'}
      </p>
    );
  }

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <Section
            className="text-center mb-section"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-soft-white mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-soft-white max-w-2xl mx-auto leading-relaxed">
              Insights, tips, and updates on creativity, branding, web development, and marketing.
            </p>
          </Section>

          {/* Posts List */}
          <div className="space-y-8">
            {posts?.map(post => (
              <article
                key={post.id}
                className="bg-white dark:bg-dark-bg bg-opacity-90 rounded-lg shadow-card dark:shadow-none flex flex-col md:flex-row overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                {post.image && (
                  <div className="md:w-1/3 shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h2 className="font-semibold text-2xl text-midnight-blue dark:text-secondary mb-2">
                    <Link
                      to={`${ROUTES.BLOG}/${post.slug}`}
                      className="hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    By <span className="font-medium">{post.author}</span> on{' '}
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`${ROUTES.BLOG}/${post.slug}`}
                    className="text-electric-blue dark:text-highlight-yellow font-semibold hover:underline transition-colors duration-300"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More →
                  </Link>
                  {post.categories?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.categories.map(cat => (
                        <span
                          key={cat}
                          className="bg-electric-blue dark:bg-highlight-yellow bg-opacity-10 dark:bg-opacity-20 text-electric-blue dark:text-highlight-yellow text-xs font-medium px-2 py-1 rounded"
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

          {/* Pagination (optional) */}
          {posts?.length > 5 && (
            <div className="mt-12 flex justify-center items-center space-x-2" data-aos="fade-up" data-aos-duration="600">
              <button className="px-4 py-2 bg-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow rounded-l-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                1 / {Math.ceil(posts.length / 5)}
              </span>
              <button className="px-4 py-2 bg-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow rounded-r-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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