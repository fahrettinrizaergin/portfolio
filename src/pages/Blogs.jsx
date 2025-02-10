import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import GlobalHelmet from '../components/GlobalHelmet';

import content from "../../public/contents/categories/content.js"

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useRef(null);
  const { t, i18n } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [categoryIcons, setCategoryIcons] = useState({});
  const [categoryGradients, setCategoryGradients] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const fetchData = async () => {
      try {
        // const lang = i18n.language || 'en';
        const lang = (i18n.language || 'en').split('-')[0];
        console.log(lang)
        const [ categoriesData] = await Promise.all([
          import('../../public/contents/categories.json')
        ]); 
         
        const blogs = content[lang] || [];
        const blogBuildData = blogs.filter(blog => blog.isShow === true); 
        setBlogs(blogBuildData);
        
        const items = categoriesData.default || []; 
        setCategories([...items.map(item => item.name)]);
        const icons = { ...items.reduce((acc, item) => ({ ...acc, [item.name]: item.icon }), {}) };
        const gradients = { ...items.reduce((acc, item) => ({ ...acc, [item.name]: item.gradient }), {}) };
        
        setCategoryIcons(icons);
        setCategoryGradients(gradients);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(loadTimer);
    };
  }, [i18n.language]);

  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <> 
      <GlobalHelmet
        title={t('blogs.meta.title')}
        description={t('blogs.meta.description')}
      />

      <div className="min-h-screen pb-20 pt-32 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl font-bold mb-6">
                <span className="gradient-text">{t('blogs.title')}</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('blogs.description')}
              </p>
            </motion.div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('blogs.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg flex items-center ${activeCategory === category ? `bg-gradient-to-r ${categoryGradients[category]} text-white shadow-lg` : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'} transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{categoryIcons[category]}</span>
                  <span>{category === 'all' ? t('blogs.all_posts') : category}</span>
                </motion.button>
              ))}
            </div>

            {/* Blog Grid */}
            <AnimatePresence mode="wait">
              {filteredBlogs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-[350px]"
                    >
                      <div className="flex-1">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mb-4 bg-gradient-to-r ${categoryGradients[blog.category]} text-white`}>
                          <span className="mr-2">{categoryIcons[blog.category]}</span>
                          {blog.category}
                        </div>
                      
                        <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-3">📅 {blog.date}</span>
                        </div>
                        <Link 
                          to={`/blogs/${blog.slug}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group flex items-center"
                        >
                          {t('blogs.read_more')}
                          <motion.span
                            className="inline-block ml-1"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {t('blogs.no_results.title')}
                  </h3>
                  <p className="text-gray-600">
                  {t('blogs.no_results.description')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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

export default Blogs;
