import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { socials } from '../utils/socials';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  const contactInfo = [
    {
      title: 'Email',
      value: 'fahrettinriza@gmail.com',
      icon: '📧',
      gradient: 'from-blue-400 to-blue-600',
      link: 'mailto:fahrettinriza@gmail.com'
    },
    {
      title: t('contact.cards.location.title'),
      value: 'Antalya, Turkey',
      icon: '📍',
      gradient: 'from-red-400 to-red-600',
      link: 'https://maps.google.com/?q=Antalya,Turkey'
    },
    {
      title: t('contact.cards.availability.title'),
      value: t('contact.cards.availability.sub_title'),
      icon: '🌟',
      gradient: 'from-green-400 to-green-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content={t('contact.description')}
        />
      </Helmet>

      <div className={`min-h-screen pb-20 pt-32 bg-gradient-to-b from-blue-50/30 to-white ${isLoaded ? 'loaded' : 'initial-load'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">{t('contact.title')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('contact.sub_title')}
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <ContactCard info={info} />
                    </a>
                  ) : (
                    <ContactCard info={info} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">
                <span className="gradient-text">{t('contact.socials_title')}</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.values(socials).map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setIsHovered(social.name)}
                    onHoverEnd={() => setIsHovered(null)}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                      <div className="relative text-4xl">{social.icon}</div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800 mb-1">{social.name}</h3>
                      <p className="text-sm text-gray-600">{social.username}</p>
                    </div>
                    <motion.div
                      className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600"
                      animate={{ x: isHovered === social.name ? 5 : 0 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600;
          background-size: 200% auto;
          animation: shine 8s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </>
  );
};

const ContactCard = ({ info }) => (
  <div className="relative">
    <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-xl`} />
    <div className="relative">
      <div className="text-4xl mb-4">{info.icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
      <p className="text-gray-600">{info.value}</p>
    </div>
  </div>
);

export default Contact; 