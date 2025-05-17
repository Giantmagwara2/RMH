import React, { Suspense, lazy } from 'react'; // Added Suspense
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse } from 'react-router-dom'; // Added useRouteError, isRouteErrorResponse
import App from './App';
import { QueryProvider } from './providers/QueryProvider'; // Import the QueryProvider
import './index.css'; // Import global styles for Tailwind CSS

const Homepage = lazy(() => import('./components/Homepage/Homepage.jsx'));
const ServicesPage = lazy(() => import('./components/ServicesPage/ServicesPage.jsx'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage/PortfolioPage.jsx'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage/AboutUsPage.jsx'));
const ContactUsPage = lazy(() => import('./components/ContactUsPage/ContactUsPage.jsx'));
const BlogPage = lazy(() => import('./components/BlogPage/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage/BlogPostPage.jsx'));
// Assuming CaseStudyPage.jsx uses a default export.
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage.jsx'));

// Global Loading Indicator for Suspense
function GlobalLoadingIndicator() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text-primary" role="status" aria-busy="true" aria-live="polite">
      <div className="w-16 h-16 border-4 rounded-full border-brand-primary border-t-transparent animate-spin"></div>
      <span className="ml-4 text-xl">Loading...</span>
    </div>
  );
}

// Simple Error Page component for route errors
function RouteErrorPage() {
  const error = useRouteError();
  console.error("Routing Error:", error); // Log error for debugging

  let errorMessage = "An unexpected error has occurred.";
  let errorStatusText = "Error";

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse` from React Router
    errorMessage = error.data?.message || error.statusText;
    errorStatusText = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-bg text-text-primary">
      <h1 className="mb-4 text-5xl font-bold text-feedback-error-text">{errorStatusText}</h1>
      <p className="mb-3 text-xl text-text-secondary">Oops! Something went wrong.</p>
      <p className="mb-8 text-text-muted">
        <i>{errorMessage}</i>
      </p>
      <a href="/" className="px-6 py-3 text-lg font-semibold text-white rounded-md bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-bg">
        Go Back Home
      </a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Ensure consistent dark mode styling
    errorElement: <RouteErrorPage />, // Add root error element
    children: [
      { index: true, element: <Suspense fallback={<GlobalLoadingIndicator />}><Homepage /></Suspense> },
      { path: 'services', element: <Suspense fallback={<GlobalLoadingIndicator />}><ServicesPage /></Suspense> },
      { path: 'portfolio', element: <Suspense fallback={<GlobalLoadingIndicator />}><PortfolioPage /></Suspense> },
      { path: 'about-us', element: <Suspense fallback={<GlobalLoadingIndicator />}><AboutUsPage /></Suspense> },
      { path: 'contact-us', element: <Suspense fallback={<GlobalLoadingIndicator />}><ContactUsPage /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<GlobalLoadingIndicator />}><BlogPage /></Suspense> },
      { path: 'blog/:postId', element: <Suspense fallback={<GlobalLoadingIndicator />}><BlogPostPage /></Suspense> },
      { path: 'case-study/:studyId', element: <Suspense fallback={<GlobalLoadingIndicator />}><CaseStudyPage /></Suspense> },
      { path: '*', element: <Suspense fallback={<GlobalLoadingIndicator />}><NotFoundPage /></Suspense> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider> {/* Wrap RouterProvider with QueryProvider */}
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>
);