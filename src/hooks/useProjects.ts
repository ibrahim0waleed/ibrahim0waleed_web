import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';

interface DatabaseProject {
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
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes('your-project-id') || supabaseUrl === 'your_supabase_project_url') {
        console.warn('Supabase not configured. Using empty projects.');
        setProjects([]);
        setError(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Database not available. Using empty projects.');
        setProjects([]);
        setError(null);
        setLoading(false);
        return;
      }

      // Transform database projects to frontend format
      const transformedProjects: Project[] = (data || []).map((dbProject: DatabaseProject) => ({
        id: dbProject.id,
        title: {
          en: dbProject.title_en,
          ar: dbProject.title_ar
        },
        description: {
          en: dbProject.description_en,
          ar: dbProject.description_ar
        },
        image: dbProject.image,
        technologies: dbProject.technologies,
        liveUrl: dbProject.live_url,
        githubUrl: dbProject.github_url,
        category: dbProject.category
      }));

      setProjects(transformedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      // Fallback to empty array if database fails
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};