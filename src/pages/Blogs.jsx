import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    gsap.from('.blog-card', {
      scrollTrigger: {
        trigger: '.blogs-grid',
        start: 'top center+=100',
        end: 'bottom center-=100',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power4.out',
    });

    import('../../public/contents/blogs.json').then((blogs) => {
      setBlogs(blogs.default || []);
    });
  }, []); 

  return (
    <>
      <Helmet>
        <title>Blog - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content="Read my latest thoughts and insights about web development, programming, and technology."
        />
      </Helmet>

      <div className="min-h-screen pb-20 pt-40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">Blog Posts</h1>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">
              Explore my latest articles about web development, programming tips,
              and technology insights.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <motion.article
                key={index}
                className="blog-card bg-tertiary rounded-xl overflow-hidden shadow-custom hover:shadow-custom-lg transition-all duration-300 relative"
                whileHover={{ y: -10 }}
              >
                <Link to={`/blogs/${post.slug}`} className="block">
                  <div className="aspect-w-16 aspect-h-9 bg-accent">
                    <div className="absolute inset-0 bg-secondary/10"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-textSecondary">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-textPrimary hover:text-secondary transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-textSecondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-textSecondary">{post.date}</span>
                      <span className="text-secondary hover:text-secondary/80 transition-colors duration-300 flex items-center text-sm">
                        Read More
                        <svg
                          className="w-4 h-4 ml-2"
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
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
