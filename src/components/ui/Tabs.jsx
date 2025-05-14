import React, { useState } from 'react';

const Tab = ({ title, isActive, onClick, id, controls }) => ( // Changed children to title prop for the tab button
  <button
    id={id}
    onClick={onClick}
    className={`px-space-md py-space-sm font-medium ${
      isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary hover:text-text-primary'
    }`}
    role="tab"
    aria-selected={isActive}
    aria-controls={controls}
  >
    {title}
  </button>
);

const Tabs = ({ children, defaultActiveTab = 0, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const tabsArray = React.Children.toArray(children).filter(child => child.type === Tab);

  return (
    <div className={className}>
      <div className="border-b border-neutrals-border" role="tablist">
      <nav className="flex -mb-px space-x-8" aria-label="Tabs navigation">
        {tabsArray.map((tabComponent, index) => (
            <Tab
              key={index}
              {...tabComponent.props} // Pass original props from Tab child
              title={tabComponent.props.title}
              isActive={index === activeTab}
              onClick={() => setActiveTab(index)}
              id={`tab-${index}`}
              controls={`tabpanel-${index}`}
            />
          ))}
      </nav>
      </div>
      <div className="mt-space-lg">
        {tabsArray.map((tabComponent, index) =>
          index === activeTab ? (
            <div key={index} id={`tabpanel-${index}`} role="tabpanel" aria-labelledby={`tab-${index}`}>
              {tabComponent.props.children} {/* This is the content for the tab */}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
Tabs.Tab = Tab;

export default Tabs;