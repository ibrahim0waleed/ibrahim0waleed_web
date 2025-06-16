export interface Language {
  code: 'en' | 'ar';
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface Project {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  image: string;
  date: string;
  category: string;
  readTime: number;
}

export interface Experience {
  id: string;
  title: { en: string; ar: string };
  company: { en: string; ar: string };
  period: { en: string; ar: string };
  description: { en: string; ar: string };
  location: { en: string; ar: string };
}

export interface DatabaseBlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  image: string;
  date: string;
  category: string;
  read_time: number;
  created_at: string;
  updated_at: string;
}