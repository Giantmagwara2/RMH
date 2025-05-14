import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import SuspenseWrapper from './components/SuspenseWrapper';
import './index.css'; // Import global styles for Tailwind CSS

const Homepage = lazy(() => import('./components/Homepage/Homepage.jsx'));
const ServicesPage = lazy(() => import('./components/ServicesPage/ServicesPage.jsx'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage/PortfolioPage.jsx'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage/AboutUsPage.jsx'));
const ContactUsPage = lazy(() => import('./components/ContactUsPage/ContactUsPage.jsx'));
const BlogPage = lazy(() => import('./components/BlogPage/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage/BlogPostPage.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Ensure consistent dark mode styling
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