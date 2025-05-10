// src/components/ContactUsPage/ContactUsPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Section from '../Section/Section';
import PageWrapper from '../Layout/PageWrapper';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmissionStatus('pending');
      try {
        // Simulate backend submission (replace with your actual API call)
        console.log('Form Data Submitted:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setErrors({});
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmissionStatus('error');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <Section className="text-center mb-section">
            <h1 className="font-display text-4xl font-bold text-soft-white mb-6">Contact Us</h1>
            <p className="text-soft-white text-lg leading-relaxed">
              We'd love to hear from you! Get in touch with us to discuss your project or any inquiries.
            </p>
          </Section>

          {/* Contact Form and Information */}
          <div className="bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-card dark:shadow-none p-8 md:p-12 mb-section">
            <h2 className="font-display text-3xl font-bold text-midnight-blue dark:text-secondary mb-8 text-center">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-xl text-electric-blue dark:text-highlight-yellow mb-4">Contact Information</h3>
                <ul className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <li className="mb-3 flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 text-electric-blue dark:text-highlight-yellow text-lg" aria-hidden="true" />
                    <address className="not-italic">
                      123 Main Street, Jabulani, Soweto, Gauteng, South Africa
                    </address>
                  </li>
                  <li className="mb-3 flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-4 text-electric-blue dark:text-highlight-yellow text-lg" aria-hidden="true" />
                    <a href="tel:+27110000000" className="hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300">+27 11 000 0000</a>
                  </li>
                  <li className="mb-3 flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-electric-blue dark:text-highlight-yellow text-lg" aria-hidden="true" />
                    <a href="mailto:info@rocvillecreative.com" className="hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300">info@rocvillecreative.com</a>
                  </li>
                </ul>
                <div className="mt-8">
                  <h3 className="font-semibold text-xl text-electric-blue dark:text-highlight-yellow mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300" aria-label="Follow us on Facebook">
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300" aria-label="Follow us on Twitter">
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow transition-colors duration-300" aria-label="Follow us on Instagram">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="font-semibold text-xl text-electric-blue dark:text-highlight-yellow mb-4">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : null}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1" id="name-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : null}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1" id="email-error">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors.message ? 'border-red-500' : ''}`}
                      rows="5"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : null}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1" id="message-error">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black py-3 px-6 rounded-md w-full hover:bg-blue-700 dark:hover:bg-yellow-500 transition-colors duration-300 shadow-md dark:shadow-none font-semibold"
                    disabled={submissionStatus === 'pending'}
                  >
                    {submissionStatus === 'pending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {submissionStatus === 'success' && (
                    <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>
                  )}
                  {submissionStatus === 'error' && (
                    <p className="text-red-500 text-sm mt-2">There was an error sending your message. Please try again later.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactUsPage;