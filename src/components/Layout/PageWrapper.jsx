// src/components/Layout/PageWrapper.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Define default animation variants for page transitions
const defaultPageVariants = {
  initial: {
    opacity: 0,
    // y: 15, // Optional: Add a slight vertical movement
  },
  animate: {
    opacity: 1,
    // y: 0,
  },
  exit: {
    opacity: 0,
    // y: -15, // Optional: Add a slight vertical movement
  },
};

const PageWrapper = ({ children, variants = defaultPageVariants, transitionDuration = 0.5 }) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: transitionDuration, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
  transitionDuration: PropTypes.number,
};

export default PageWrapper;