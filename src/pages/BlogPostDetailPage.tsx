import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2,
  BookOpen,
  User,
  Eye
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBlogPostDetail } from '../hooks/useBlogPostDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminButton from '../components/AdminButton';

const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { blogPost, loading, error } = useBlogPostDetail(id || '');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language.code === 'ar') {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    if (!blogPost) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title[language.code],
          text: blogPost.excerpt[language.code],
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  {language.code === 'en' ? 'Loading blog post...' : 'جاري تحميل المقال...'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language.code === 'en' ? 'Blog Post Not Found' : 'المقال غير موجود'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {error || (language.code === 'en' 
                    ? 'The blog post you are looking for does not exist.' 
                    : 'المقال الذي تبحث عنه غير موجود.'
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
              {language.code === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
            </button>
          </motion.div>

          <article className="max-w-4xl mx-auto">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl shadow-2xl mb-8"
            >
              <img
                src={blogPost.image}
                alt={blogPost.title[language.code]}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6">
                <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {blogPost.category}
                </span>
              </div>

              {/* Share Button */}
              <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6">
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full transition-colors"
                  title={language.code === 'en' ? 'Share Post' : 'مشاركة المقال'}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span>{formatDate(blogPost.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span>{blogPost.readTime} {t('minutes')} {t('readTime')}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span>{blogPost.category}</span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                {blogPost.title[language.code]}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Ibrahim Al-Sulaiman
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {language.code === 'en' 
                      ? 'AI Engineer & Training Consultant' 
                      : 'مهندس ذكي اصطناعي ومستشار تدريب'
                    }
                  </p>
                </div>
              </div>
            </motion.header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Excerpt as Introduction */}
              <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-blue-600">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p 
                    className="m-0"
                    style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                  >
                    {blogPost.excerpt[language.code]}
                  </p>
                </div>
              </div>

              {/* Main Content - Since we only have excerpt, we'll expand on it */}
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                <p>
                  {language.code === 'en' 
                    ? 'This article explores the key concepts and practical applications discussed in the excerpt above. As technology continues to evolve at an unprecedented pace, understanding these fundamentals becomes crucial for professionals in the field.'
                    : 'يستكشف هذا المقال المفاهيم الأساسية والتطبيقات العملية المناقشة في المقدمة أعلاه. مع استمرار تطور التكنولوجيا بوتيرة غير مسبوقة، يصبح فهم هذه الأساسيات أمراً بالغ الأهمية للمهنيين في هذا المجال.'
                  }
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {language.code === 'en' ? 'Key Insights' : 'الرؤى الأساسية'}
                </h2>

                <p>
                  {language.code === 'en' 
                    ? 'The insights shared in this post are based on real-world experience and industry best practices. They provide valuable guidance for both beginners and experienced professionals looking to enhance their skills and knowledge.'
                    : 'الرؤى المشاركة في هذا المنشور مبنية على الخبرة العملية وأفضل الممارسات في الصناعة. توفر إرشادات قيمة للمبتدئين والمهنيين ذوي الخبرة الذين يسعون لتعزيز مهاراتهم ومعرفتهم.'
                  }
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {language.code === 'en' ? 'Practical Applications' : 'التطبيقات العملية'}
                </h2>

                <p>
                  {language.code === 'en' 
                    ? 'Understanding the theoretical aspects is just the beginning. The real value comes from applying these concepts in practical scenarios. This approach ensures that the knowledge gained can be immediately put to use in real-world projects and challenges.'
                    : 'فهم الجوانب النظرية هو مجرد البداية. القيمة الحقيقية تأتي من تطبيق هذه المفاهيم في سيناريوهات عملية. هذا النهج يضمن أن المعرفة المكتسبة يمكن استخدامها فوراً في المشاريع والتحديات الواقعية.'
                  }
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 my-8">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    {language.code === 'en' ? '💡 Pro Tip' : '💡 نصيحة احترافية'}
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 m-0">
                    {language.code === 'en' 
                      ? 'Always validate your understanding by implementing what you learn in small, manageable projects before applying it to larger initiatives.'
                      : 'تأكد دائماً من فهمك من خلال تطبيق ما تتعلمه في مشاريع صغيرة وقابلة للإدارة قبل تطبيقه على مبادرات أكبر.'
                    }
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {language.code === 'en' ? 'Conclusion' : 'الخلاصة'}
                </h2>

                <p>
                  {language.code === 'en' 
                    ? 'The journey of continuous learning and improvement is ongoing. By staying curious, practicing regularly, and sharing knowledge with others, we can all contribute to the advancement of our field and create meaningful impact through our work.'
                    : 'رحلة التعلم والتحسين المستمر مستمرة. من خلال البقاء فضوليين والممارسة بانتظام ومشاركة المعرفة مع الآخرين، يمكننا جميعاً المساهمة في تقدم مجالنا وخلق تأثير ذي معنى من خلال عملنا.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Article Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language.code === 'en' ? 'Share this post:' : 'شارك هذا المقال:'}
                  </span>
                  <motion.button
                    onClick={handleShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    {language.code === 'en' ? 'Share' : 'شارك'}
                  </motion.button>
                </div>

                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {language.code === 'en' ? 'Published on' : 'نُشر في'} {formatDate(blogPost.date)}
                </div>
              </div>
            </motion.footer>
          </article>

          {/* Related Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20"
          >
            <h2 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' ? 'Read More Articles' : 'اقرأ المزيد من المقالات'}
            </h2>
            <div className="text-center">
              <Link
                to="/#blog"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {language.code === 'en' ? 'View All Posts' : 'عرض جميع المقالات'}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetailPage;