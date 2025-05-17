import { Lead } from '../../types'; // Assuming types are now in src/types/index.ts
                                   // Adjust path if your types/index.ts is elsewhere,
                                   // e.g., '@/types' if you have path aliases.
let leadIdCounter = 0;
/**
 * Simulates the generation of leads based on keywords and an optional region.
 * This is a dummy implementation for testing and development purposes.
 *
 * @param keywords - An array of strings representing search keywords for lead generation.
 * @param region - An optional string specifying the geographical region for the search.
 * @returns A Promise that resolves to an array of Lead objects.
 */
export async function generateLeads(
  keywords: string[],
  region?: string
): Promise<Lead[]> {
  // Log the received parameters for debugging or monitoring.
  console.log(
    `🧠 [rocCloser] Simulating lead generation for keywords: "${keywords.join(', ')}"${
      region ? ` in region: "${region}"` : ''
    }`
  );

  // Simulate a small chance of an "API error" for demonstration
  if (Math.random() < 0.1 && !keywords.includes('noerror')) { // Add a keyword to bypass error for testing
    console.warn('🧠 [rocCloser] Simulating a lead generation API error.');
    throw new Error('Simulated API error: Failed to connect to lead generation service.');
  }

  // Simulate a network delay, as real lead generation would take time.
  const SIMULATED_DELAY_MS = 1500;
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  // Define a base set of dummy leads.
  // In a real scenario, this data would come from web scraping, APIs, or a database.
  const allPossibleLeads = [
    { name: 'Jane Doe', company: 'BrandLabs Inc.', email: 'jane.doe@brandlabs.com', phone: '555-0101', source: 'Website Inquiry' },
    { name: 'Elon West', company: 'RocketStudio Solutions', email: 'elon.w@rocketstudio.io', phone: '555-0102', source: 'Referral' },
    { name: 'Sara Pixel', company: 'PixelNest Creations', email: 's.pixel@pixelnest.org', phone: '555-0103', source: 'Advertisement' },
    { name: 'Mike Alpha', company: 'CreativeForge Co.', email: 'mike.alpha@creativeforge.net', phone: '555-0104', source: 'Cold Outreach' },
    { name: 'Lisa Ray', company: 'Innovatech', email: 'lisa.ray@innovatech.com', phone: '555-0105', source: 'Conference' },
    { name: 'Tom Byte', company: 'DataDriven LLC', email: 'tom.byte@datadriven.com', phone: '555-0106', source: 'Website Inquiry' },
    { name: 'Anna Vector', company: 'DesignSpark', email: 'anna.v@designspark.co', phone: '555-0107', source: 'Social Media' },
  ];

  // Simulate different results based on keywords
  if (keywords.some(kw => kw.toLowerCase().includes('empty') || kw.toLowerCase().includes('none'))) {
    console.log('🧠 [rocCloser] Simulating no leads found for the given criteria.');
    return [];
  }

  // Filter and select a random number of leads
  const numberOfLeadsToGenerate = Math.floor(Math.random() * (allPossibleLeads.length -1)) + 1; // Generate 1 to max leads
  const shuffledLeads = [...allPossibleLeads].sort(() => 0.5 - Math.random());
  const selectedBaseLeads = shuffledLeads.slice(0, numberOfLeadsToGenerate);

  // Enhance the base leads with dynamic information from the input parameters.
  const generatedLeads: Lead[] = selectedBaseLeads.map((baseLead) => {
    // Determine industry from the first keyword, or use a default.
    const primaryKeyword = keywords.length > 0 ? keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) : 'General Tech';
    // Use the provided region, or a default global value.
    const location = region || 'Global';
    const now = new Date();
    leadIdCounter +=1;

    return {
      ...baseLead,
      id: `lead-${Date.now()}-${leadIdCounter}`,
      industry: primaryKeyword,
      location: location,
      status: 'new', // All newly generated leads are marked with 'new' status.
      notes: `Generated based on keywords: ${keywords.join(', ')}. ${region ? `Region: ${region}.` : ''}`,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  });

  console.log(`🧠 [rocCloser] Successfully generated ${generatedLeads.length} lead(s).`);
  return generatedLeads;
}
