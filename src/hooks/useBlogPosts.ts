import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost, DatabaseBlogPost } from '../types';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching blog posts...');
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || 
          !supabaseKey || 
          supabaseUrl.includes('your-project-id') || 
          supabaseUrl === 'your_supabase_project_url' ||
          supabaseKey === 'your_supabase_anon_key' ||
          supabaseUrl.includes('example.supabase.co')) {
        console.warn('Supabase not configured. Using empty blog posts.');
        setBlogPosts([]);
        setError(null);
        return;
      }

      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false });

      console.log('Blog posts query result:', { data, error, count });

      if (error) {
        console.error('Supabase error:', error);
        console.warn('Database not available. Using empty blog posts.');
        setBlogPosts([]);
        setError(null);
        return;
      }

      // Transform database blog posts to frontend format
      const transformedBlogPosts: BlogPost[] = (data || []).map((dbPost: DatabaseBlogPost) => {
        console.log('Transforming blog post:', dbPost);
        return {
          id: dbPost.id,
          title: {
            en: dbPost.title_en,
            ar: dbPost.title_ar
          },
          excerpt: {
            en: dbPost.excerpt_en,
            ar: dbPost.excerpt_ar
          },
          image: dbPost.image,
          date: dbPost.date,
          category: dbPost.category,
          readTime: dbPost.read_time
        };
      });

      console.log('Transformed blog posts:', transformedBlogPosts);
      setBlogPosts(transformedBlogPosts);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching blog posts:', err);
      setError(err.message || 'Failed to fetch blog posts');
      // Don't set empty array on error, keep existing posts
    } finally {
      setLoading(false);
    }
  };

  const addBlogPost = async (postData: Omit<DatabaseBlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding blog post:', postData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
      
      if (error) {
        console.error('Error adding blog post:', error);
        throw error;
      }
      
      console.log('Blog post added successfully:', data);
      await fetchBlogPosts(); // Refresh the list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error adding blog post:', error);
      return { success: false, error: error.message };
    }
  };

  const updateBlogPost = async (id: string, postData: Partial<Omit<DatabaseBlogPost, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      console.log('Updating blog post:', id, postData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }
      
      console.log('Blog post updated successfully:', data);
      await fetchBlogPosts(); // Refresh the list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      console.log('Deleting blog post:', id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }
      
      console.log('Blog post deleted successfully');
      await fetchBlogPosts(); // Refresh the list
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchBlogPosts();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('blog_posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'blog_posts' },
        (payload) => {
          console.log('Real-time blog posts change:', payload);
          fetchBlogPosts();
        }
      )
      .subscribe((status) => {
        console.log('Blog posts subscription status:', status);
      });

    return () => {
      console.log('Unsubscribing from blog posts changes');
      subscription.unsubscribe();
    };
  }, []);

  return { 
    blogPosts, 
    loading, 
    error, 
    refetch: fetchBlogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  };
};