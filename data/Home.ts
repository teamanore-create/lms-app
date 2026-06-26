import {
   CheckCircle,
  Award, Users, BookOpen, TrendingUp, Building2, Layers,
  Settings, Cloud, Cpu, BarChart2, Shield, Globe, Zap, Target, MapPin
} from 'lucide-react';
export const statsData = [
  { label: 'Students Trained', value: 25000, suffix: '+', icon: Users },
  { label: 'Courses Available', value: 48, suffix: '+', icon: BookOpen },
  { label: 'Certified Instructors', value: 32, suffix: '', icon: Award },
  { label: 'Countries Reached', value: 65, suffix: '+', icon: Globe },
];

 export const technologies = [
  { name: 'Autodesk Revit', icon: Building2, color: 'bg-blue-50 text-blue-600', desc: 'BIM Architecture & Structure' },
  { name: 'AutoCAD', icon: Layers, color: 'bg-orange-50 text-orange-600', desc: '2D Drafting & 3D Design' },
  { name: 'Navisworks', icon: Settings, color: 'bg-green-50 text-green-600', desc: 'Coordination & Clash Detection' },
  { name: 'Civil 3D', icon: MapPin, color: 'bg-teal-50 text-teal-600', desc: 'Infrastructure & Survey' },
  { name: 'Dynamo', icon: Cpu, color: 'bg-purple-50 text-purple-600', desc: 'Visual Programming & Automation' },
  { name: 'Autodesk ACC', icon: Cloud, color: 'bg-sky-50 text-sky-600', desc: 'Cloud Project Delivery' },
  { name: 'BIM Management', icon: BarChart2, color: 'bg-rose-50 text-rose-600', desc: 'ISO 19650 & Strategy' },
  { name: 'Revit MEP', icon: Zap, color: 'bg-yellow-50 text-yellow-600', desc: 'MEP Systems & Services' },
];

export const services = [
  {
    icon: Building2,
    title: 'BIM Consultancy',
    desc: 'End-to-end BIM implementation for construction and engineering firms, from strategy to execution.',
    color: 'bg-primary-600',
  },
  {
    icon: Shield,
    title: 'BIM Standards & EIR',
    desc: 'Develop robust Employer Information Requirements and BIM Execution Plans aligned with ISO 19650.',
    color: 'bg-accent-500',
  },
  {
    icon: Layers,
    title: 'Model Coordination',
    desc: 'Multi-discipline clash detection and coordination to eliminate conflicts before construction begins.',
    color: 'bg-green-600',
  },
  {
    icon: Target,
    title: 'Digital Twin Strategy',
    desc: 'Future-proof your assets with connected digital twin frameworks for operation and maintenance.',
    color: 'bg-purple-600',
  },
];

export const whyChooseUs = [
  { icon: Award, title: 'Autodesk Authorized', desc: 'Certified training center with Autodesk-approved curriculum and instructors.' },
  { icon: Users, title: 'Industry Experts', desc: 'Learn from practitioners with 10–20 years of real-world BIM project experience.' },
  { icon: CheckCircle, title: 'Job-Ready Skills', desc: 'Practical, project-based learning that prepares you for immediate on-the-job application.' },
  { icon: Globe, title: 'Globally Recognized', desc: 'Certifications respected by leading firms including AECOM, Arup, WSP, and Turner.' },
  { icon: TrendingUp, title: 'Career Support', desc: 'Resume reviews, LinkedIn optimization, and interview coaching included.' },
  { icon: Zap, title: 'Lifetime Access', desc: 'Purchase once, access forever — including all future course updates.' },
];

 export const roadmapSteps = [
  { step: '01', title: 'BIM Foundations', tools: ['AutoCAD Basics', 'Revit Introduction', 'BIM Concepts'], color: 'bg-primary-600' },
  { step: '02', title: 'Core Software', tools: ['Revit Architecture', 'Civil 3D', 'Revit MEP'], color: 'bg-accent-500' },
  { step: '03', title: 'Coordination', tools: ['Navisworks', 'ACC Platform', 'BIM 360'], color: 'bg-green-600' },
  { step: '04', title: 'Advanced Skills', tools: ['Dynamo Scripting', 'BIM Management', 'ISO 19650'], color: 'bg-purple-600' },
];

 export const faqs = [
  {
    q: 'Do I need prior BIM experience to enroll?',
    a: 'No. Most of our courses start from beginner level. We recommend starting with our AutoCAD or Revit Introduction course if you are completely new to BIM.',
  },
  {
    q: 'Are the certifications industry-recognized?',
    a: 'Yes. Our certificates are recognized globally and backed by our status as an Autodesk Authorized Training Center. Many students use them when applying to firms like AECOM, Arup, and Skanska.',
  },
  {
    q: 'Can I access the courses on mobile?',
    a: 'Absolutely. All courses are fully optimized for desktop, tablet, and mobile devices so you can learn wherever you are.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a 30-day money-back guarantee on all courses. If you are not satisfied for any reason, contact our support team for a full refund.',
  },
  {
    q: 'Do you offer corporate training packages?',
    a: 'Yes, we offer tailored corporate training programs for teams of any size. Contact our consultancy team to discuss your organization\'s needs.',
  },
  {
    q: 'How long do I have access to course content?',
    a: 'You get lifetime access to all course content including future updates. Once enrolled, the content is yours forever.',
  },
];

export const companyLogos = [
  'AECOM', 'Arup', 'Skanska', 'WSP', 'Turner', 'HDR', 'JACOBS', 'Stantec',
];