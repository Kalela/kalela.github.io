import { Project } from './models';

export const PROJECTS: Project[] = [
  {
    title: 'Peja Newsletter',
    company: 'Sonder Softwares',
    description:
      'Peja is a daily newsletter that provides Kenyan news to each subscriber every morning. The mission is to make each subscriber better versed in the country’s state each day.',
    url: 'https://peja-newsletter.net',
    tech: ['Spring Boot · Java', 'MySQL · Kubernetes', 'Angular'],
    image: 'assets/images/work/peja.png',
  },
  {
    title: 'Meet My Blank',
    company: 'Upwork',
    description:
      'A lead and referral tracking system for professionals — designed and maintained end to end.',
    url: 'https://meetmyblank.com',
    tech: ['Java · Flutter', 'Docker', 'GCP'],
    image: 'assets/images/work/meetmyblank.svg',
  },
];
