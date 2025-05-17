// src/constants/teamData.js

/**
 * @typedef {object} SocialLinks
 * @property {string} [linkedin] - URL to LinkedIn profile.
 * @property {string} [twitter] - URL to Twitter profile.
 * @property {string} [github] - URL to GitHub profile.
 * @property {string} [portfolio] - URL to a personal portfolio or website.
 */

/**
 * @typedef {object} TeamMember
 * @property {string|number} id - Unique identifier for the team member.
 * @property {string} name - The name of the team member.
 * @property {string} role - The role or title of the team member.
 * @property {string} imageUrl - URL or path to the team member's image.
 * @property {string} bio - A short biography of the team member.
 * @property {SocialLinks} [socials] - Object containing social media links.
 */

/** @type {TeamMember[]} */
export const teamMembers = [ // Changed to named export 'teamMembers'
  {
    id: 1,
    name: 'Jane Doe',
    role: 'CEO & Founder',
    imageUrl: '/assets/images/team/jane-doe.jpg', // Example path
    bio: 'Jane is the visionary behind RocVille Media House...',
    socials: {
      linkedin: 'https://linkedin.com/in/janedoe',
      twitter: 'https://twitter.com/janedoe',
    }
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Lead Developer',
    imageUrl: '/assets/images/team/john-smith.jpg', // Example path
    bio: 'John leads our talented development team...',
    socials: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith',
    }
  },
  // Add more team members as needed
];
