// /types/index.ts
export interface Lead {
  name: string;
  company: string;
  email: string;
  status: 'new' | 'contacted' | 'closed';
  industry?: string;
  location?: string;
}