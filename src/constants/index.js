import {
  ReactComponent as WebDesignIconSvg
} from '../assets/icons/web-design.svg';
import {
  ReactComponent as BrandingIconSvg
} from '../assets/icons/branding.svg';
import {
  ReactComponent as MarketingIconSvg
} from '../assets/icons/marketing.svg';

/**
 * Icon lookup table.
 * In your components you can do:
 * import { serviceIcons } from '../constants';
 * const Icon = serviceIcons[service.iconKey];
 */
export const serviceIcons = {
  webDesign: WebDesignIconSvg,
  branding: BrandingIconSvg,
  digitalMarketing: MarketingIconSvg,
};

/**
 * Featured projects for the Portfolio teaser.
 * You can expand each entry with `title`, `image`, `link`, `category`, etc.
 */
export const projectsData = [
  {
    id: 'project-1',
    title: 'Indie Artist Branding',
    slug: 'indie-artist-branding',
    image: '/images/portfolio/project1.jpg',
    category: 'Music',
    link: '/portfolio/indie-artist-branding',
    description: 'Album artwork & digital campaign strategy for an up-and-coming artist.',
  },
  {
    id: 'project-2',
    title: 'Fashion Startup Rebrand',
    slug: 'fashion-startup-rebrand',
    image: '/images/portfolio/project2.jpg',
    category: 'Design',
    link: '/portfolio/fashion-startup-rebrand',
    description: 'Complete brand identity overhaul for a new fashion label.',
  },
  {
    id: 'project-3',
    title: 'Event Launch Campaign',
    slug: 'event-launch-campaign',
    image: '/images/portfolio/project3.jpg',
    category: 'Events',
    link: '/portfolio/event-launch-campaign',
    description: 'Experiential marketing and event design for a major product launch.',
  },
  // …add more projects here
];

/**
 * Define your application routes here.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  BLOG: '/blog',
  CONTACT: '/contact',
  // Add other routes as needed
};