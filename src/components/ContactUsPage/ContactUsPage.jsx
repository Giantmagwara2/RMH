// src/components/ContactUsPage/ContactUsPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Section from '../Section/Section';
import PageWrapper from '../Layout/PageWrapper';

const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  MESSAGE: 'message',
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    [FORM_FIELDS.NAME]: '',
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.MESSAGE]: '',
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

    if (!formData[FORM_FIELDS.NAME].trim() || formData[FORM_FIELDS.NAME].length > 100) {
      newErrors[FORM_FIELDS.NAME] = 'Name is required and must be less than 100 characters.';
      isValid = false;
    }

    if (!formData[FORM_FIELDS.EMAIL].trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData[FORM_FIELDS.EMAIL])) {
      newErrors[FORM_FIELDS.EMAIL] = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData[FORM_FIELDS.MESSAGE].trim() || formData[FORM_FIELDS.MESSAGE].length > 1000 || /[<>]/.test(formData[FORM_FIELDS.MESSAGE])) {
      newErrors[FORM_FIELDS.MESSAGE] = 'Message is required, must be less than 1000 characters, and cannot contain HTML tags.';
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
        // Simulate API call
        // In a real application, you would replace this with:
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || 'Failed to send message');
        // }
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        setSubmissionStatus('success');
        setFormData({ 
          [FORM_FIELDS.NAME]: '', 
          [FORM_FIELDS.EMAIL]: '', 
          [FORM_FIELDS.MESSAGE]: '' 
        }); // Reset form
        setErrors({});
      } catch (error) {
        setSubmissionStatus('error');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container px-4 mx-auto">
          {/* Page Header */}
          <Section className="text-center mb-section">
            <h1 className="mb-6 text-4xl font-bold font-display text-soft-white">Contact Us</h1>
            <p className="text-lg leading-relaxed text-soft-white">
              We'd love to hear from you! Get in touch with us to discuss your project or any inquiries.
            </p>
          </Section>

          {/* Contact Form and Information */}
          <div className="p-8 bg-white rounded-lg dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 shadow-card dark:shadow-none md:p-12 mb-section">
            <h2 className="mb-8 text-3xl font-bold text-center font-display text-midnight-blue dark:text-secondary">Get in Touch</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-electric-blue dark:text-highlight-yellow">Contact Information</h3>
                <ul className="leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex items-center mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 text-lg text-electric-blue dark:text-highlight-yellow" aria-hidden="true" />
                    <address className="not-italic">
                      123 Main Street, Jabulani, Soweto, Gauteng, South Africa
                    </address>
                  </li>
                  <li className="flex items-center mb-3">
                    <FontAwesomeIcon icon={faPhone} className="mr-4 text-lg text-electric-blue dark:text-highlight-yellow" aria-hidden="true" />
                    <a href="tel:+27110000000" className="transition-colors duration-300 hover:text-electric-blue dark:hover:text-highlight-yellow">+27 11 000 0000</a>
                  </li>
                  <li className="flex items-center mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-lg text-electric-blue dark:text-highlight-yellow" aria-hidden="true" />
                    <a href="mailto:info@rocvillecreative.com" className="transition-colors duration-300 hover:text-electric-blue dark:hover:text-highlight-yellow">info@rocvillecreative.com</a>
                  </li>
                </ul>
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-semibold text-electric-blue dark:text-highlight-yellow">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com/rocvillemedia" target="_blank" rel="noopener noreferrer" className="text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow" aria-label="Follow us on Facebook">
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="https://twitter.com/rocvillemedia" target="_blank" rel="noopener noreferrer" className="text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow" aria-label="Follow us on Twitter">
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="https://instagram.com/rocvillemedia" target="_blank" rel="noopener noreferrer" className="text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-electric-blue dark:hover:text-highlight-yellow" aria-label="Follow us on Instagram">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-electric-blue dark:text-highlight-yellow">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      id={FORM_FIELDS.NAME}
                      name={FORM_FIELDS.NAME}
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors[FORM_FIELDS.NAME] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Your Name"
                      value={formData[FORM_FIELDS.NAME]}
                      onChange={handleChange}
                      aria-invalid={!!errors[FORM_FIELDS.NAME]}
                      aria-describedby={errors[FORM_FIELDS.NAME] ? 'name-error' : null}
                    />
                    {errors[FORM_FIELDS.NAME] && <p className="mt-1 text-sm text-red-500" id="name-error">{errors[FORM_FIELDS.NAME]}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id={FORM_FIELDS.EMAIL}
                      name={FORM_FIELDS.EMAIL}
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors[FORM_FIELDS.EMAIL] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="you@example.com"
                      value={formData[FORM_FIELDS.EMAIL]}
                      onChange={handleChange}
                      aria-invalid={!!errors[FORM_FIELDS.EMAIL]}
                      aria-describedby={errors[FORM_FIELDS.EMAIL] ? 'email-error' : null}
                    />
                    {errors[FORM_FIELDS.EMAIL] && <p className="mt-1 text-sm text-red-500" id="email-error">{errors[FORM_FIELDS.EMAIL]}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      id={FORM_FIELDS.MESSAGE}
                      name={FORM_FIELDS.MESSAGE}
                      className={`w-full border-gray-300 dark:bg-dark-input dark:border-gray-600 rounded-md p-3 shadow-sm dark:shadow-none focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:border-electric-blue dark:focus:border-highlight-yellow transition-shadow duration-300 ${errors[FORM_FIELDS.MESSAGE] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      rows="5"
                      placeholder="Tell us about your project..."
                      value={formData[FORM_FIELDS.MESSAGE]}
                      onChange={handleChange}
                      aria-invalid={!!errors[FORM_FIELDS.MESSAGE]}
                      aria-describedby={errors[FORM_FIELDS.MESSAGE] ? 'message-error' : null}
                    ></textarea>
                    {errors[FORM_FIELDS.MESSAGE] && <p className="mt-1 text-sm text-red-500" id="message-error">{errors[FORM_FIELDS.MESSAGE]}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 font-semibold transition-all duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={submissionStatus === 'pending'}
                  >
                    {submissionStatus === 'pending' ? 'Sending...' : 'Send Message'}
                  </button>
                  <div aria-live="polite" className="mt-4 text-center">
                    {submissionStatus === 'success' && (
                      <p className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md dark:bg-green-900 dark:text-green-200 dark:border-green-700">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    )}
                    {submissionStatus === 'error' && (
                      <p className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                        There was an error sending your message. Please try again later or contact us directly.
                      </p>
                    )}
                  </div>
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