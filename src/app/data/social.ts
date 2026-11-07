import { SocialLink } from './models';

export const EMAIL = 'philipkalela@gmail.com';
export const PHONE = '+254717174985';
export const RESUME_URL =
  'https://docs.google.com/document/d/1clZP-0ho2EkoRYV1V6URTT4TLuYVSaNNjuSfZkOulqs/edit?usp=sharing';

export const GITHUB_URL = 'https://github.com/Kalela';
export const UPWORK_URL =
  'https://www.upwork.com/freelancers/~0141ac78cabeab07fa';
export const LINKEDIN_URL =
  'https://www.linkedin.com/in/philip-kalela-18b7b414b/';

export const SOCIALS: SocialLink[] = [
  { icon: 'upwork', href: UPWORK_URL, ariaLabel: 'Upwork profile' },
  { icon: 'github', href: GITHUB_URL, ariaLabel: 'GitHub profile' },
  { icon: 'linkedin', href: LINKEDIN_URL, ariaLabel: 'LinkedIn profile' },
  { icon: 'phone', href: `tel:${PHONE}`, ariaLabel: 'Call Philip' },
  { icon: 'envelope', href: `mailto:${EMAIL}`, ariaLabel: 'Email Philip' },
];
