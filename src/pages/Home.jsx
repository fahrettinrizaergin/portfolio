import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

import content from "../../public/contents/categories/content.js"
import GlobalHelment from '../components/GlobalHelmet.jsx';

gsap.registerPlugin(ScrollTrigger); 

const Home = () => {
  const { t, i18n } = useTranslation();
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const lang = (i18n.language || 'en').split('-')[0];
      const blogs = content[lang] || [];
      const blogBuildData = blogs.filter(blog => blog.isShow === true) || [];
      const lastThreeBlogs = blogBuildData.slice(-3);
      lastThreeBlogs.reverse();
      setBlogPosts(lastThreeBlogs);
    }
    fetchData();

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [i18n.language]);

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <GlobalHelment /> 

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`page-section min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-white ${isLoaded ? 'loaded' : 'initial-load'}`}
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-600/20 text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {String.fromCharCode(33 + Math.random() * 93)}
            </div>
          ))}
        </div>

        <div className="container relative z-10 px-4 mt-20 lg:mt-0">
          <div className="mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden">
              <div className="p-8 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-3" 
                        style={{ fontDisplay: 'swap' }}>
                      {t('home.greeting')}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">{t('home.title')}</p>
                  </div>
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl rotate-3 transform hover:rotate-6 transition-transform duration-300">
                      <div className="w-full h-full bg-white rounded-2xl -rotate-3 flex items-center justify-center text-3xl transform hover:-rotate-6 transition-transform duration-300">
                        👨‍💻
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="bg-white/50 p-6 rounded-xl border border-blue-100/50 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-blue-500">⚡</span> {t('home.hero_card.skills')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'React', 'Node.js', 'Go', 'Php'].map((skill, index) => (
                          <span key={index} 
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/50 p-6 rounded-xl border border-green-100/50 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-green-500">🌍</span> {t('home.hero_card.languages')}
                      </h3>
                      <div className="flex gap-3">
                        {['Turkish', 'English'].map((lang, index) => (
                          <span key={index} 
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/50 p-6 rounded-xl border border-purple-100/50 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-purple-500">🚀</span> {t('home.hero_card.interests')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Web Development', 'Open Source', 'DevOps'].map((interest, index) => (
                          <span key={index} 
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/50 p-6 rounded-xl border border-gray-100/50 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-gray-500">📫</span> {t('home.hero_card.contact')}
                      </h3>
                      <div className="space-y-3">
                        <a href="mailto:contact@fahrettinrizaergin.com" 
                           className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-medium">contact@fahrettinrizaergin.com</span>
                        </a>
                        <a href="https://github.com/fahrettinrizaergin" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <span className="font-medium">github.com/fahrettinrizaergin</span>
                        </a>
                        <a href="https://linkedin.com/in/fahrettinrizaergin" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-medium">linkedin.com/in/fahrettinrizaergin</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-center text-lg">{t('home.description')}</p>
                <p className="text-gray-600 text-center text-lg">{t('home.hero_descs.0')}</p>
                <p className="text-gray-600 text-center text-lg">{t('home.hero_descs.1')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              { key: t('home.others.commits.title'), value: t('home.others.commits.value'), icon: '📝', color: 'blue' },
              { key: t('home.others.projects.title'), value: t('home.others.projects.value'), icon: '🚀', color: 'green' },
              { key: t('home.others.experience.title'), value: t('home.others.experience.value'), icon: '⚡', color: 'purple' },
              { key: t('home.others.contributions.title'), value: t('home.others.contributions.value'), icon: '🌟', color: 'green' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
                className={`relative bg-white rounded-xl p-6 shadow-sm border border-${stat.color}-100 hover:shadow-md transition-all duration-300`}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="relative z-10">
                  <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                  <div className="text-gray-600 capitalize">{stat.key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">{t('home.latest_blog_posts.title')}</span>
            </h2>
          </div>

          <div className={blogPosts.length > 0 ? "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" : "grid grid-cols-1 max-w-6xl mx-auto"}>
            {blogPosts.length > 0 ? blogPosts
              .map((post, index) => (
                <motion.article
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setIsHovered(post.id)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                        {post.category === 'Frontend' ? '🎨' : post.category === 'Backend' ? '⚙️' : '🚀'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-blue-600 font-semibold">{post.date}</span>
                      <span className="text-xs bg-blue-50 px-3 py-1 rounded-lg text-blue-600 border border-blue-100 font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300"
                    >
                      Read More
                      <motion.svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: isHovered === post.id ? 5 : 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </Link>
                  </div>
                </motion.article>
              )) : (
              <div className="text-center">
                <p className="bg-red-100 text-red-600 border border-red-600 p-4 rounded-lg w-full">{t('home.latest_blog_posts.no_results.title')}</p>
              </div>
            )}
          </div>
        </div>
      </section> 

      {/* My Services */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">{t('home.services.title')}</span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('home.services.service_web_development.title'),
                  description: t('home.services.service_web_development.description'),
                  features: [
                    t('home.services.service_web_development.properties.0'),
                    t('home.services.service_web_development.properties.1'),
                    t('home.services.service_web_development.properties.2'),
                    t('home.services.service_web_development.properties.3'),
                  ],
                  color: "blue",
                  icon: "💻",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  title: t('home.services.service_mobile_solutions.title'),
                  description: t('home.services.service_mobile_solutions.description'),
                  features: [
                    t('home.services.service_mobile_solutions.properties.0'),
                    t('home.services.service_mobile_solutions.properties.1'),
                    t('home.services.service_mobile_solutions.properties.2'),
                    t('home.services.service_mobile_solutions.properties.3'),
                  ],
                  color: "purple",
                  icon: "📱",
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  title: t('home.services.service_cloud_devops.title'),
                  description: t('home.services.service_cloud_devops.description'),
                  features: [
                    t('home.services.service_cloud_devops.properties.0'),
                    t('home.services.service_cloud_devops.properties.1'),
                    t('home.services.service_cloud_devops.properties.2'),
                    t('home.services.service_cloud_devops.properties.3'),
                  ],
                  color: "indigo",
                  icon: "☁️",
                  gradient: "from-indigo-500 to-indigo-600"
                },
                {
                  title: t('home.services.service_uiux_design.title'),
                  description: t('home.services.service_uiux_design.description'),
                  features: [
                    t('home.services.service_uiux_design.properties.0'),
                    t('home.services.service_uiux_design.properties.1'),
                    t('home.services.service_uiux_design.properties.2'),
                    t('home.services.service_uiux_design.properties.3'),
                  ],
                  color: "green",
                  icon: "🎨",
                  gradient: "from-green-500 to-green-600"
                },
                {
                  title: t('home.services.service_backend_development.title'),
                  description: t('home.services.service_backend_development.description'),
                  features: [
                    t('home.services.service_backend_development.properties.0'),
                    t('home.services.service_backend_development.properties.1'),
                    t('home.services.service_backend_development.properties.2'),
                    t('home.services.service_backend_development.properties.3'),
                  ],
                  color: "red",
                  icon: "⚙️",
                  gradient: "from-red-500 to-red-600"
                },
                {
                  title: t('home.services.service_consulting.title'),
                  description: t('home.services.service_consulting.description'),
                  features: [
                    t('home.services.service_consulting.properties.0'),
                    t('home.services.service_consulting.properties.1'),
                    t('home.services.service_consulting.properties.2'),
                    t('home.services.service_consulting.properties.3'),
                  ],
                  color: "yellow",
                  icon: "💡",
                  gradient: "from-yellow-500 to-yellow-600"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-${service.color}-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <svg
                            className={`w-5 h-5 text-${service.color}-500`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* <div className="mt-6">
                      <motion.button
                        className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${service.gradient} text-white font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.button>
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .typing-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .tech-card {
          transition: all 0.3s ease;
        }

        .tech-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .gradient-text {
          @apply bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary;
          background-size: 200% auto;
          animation: shine 8s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, var(--color-secondary), transparent 70%);
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 0.2;
        }
      `}</style>
    </>
  );
};

export default Home;