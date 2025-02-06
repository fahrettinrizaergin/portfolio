import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    import('../../public/contents/blogs.json').then((blogs) => {
      setBlogs(blogs.default || []);
    });

    // Matrix rain animation
    const ctx = gsap.context(() => {
      gsap.to('.matrix-rain', {
        y: '100vh',
        opacity: 0,
        duration: 'random(2, 4)',
        stagger: {
          amount: 2,
          from: 'random'
        },
        repeat: -1
      });
    }, heroRef);

    return () => {
      clearTimeout(loadTimer);
      ctx.revert();
    };
  }, []); 

  const categories = ['all', 'Frontend', 'Backend', 'DevOps', 'Career'];

  const categoryIcons = {
    Frontend: '🎨',
    Backend: '⚙️',
    DevOps: '🚀',
    Career: '💡',
    all: '📚'
  };

  const categoryGradients = {
    Frontend: 'from-blue-500 to-blue-600',
    Backend: 'from-purple-500 to-purple-600',
    DevOps: 'from-green-500 to-green-600',
    Career: 'from-yellow-500 to-yellow-600',
    all: 'from-indigo-500 to-indigo-600'
  };

  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content="Read my latest thoughts and insights about web development, programming, and technology."
        />
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`min-h-[70vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-white pt-32 pb-20 ${isLoaded ? 'loaded' : 'initial-load'}`}
      >
        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="matrix-rain absolute text-blue-600/20 text-xs"
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

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-6xl font-bold mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="gradient-text">Tech Blog & Insights</span>
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-xl max-w-2xl mx-auto mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore my latest articles about web development, programming tips,
                and technology insights. Stay updated with the latest trends and best practices.
              </motion.p>

              {/* Search Bar 
              <motion.div
                className="max-w-xl mx-auto mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-12"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </motion.div>
              */}

              {/* Category Filter */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === category
                        ? `bg-gradient-to-r ${categoryGradients[category]} text-white shadow-lg`
                        : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 border border-blue-100 hover:border-blue-200'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="text-xl">{categoryIcons[category]}</span>
                    <span className="font-semibold">{category}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 backdrop-blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto"> 

            {/* Featured Post */}
            <AnimatePresence mode="wait">
              {filteredBlogs.length > 0 && (
                <motion.article
                  key="featured"
                  className="mb-16 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Link to={`/blogs/${filteredBlogs[0].slug}`} className="block">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      <div className="relative aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden group">
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center text-6xl"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {categoryIcons[filteredBlogs[0].category]}
                        </motion.div>
                        <div className="absolute top-4 right-4">
                          <motion.span 
                            className="px-4 py-2 text-sm rounded-full bg-white/90 text-blue-600 font-semibold border border-blue-100"
                            whileHover={{ scale: 1.05 }}
                          >
                            Featured Post
                          </motion.span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                            {filteredBlogs[0].category}
                          </span>
                          <span className="text-sm text-gray-600">{filteredBlogs[0].date}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {filteredBlogs[0].excerpt}
                        </p>
                        <motion.div 
                          className="flex items-center text-blue-600 font-semibold"
                          whileHover={{ x: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          Read Full Article
                          <svg
                            className="w-5 h-5 ml-2"
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
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Blog Grid */}
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.slice(1).map((post, index) => (
                  <motion.article
                    key={post.slug}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Link to={`/blogs/${post.slug}`} className="block">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden h-full">
                        {/* Image Container */}
                        <div className="relative">
                          <motion.div 
                            className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-500"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Category Icon with Glow Effect */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="text-5xl transform transition-transform duration-500 relative"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                              >
                                <div className="absolute inset-0 blur-2xl bg-blue-300/30 rounded-full" />
                                {categoryIcons[post.category]}
                              </motion.div>
                            </div>
                          </motion.div>

                          {/* Category Badge */}
                          <motion.div 
                            className="absolute top-4 right-4 z-10"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <span className="px-4 py-2 text-sm rounded-full bg-white/90 text-blue-600 font-semibold border border-blue-100 shadow-lg backdrop-blur-sm">
                              {post.category}
                            </span>
                          </motion.div>

                          {/* Reading Time Badge */}
                          <motion.div 
                            className="absolute bottom-4 left-4 z-10"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                          >
                            <span className="px-3 py-1 text-sm rounded-full bg-black/70 text-white backdrop-blur-sm flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {post.readTime}
                            </span>
                          </motion.div>
                        </div>

                        {/* Content Container */}
                        <div className="p-6 relative">
                          {/* Date */}
                          <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </div>

                          {/* Title */}
                          <motion.h2 
                            className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            {post.title}
                          </motion.h2>

                          {/* Excerpt */}
                          <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                            {post.excerpt}
                          </p>

                          {/* Read More Button */}
                          <motion.div 
                            className="flex items-center text-blue-600 font-semibold group/btn"
                            whileHover={{ x: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="relative">
                              Read More
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/btn:w-full transition-all duration-300" />
                            </span>
                            <svg
                              className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300"
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
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>

            {/* No Results Message */}
            {filteredBlogs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

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

        .matrix-rain {
          font-family: monospace;
          font-size: 14px;
          line-height: 1;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default Blogs;
