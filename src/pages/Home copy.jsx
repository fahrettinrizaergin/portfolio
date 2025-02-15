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
  const [currentText, setCurrentText] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [fullText, setFullText] = useState(`const developer = {
  name: 'Fahrettin Rıza Ergin',
  title: '${t('home.title')}',
  location: 'Turkey',
  skills: ['JavaScript', 'React', 'Node.js', 'Go'],
  languages: ['Turkish', 'English'],
  interests: ['Web Development', 'Open Source', 'DevOps'],
  currentFocus: '${t('home.description')}',
  contact: {
    email: 'contact@fahrettinrizaergin.com',
    github: 'github.com/fahrettinrizaergin',
    linkedin: 'linkedin.com/in/fahrettinrizaergin'
  }
};`);
  const [stats, setStats] = useState({
    commits: '2,500+',
    projects: '15+',
    experience: '5+ years',
    contributions: '500+'
  });

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
    fetchData()

    setFullText(`const developer = {
  name: 'Fahrettin Rıza Ergin',
  title: '${t('home.title')}',
  location: 'Turkey',
  skills: ['JavaScript', 'React', 'Node.js', 'Go'],
  languages: ['Turkish', 'English'],
  interests: ['Web Development', 'Open Source', 'DevOps'],
  currentFocus: '${t('home.description')}',
  contact: {
    email: 'contact@fahrettinrizaergin.com',
    github: 'github.com/fahrettinrizaergin',
    linkedin: 'linkedin.com/in/fahrettinrizaergin'
  }
};`)
  }, [i18n.language, t])

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setCurrentText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); 

    const ctx = gsap.context(() => {
      gsap.to('.hero-gradient', {
        backgroundPosition: '200% center',
        duration: 20,
        repeat: -1,
        ease: 'none',
        force3D: true
      });

      gsap.to('.matrix-rain', {
        y: '100%',
        opacity: 0.3,
        duration: 'random(2, 4)',
        repeat: -1,
        ease: 'none',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });

      const heroTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.8,
          force3D: true
        }
      });

      heroTl
        .fromTo('.terminal-header',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 }
        )
        .fromTo('.terminal-body',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.6'
        )
        .fromTo('.hero-description',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.4'
        )
        .fromTo('.tech-stack',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.2'
        );

      ScrollTrigger.create({
        trigger: '.featured-section',
        start: 'top center+=100',
        onEnter: () => {
          gsap.to('.project-card', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            force3D: true
          });
        },
        once: true
      });
    });

    return () => {
      ctx.revert();
      clearTimeout(loadTimer);
      clearInterval(typingInterval);
    };
  }, []);

  // Remove the duplicate setFullText call here

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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="terminal-header flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors duration-300"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-300"></div>
                <span className="ml-2 text-sm text-gray-400 font-mono">~/developer-profile</span>
              </div>
              <div className="p-6 bg-gray-900 text-gray-300">
                <div className="flex items-center text-green-400 mb-2 font-mono">
                  <span className="mr-2">$</span>
                  <span className="typing-cursor">node developer.js</span>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap font-mono bg-gray-800/50 p-4 rounded-lg overflow-x-auto">
                  {currentText}
                </pre>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="hero-description text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {t('home.hero_descs.0')}
              </p>
              <p className="hero-description text-lg md:text-xl text-gray-600 mb-20 max-w-2xl mx-auto">
                {t('home.hero_descs.1')}
              </p>

              <div className="tech-stack space-y-6">
                <h3 className="text-gray-800 font-semibold mb-4">{t('home.some_use_the_techs.title')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: t('home.some_use_the_techs.frontend'), tech: 'React, Vue, Next.js', color: 'blue' },
                    { title: t('home.some_use_the_techs.backend'), tech: 'Node.js, Go, Python', color: 'indigo' },
                    { title: t('home.some_use_the_techs.database'), tech: 'PostgreSQL, MongoDB', color: 'purple' },
                    { title: t('home.some_use_the_techs.devops'), tech: 'Docker', color: 'green' }
                  ].map((stack, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg bg-white shadow-sm border border-${stack.color}-100 hover:shadow-md transition-all duration-300`}
                      whileHover={{ y: -5 }}
                    >
                      <h4 className={`text-${stack.color}-600 mb-2 font-semibold`}>{stack.title}</h4>
                      <div className="text-sm text-gray-600">{stack.tech}</div>
                    </motion.div>
                  ))}
                </div>
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