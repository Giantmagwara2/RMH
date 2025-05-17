// src/types/index.ts

/**
 * Represents the status of a lead.
 */
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost';

/**
 * Interface for a sales lead or potential client.
 */
export interface Lead {
  id: string | number;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  industry?: string;
  location?: string;
  source?: string; // e.g., 'website', 'referral', 'advertisement'
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Interface for a portfolio project.
 */
export interface Project {
  id: string | number;
  title: string;
  description: string;
  clientName?: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies: string[];
  category: string; // e.g., 'Web Design', 'Branding', 'Marketing Campaign'
  dateCompleted: Date | string;
}

/**
 * Interface for a blog post.
 */
export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  content: string; // Could be Markdown or HTML
  excerpt?: string;
  author: string; // Could be an ID linking to a User/Author type
  publishedDate: Date | string;
  updatedDate?: Date | string;
  tags?: string[];
  category?: string;
  featuredImageUrl?: string;
}

/**
 * Interface for a service offered by the agency.
 */
export interface Service {
  id: string | number;
  name: string;
  description: string;
  icon?: string; // e.g., class name for an icon font, or SVG path
  features?: string[];
  pricingModel?: 'fixed' | 'hourly' | 'retainer' | 'custom';
}

/**
 * Interface for a contact form submission or message.
 */
export interface ContactMessage {
  id: string | number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  submittedAt: Date | string;
  isRead?: boolean;
}

/**
 * Interface for a case study.
 * This might extend Project or BlogPost or be distinct.
 */
export interface CaseStudy extends Omit<Project, 'projectUrl' | 'dateCompleted'> {
  challenge: string;
  solution: string;
  results: string; // e.g., "Increased conversion by 20%"
  testimonial?: Testimonial; // Optional link to a testimonial
  studyUrl: string; // URL to the full case study page
  publishedDate: Date | string;
}

/**
 * Interface for a team member.
 */
export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

/**
 * Interface for a client testimonial.
 */
export interface Testimonial {
  id: string | number;
  clientName: string;
  company?: string;
  quote: string;
  imageUrl?: string; // Client's photo or company logo
  projectId?: string | number; // Optional link to a project
}