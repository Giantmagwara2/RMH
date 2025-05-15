// App.jsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { MegaMenuProvider, MegaMenu } from './components/MegaMenu';
import { FilterProvider } from './components/FilterSidebar';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { TechStackPicker } from './components/TechStackPicker';
import { BudgetEstimator } from './components/BudgetEstimator';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ChatBot } from './components/ChatBot';
import { ClientDashboard } from './components/ClientDashboard';
import ChatWindow from './components/chat/ChatWindow';

const FilterSidebar = lazy(() => import('./components/FilterSidebar'));
const PortfolioGrid = lazy(() => import('./components/PortfolioGrid'));

function App() {
  return (
      <Routes>
        <Route
          element={
            <MegaMenuProvider>
              <FilterProvider>
                <div className="flex flex-col min-h-screen text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
                  {/* Header */}
                  <Header />
                  <header className="App-header">
                    <MegaMenu />
                  </header>
                  {/* Diagnostic Text Start */}
                  <div className="p-4 text-center">
                    <p className="text-xl font-semibold text-red-500 dark:text-yellow-300">
                      DIAGNOSTIC: Light Mode Text (Red) / Dark Mode Text (Yellow)
                    </p>
                    <p className="text-neutral-muted dark:text-neutral-muted">
                      Test with muted text for better readability.
                    </p>
                  </div>
                  {/* Diagnostic Text End */}

                  <div className="flex App">
                    <Suspense fallback={<div>Loading...</div>}>
                      <FilterSidebar />
                    </Suspense>
                    <main className="container flex-1 flex-grow px-4 py-8 mx-auto">
                      <div className="p-4 space-y-8 App">
                        <ThemeSwitcher />
                        <TechStackPicker onSelect={() => {}} />
                        <BudgetEstimator />
                        <ChatBot />
                        <ClientDashboard />
                      </div>
                      <Suspense fallback={<div>Loading...</div>}>
                        <PortfolioGrid />
                      </Suspense>
                      <Outlet />
                    </main>
                  </div>

                  {/* Footer */}
                  <Footer />
                  <ChatWindow />
                </div>
              </FilterProvider>
            </MegaMenuProvider>
          }
          path="/"
        />
        <Route element={<CaseStudyPage />} path="/case-study" />
      </Routes>
  );
}

export default App;