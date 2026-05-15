import React from 'react';
import { 
  Code2, 
  Target, 
  Palette, 
  MousePointer2, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Cloud, 
  Zap, 
  Cpu, 
  MessageSquare 
} from 'lucide-react';

export const SERVICES_DATA = [
  {
    id: 'software-dev',
    icon: <Code2 />,
    title: 'Software Development',
    desc: 'Bespoke software solutions engineered for complex business requirements, focusing on scalability and robust architecture.',
    details: [
      'Custom Enterprise Resource Planning (ERP)',
      'SaaS Platform Architecture & Development',
      'Legacy System Modernization & Refactoring',
      'Complex System Integration Services',
      'Database Design, Optimization & Migration',
      'Custom API Development & Management',
      'Microservices Architecture Design',
      'Desktop Application Development',
      'Real-time Data Processing Systems',
      'Blockchain & Smart Contract Integration'
    ]
  },
  {
    id: 'digital-marketing',
    icon: <Target />,
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies to amplify your brand presence and drive high-quality lead generation across all digital channels.',
    details: [
      'Search Engine Marketing (SEM) Strategy',
      'Social Media Marketing (SMM) Campaigns',
      'High-Conversion Content Marketing',
      'PPC (Pay-Per-Click) Campaign Management',
      'Marketing Automation & CRM Integration',
      'Email Marketing & Lead Nurturing',
      'Influencer Marketing Coordination',
      'Comprehensive Digital Brand Audits',
      'Marketing Analytics & ROI Tracking',
      'Conversion Rate Optimization (CRO)'
    ]
  },
  {
    id: 'website-designing',
    icon: <Palette />,
    title: 'Website Designing',
    desc: 'Creative and intuitive web designs that capture your brand essence while providing world-class user experiences across all devices.',
    details: [
      'Comprehensive UI/UX Wireframing',
      'Responsive & Adaptive Web Design',
      'Full Visual Identity & Branding',
      'Interactive Prototyping (Figma/Adobe XD)',
      'Custom Graphic Asset & Icon Creation',
      'Motion Design & Micro-interactions',
      'Accessibility (WCAG) Focused Design',
      'Mobile-First Design Philosophy',
      'Design Systems & UI Pattern Libraries',
      'User Research & Usability Testing'
    ]
  },
  {
    id: 'web-dev',
    icon: <MousePointer2 />,
    title: 'Web Development',
    desc: 'Building modern, fast, and secure websites using the latest web technologies and industry-leading performance standards.',
    details: [
      'Modern Frontend (React, Vue, Next.js)',
      'Robust Backend Architecture (Node.js, Go)',
      'Progressive Web App (PWA) Development',
      'Core Web Vitals & Speed Optimization',
      'Security Hardening & SSL Integration',
      'Custom CMS Development & Integration',
      'Single Page Application (SPA) Experts',
      'Static Site Generation (SSG) for Speed',
      'Web-based Tool & Calculator Dev',
      'Third-party API & Webhook Integration'
    ]
  },
  {
    id: 'app-dev',
    icon: <Smartphone />,
    title: 'App Development',
    desc: 'Creating powerful mobile applications for both iOS and Android to connect with your customers in the most personal way possible.',
    details: [
      'Native iOS (Swift) Development',
      'Native Android (Kotlin) Development',
      'Cross-Platform (React Native/Flutter)',
      'Scalable Mobile Backend Infrastructure',
      'App Store Optimization (ASO) Strategy',
      'Mobile Payment Gateway Integration',
      'Biometric & Social Login Integration',
      'Real-time Messaging & Push Notifications',
      'Offline-First Data Storage Solutions',
      'Wearable & IoT Device Connectivity'
    ]
  },
  {
    id: 'ecommerce-dev',
    icon: <Smartphone />,
    title: 'E-Commerce Development',
    desc: 'End-to-end e-commerce solutions that convert visitors into loyal customers with seamless, secure, and fast shopping experiences.',
    details: [
      'Custom Shopping Cart Engineering',
      'Multi-currency Payment Integration',
      'Advanced Inventory Management Systems',
      'Multi-vendor Marketplace Platforms',
      'B2B & Wholesale E-commerce Portals',
      'Shopify, Magento & WooCommerce Setup',
      'Product Recommendation Engines',
      'Customer Loyalty & Reward Programs',
      'Abandoned Cart Recovery Systems',
      'Seamless Logistics & Shipping Sync'
    ]
  },
  {
    id: 'app-maintenance',
    icon: <ShieldCheck />,
    title: 'App Maintenance',
    desc: 'Ensuring your digital products stay up-to-date, secure, and performant long after the initial launch through professional support.',
    details: [
      'Critical Security Patching & Audits',
      'OS Version & Library Compatibility',
      'Continuous Bug Fixing & Stabilization',
      'Performance Monitoring & Tuning',
      'Feature Enhancements & Scaling',
      '24/7 Server & Uptime Monitoring',
      'Database Backup & Recovery Plans',
      'Content Updates & Media Management',
      'User Feedback Implementation',
      'Monthly Technical Health Reports'
    ]
  },
  {
    id: 'software-testing',
    icon: <CheckCircle2 />,
    title: 'Software Testing',
    desc: 'Rigorous Quality Assurance processes to ensure your software is bug-free, fast, and meets the highest industry standards.',
    details: [
      'Automated Regression Test Suites',
      'Detailed Manual Functional Testing',
      'Load, Stress & Scalability Testing',
      'Security Penetration & Vulnerability',
      'User Acceptance Testing (UAT) Flows',
      'Cross-Browser & Platform Testing',
      'API Performance & Schema Validation',
      'Usability & UX Compliance Testing',
      'Mobile Device Fragmentation Testing',
      'Continuous Integration Testing'
    ]
  },
  {
    id: 'web-app-dev',
    icon: <Code2 />,
    title: 'Web App Development',
    desc: 'Complex single-page applications and enterprise-grade web tools built for maximum performance, security, and scale.',
    details: [
      'Enterprise Single Page Apps (SPA)',
      'Real-time Collaboration & Dashboards',
      'Internal Business Productivity Tools',
      'Cloud-Native Cloud App Engineering',
      'API-First System Architecture',
      'Complex Data Visualization Systems',
      'Large Scale Content Management',
      'Customer Portals & Client Areas',
      'Complex Algorithmic Web Tools',
      'Multi-tenant Architecture Systems'
    ]
  },
  {
    id: 'web-hosting',
    icon: <Cloud />,
    title: 'Web Hosting',
    desc: 'High-availability, secure, and lightning-fast hosting solutions managed by our expert DevOps team on global cloud infrastructure.',
    details: [
      'Managed Cloud Hosting (AWS/GCP)',
      'SSL Certificate & DNS Management',
      'Automatic Hourly Cloud Backups',
      'Global Content Delivery Network (CDN)',
      'Auto-scaling Server Infrastructure',
      'Dedicated Server Resource Allocation',
      'E-mail Server Setup & Management',
      'Web Application Firewall (WAF)',
      'DDoS Protection & Mitigation',
      'Uptime Monitoring & Alerting'
    ]
  },
  {
    id: 'website-redesign',
    icon: <Zap />,
    title: 'Website Redesign',
    desc: 'Transforming your outdated website into a modern, high-converting digital storefront using the latest web technologies.',
    details: [
      'Legacy Codebase Modernization',
      'Modern UI/UX Visual Refresh',
      'Mobile-First & Fluid Adaptation',
      'SEO Value Preservation Migration',
      'Conversion Flow Optimization',
      'Speed & Performance Overhaul',
      'New Feature Layer Integration',
      'Accessibility Compliance Update',
      'Brand Evolution Implementation',
      'Framework Migration Services'
    ]
  },
  {
    id: 'mobile-app-dev',
    icon: <Smartphone />,
    title: 'Mobile App Development',
    desc: 'Advanced mobile experiences focusing on extreme user engagement and smooth native performance across all platforms.',
    details: [
      'Deep Performance Optimization',
      'Complex Push Notification Logic',
      'Custom In-App Analytics Setup',
      'Secure Multi-factor Auth Flows',
      'Robust Offline Data Synchronization',
      'Location-Based Services & Maps',
      'Social Platform Ecosystem Sync',
      'Camera & Media API Integration',
      'Custom App Animations & Transitions',
      'Deep Linking & Universal Links'
    ]
  },
  {
    id: 'iot-development',
    icon: <Cpu />,
    title: 'IOT Development',
    desc: 'Connecting physical devices and extracting business intelligence through cutting-edge Internet of Things engineering.',
    details: [
      'Smart Industrial Device Integration',
      'Real-time Sensor Data Monitoring',
      'IoT Edge Computing Logic',
      'Live Data Visualization Dashboards',
      'Secure Firmware Development',
      'MQTT & Low-latency Protocols',
      'Predictive Maintenance Algorithms',
      'Device Fleet Management Systems',
      'IoT Security & Data Encryption',
      'Voice Assistant (Alexa/Siri) Sync'
    ]
  },
  {
    id: 'seo',
    icon: <Target />,
    title: 'SEO Services',
    desc: 'Dominating search engine results to drive sustainable organic traffic and establish your authority in your specific niche.',
    details: [
      'Strategic Keyword Gap Analysis',
      'Full Technical SEO Infrastructure',
      'High-Authority Backlink Acquisition',
      'Local Business GMB Optimization',
      'Semantic Content Strategy Planning',
      'Rich Snippet & Schema Markup',
      'Video & Image Search SEO',
      'Detailed Monthly Traffic Reporting',
      'Competitor SEO Benchmarking',
      'Voice Search Optimization'
    ]
  },
  {
    id: 'smo',
    icon: <MessageSquare />,
    title: 'SMO Services',
    desc: 'Strategic social media optimization to build massive community engagement and iron-clad brand loyalty across all platforms.',
    details: [
      'Social Profile Identity Optimization',
      'Community Engagement Strategies',
      'Viral Content Calendar Creation',
      'Social Analytics & Trend Reporting',
      'Audience Persona Development',
      'Brand Storytelling & Narrative',
      'Facebook, Instagram & LinkedIn',
      'Real-time Social Listening',
      'Crisis Management Planning',
      'Platform-Specific Content Custom'
    ]
  }
];

export const SERVICE_MAPPING: Record<string, string> = {
  'SOFTWARE DEVELOPMENT': 'software-dev',
  'DIGITAL MARKETING': 'digital-marketing',
  'WEBSITE DESIGNING': 'website-designing',
  'WEB DEVELOPMENT': 'web-dev',
  'APP DEVELOPMENT': 'app-dev',
  'E-COMMERCE DEVELOPMENT SERVICE': 'ecommerce-dev',
  'APP MAINTENANCE SERVICES': 'app-maintenance',
  'SOFTWARE TESTING': 'software-testing',
  'WEB APP DEVELOPMENT': 'web-app-dev',
  'WEB HOSTING': 'web-hosting',
  'WEBSITE REDESIGN': 'website-redesign',
  'MOBILE APP DEVELOPMENT': 'mobile-app-dev',
  'IOT DEVELOPMENT': 'iot-development',
  'SEO': 'seo',
  'SMO': 'smo'
};
