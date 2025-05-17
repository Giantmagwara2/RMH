// src/components/AboutUsPage/AboutUsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import Section from '../Section/Section';
import { teamMembers } from '../../constants/teamData'; // Import team members
import { ROUTES } from '../../constants/index';

// Base styles for team member cards, using theme-aware background colors
const teamCardBaseStyles = "group text-center p-6 transition-shadow duration-300 rounded-lg bg-surface dark:bg-surface shadow-md hover:shadow-lg";

const AboutUsPage = () => (
  <PageWrapper>
    {/* Hero section with gradient background using brand colors from tokens */}
    <div className="pt-header pb-section bg-gradient-to-br from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-bg">
      <div className="container px-4 mx-auto space-y-section">

        {/* Hero Section */}
        <Section className="text-center" data-aos="fade-down" data-aos-duration="800">
          {/* Using text-text-primary which becomes light in dark mode */}
          <h1 className="mb-4 text-4xl font-bold font-display lg:text-5xl text-text-primary">
            About Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-text-primary">
            At RocVille, we're a collective of passionate creatives, strategic thinkers,
            and skilled developers based in Soweto, Gauteng. Our mission is to amplify
            your vision and build digital success stories that resonate both locally and globally.
          </p>
        </Section>

        {/* Our Story Section */}
        {/* Sections with surface background, text-primary for headings, text-secondary for body */}
        <Section className="p-8 rounded-lg shadow-lg bg-surface dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-4 text-3xl font-bold font-display text-text-primary dark:text-text-primary">
            Our Story
          </h2>
          <p className="leading-relaxed text-text-secondary dark:text-text-secondary">
            RocVille was born from a shared dream among local Sowetan entrepreneurs who saw
            the immense potential of digital transformation. Frustrated by the disconnect
            between creative vision and practical execution, we built an agency that truly
            partners with clients—understanding their unique challenges and crafting bespoke
            solutions. From humble beginnings in a vibrant local hub, we’ve grown into a dynamic
            team, tackling diverse projects and celebrating the successes of our partners.
          </p>
        </Section>

        {/* Mission & Vision Section */}
        <Section className="p-8 rounded-lg shadow-lg bg-surface dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-6 text-3xl font-bold font-display text-text-primary dark:text-text-primary">
            Our Mission & Vision
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-brand-primary dark:text-highlight">Mission</h3>
              <p className="leading-relaxed text-text-secondary dark:text-text-secondary">
                To empower businesses in Soweto and beyond with creative, data-driven
                digital solutions—understanding each client’s story and amplifying their impact.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-brand-primary dark:text-highlight">Vision</h3>
              <p className="leading-relaxed text-text-secondary dark:text-text-secondary">
                To be the leading digital agency from Soweto, blending local expertise
                with global innovation, and crafting work that inspires and drives growth.
              </p>
            </div>
          </div>
        </Section>

        {/* Values Section */}
        <Section className="p-8 rounded-lg shadow-lg bg-surface dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-4 text-3xl font-bold font-display text-text-primary dark:text-text-primary">
            Our Values
          </h2>
          <ul className="space-y-4 text-text-secondary dark:text-text-secondary">
            {[
              { name: 'Ubuntu', description: 'Community & collaboration are at our core.' },
              { name: 'Innovation', description: 'We constantly seek new, better ways to solve challenges.' },
              { name: 'Excellence', description: 'Relentless pursuit of the highest quality.' },
              { name: 'Integrity', description: 'Honest, transparent, and ethical in all we do.' },
              { name: 'Empowerment', description: 'Giving clients the tools and knowledge to thrive.' },
            ].map(value => (
              <li 
                key={value.name} 
                className="p-4 transition-shadow duration-300 border-l-4 shadow-sm rounded-r-md border-brand-primary dark:border-highlight bg-bg dark:bg-bg hover:shadow-md"
              >
                <strong className="block text-lg font-semibold text-text-primary dark:text-text-primary">
                  {value.name}
                </strong>
                <p className="text-text-secondary dark:text-text-secondary">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>
        
        {/* Meet the Team Section */}
        <Section className="p-8 rounded-lg shadow-lg bg-surface dark:shadow-none" data-aos="fade-up" data-aos-duration="800">
          <h2 className="mb-6 text-3xl font-bold text-center font-display text-text-primary dark:text-text-primary">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <div key={member.name} className={`${teamCardBaseStyles}`} data-aos="zoom-in" data-aos-duration="600">
                <img
                  src={member.image} // Assuming member.image is a valid path like '/assets/team/member.jpg'
                  alt={member.name}
                  className="object-cover w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
                />
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm text-text-secondary dark:text-text-secondary">
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Final CTA Section */}
        <Section className="text-center" data-aos="fade-up" data-aos-duration="800">
          {/* Using text-text-primary which becomes light in dark mode */}
          <h2 className="mb-4 text-3xl font-bold font-display text-text-primary">
            Ready to Partner with RocVille?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg leading-relaxed text-text-primary">
            Let’s discuss your project and explore how our expertise can help you achieve
            your digital goals—locally rooted, globally minded.
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="inline-block px-8 py-3 font-semibold transition-colors duration-300 rounded-md shadow-md bg-surface text-brand-primary dark:bg-surface dark:text-brand-primary hover:bg-bg dark:hover:bg-bg focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-highlight focus:ring-offset-2"
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