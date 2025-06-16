import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const languages: Record<string, Language> = {
  en: { code: 'en', name: 'English', dir: 'ltr' },
  ar: { code: 'ar', name: 'العربية', dir: 'rtl' }
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    projects: 'Projects',
    resume: 'Resume',
    portfolio: 'Portfolio',
    blog: 'Blog/Vlog',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Full Stack Developer',
    heroSubtitle: 'Digital Innovation Specialist',
    heroDescription: 'Passionate about creating exceptional digital experiences through innovative web solutions and cutting-edge technology.',
    viewProjects: 'View Projects',
    downloadResume: 'Download Resume',
    
    // Sections
    aboutMe: 'About Me',
    myProjects: 'My Projects',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    testimonials: 'Testimonials',
    latestPosts: 'Latest Posts',
    getInTouch: 'Get In Touch',
    
    // Footer
    followMe: 'Follow Me',
    allRightsReserved: 'All rights reserved',
    
    // Contact Form
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Projects
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
    allProjects: 'All Projects',
    technologyProjects: 'Technology Projects',
    trainingProjects: 'Training Projects',
    otherProjects: 'Other Projects',
    webDevelopment: 'Web Development',
    mobileApps: 'Mobile Apps',
    uiux: 'UI/UX Design',
    
    // Blog
    readMore: 'Read More',
    minutes: 'minutes',
    readTime: 'read time'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    projects: 'المشاريع',
    resume: 'السيرة الذاتية',
    portfolio: 'معرض الأعمال',
    blog: 'المدونة',
    contact: 'التواصل',
    
    // Hero Section
    heroTitle: 'مطور ويب متكامل',
    heroSubtitle: 'مختص في الابتكار الرقمي',
    heroDescription: 'شغوف بإنشاء تجارب رقمية استثنائية من خلال حلول الويب المبتكرة والتكنولوجيا المتطورة.',
    viewProjects: 'عرض المشاريع',
    downloadResume: 'تحميل السيرة الذاتية',
    
    // Sections
    aboutMe: 'نبذة عني',
    myProjects: 'مشاريعي',
    experience: 'الخبرة',
    skills: 'المهارات',
    education: 'التعليم',
    testimonials: 'آراء العملاء',
    latestPosts: 'أحدث المقالات',
    getInTouch: 'تواصل معي',
    
    // Footer
    followMe: 'تابعني',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Contact Form
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    
    // Projects
    liveDemo: 'عرض مباشر',
    sourceCode: 'الكود المصدري',
    allProjects: 'جميع المشاريع',
    technologyProjects: 'المشاريع التقنية',
    trainingProjects: 'مشاريع التدريب',
    otherProjects: 'مشاريع أخرى',
    webDevelopment: 'تطوير الويب',
    mobileApps: 'تطبيقات الجوال',
    uiux: 'تصميم واجهات المستخدم',
    
    // Blog
    readMore: 'اقرأ المزيد',
    minutes: 'دقائق',
    readTime: 'وقت القراءة'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(languages.en);

  const t = (key: string): string => {
    return translations[language.code][key as keyof typeof translations.en] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language.dir;
    document.documentElement.lang = language.code;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { languages };