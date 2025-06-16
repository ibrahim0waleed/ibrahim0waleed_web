import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'projects', href: '#projects' },
    { key: 'resume', href: '#resume' },
    { key: 'blog', href: '#blog' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <img 
                src="/artboard-6.png" 
                alt="Ibrahim Al-Sulaiman" 
                className="h-24 w-auto brightness-0 invert"
              />
            </div>
            <p 
              className="text-gray-300 leading-relaxed"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' 
                ? 'Passionate full-stack developer creating innovative digital solutions and exceptional user experiences.'
                : 'مطور ويب متكامل شغوف بإنشاء حلول رقمية مبتكرة وتجارب مستخدم استثنائية.'
              }
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 
              className="text-xl font-bold"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: language.dir === 'rtl' ? -5 : 5 }}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
                  >
                    {t(link.key)}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 
              className="text-xl font-bold"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' ? 'Get In Touch' : 'تواصل معي'}
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>iwisa.f.f@gmail.com</p>
              <p>+966 55 327 2398</p>
              <p>
                {language.code === 'en' 
                  ? 'Jeddah, Saudi Arabia' 
                  : 'جدة، المملكة العربية السعودية'
                }
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-gray-800 py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p 
              className="text-gray-400 text-sm flex items-center"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              {language.code === 'en' ? 'Made with' : 'صُنع بـ'}
              <Heart size={16} className="mx-1 text-red-500" />
              {language.code === 'en' ? 'by Ibrahim Al-Sulaiman' : 'بواسطة إبراهيم السليمان'}
            </p>
            <p 
              className="text-gray-400 text-sm"
              style={{ fontFamily: language.code === 'ar' ? 'Zain, sans-serif' : 'inherit' }}
            >
              © 2024 Ibrahim Al-Sulaiman. {t('allRightsReserved')}.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;