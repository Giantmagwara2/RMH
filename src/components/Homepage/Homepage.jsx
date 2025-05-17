// src/components/Homepage/Homepage.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAIBehavior from '../../hooks/useAIBehavior';
import { PROJECTS, ROUTES } from '../../constants/index';
import { allServices } from '../../constants/allServices';
import { testimonialsData } from '../../constants/testimonialsData';
import Section from '../Section/Section';
import PageWrapper from '../Layout/PageWrapper';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import ProjectsTeaser from './ProjectsTeaser';
import FinalCTA from './FinalCTA';

const CTA_BUTTON_TEXT_VARIANTS = ["Get Started Today", "Request a Free Quote"];
const CTA_STORAGE_KEY = 'cta_button_variant';
const CTA_CLICK_EVENT = 'cta_button_click';

const HERO_TEXT_CONFIG = {
  'Branding & Identity': {
    title: "Let's Craft a Brand That Defines the Future.",
    subtitle: "Ignite your identity and connect deeply with your audience."
  },
  'Web Design & Development': {
    title: "Your Vision, Beautifully Built Online.",
    subtitle: "Creating stunning and functional websites that drive results."
  },
  'Digital Marketing': {
    title: "Amplify Your Reach, Ignite Your Growth.",
    subtitle: "Strategic online campaigns that deliver measurable success."
  },
  default: {
    title: "Welcome to RocVille — Creative Power, Amplified!",
    subtitle: "Building the Digital Empires of Tomorrow."
  }
};

const CTA_TEXT_CONFIG = {
  scrolledPast: {
    'Web Design & Development': {
      headline: "Ready to launch your new website?",
      supportingText: "Let's make your online presence shine."
    },
    'Branding & Identity': {
      headline: "Ready to define your brand's future?",
      supportingText: "Craft a lasting impression with our expertise."
    },
    'Digital Marketing': {
      headline: "Ready to grow your business online?",
      supportingText: "Unlock your digital potential with strategic marketing."
    },
    default: { // Default when scrolled past but no specific service match
      headline: "Curious about our services?",
      supportingText: "Explore how we can help you achieve your goals."
    }
  },
  notScrolledPastDefault: { // Default texts when not scrolled past
    headline: "Ready to take your brand to the next level?",
    supportingText: "Let’s chat and make it happen."
  }
};

