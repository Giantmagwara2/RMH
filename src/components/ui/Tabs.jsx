import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TabButtonComponent = ({
  title,
  isActive = false, // Default parameter
  onClick,
  id,
  controls,
  children = null, // Default parameter for children, though not directly used by button
  ...rest
}) => (
  <button
    id={id}
    onClick={onClick}
    className={`px-space-md py-space-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 ${ // Added focus styles
      isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-secondary hover:text-text-primary'
    }`}
    role="tab"
    aria-selected={isActive}
    aria-controls={controls}
    {...rest} // Spread additional props to the button element
  >
    {title}
  </button>
);

TabButtonComponent.propTypes = {
  // Props provided by the user via <Tabs.Tab title="..." children="..." />
  title: PropTypes.node.isRequired,
  children: PropTypes.node, // Panel content, passed via {...tabComponent.props} but not used by TabButtonComponent directly

  // Props injected by the <Tabs> component for rendering
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  controls: PropTypes.string,
};

const MemoizedTabButton = React.memo(TabButtonComponent);

const TabsComponent = ({
  children,
  defaultActiveTab = 0, // Default parameter
  className = '',     // Default parameter
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const tabsArray = React.Children.toArray(children).filter(child => child && child.type === MemoizedTabButton);

  return (
    <div className={className}>
      <div className="border-b border-neutrals-border" role="tablist">
      <nav className="flex -mb-px space-x-8" aria-label="Tabs navigation">
        {tabsArray.map((tabComponent, index) => (
            <MemoizedTabButton
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

TabsComponent.propTypes = {
  children: (props, propName, componentName) => {
    const propValue = props[propName];
    if (propValue == null) {
      return new Error(`Prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${propValue}\`.`);
    }
    let error = null;
    React.Children.forEach(propValue, (child) => {
      if (child && child.type !== MemoizedTabButton) { // Check against the actual component type
        error = new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
          `Expected children to be of type \`Tabs.Tab\` (which is MemoizedTabButton). Found type \`${child.type ? (child.type.displayName || child.type.name || 'Unknown') : typeof child}\`.`
        );
      }
    });
    return error;
  },
  defaultActiveTab: PropTypes.number,
  className: PropTypes.string,
};
// Default props are handled by default parameters in the function signature
// TabsComponent.defaultProps = {
//   defaultActiveTab: 0,
//   className: '',
// };

const Tabs = React.memo(TabsComponent);
Tabs.Tab = MemoizedTabButton; // Users will use <Tabs.Tab title="..." />

export default Tabs;