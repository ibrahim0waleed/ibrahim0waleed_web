import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost, DatabaseBlogPost } from '../types';

export const useBlogPostDetail = (id: string) => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPost = async () => {
    if (!id) {
      setError('No blog post ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching blog post with ID:', id);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      console.log('Blog post query result:', { data, error });

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Blog post not found');
        } else {
          console.error('Supabase error:', error);
          throw error;
        }
        return;
      }

      if (!data) {
        setError('Blog post not found');
        return;
      }

      // Transform database blog post to frontend format
      const transformedBlogPost: BlogPost = {
        id: data.id,
        title: {
          en: data.title_en,
          ar: data.title_ar
        },
        excerpt: {
          en: data.excerpt_en,
          ar: data.excerpt_ar
        },
        image: data.image,
        date: data.date,
        category: data.category,
        readTime: data.read_time
      };

      console.log('Transformed blog post:', transformedBlogPost);
      setBlogPost(transformedBlogPost);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching blog post:', err);
      setError(err.message || 'Failed to fetch blog post');
      setBlogPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  return { blogPost, loading, error, refetch: fetchBlogPost };
};