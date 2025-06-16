import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, MapPin, Award, GraduationCap, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Experience } from '../types';

const Resume: React.FC = () => {
  const { t, language } = useLanguage();

  const experiences: Experience[] = [
    {
      id: '1',
      title: { en: 'Founder & CEO', ar: 'مؤسس ورئيس تنفيذي' },
      company: { en: 'CADRE Digital Agency', ar: 'وكالة كادر الرقمية' },
      period: { en: '2022 - Present', ar: '2022 - الحاضر' },
      location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
      description: {
        en: 'Founded and leading a digital agency specializing in innovative web solutions, digital transformation, and technology consulting. Managing client relationships, strategic planning, and business development while overseeing technical project delivery.',
        ar: 'تأسيس وقيادة وكالة رقمية متخصصة في حلول الويب المبتكرة والتحول الرقمي والاستشارات التقنية. إدارة علاقات العملاء والتخطيط الاستراتيجي وتطوير الأعمال مع الإشراف على تسليم المشاريع التقنية.'
      }
    },
    {
      id: '2',
      title: { en: 'Instructor', ar: 'مدرب' },
      company: { en: 'SABIC Institute', ar: 'معهد سابك' },
      period: { en: '2012 - 2021', ar: '2012 - 2021' },
      location: { en: 'Yanbu, Saudi Arabia', ar: 'ينبع، المملكة العربية السعودية' },
      description: {
        en: 'Delivered comprehensive training programs in technology and professional development. Designed curriculum, conducted workshops, and mentored professionals in various technical disciplines. Developed innovative training methodologies and assessment frameworks.',
        ar: 'تقديم برامج تدريبية شاملة في التكنولوجيا والتطوير المهني. تصميم المناهج وإجراء ورش العمل وتوجيه المهنيين في مختلف التخصصات التقنية. تطوير منهجيات تدريبية مبتكرة وأطر تقييم.'
      }
    }
  ];

  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'AWS/Cloud', level: 82 },
    { name: 'UI/UX Design', level: 78 }
  ];

  const education = [
    {
      degree: { en: 'Bachelor of Mechanical Engineering (Mechatronics)', ar: 'بكالوريوس الهندسة الميكانيكية (الميكاترونكس)' },
      school: { en: 'King Abdul Aziz University', ar: 'جامعة الملك عبد العزيز' },
      year: { en: '2008 - 2012', ar: '2008 - 2012' },
      location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' }
    },
    {
      degree: { en: 'Master of Mechanical Engineering (Mechatronics)', ar: 'ماجستير الهندسة الميكانيكية (الميكاترونكس)' },
      school: { en: 'King Abdul Aziz University', ar: 'جامعة الملك عبد العزيز' },
      year: { en: '2013 - 2015', ar: '2013 - 2015' },
      location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' }
    },
    {
      degree: { en: 'Postgraduate Degree in Technology and Professional Development', ar: 'درجة الدراسات العليا في التكنولوجيا والتطوير المهني' },
      school: { en: 'University of Akron', ar: 'جامعة أكرون' },
      year: { en: '2016 - 2017', ar: '2016 - 2017' },
      location: { en: 'Akron, Ohio, USA', ar: 'أكرون، أوهايو، الولايات المتحدة الأمريكية' }
    }
  ];

  const certifications = [
    { name: 'AWS Certified Solutions Architect', year: '2023' },
    { name: 'Google Cloud Professional Developer', year: '2022' },
    { name: 'Meta React Developer Certificate', year: '2021' }
  ];

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-800">
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
            {t('resume')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <motion.a
            href="/resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Download className={`mr-2 rtl:mr-0 rtl:ml-2`} size={20} />
            {t('downloadResume')}
          </motion.a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                <Briefcase className={`mr-3 rtl:mr-0 rtl:ml-3 text-blue-600`} size={24} />
                {t('experience')}
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 rtl:pl-0 rtl:pr-8 border-l-2 rtl:border-l-0 rtl:border-r-2 border-blue-600 last:border-l-0 rtl:last:border-r-0"
                  >
                    <div className="absolute -left-2 rtl:-left-auto rtl:-right-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h4 
                        className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                        style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                      >
                        {exp.title[language.code]}
                      </h4>
                      <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                        {exp.company[language.code]}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span className="flex items-center">
                          <Calendar size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                          {exp.period[language.code]}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                          {exp.location[language.code]}
                        </span>
                      </div>
                      <p 
                        className="text-gray-700 dark:text-gray-300"
                        style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                      >
                        {exp.description[language.code]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                <GraduationCap className={`mr-3 rtl:mr-0 rtl:ml-3 text-blue-600`} size={24} />
                {t('education')}
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                  >
                    <h4 
                      className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                      style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                    >
                      {edu.degree[language.code]}
                    </h4>
                    <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {edu.school[language.code]}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <Calendar size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                        {edu.year[language.code]}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className={`mr-1 rtl:mr-0 rtl:ml-1`} />
                        {edu.location[language.code]}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills & Certifications */}
          <div className="space-y-12">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                {t('skills')}
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                <Award className={`mr-3 rtl:mr-0 rtl:ml-3 text-blue-600`} size={24} />
                {language.code === 'en' ? 'Certifications' : 'الشهادات'}
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {cert.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;