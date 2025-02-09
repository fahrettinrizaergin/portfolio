import { useEffect, useState, useRef, useMemo } from 'react';
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

  const [categories, setCategories] = useState([]);
  const [categoryIcons, setCategoryIcons] = useState({});
  const [categoryGradients, setCategoryGradients] = useState({});

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

  useMemo(() => {
    import('../../public/contents/categories.json').then((cts) => {
      const items = cts.default || [];
      
      items.map((item) => {
        setCategories((prev) => [...prev, item.name]);
        setCategoryIcons((prev) => ({ ...prev, [item.name]: item.icon }));
        setCategoryGradients((prev) => ({ ...prev, [item.name]: item.gradient }));
      }); 
    });
  }, []); 


  // {"name": "Frontend", "icon": "🎨", "gradient": "from-blue-500 to-blue-600"},
  // {"name": "Backend", "icon": "⚙️", "gradient": "from-purple-500 to-purple-600"},
  // {"name": "Database", "icon": "🗄️", "gradient": "from-teal-500 to-teal-600"},
  // {"name": "Mobile", "icon": "📱", "gradient": "from-pink-500 to-pink-600"},
  // {"name": "Design", "icon": "🎨", "gradient": "from-purple-500 to-purple-600"},

  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blogs - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content="Read my latest thoughts and insights about web development, programming, and technology."
        />
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden pt-32 pb-16"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tech Blog & Insights
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore the latest in web development, programming, and technology
            </motion.p>

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 bg-gradient-to-r ${categoryGradients[category]}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{categoryIcons[category]}</span>
                  <span className="font-medium">{category}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post, index) => (
                <motion.article
                  key={post.slug}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blogs/${post.slug}`} className="block h-full">
                    <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100">
                      {/* Pattern Background */}
                      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.2] group-hover:scale-110 transition-transform duration-700"></div>
                      
                      {/* Content Container */}
                      <div className="relative p-6 md:p-8 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <span className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryGradients[post.category]} text-white flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                              {categoryIcons[post.category]}
                            </span>
                            <div>
                              <span className="text-sm font-medium text-gray-600">{post.date}</span>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                {/* <span>{post.readTime}</span>
                                <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span> */}
                                <span className="font-medium text-blue-600">{post.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Title & Excerpt */}
                        <div className="flex-grow">
                          <h2 className={`font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-lg md:text-xl`}>
                            {post.title}
                          </h2>
                          <p className={`text-gray-600 line-clamp-2 mb-6`}>
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <motion.div 
                              className="flex items-center text-blue-600 font-medium group/link"
                              whileHover={{ x: 5 }}
                            >
                              <span className="mr-2">{index === 0 ? 'Read Full Article' : 'Read More'}</span>
                              <svg
                                className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.div>
                            
                            {/* Tags or Additional Info */}
                            <div className="flex gap-2">
                              <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 font-medium border border-blue-100">
                                #{post.category.toLowerCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* No Results Message */}
            {filteredBlogs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
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
