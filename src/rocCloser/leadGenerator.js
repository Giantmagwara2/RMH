// src/rocCloser/leadGenerator.js
// Lead generation logic for RocCloser

const DEFAULT_INDUSTRIES = ['Tech', 'Healthcare', 'Finance', 'Retail', 'Education', 'Manufacturing', 'Real Estate', 'Hospitality', 'Design & Branding'];
const DEFAULT_LOCATIONS = ['New York, USA', 'London, UK', 'Berlin, Germany', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Toronto, Canada', 'Cape Town, South Africa'];
const FIRST_NAMES = ['Alex', 'Jamie', 'Chris', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Drew'];
const LAST_NAMES = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];

/**
 * Helper function to get a random element from an array.
 * @param {Array<T>} arr - The array to pick from.
 * @returns {T} A random element from the array.
 * @template T
 */
function getRandomElement(arr) {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a mock phone number.
 * @returns {string} A mock phone number.
 */
function generateMockPhoneNumber() {
  return `+1-${Math.floor(200 + Math.random() * 799)}-${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`;
}

/**
 * Generate a list of qualified leads (MVP: returns mock data)
 * @param {Object} options
 * @param {number} options.count - Number of leads to generate
 * @param {string[]} [options.industries=[]] - Specific industries to target. If empty, uses default list.
 * @param {string[]} [options.locations=[]] - Specific locations to target. If empty, uses default list.
 * @returns {Promise<Array<{
 *   name: string,
 *   website: string,
 *   industry: string,
 *   location: string,
 *   contactPerson: string,
 *   email: string,
 *   phone: string,
 *   score: number
 * }>>} A promise that resolves to an array of lead objects.
 */
async function generateLeads({ count = 10, industries = [], locations = [] } = {}) {
  // TODO: Replace with real web/API scraping logic

  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

  const targetIndustries = industries && industries.length > 0 ? industries : DEFAULT_INDUSTRIES;
  const targetLocations = locations && locations.length > 0 ? locations : DEFAULT_LOCATIONS;

  const mockLeads = Array.from({ length: count }, (_, i) => ({
    name: `Business Prospect ${i + 1}`,
    website: `https://prospect${i + 1}.com`,
    industry: getRandomElement(targetIndustries) || 'Unknown Industry',
    location: getRandomElement(targetLocations) || 'Unknown Location',
    contactPerson: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`,
    email: `contact.person${i + 1}@prospect${i + 1}.com`,
    phone: generateMockPhoneNumber(),
    score: Math.floor(50 + Math.random() * 51), // Score between 50 and 100
  }));

  return mockLeads;
}

module.exports = { generateLeads };
