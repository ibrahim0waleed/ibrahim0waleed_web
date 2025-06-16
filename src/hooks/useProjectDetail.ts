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

export const useProjectDetail = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    if (!id) {
      setError('No project ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching project with ID:', id);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      console.log('Project query result:', { data, error });

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Project not found');
        } else {
          console.error('Supabase error:', error);
          throw error;
        }
        return;
      }

      if (!data) {
        setError('Project not found');
        return;
      }

      // Transform database project to frontend format
      const transformedProject: Project = {
        id: data.id,
        title: {
          en: data.title_en,
          ar: data.title_ar
        },
        description: {
          en: data.description_en,
          ar: data.description_ar
        },
        image: data.image,
        technologies: data.technologies,
        liveUrl: data.live_url,
        githubUrl: data.github_url,
        category: data.category
      };

      console.log('Transformed project:', transformedProject);
      setProject(transformedProject);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching project:', err);
      setError(err.message || 'Failed to fetch project');
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return { project, loading, error, refetch: fetchProject };
};