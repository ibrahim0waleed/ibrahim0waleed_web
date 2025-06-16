import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title_en: string;
          title_ar: string;
          description_en: string;
          description_ar: string;
          image: string;
          technologies: string[];
          live_url?: string;
          github_url?: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_ar: string;
          description_en: string;
          description_ar: string;
          image: string;
          technologies: string[];
          live_url?: string;
          github_url?: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_ar?: string;
          description_en?: string;
          description_ar?: string;
          image?: string;
          technologies?: string[];
          live_url?: string;
          github_url?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title_en: string;
          title_ar: string;
          excerpt_en: string;
          excerpt_ar: string;
          image: string;
          date: string;
          category: string;
          read_time: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_ar?: string;
          excerpt_en?: string;
          excerpt_ar?: string;
          image?: string;
          date?: string;
          category?: string;
          read_time?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};