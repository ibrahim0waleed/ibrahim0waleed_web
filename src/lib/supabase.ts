import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;

// Check if we have valid environment variables
const hasValidUrl = supabaseUrl && supabaseUrl !== 'undefined' && supabaseUrl.startsWith('https://');
const hasValidKey = supabaseAnonKey && supabaseAnonKey !== 'undefined' && supabaseAnonKey.length > 10;

if (!hasValidUrl || !hasValidKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
  console.warn('VITE_SUPABASE_URL:', hasValidUrl ? 'Valid' : 'Invalid or missing');
  console.warn('VITE_SUPABASE_ANON_KEY:', hasValidKey ? 'Valid' : 'Invalid or missing');
  
  // Create a dummy client to prevent the app from crashing
  console.warn('Using dummy Supabase client. Database features will not work.');
  supabase = createClient('https://dummy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.dummy');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

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