// src/components/BlogPostPage/BlogPostPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section.jsx';
import { blogPosts } from '../../constants/BlogData.js';
import { ROUTES } from '../../constants/index';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <Section
            className="container px-4 mx-auto text-center text-soft-white"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <h1 className="mb-4 text-4xl font-bold font-display">Post Not Found</h1>
            <p className="mb-6 text-lg leading-relaxed">
              Sorry, we couldn’t find the article you’re looking for.
            </p>
            <Link
              to={ROUTES.BLOG}
              className="inline-block px-6 py-2 font-semibold transition-colors duration-300 rounded-md shadow-md bg-soft-white dark:bg-dark-bg text-electric-blue dark:text-highlight-yellow hover:bg-gray-100 dark:hover:bg-gray-700 dark:shadow-none"
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
          <div className="container px-4 mx-auto">
            <Section
              className="p-8 bg-white rounded-lg dark:bg-dark-bg bg-opacity-90 dark:bg-opacity-90 shadow-card dark:shadow-none md:p-12"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              {/* Title & Meta */}
              <h1 className="mb-4 text-4xl font-bold font-display md:text-5xl text-midnight-blue dark:text-secondary">
                {post.title}
              </h1>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                By <span className="font-medium">{post.author}</span> on{' '}
                {new Date(post.datePublished).toLocaleDateString()}
              </p>

              {/* Featured Image */}
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="object-cover w-full mx-auto mb-8 rounded-md shadow-lg dark:shadow-none max-h-96"
                />
              )}

              {/* Content */}
              <div className="mb-8 leading-relaxed prose prose-lg text-gray-700 dark:prose-dark max-w-none dark:text-gray-300">
                {post.content.map((block, i) => (
                  <p key={i}>{block}</p>
                ))}
              </div>

              {/* Categories */}
              {post.categories?.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-electric-blue dark:text-highlight-yellow">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map(cat => (
                      <span
                        key={cat}
                        className="inline-block px-2 py-1 text-xs font-semibold rounded bg-electric-blue dark:bg-highlight-yellow bg-opacity-10 dark:bg-opacity-20 text-electric-blue dark:text-highlight-yellow"
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
                  <h4 className="mb-2 text-lg font-semibold text-electric-blue dark:text-highlight-yellow">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog Button */}
              <div className="mt-8 text-center">
                <Link
                  to={ROUTES.BLOG}
                  className="inline-block px-8 py-3 font-semibold text-white transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500"
                >
                  Back to Blog
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default BlogPostPage;