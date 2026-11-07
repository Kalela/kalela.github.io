import { Certification } from './models';

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'September 2025',
    image: 'assets/images/certificates/aws-solutions-architect-associate.png',
    credlyUrl:
      'https://www.credly.com/badges/79175da0-716b-42f7-9d3c-61ba05986797/public_url',
  },
  {
    name: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'The Linux Foundation',
    date: 'May 2024',
    image:
      'assets/images/certificates/ckad-certified-kubernetes-application-developer.png',
    credlyUrl:
      'https://www.credly.com/badges/303ebc56-a2c2-4d2c-ada9-935bd107ca64/public_url',
  },
];
