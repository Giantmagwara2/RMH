import React from 'react';
import { motion } from 'framer-motion';

export function CaseStudyPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/case-study-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">Case Study: Project X</h1>
        </div>
      </section>

      {/* Animated Metrics Section */}
      <section className="p-8 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">+200%</h2>
            <p className="text-gray-600">Increase in Engagement</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold">50%</h2>
            <p className="text-gray-600">Reduction in Costs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold">3x</h2>
            <p className="text-gray-600">Faster Delivery</p>
          </motion.div>
        </div>
      </section>

      {/* Before & After Slider Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Before & After</h2>
        <div className="relative w-full h-64">
          <img
            src="/assets/before.jpg"
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ width: '100%' }}
            animate={{ width: '50%' }}
            transition={{ duration: 1 }}
          >
            <img
              src="/assets/after.jpg"
              alt="After"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
