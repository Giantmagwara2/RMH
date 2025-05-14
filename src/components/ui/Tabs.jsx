import React, { useState } from 'react';

const Tab = ({ children, isActive, onClick, id, controls }) => (
  <button
    id={id}
    onClick={onClick}
    className={`px-space-md py-space-sm font-medium ${
      isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary'
    }`}
    role="tab"
    aria-selected={isActive}
    aria-controls={controls}
  >
    {children}
  </button>
);

const Tabs = ({ children, defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="border-b border-gray-200" role="tablist">
      <nav className="flex -mb-px space-x-8" aria-label="Tabs navigation">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            isActive: index === activeTab,
            onClick: () => setActiveTab(index),
            id: `tab-${index}`,
            controls: `tabpanel-${index}`,
          })
        )}
      </nav>
      <div className="mt-space-lg">
        {React.Children.map(children, (child, index) =>
          index === activeTab ? (
            <div id={`tabpanel-${index}`} role="tabpanel" aria-labelledby={`tab-${index}`}>
              {child.props.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;