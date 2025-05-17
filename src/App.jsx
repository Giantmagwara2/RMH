// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header'; // Corrected to default import
import Footer from './components/Footer/Footer'; // Corrected import path for Footer
import { MegaMenuProvider, MegaMenu } from './components/MegaMenu';
import { FilterProvider } from './components/FilterSidebar';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import ChatWindow from './components/chat/ChatWindow';


function App() {
  return (
    <MegaMenuProvider>
      <FilterProvider>
        {/* Theming is now primarily handled by html.dark + body styles in index.css using tokens */}
        <div className="flex flex-col min-h-screen text-text-primary bg-bg">
          <Header />
          {/* MegaMenu is placed here as a distinct global navigation/feature element below the main header */}
          <header className="sticky top-0 z-40 py-2 shadow-md bg-surface">
            <MegaMenu />
          </header>

          {/* The main content area where routed pages will be rendered */}
          {/* Suspense for Outlet's content is handled by the router configuration in main.jsx */}
          <main className="container flex-1 flex-grow px-4 py-8 mx-auto">
            <Outlet /> {/* Child routes from main.jsx will render here */}
          </main>

          {/* Global utilities like ThemeSwitcher can be placed strategically */}
          <div className="fixed z-50 bottom-4 right-4">
             <ThemeSwitcher />
          </div>

          <Footer />
          <ChatWindow />
        </div>
      </FilterProvider>
    </MegaMenuProvider>
  );
}

export default App;