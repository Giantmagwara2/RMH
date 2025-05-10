// src/components/BlogPostPage/BlogPostPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section.jsx'; // Updated import to Section
import { blogPosts } from '../../constants/BlogData.js'; // Corrected import to BlogData.js
import { ROUTES } from '../../constants/index'; // Correct import path for ROUTES

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <Section
            className="container mx-auto px-4 text-center text-soft-white"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-lg leading-relaxed mb-6">
              Sorry, we couldn’t find the article you’re looking for.
            </p>
            <Link
              to={ROUTES.BLOG}
              className="inline-block bg-soft-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow py-2 px-6 rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md dark:shadow-none"
            >
              Back to Blog
            </Link>
          </Section>
        </div>
      </PageWrapper>
    );
  }

  // SEO + Open Graph
  const currentUrl = `https://yourdomain.com${ROUTES.BLOG}/${slug}`;
  const ogImage = post.ogImage || post.featuredImage;

  return (
    <>
      <Helmet>
        <title>{post.title} | RocVille Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="RocVille Media House" />
        {post.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta property="article:published_time" content={post.datePublished} />
      </Helmet>

      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <div className="container mx-auto px-4">
            <Section
              className="bg-white dark:bg-dark-bg bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-card dark:shadow-none p-8 md:p-12"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              {/* Title & Meta */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-midnight-blue dark:text-secondary mb-4">
                {post.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                By <span className="font-medium">{post.author}</span> on{' '}
                {new Date(post.datePublished).toLocaleDateString()}
              </p>

              {/* Featured Image */}
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full rounded-md shadow-lg dark:shadow-none mb-8 object-cover max-h-96 mx-auto"
                />
              )}

              {/* Content */}
              <div className="prose prose-lg dark:prose-dark max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {post.content.map((block, i) => (
                  <p key={i}>{block}</p>
                ))}
              </div>

              {/* Categories */}
              {post.categories?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-electric-blue dark:text-highlight-yellow mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map(cat => (
                      <span
                        key={cat}
                        className="inline-block bg-electric-blue dark:bg-highlight-yellow bg-opacity-10 dark:bg-opacity-20 text-electric-blue dark:text-highlight-yellow text-xs font-semibold px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg text-electric-blue dark:text-highlight-yellow mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default BlogPostPage;