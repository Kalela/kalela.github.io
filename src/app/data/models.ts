export interface Project {
  title: string;
  company?: string;
  description: string;
  url: string;
  tech: string[];
  image: string;
}

export type JobIcon =
  | { type: 'image'; src: string; alt: string }
  | { type: 'fa'; name: string; bg?: string };

export interface Job {
  title: string;
  company: string;
  duration: string;
  description: string;
  url: string;
  icon: JobIcon;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
  credlyUrl: string;
}

export interface SocialLink {
  /** Font Awesome icon key, resolved in the component. */
  icon: string;
  href: string;
  ariaLabel: string;
}
