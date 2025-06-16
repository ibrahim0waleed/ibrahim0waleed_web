import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { projects, loading, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { key: 'all', label: { en: 'All Projects', ar: 'جميع المشاريع' } },
    { key: 'technology', label: { en: 'Technology Projects', ar: 'المشاريع التقنية' } },
    { key: 'training', label: { en: 'Training Projects', ar: 'مشاريع التدريب' } },
    { key: 'other', label: { en: 'Other Projects', ar: 'مشاريع أخرى' } }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            {t('myProjects')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language.code === 'en' 
              ? 'A comprehensive showcase of my work across technology development, training programs, and business ventures.'
              : 'عرض شامل لأعمالي عبر تطوير التكنولوجيا وبرامج التدريب والمشاريع التجارية.'
            }
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === category.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.label[language.code]}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title[language.code]}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4 rtl:space-x-reverse">
                    <Link
                      to={`/projects/${project.id}`}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Eye size={20} />
                    </Link>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 
                  className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {project.title[language.code]}
                </h3>
                <p 
                  className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {project.description[language.code]}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    {language.code === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Link>
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          title={t('liveDemo')}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          title={t('sourceCode')}
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {language.code === 'en' 
                ? 'No projects found in this category.' 
                : 'لا توجد مشاريع في هذه الفئة.'
              }
            </p>
          </motion.div>
        )}

        {/* Category Summary */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {projects.filter(p => p.category === 'technology').length}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('technologyProjects')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  {projects.filter(p => p.category === 'training').length}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('trainingProjects')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">
                  {projects.filter(p => p.category === 'other').length}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t('otherProjects')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;