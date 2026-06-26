import { Building2, Shield, Layers, Target, BarChart2, Cpu} from 'lucide-react';

export const services = [
  {
    icon: Building2,
    title: 'BIM Implementation',
    desc: 'Full-scale BIM implementation from strategy development through to project delivery. We assess your current state, define your BIM roadmap, and provide hands-on support throughout execution.',
    features: ['BIM Maturity Assessment', 'Strategy & Roadmap Development', 'Software Selection & Licensing', 'Staff Training & Onboarding', 'Template & Standard Library Creation'],
    color: 'bg-primary-600',
    light: 'bg-primary-50',
    text: 'text-primary-600',
  },
  {
    icon: Shield,
    title: 'BIM Standards & EIR',
    desc: 'Develop robust, ISO 19650-compliant information management frameworks including Employer Information Requirements, BIM Execution Plans, and project standards.',
    features: ['Employer Information Requirements (EIR)', 'BIM Execution Plans (BEP)', 'ISO 19650 Compliance Review', 'Common Data Environment Setup', 'Data Dictionary & Classification'],
    color: 'bg-accent-500',
    light: 'bg-accent-50',
    text: 'text-accent-600',
  },
  {
    icon: Layers,
    title: 'Model Coordination',
    desc: 'Multi-discipline BIM coordination services to identify and resolve design conflicts before construction begins, reducing costly on-site changes.',
    features: ['Federated Model Management', 'Clash Detection & Resolution', 'Coordination Meeting Facilitation', 'Issue Tracking & Reporting', 'Navisworks & ACC Coordination'],
    color: 'bg-green-600',
    light: 'bg-green-50',
    text: 'text-green-600',
  },
  {
    icon: Target,
    title: 'Digital Twin Strategy',
    desc: 'Create connected digital twin frameworks that link your BIM data to operations and maintenance systems for better asset lifecycle management.',
    features: ['Asset Information Model Development', 'IoT Integration Strategy', 'FM System Integration', 'COBie Data Production', 'Long-Term Asset Management'],
    color: 'bg-purple-600',
    light: 'bg-purple-50',
    text: 'text-purple-600',
  },
  {
    icon: BarChart2,
    title: 'BIM Auditing & Quality',
    desc: 'Independent BIM audit and quality assurance services to ensure your models and information meet contractual and technical requirements.',
    features: ['Model Audit & QA Review', 'BIM Compliance Assessment', 'NBS Specification Checking', 'Model Health Reports', 'Third-Party Validation'],
    color: 'bg-rose-600',
    light: 'bg-rose-50',
    text: 'text-rose-600',
  },
  {
    icon: Cpu,
    title: 'Automation & Innovation',
    desc: 'Leverage Dynamo, Python, and APIs to automate repetitive BIM workflows and drive efficiency across your design and construction operations.',
    features: ['Dynamo Script Development', 'Revit API Customization', 'Automated Reporting', 'Data Pipeline Development', 'Custom Revit Families & Templates'],
    color: 'bg-sky-600',
    light: 'bg-sky-50',
    text: 'text-sky-600',
  },
];

export const clients = [
  { sector: 'Infrastructure', count: '40+', desc: 'Major infrastructure projects including airports, highways, and rail' },
  { sector: 'Commercial', count: '85+', desc: 'Office towers, retail centers, and mixed-use developments' },
  { sector: 'Healthcare', count: '25+', desc: 'Hospitals, medical centers, and research facilities' },
  { sector: 'Education', count: '30+', desc: 'Universities, schools, and research campuses' },
];

export const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn about your project, current BIM maturity, and specific challenges.' },
  { step: '02', title: 'Assessment', desc: 'Our experts evaluate your existing workflows, tools, and team capabilities.' },
  { step: '03', title: 'Proposal', desc: 'We deliver a tailored service proposal with clear scope, timeline, and investment.' },
  { step: '04', title: 'Delivery', desc: 'Our team executes the engagement with regular updates and quality checkpoints.' },
  { step: '05', title: 'Handover', desc: 'We transfer knowledge and documentation to your team for long-term success.' },
];
