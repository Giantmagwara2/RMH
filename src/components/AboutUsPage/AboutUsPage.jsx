// src/components/AboutUsPage/AboutUsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section';
import { ROUTES } from '../../constants/index';

const teamCardBaseStyles = "group text-center p-6 transition-shadow duration-300 rounded-lg bg-white dark:bg-dark-bg shadow-md hover:shadow-lg";

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
];

const AboutUsPage = () => (
  <PageWrapper>
    <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
      <div className="container px-4 mx-auto space-y-section">

        {/* Hero Section */}
        <Section className="text-center" data-aos="fade-down" data-aos-duration="800">
          <h1 className="mb-4 text-4xl font-bold font-display lg:text-5xl text-soft-white">
            About Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-soft-white">
            At RocVille, we're a collective of passionate creatives, strategic thinkers,
            and skilled developers based in Soweto, Gauteng. Our mission is to amplify
            your vision and build digital success stories that resonate both locally and globally.
          </p>
        </Section>

        {/* Our Story Section */}
        <Section className="p-8 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-4 text-3xl font-bold font-display text-midnight-blue dark:text-secondary">
            Our Story
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            RocVille was born from a shared dream among local Sowetan entrepreneurs who saw
            the immense potential of digital transformation. Frustrated by the disconnect
            between creative vision and practical execution, we built an agency that truly
            partners with clients—understanding their unique challenges and crafting bespoke
            solutions. From humble beginnings in a vibrant local hub, we’ve grown into a dynamic
            team, tackling diverse projects and celebrating the successes of our partners.
          </p>
        </Section>

        {/* Mission & Vision Section */}
        <Section className="p-8 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-6 text-3xl font-bold font-display text-midnight-blue dark:text-secondary">
            Our Mission & Vision
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-electric-blue dark:text-highlight-yellow">Mission</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                To empower businesses in Soweto and beyond with creative, data-driven
                digital solutions—understanding each client’s story and amplifying their impact.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-electric-blue dark:text-highlight-yellow">Vision</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                To be the leading digital agency from Soweto, blending local expertise
                with global innovation, and crafting work that inspires and drives growth.
              </p>
            </div>
          </div>
        </Section>

        {/* Values Section */}
        <Section className="p-8 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-4 text-3xl font-bold font-display text-midnight-blue dark:text-secondary">
            Our Values
          </h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside dark:text-gray-300">
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Ubuntu:</span> Community & collaboration are at our core.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Innovation:</span> We constantly seek new, better ways to solve challenges.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Excellence:</span> Relentless pursuit of the highest quality.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Integrity:</span> Honest, transparent, and ethical in all we do.</li>
            <li><span className="font-semibold text-midnight-blue dark:text-secondary">Empowerment:</span> Giving clients the tools and knowledge to thrive.</li>
          </ul>
        </Section>

        {/* Meet the Team Section */}
        <Section className="p-8 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-6 text-3xl font-bold text-center font-display text-midnight-blue dark:text-secondary">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <div key={member.name} className={`${teamCardBaseStyles}`} data-aos="zoom-in" data-aos-duration="600">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
                />
                <h3 className="text-lg font-semibold text-midnight-blue dark:text-secondary">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section className="text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-4 text-3xl font-bold font-display text-soft-white">
            Ready to Partner with RocVille?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg leading-relaxed text-soft-white">
            Let’s discuss your project and explore how our expertise can help you achieve
            your digital goals—locally rooted, globally minded.
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="inline-block px-8 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-soft-white dark:bg-white text-electric-blue dark:text-rich-black hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
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