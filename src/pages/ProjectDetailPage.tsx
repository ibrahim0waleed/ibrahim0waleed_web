import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Tag, 
  Globe,
  Code,
  Eye,
  Star,
  Share2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjectDetail } from '../hooks/useProjectDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminButton from '../components/AdminButton';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { project, loading, error } = useProjectDetail(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Loading project details...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language.code === 'en' ? 'Project Not Found' : 'المشروع غير موجود'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {error || (language.code === 'en' 
                    ? 'The project you are looking for does not exist.' 
                    : 'المشروع الذي تبحث عنه غير موجود.'
                  )}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className={`w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 ${language.dir === 'rtl' ? 'rotate-180' : ''}`} />
                  {language.code === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title[language.code],
          text: project.description[language.code],
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <AdminButton />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: language.dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className={`w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 ${language.dir === 'rtl' ? 'rotate-180' : ''}`} />
              {language.code === 'en' ? 'Back to Projects' : 'العودة للمشاريع'}
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, x: language.dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title[language.code]}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[140px] flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('liveDemo')}
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[140px] flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t('sourceCode')}
                  </motion.a>
                )}
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title={language.code === 'en' ? 'Share Project' : 'مشاركة المشروع'}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: language.dir === 'rtl' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title and Category */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full capitalize">
                    {project.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Tag className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    <span className="text-sm">
                      {language.code === 'en' ? 'Project' : 'مشروع'}
                    </span>
                  </div>
                </div>
                
                <h1 
                  className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {project.title[language.code]}
                </h1>
              </div>

              {/* Description */}
              <div>
                <h2 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  <Globe className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language.code === 'en' ? 'Project Overview' : 'نظرة عامة على المشروع'}
                </h2>
                <p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {project.description[language.code]}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h2 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  <Code className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language.code === 'en' ? 'Technologies Used' : 'التقنيات المستخدمة'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-500 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language.code === 'en' ? 'Category' : 'الفئة'}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {project.category === 'technology' 
                      ? (language.code === 'en' ? 'Technology' : 'تقنية')
                      : project.category === 'training'
                      ? (language.code === 'en' ? 'Training' : 'تدريب')
                      : (language.code === 'en' ? 'Other' : 'أخرى')
                    }
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Code className="w-5 h-5 text-blue-500 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language.code === 'en' ? 'Tech Stack' : 'التقنيات'}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.technologies.length} {language.code === 'en' ? 'Technologies' : 'تقنية'}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <h3 
                  className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {language.code === 'en' ? 'Project Highlights' : 'أبرز ما يميز المشروع'}
                </h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
                    {language.code === 'en' 
                      ? 'Modern and responsive design'
                      : 'تصميم حديث ومتجاوب'
                    }
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
                    {language.code === 'en' 
                      ? 'Optimized for performance'
                      : 'محسن للأداء'
                    }
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
                    {language.code === 'en' 
                      ? 'Cross-platform compatibility'
                      : 'متوافق مع جميع المنصات'
                    }
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Related Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h2 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' ? 'Explore More Projects' : 'استكشف المزيد من المشاريع'}
            </h2>
            <div className="text-center">
              <Link
                to="/#projects"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {language.code === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
                <ArrowLeft className={`w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 ${language.dir === 'rtl' ? '' : 'rotate-180'}`} />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;