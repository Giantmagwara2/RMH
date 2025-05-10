import React, { useState } from 'react';

const Tab = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-space-md py-space-sm font-medium ${
      isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary'
    }`}
  >
    {children}
  </button>
);

const Tabs = ({ children, defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="border-b border-gray-200" role="tablist">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs navigation">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            isActive: index === activeTab,
            onClick: () => setActiveTab(index),
          })
        )}
      </nav>
      <div className="mt-space-lg">{children[activeTab]?.props.children}</div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;