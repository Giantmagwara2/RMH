import { Lead } from '../../types'; // Assuming your Lead type is in /types/index.ts

export async function generateLeads(
  keywords: string[],
  region?: string
): Promise<Lead[]> {
  console.log(
    `Simulating lead generation for keywords: "${keywords.join(', ')}"${
      region ? ` in region: "${region}"` : ''
    }`
  );
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return a fixed set of dummy leads
  return [
    { name: 'Jane Doe', company: 'BrandLabs', email: 'jane@brandlabs.com', status: 'new' },
    { name: 'Elon West', company: 'RocketStudio', email: 'elon@rocketstudio.io', status: 'new' },
    { name: 'Sara Pixel', company: 'PixelNest', email: 'sara@pixelnest.org', status: 'new' },
    { name: 'Mike Alpha', company: 'CreativeForge', email: 'mike@creativeforge.net', status: 'new' }
  ].map(lead => ({ ...lead, industry: keywords[0] || 'General', location: region || 'Global' })); // Add some dynamic data based on input
}