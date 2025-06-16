import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  ExternalLink, 
  Github,
  LogOut,
  Settings,
  BarChart3,
  FolderOpen,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Project, DatabaseBlogPost } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [projects, setProjects] = useState<DatabaseProject[]>([]);
  const [blogPosts, setBlogPosts] = useState<DatabaseBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<DatabaseProject | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<DatabaseBlogPost | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [projectFormData, setProjectFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    image: '',
    technologies: '',
    live_url: '',
    github_url: '',
    category: 'technology'
  });

  const [blogFormData, setBlogFormData] = useState({
    title_en: '',
    title_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Technology',
    read_time: 5
  });

  const projectCategories = [
    { value: 'technology', label: 'Technology Projects' },
    { value: 'training', label: 'Training Projects' },
    { value: 'other', label: 'Other Projects' }
  ];

  const blogCategories = [
    'Technology', 'Training', 'Opinion Posts'
  ];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching admin dashboard data...');
      
      const [projectsResponse, blogResponse] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('date', { ascending: false })
      ]);

      console.log('Projects response:', projectsResponse);
      console.log('Blog response:', blogResponse);

      if (projectsResponse.error) {
        console.error('Projects error:', projectsResponse.error);
        throw projectsResponse.error;
      }
      if (blogResponse.error) {
        console.error('Blog error:', blogResponse.error);
        throw blogResponse.error;
      }

      setProjects(projectsResponse.data || []);
      setBlogPosts(blogResponse.data || []);
      
      console.log('Data fetched successfully:', {
        projects: projectsResponse.data?.length || 0,
        blogPosts: blogResponse.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...projectFormData,
      technologies: projectFormData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      live_url: projectFormData.live_url || null,
      github_url: projectFormData.github_url || null,
    };

    try {
      console.log('Submitting project:', projectData);
      
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        
        if (error) throw error;
        showNotification('success', 'Project updated successfully!');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        
        if (error) throw error;
        showNotification('success', 'Project created successfully!');
      }

      await fetchData();
      resetProjectForm();
    } catch (error: any) {
      console.error('Error saving project:', error);
      showNotification('error', `Error saving project: ${error.message}`);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Submitting blog post:', blogFormData);
      
      if (editingBlogPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogFormData)
          .eq('id', editingBlogPost.id);
        
        if (error) throw error;
        showNotification('success', 'Blog post updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([blogFormData])
          .select()
          .single();
        
        if (error) throw error;
        console.log('Blog post created:', data);
        showNotification('success', 'Blog post created successfully!');
      }

      await fetchData();
      resetBlogForm();
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      showNotification('error', `Error saving blog post: ${error.message}`);
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Project deleted successfully!');
      await fetchData();
    } catch (error: any) {
      console.error('Error deleting project:', error);
      showNotification('error', `Error deleting project: ${error.message}`);
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('success', 'Blog post deleted successfully!');
      await fetchData();
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      showNotification('error', `Error deleting blog post: ${error.message}`);
    }
  };

  const handleProjectEdit = (project: DatabaseProject) => {
    setEditingProject(project);
    setProjectFormData({
      title_en: project.title_en,
      title_ar: project.title_ar,
      description_en: project.description_en,
      description_ar: project.description_ar,
      image: project.image,
      technologies: project.technologies.join(', '),
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      category: project.category
    });
    setActiveTab('projects');
    setShowAddForm(true);
  };

  const handleBlogEdit = (blogPost: DatabaseBlogPost) => {
    setEditingBlogPost(blogPost);
    setBlogFormData({
      title_en: blogPost.title_en,
      title_ar: blogPost.title_ar,
      excerpt_en: blogPost.excerpt_en,
      excerpt_ar: blogPost.excerpt_ar,
      image: blogPost.image,
      date: blogPost.date,
      category: blogPost.category,
      read_time: blogPost.read_time
    });
    setActiveTab('blog');
    setShowAddForm(true);
  };

  const resetProjectForm = () => {
    setProjectFormData({
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      image: '',
      technologies: '',
      live_url: '',
      github_url: '',
      category: 'technology'
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title_en: '',
      title_ar: '',
      excerpt_en: '',
      excerpt_ar: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Technology',
      read_time: 5
    });
    setEditingBlogPost(null);
    setShowAddForm(false);
  };

  const resetForm = () => {
    if (activeTab === 'projects') {
      resetProjectForm();
    } else {
      resetBlogForm();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const stats = {
    projects: {
      total: projects.length,
      technology: projects.filter(p => p.category === 'technology').length,
      training: projects.filter(p => p.category === 'training').length,
      other: projects.filter(p => p.category === 'other').length,
    },
    blog: {
      total: blogPosts.length,
      categories: [...new Set(blogPosts.map(p => p.category))].length,
      avgReadTime: blogPosts.length > 0 ? Math.round(blogPosts.reduce((acc, p) => acc + p.read_time, 0) / blogPosts.length) : 0
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`absolute top-4 right-4 left-4 z-10 p-4 rounded-lg flex items-center ${
                notification.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-3" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-3" />
              )}
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="ml-auto p-1 hover:bg-black/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Settings className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <p className="text-blue-100">Welcome back, {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-full max-h-[calc(90vh-88px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 dark:bg-gray-900 p-6 overflow-y-auto">
            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'blog'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blog</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                {activeTab === 'projects' ? 'Project Statistics' : 'Blog Statistics'}
              </h3>
              <div className="space-y-3">
                {activeTab === 'projects' ? (
                  <>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.projects.total}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Total Projects</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stats.projects.technology}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Technology</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stats.projects.training}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Training</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stats.projects.other}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Other</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.blog.total}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Total Posts</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stats.blog.categories}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stats.blog.avgReadTime}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Avg Read Time</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mb-6"
            >
              <Plus className="w-5 h-5" />
              <span>Add New {activeTab === 'projects' ? 'Project' : 'Blog Post'}</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {activeTab === 'projects' 
                        ? (editingProject ? 'Edit Project' : 'Add New Project')
                        : (editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post')
                      }
                    </h3>
                    <button
                      onClick={resetForm}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {activeTab === 'projects' ? (
                    <form onSubmit={handleProjectSubmit} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Title (English)
                        </label>
                        <input
                          type="text"
                          value={projectFormData.title_en}
                          onChange={(e) => setProjectFormData({ ...projectFormData, title_en: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Title (Arabic)
                        </label>
                        <input
                          type="text"
                          value={projectFormData.title_ar}
                          onChange={(e) => setProjectFormData({ ...projectFormData, title_ar: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description (English)
                        </label>
                        <textarea
                          value={projectFormData.description_en}
                          onChange={(e) => setProjectFormData({ ...projectFormData, description_en: e.target.value })}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description (Arabic)
                        </label>
                        <textarea
                          value={projectFormData.description_ar}
                          onChange={(e) => setProjectFormData({ ...projectFormData, description_ar: e.target.value })}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={projectFormData.image}
                          onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={projectFormData.category}
                          onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {projectCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={projectFormData.technologies}
                          onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                          placeholder="React, Node.js, MongoDB"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Live URL (optional)
                        </label>
                        <input
                          type="url"
                          value={projectFormData.live_url}
                          onChange={(e) => setProjectFormData({ ...projectFormData, live_url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          GitHub URL (optional)
                        </label>
                        <input
                          type="url"
                          value={projectFormData.github_url}
                          onChange={(e) => setProjectFormData({ ...projectFormData, github_url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2 flex justify-end space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingProject ? 'Update' : 'Create'} Project</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleBlogSubmit} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Title (English)
                        </label>
                        <input
                          type="text"
                          value={blogFormData.title_en}
                          onChange={(e) => setBlogFormData({ ...blogFormData, title_en: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Title (Arabic)
                        </label>
                        <input
                          type="text"
                          value={blogFormData.title_ar}
                          onChange={(e) => setBlogFormData({ ...blogFormData, title_ar: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Excerpt (English)
                        </label>
                        <textarea
                          value={blogFormData.excerpt_en}
                          onChange={(e) => setBlogFormData({ ...blogFormData, excerpt_en: e.target.value })}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Excerpt (Arabic)
                        </label>
                        <textarea
                          value={blogFormData.excerpt_ar}
                          onChange={(e) => setBlogFormData({ ...blogFormData, excerpt_ar: e.target.value })}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={blogFormData.image}
                          onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {blogCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={blogFormData.date}
                          onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Read Time (minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={blogFormData.read_time}
                          onChange={(e) => setBlogFormData({ ...blogFormData, read_time: parseInt(e.target.value) })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2 flex justify-end space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={resetBlogForm}
                          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingBlogPost ? 'Update' : 'Create'} Blog Post</span>
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content List */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Manage {activeTab === 'projects' ? 'Projects' : 'Blog Posts'} ({activeTab === 'projects' ? projects.length : blogPosts.length})
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === 'projects' ? (
                    projects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <img
                                src={project.image}
                                alt={project.title_en}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {project.title_en}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {project.title_ar}
                                </p>
                                <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full mt-1">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                              {project.description_en}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              {project.live_url && (
                                <a
                                  href={project.live_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 hover:text-blue-600"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Live Demo</span>
                                </a>
                              )}
                              {project.github_url && (
                                <a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 hover:text-blue-600"
                                >
                                  <Github className="w-4 h-4" />
                                  <span>GitHub</span>
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleProjectEdit(project)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleProjectDelete(project.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    blogPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <img
                                src={post.image}
                                alt={post.title_en}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {post.title_en}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {post.title_ar}
                                </p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(post.date).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.read_time} min
                                  </span>
                                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {post.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              {post.excerpt_en}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleBlogEdit(post)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleBlogDelete(post.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {((activeTab === 'projects' && projects.length === 0) || (activeTab === 'blog' && blogPosts.length === 0)) && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        No {activeTab === 'projects' ? 'projects' : 'blog posts'} found. Add your first {activeTab === 'projects' ? 'project' : 'blog post'} to get started!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;