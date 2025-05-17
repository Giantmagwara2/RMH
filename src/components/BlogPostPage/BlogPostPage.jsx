// src/components/BlogPostPage/BlogPostPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section.jsx';
import { blogPosts } from '../../constants/BlogData.js';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../constants/index';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageWrapper>
        <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
          <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 mx-auto text-center">
            <Section
              className="p-8 bg-white rounded-lg shadow-xl dark:bg-dark-bg dark:shadow-none"
              data-aos="fade-down"
              data-aos-duration="600"
            >
              <h1 className="mb-4 text-4xl font-bold font-display text-midnight-blue dark:text-secondary">Post Not Found</h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Sorry, we couldn’t find the article you’re looking for. It might have been moved or deleted.
              </p>
              <Link
                to={ROUTES.BLOG}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Blog
              </Link>
            </Section>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // SEO + Open Graph
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'; // Fallback for SSR or build time
  const currentUrl = `${baseUrl}${ROUTES.BLOG}/${slug}`;
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
        <meta property="article:published_time" content={new Date(post.datePublished).toISOString()} />
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
                {/* 
                  If post.content is a single HTML string, you would render it like this:
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  Ensure the HTML is sanitized if it comes from user input.
                  The `prose` classes from @tailwindcss/typography will style this HTML.

                  If post.content is Markdown, you'd use a library like react-markdown:
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                */}
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

              {/* Share Section */}
              <div className="py-6 mt-8 border-t border-b border-gray-200 dark:border-zinc-700">
                <h4 className="mb-3 text-lg font-semibold text-center text-electric-blue dark:text-highlight-yellow">
                  Share this post
                </h4>
                <div className="flex items-center justify-center space-x-4">
                  {[
                    { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`, color: "text-blue-400 hover:text-blue-500" },
                    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, color: "text-blue-600 hover:text-blue-700" },
                    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`, color: "text-blue-700 hover:text-blue-800" },
                    { name: 'WhatsApp', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + currentUrl)}`, color: "text-green-500 hover:text-green-600" },
                  ].map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${social.name}`}
                      className={`p-2 transition-colors duration-150 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 ${social.color}`}
                    >
                      <ShareIcon className="w-5 h-5" /> 
                      {/* 
                        Ideally, you'd use specific icons for each social media platform.
                        For simplicity, using a generic ShareIcon here.
                        Example: <TwitterIcon className="w-5 h-5" /> 
                      */}
                    </a>
                  ))}
                </div>
              </div>


              {/* Back to Blog Button */}
              <div className="pt-8 mt-8 text-center">
                <Link
                  to={ROUTES.BLOG}
                  className="inline-flex items-center gap-2 px-8 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
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