const Homepage = () => {
  const {
    pageViews,
    serviceClicks,
    trackPageView,
    trackServiceClick,
    trackPortfolioHover,
    trackScroll,
    getMostClickedService,
    trackCustomEvent,
  } = useAIBehavior();

  const [ctaButtonText, setCtaButtonText] = useState(CTA_BUTTON_TEXT_VARIANTS[0]);
  const mostClickedService = getMostClickedService(); // Assuming getMostClickedService() is synchronous

  const initialHeroTexts = HERO_TEXT_CONFIG[mostClickedService] || HERO_TEXT_CONFIG.default;
  const [heroTitle, setHeroTitle] = useState(initialHeroTexts.title);
  const [heroSubtitle, setHeroSubtitle] = useState(initialHeroTexts.subtitle);

  const initialCtaTexts = CTA_TEXT_CONFIG.notScrolledPastDefault;
  const [ctaHeadline, setCtaHeadline] = useState(initialCtaTexts.headline);
  const [ctaSupportingText, setCtaSupportingText] = useState(initialCtaTexts.supportingText);

  const [scrolledPastServices, setScrolledPastServices] = useState(false);
  const servicesRef = useRef(null);

  const updateHeroContent = useCallback(() => {
    const newHeroTexts = HERO_TEXT_CONFIG[mostClickedService] || HERO_TEXT_CONFIG.default;
    setHeroTitle(newHeroTexts.title);
    setHeroSubtitle(newHeroTexts.subtitle);
  }, [mostClickedService]);

  const updateCtaTextBasedOnScrollAndPreference = useCallback(() => {
    let newCtaTexts;
    if (scrolledPastServices) {
      newCtaTexts = CTA_TEXT_CONFIG.scrolledPast[mostClickedService] || CTA_TEXT_CONFIG.scrolledPast.default;
    } else {
      // If not scrolled past, or if a more specific "not scrolled past" logic is needed for services,
      // it could be added here. For now, using the general default.
      newCtaTexts = CTA_TEXT_CONFIG.notScrolledPastDefault;
    }
    setCtaHeadline(newCtaTexts.headline);
    setCtaSupportingText(newCtaTexts.supportingText);
  }, [scrolledPastServices, mostClickedService]);

  useEffect(() => {
    try {
      const storedVariant = localStorage.getItem(CTA_STORAGE_KEY);
      if (storedVariant) {
        setCtaButtonText(storedVariant);
      } else {
        const randomIndex = Math.floor(Math.random() * CTA_BUTTON_TEXT_VARIANTS.length);
        const variant = CTA_BUTTON_TEXT_VARIANTS[randomIndex];
        setCtaButtonText(variant);
        localStorage.setItem(CTA_STORAGE_KEY, variant);
      }
    } catch (error) {
      console.error("Error interacting with localStorage:", error);
      setCtaButtonText(CTA_BUTTON_TEXT_VARIANTS[0]);
    }
  }, []);

  const trackCtaClick = useCallback(() => {
    trackCustomEvent(CTA_CLICK_EVENT, { variant: ctaButtonText });
  }, [trackCustomEvent, ctaButtonText]);

  const prioritizedServices = useMemo(() => {
    return [...allServices].sort((a, b) => (serviceClicks[b.name] || 0) - (serviceClicks[a.name] || 0));
  }, [serviceClicks]);

  const personalizedTestimonials = useMemo(() => {
    if (!mostClickedService) return testimonialsData.slice(0, 2);
    return testimonialsData.filter(t => t.service === mostClickedService);
  }, [mostClickedService]);

  useEffect(() => {
    trackPageView(); // Assuming trackPageView is stable and handles its own logic for multiple calls
  }, [trackPageView]);

  useEffect(() => {
    updateHeroContent();
    updateCtaTextBasedOnScrollAndPreference();
  }, [updateHeroContent, updateCtaTextBasedOnScrollAndPreference]);


  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current) return;
      const top = servicesRef.current.offsetTop;
      const halfway = window.scrollY + window.innerHeight / 2;
      setScrolledPastServices(halfway > top);
      trackScroll(halfway > top ? 'pastServices' : 'beforeServices');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScroll]);

  return (
    <PageWrapper>
      <div className="pt-header pb-section bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black">
        <div className="container px-4 mx-auto">
          {/* Hero Section */}
          <Section className="p-12 text-center bg-white rounded-lg shadow-lg dark:bg-midnight-blue bg-opacity-80 dark:bg-opacity-80 mb-section dark:shadow-none">
            <h1 className="mb-4 text-4xl font-bold font-display text-electric-blue dark:text-highlight-yellow">{heroTitle}</h1>
            <p className="mb-6 text-lg text-midnight-blue dark:text-soft-white">{heroSubtitle}</p>
            <div className="space-x-4">
              <Link
                to={ROUTES.PORTFOLIO}
                className="px-6 py-3 transition-colors duration-300 rounded-md shadow-md bg-electric-blue dark:bg-highlight-yellow text-soft-white dark:text-rich-black hover:bg-blue-700 dark:hover:bg-yellow-500 dark:shadow-none"
                aria-label="View our previous projects"
              >
                View Our Work
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="px-6 py-3 transition-colors duration-300 border rounded-md shadow-md border-electric-blue dark:border-highlight-yellow text-electric-blue dark:text-highlight-yellow hover:bg-blue-100 dark:hover:bg-yellow-100 dark:shadow-none"
                aria-label="Request a quote for our services"
              >
                Get a Quote
              </Link>
            </div>
          </Section>

          {/* Services Section */}
          <ServicesSection
            ref={servicesRef}
            prioritizedServices={prioritizedServices}
            trackServiceClick={trackServiceClick}
            mostClickedService={mostClickedService}
            pageViews={pageViews}
          />

          {/* Testimonials Section */}
          <TestimonialsSection personalizedTestimonials={personalizedTestimonials} />

          {/* Portfolio Teaser */}
          <ProjectsTeaser PROJECTS={PROJECTS} trackPortfolioHover={trackPortfolioHover} />

          {/* Final Call-to-Action */}
          <FinalCTA
            ctaHeadline={ctaHeadline}
            ctaSupportingText={ctaSupportingText}
            ctaButtonText={ctaButtonText}
            trackCtaClick={trackCtaClick}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Homepage;