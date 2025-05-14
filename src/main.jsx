import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

// Lazy load page components
const Homepage = lazy(() => import('./components/Homepage/Homepage.jsx'));
const ServicesPage = lazy(() => import('./components/ServicesPage/ServicesPage.jsx'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage/PortfolioPage.jsx'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage/AboutUsPage.jsx'));
const ContactUsPage = lazy(() => import('./components/ContactUsPage/ContactUsPage.jsx'));
const BlogPage = lazy(() => import('./components/BlogPage/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage/BlogPostPage.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage.jsx'));

// Reusable Suspense Wrapper
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="text-lg text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
    {children}
  </Suspense>
);

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <SuspenseWrapper><Homepage /></SuspenseWrapper> },
      { path: 'services', element: <SuspenseWrapper><ServicesPage /></SuspenseWrapper> },
      { path: 'portfolio', element: <SuspenseWrapper><PortfolioPage /></SuspenseWrapper> },
      { path: 'about-us', element: <SuspenseWrapper><AboutUsPage /></SuspenseWrapper> },
      { path: 'contact-us', element: <SuspenseWrapper><ContactUsPage /></SuspenseWrapper> },
      { path: 'blog', element: <SuspenseWrapper><BlogPage /></SuspenseWrapper> },
      { path: 'blog/:postId', element: <SuspenseWrapper><BlogPostPage /></SuspenseWrapper> },
      { path: '*', element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);