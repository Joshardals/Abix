"use client"; // Indicates that this file should be treated as a client-side module

import { motion } from "framer-motion"; // Import motion from framer-motion for animations

// Define a functional component named Template
// This component wraps its children with animation effects
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Initial state of the component (before it mounts)
      initial={{ opacity: 0 }}
      // State to animate to when the component mounts or updates
      animate={{ opacity: 1 }}
      // State to animate to when the component unmounts
      exit={{ opacity: 0 }}
      // Transition settings for the animation
      transition={{ duration: 0.5 }}
      // `duration: 0.5` specifies that the animation will last 0.5 seconds
    >
      {children}
      {/* Render the children passed to the Template component */}
    </motion.div>
  );
}
