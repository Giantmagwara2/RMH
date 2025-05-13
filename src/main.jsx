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

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Suspense fallback={<div>Loading...</div>}><Homepage /></Suspense> },
      { path: 'services', element: <Suspense fallback={<div>Loading...</div>}><ServicesPage /></Suspense> },
      { path: 'portfolio', element: <Suspense fallback={<div>Loading...</div>}><PortfolioPage /></Suspense> },
      { path: 'about-us', element: <Suspense fallback={<div>Loading...</div>}><AboutUsPage /></Suspense> },
      { path: 'contact-us', element: <Suspense fallback={<div>Loading...</div>}><ContactUsPage /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<div>Loading...</div>}><BlogPage /></Suspense> },
      { path: 'blog/:postId', element: <Suspense fallback={<div>Loading...</div>}><BlogPostPage /></Suspense> },
      { path: '*', element: <Suspense fallback={<div>Loading...</div>}><NotFoundPage /></Suspense> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);