import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import GlobalHelmet from '../components/GlobalHelmet.jsx';

import content from "../../public/contents/categories/content.js"

gsap.registerPlugin(ScrollTrigger);

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {

    const fetchPost = async () => {
      try {
        // get lang and normalize it to base language code
        const lang = (i18n.language || 'en').split('-')[0];
        const blogs = content[lang] || [];
        const foundPost = blogs.find(p => p.slug === slug);

        if (!foundPost) {
          navigate('/404');
          return;
        }

        // // Fetch the markdown content
        const response = await fetch(`/contents/blogs/${lang}/${foundPost.contentFile}`);
        const contentData = await response.text();

        if (contentData.startsWith('<!DOCTYPE html>')) {
          navigate('/404');
          return;
        }

        setPost({ ...foundPost, content: contentData });
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate, i18n.language]);

  useEffect(() => {
    if (!loading && post) {
      // Animate content sections
      gsap.from('.blog-content > *', {
        scrollTrigger: {
          trigger: '.blog-content',
          start: 'top center+=100',
          end: 'bottom center',
        },
        y: 30,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
      });
    }
  }, [loading, post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      <GlobalHelmet
        title={t('blog_post.meta.title', { val: post.title })}
        description={post.excerpt}
      />
      <Helmet> 
        <style>
          {`
            .blog-content {
              color: #1e293b;
              line-height: 1.8;
            }
            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4,
            .blog-content h5,
            .blog-content h6 {
              color: #1e293b;
              font-weight: 600;
              margin-top: 2em;
              margin-bottom: 1em;
            }
            .blog-content h1 { font-size: 2.25em; }
            .blog-content h2 { font-size: 1.875em; }
            .blog-content h3 { font-size: 1.5em; }
            .blog-content h4 { font-size: 1.25em; }
            .blog-content p {
              margin-top: 1.5em;
              margin-bottom: 1.5em;
            }
            .blog-content a {
              color: #2563eb;
              text-decoration: underline;
            }
            .blog-content ul,
            .blog-content ol {
              margin-top: 1.5em;
              margin-bottom: 1.5em;
              padding-left: 1.5em;
            }
            .blog-content li {
              margin-top: 0.5em;
              margin-bottom: 0.5em;
            }
            .blog-content blockquote {
              border-left: 4px solid #2563eb;
              padding-left: 1em;
              margin: 1.5em 0;
              font-style: italic;
              background: rgba(37, 99, 235, 0.1);
              padding: 1em;
              border-radius: 0.375rem;
            }
            .blog-content pre {
              margin: 1.5em 0;
              padding: 1em;
              border-radius: 0.375rem;
              background: #1e293b;
              overflow-x: auto;
            }
            .blog-content code {
              background: rgba(37, 99, 235, 0.1);
              padding: 0.2em 0.4em;
              border-radius: 0.25em;
              font-size: 0.875em;
            }
            .blog-content img {
              margin: 1.5em 0;
              border-radius: 0.375rem;
              max-width: 100%;
              height: auto;
            }
            .blog-content hr {
              margin: 2em 0;
              border: 0;
              border-top: 2px solid rgba(37, 99, 235, 0.1);
            }
            .blog-content table {
              width: 100%;
              margin: 1.5em 0;
              border-collapse: collapse;
            }
            .blog-content th,
            .blog-content td {
              padding: 0.75em;
              border: 1px solid rgba(37, 99, 235, 0.2);
            }
            .blog-content th {
              background: rgba(37, 99, 235, 0.1);
              font-weight: 600;
            }
          `}
        </style>
      </Helmet>

      <div className="min-h-screen pb-20 pt-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Blog Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Link
                to="/blogs"
                className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors duration-300 mb-8"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t('blog_post.back_to_blogs')}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className="text-sm text-textSecondary">{post.date}</span>
                <span className="text-secondary">•</span>
                <span className="text-sm text-textSecondary">{post.readTime}</span>
                <span className="text-secondary">•</span>
                <span className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-accent relative">
                  {/* <div className="absolute inset-0 bg-secondary/10"></div> */}
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Blog Content */}
            <article className="max-w-3xl mx-auto blog-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>

              {/* Navigation Buttons */}
              <div className="max-w-3xl mx-auto mt-12 flex justify-between flex-col lg:flex-row">
                {(() => {
                  // get lang and normalize it to base language code
                  const lang = (i18n.language || 'en').split('-')[0];
                  const blogs = content[lang] || [];
                  const currentIndex = blogs.findIndex(p => p.slug === slug);
                  
                  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
                  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

                  return (
                    <>
                      {prevPost && (
                        <Link
                          to={`/blogs/${prevPost.slug}`}
                          className="border rounded-lg w-full lg:w-auto mb-4 lg:mb-0 px-4 py-2 flex justify-between items-center space-x-2 text-textSecondary hover:text-secondary transition-colors duration-300 !no-underline"
                        >
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
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          <span dangerouslySetInnerHTML={{__html: t('blog_post.previous', {val: prevPost.title.length > 30 ? prevPost.title.substr(0,30) + "..." : prevPost.title })}}></span>
                        </Link>
                      )}
                      {nextPost && (
                        <Link
                          to={`/blogs/${nextPost.slug}`}
                          className="border rounded-lg w-full lg:w-auto px-4 py-2 flex justify-between items-center space-x-2 text-textSecondary hover:text-secondary transition-colors duration-300 !no-underline"
                        >
                          <span dangerouslySetInnerHTML={{__html: t('blog_post.next', {val: nextPost.title.length > 30 ? nextPost.title.substr(0,30) + "..." : nextPost.title })}}></span>
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </>
                  );
                })()}
              </div>
            </article>

            {/* Share and Navigation */}
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-accent/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-textSecondary">{t('blog_post.share')}:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-secondary transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-secondary transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
