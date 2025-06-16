import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const { blogPosts, loading, error, refetch } = useBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language.code === 'ar') {
      return date.toLocaleDateString('ar-SA');
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Error loading blog posts: {error}</p>
            <button
              onClick={refetch}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
          >
            {t('latestPosts')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language.code === 'en' 
              ? 'Insights, tutorials, and thoughts on technology, training, and professional development.'
              : 'رؤى ودروس وأفكار حول التكنولوجيا والتدريب والتطوير المهني.'
            }
          </p>
          
          {/* Debug Info - Remove in production */}
          <div className="mt-4 text-sm text-gray-500">
            Found {blogPosts.length} blog posts
          </div>
        </motion.div>

        {/* Blog Grid */}
        {blogPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    {/* Post Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title[language.code]}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500";
                        }}
                      />
                      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                          {post.readTime} {t('minutes')}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                      >
                        {post.title[language.code]}
                      </h3>

                      {/* Excerpt */}
                      <p 
                        className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                        style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                      >
                        {post.excerpt[language.code]}
                      </p>

                      {/* Read More Link */}
                      <motion.div
                        whileHover={{ x: language.dir === 'rtl' ? -5 : 5 }}
                        className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                      >
                        {t('readMore')}
                        <ArrowRight 
                          size={16} 
                          className={`ml-2 rtl:ml-0 rtl:mr-2 ${language.dir === 'rtl' ? 'rotate-180' : ''}`} 
                        />
                      </motion.div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* View All Posts Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {language.code === 'en' ? 'View All Posts' : 'عرض جميع المقالات'}
                <ArrowRight 
                  size={20} 
                  className={`ml-2 rtl:ml-0 rtl:mr-2 ${language.dir === 'rtl' ? 'rotate-180' : ''}`} 
                />
              </motion.a>
            </motion.div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {language.code === 'en' 
                ? 'No blog posts available yet. Check back soon!' 
                : 'لا توجد مقالات متاحة حتى الآن. تحقق مرة أخرى قريباً!'
              }
            </p>
            <button
              onClick={refetch}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {language.code === 'en' ? 'Refresh' : 'تحديث'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;