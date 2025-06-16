import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
      value: 'iwisa.f.f@gmail.com',
      href: 'mailto:iwisa.f.f@gmail.com'
    },
    {
      icon: Phone,
      label: { en: 'Phone', ar: 'الهاتف' },
      value: '+966 55 327 2398',
      href: 'tel:+966553272398'
    },
    {
      icon: MapPin,
      label: { en: 'Location', ar: 'الموقع' },
      value: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
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
            {t('getInTouch')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language.code === 'en' 
              ? "Let's discuss your next project or collaboration opportunity. I'm always excited to work on innovative solutions."
              : 'دعنا نناقش مشروعك القادم أو فرصة التعاون. أنا متحمس دائماً للعمل على حلول مبتكرة.'
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: language.dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                {language.code === 'en' ? 'Contact Information' : 'معلومات التواصل'}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    whileHover={{ x: language.dir === 'rtl' ? -5 : 5 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <div className="p-3 bg-blue-600 text-white rounded-lg mr-4 rtl:mr-0 rtl:ml-4 group-hover:bg-blue-700 transition-colors">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {info.label[language.code]}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {typeof info.value === 'string' ? info.value : info.value[language.code]}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 
                className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
              >
                {t('followMe')}
              </h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: language.dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {t('name')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder={language.code === 'en' ? 'Your Name' : 'اسمك'}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {t('email')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder={language.code === 'en' ? 'your.email@example.com' : 'your.email@example.com'}
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                >
                  {t('message')}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                  placeholder={language.code === 'en' ? 'Your message...' : 'رسالتك...'}
                  style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 group"
              >
                {t('sendMessage')}
                <Send 
                  size={20} 
                  className={`ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${language.dir === 'rtl' ? 'rotate-180' : ''}`} 
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;