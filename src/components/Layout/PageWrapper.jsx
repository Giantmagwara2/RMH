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
  className = '',
  ...props
}) => (
  <motion.div
    className={className}
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: transitionDuration, ease: easing }}
    {...props}
  >
    {children}
  </motion.div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
  transitionDuration: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
};

export default PageWrapper;