// src/components/Layout/PageWrapper.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Define default animation variants for page transitions
const defaultPageVariants = {
  initial: {
    opacity: 0,
    y: 20, // Adds a slight vertical movement for entry
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20, // Adds a slight vertical movement for exit
  },
};

// PageWrapper Component
const PageWrapper = ({
  children,
  variants = defaultPageVariants,
  transitionDuration = 0.5,
  easing = 'easeInOut',
  transition: customTransition, // Allow a full custom transition object to be passed
  className = '',
  ...props
}) => {
  // If a customTransition object is provided, use it.
  // Otherwise, construct the transition from duration and easing props.
  const resolvedTransition = customTransition || {
    duration: transitionDuration,
    ease: easing,
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={resolvedTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
  transitionDuration: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  transition: PropTypes.object, // For overriding with a full framer-motion transition object
  className: PropTypes.string,
};

export default PageWrapper;