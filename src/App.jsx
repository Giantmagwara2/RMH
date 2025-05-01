// App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; // Import ErrorBoundary

// Lazy load page components
const Homepage = lazy(() => import('./components/Homepage/Homepage'));
const ServicesPage = lazy(() => import('./components/ServicesPage/ServicesPage'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage/PortfolioPage'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage/AboutUsPage'));
const ContactUsPage = lazy(() => import('./components/ContactUsPage/ContactUsPage'));
const BlogPage = lazy(() => import('./components/BlogPage/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage/BlogPostPage'));

const App = () => {
  return (
    <Router>
      <ErrorBoundary> {/* Wrap Layout and Suspense with ErrorBoundary */}
        <Layout>
          <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;