import { Job } from './models';

export const JOBS: Job[] = [
  {
    title: 'Software Engineer',
    company: 'CarePay DevCo, Kenya',
    duration: 'January 2023 – Present',
    description:
      'Designed and maintained microservices for a healthcare claims platform handling thousands of daily transactions; optimized Spring Boot services (JPA, Kafka, GraphQL) to cut API latency; led architecture and debugging for distributed systems on Kubernetes. Tech: Java, Spring Boot, Kafka, GraphQL, Kubernetes, MySQL, Datadog.',
    url: 'https://www.carepay.com',
    icon: {
      type: 'image',
      src: 'assets/images/icons/carepay_icon.jpeg',
      alt: 'CarePay logo',
    },
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Upwork',
    duration: 'February 2021 – Present',
    description:
      'Designed and maintain Meet My Blank; built and optimized Appium test suites running on Docker; Top Rated freelancer with 100% client satisfaction. Tech: Java, Docker, Flutter, GCP.',
    url: 'https://www.upwork.com/freelancers/~0141ac78cabeab07fa',
    icon: {
      type: 'image',
      src: 'assets/images/icons/upwork_icon.png',
      alt: 'Upwork logo',
    },
  },
  {
    title: 'Software Engineer',
    company: 'TheJitu, Kenya',
    duration: 'August 2021 – December 2022',
    description:
      'Delivered backend features for enterprise clients; improved integration-test reliability and runtime; supported ReactJS frontend work and CI/CD on Jenkins and AWS. Tech: Java, Spring Boot, MyBatis, Jenkins, MySQL, CloudWatch.',
    url: 'https://thejitu.com/',
    icon: {
      type: 'image',
      src: 'assets/images/icons/thejitu.png',
      alt: 'TheJitu logo',
    },
  },
  {
    title: 'Software Engineer',
    company: 'Finaccess Kenya',
    duration: 'October 2019 – November 2020',
    description:
      'Built Spring Boot services for a ledger system with integrated credit scoring; implemented M-PESA statement ingestion pipelines for large-scale data extraction; designed REST APIs used by the Android mobile team. Tech: Java, Spring Boot (Spring Batch), MySQL, Native Android.',
    url: 'https://finaccess.co/',
    icon: { type: 'fa', name: 'house-laptop', bg: '#e91e63' },
  },
  {
    title: 'Game Developer',
    company: 'Motus Nova (remote via Andela)',
    duration: 'March 2019 – December 2019',
    description:
      'Developed and maintained Unity/C# rehabilitation games for robotic stroke-therapy devices; implemented gameplay logic and optimized interaction with the robotic engine. Tech: C#, Unity.',
    url: 'https://motusnova.com/',
    icon: {
      type: 'image',
      src: 'assets/images/icons/motus_icon.png',
      alt: 'Motus Nova logo',
    },
  },
  {
    title: 'Software Engineer',
    company: 'Andela Kenya',
    duration: 'March 2018 – April 2020',
    description:
      'Completed a full-time engineering training program in Java, Android and frontend technologies; contributed to internal and partner engineering projects while collaborating with top-class engineers in an agile environment. Tech: Java, Native Android, Unity/C#.',
    url: 'https://andela.com/',
    icon: {
      type: 'image',
      src: 'assets/images/icons/andela_icon.png',
      alt: 'Andela logo',
    },
  },
];
