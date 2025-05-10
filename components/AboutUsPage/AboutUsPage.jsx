// src/components/AboutUsPage/AboutUsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section'; // Renamed import to Section
import { ROUTES } from '../../constants/index'; // Correct import path for ROUTES

const teamCardBaseStyles = "group text-center p-4 transition-shadow duration-300 rounded-md bg-white dark:bg-dark-bg";

// Placeholder team member data
const teamMembers = [
  {
    name: 'Nomusa Khumalo',
    title: 'Creative Director',
    image: 'https://via.placeholder.com/150/3490dc/ffffff?Text=Nomusa',
    bio: 'A visionary leader with over 10 years of experience in crafting compelling brand experiences.',
  },
  {
    name: 'Sipho Nkosi',
    title: 'Lead Developer',
    image: 'https://via.placeholder.com/150/2c3e50/ffffff?Text=Sipho',
    bio: 'Expert in building robust and scalable web solutions with a keen eye for detail.',
  },
  {
    name: 'Zandi Malinga',
    title: 'Digital Marketing Strategist',
    image: 'https://via.placeholder.com/150/3490dc/ffffff?Text=Zandi',
    bio: 'Passionate about leveraging data-driven strategies to achieve impactful marketing results.',
  },
  // ...add more
];

const AboutUsPage = () => (
  <PageWrapper>
    <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
      <div className="container mx-auto px-4 space-y-section">

        {/* Hero */}
        <Section
          className="text-center"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-soft-white mb-4">
            About Us
          </h1>
          <p className="text-lg text-soft-white leading-relaxed max-w-3xl mx-auto">
            At RocVille, we're a collective of passionate creatives, strategic thinkers,
            and skilled developers based in Soweto, Gauteng. Our mission is to amplify
            your vision and build digital success stories that resonate both locally and globally.
          </p>
        </Section>

        {/* Our Story */}
        <Section
          className="bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 rounded-lg p-8 shadow-card dark:shadow-none"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-3xl font-bold text-midnight-blue dark:text-secondary mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            RocVille was born from a shared dream among local Sowetan entrepreneurs who saw
            the immense potential of digital transformation. Frustrated by the disconnect
            between creative vision and practical execution, we built an agency that truly
            partners with clients—understanding their unique challenges and crafting bespoke
            solutions. From humble beginnings in a vibrant local hub, we’ve grown into a dynamic
            team, tackling diverse projects and celebrating the successes of our partners.
          </p>
        </Section>

        {/* Mission & Vision */}
        <Section
          className="bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 rounded-lg p-8 shadow-card dark:shadow-none"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-3xl font-bold text-midnight-blue dark:text-secondary mb-6">
            Our Mission & Vision
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-electric-blue dark:text-highlight-yellow mb-2">Mission</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To empower businesses in Soweto and beyond with creative, data-driven
                digital solutions—understanding each client’s story and amplifying their impact.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-electric-blue dark:text-highlight-yellow mb-2">Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the leading digital agency from Soweto, blending local expertise
                with global innovation, and crafting work that inspires and drives growth.
              </p>
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section
          className="bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 rounded-lg p-8 shadow-card dark:shadow-none"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-3xl font-bold text-midnight-blue dark:text-secondary mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Ubuntu:</span> Community & collaboration are at our core.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Innovation:</span> We constantly seek new, better ways to solve challenges.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Excellence:</span> Relentless pursuit of the highest quality.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Integrity:</span> Honest, transparent, and ethical in all we do.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Empowerment:</span> Giving clients the tools and knowledge to thrive.</li>
          </ul>
        </Section>

        {/* Meet the Team */}
        <Section
          className="bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-80 rounded-lg p-8 shadow-card dark:shadow-none"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-3xl font-bold text-midnight-blue dark:text-secondary text-center mb-6">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <div
                key={member.name}
                className={`${teamCardBaseStyles} hover:shadow-lg`}
                data-aos="zoom-in"
                data-aos-duration="600"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto mb-4 w-32 h-32 rounded-full object-cover shadow-md"
                />
                <h3 className="font-semibold text-lg text-midnight-blue dark:text-secondary">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {member.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section className="text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="font-display text-3xl font-bold text-soft-white mb-4">
            Ready to Partner with RocVille?
          </h2>
          <p className="text-soft-white text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
            Let’s discuss your project and explore how our expertise can help you achieve
            your digital goals—locally rooted, globally minded.
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="inline-block bg-soft-white dark:bg-white text-electric-blue dark:text-rich-black py-3 px-8 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
            aria-label="Contact us today"
          >
            Contact Us Today
          </Link>
        </Section>

      </div>
    </div>
  </PageWrapper>
);

export default AboutUsPage;