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
    <div>
      <div className="flex space-x-space-md">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            isActive: index === activeTab,
            onClick: () => setActiveTab(index),
          })
        )}
      </div>
      <div className="mt-space-lg">{children[activeTab]?.props.children}</div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;
