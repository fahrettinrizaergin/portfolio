import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(null);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product management, and payment integration.',
      category: 'Full Stack',
      image: '/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      icon: '🛍️'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      category: 'Frontend',
      image: '/project2.jpg',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      icon: '✅'
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive dashboard for social media analytics with interactive charts, data visualization, and automated reporting.',
      category: 'Backend',
      image: '/project3.jpg',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
      icon: '📊'
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered content generation platform using OpenAI GPT-3 API for creating high-quality content automatically.',
      category: 'Full Stack',
      image: '/project4.jpg',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'OpenAI'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      icon: '🤖'
    },
    {
      title: 'Real-time Chat App',
      description: 'A modern real-time chat application with features like group chats, file sharing, and end-to-end encryption.',
      category: 'Frontend',
      image: '/project5.jpg',
      technologies: ['React', 'WebSocket', 'Redux', 'Material-UI'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      icon: '💬'
    },
    {
      title: 'DevOps Pipeline',
      description: 'Automated CI/CD pipeline setup with containerization and cloud deployment capabilities.',
      category: 'Backend',
      image: '/project6.jpg',
      technologies: ['Docker', 'Jenkins', 'AWS', 'Kubernetes'],
      liveUrl: '#',
      githubUrl: '#',
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600',
      icon: '🚀'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Projects - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content="Explore my portfolio of web development projects, including full-stack applications, websites, and more."
        />
      </Helmet>

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
                <span className="gradient-text">Featured Projects</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and
                experience in web development. Each project represents unique
                challenges and solutions.
              </p>
            </motion.div>

            <div className="flex justify-center gap-4 mb-12">
              {['all', 'Full Stack', 'Frontend', 'Backend'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-blue-50 border border-blue-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter(project => activeCategory === 'all' || project.category === activeCategory)
                .map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setIsHovered(index)}
                    onHoverEnd={() => setIsHovered(null)}
                  >
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-${project.color}-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-sm rounded-lg bg-${project.color}-50 text-${project.color}-600 border border-${project.color}-100`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-2 px-4 rounded-lg bg-gradient-to-r ${project.gradient} text-white font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Live Demo
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:border-blue-200 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Source Code
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
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

export default Projects; 