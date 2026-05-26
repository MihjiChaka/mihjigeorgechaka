export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  companyUrl: string;
  image: string;
  tagline: string;
  services: string[];
  challenge?: string;
  solution?: string;
  impact?: string;
  gitLogs?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  comment: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  items: string[];
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  description: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  label: string;
}

export interface ContactChannel {
  id: string;
  name: string;
  url: string;
  label: string;
}
