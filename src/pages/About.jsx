import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  const skills = [
    { 
      category: 'Frontend',
      icon: '🎨',
      items: [
        { name: 'ReactJS', level: 100, color: 'from-blue-400 to-blue-600' },
        { name: 'Next.js', level: 100, color: 'from-blue-500 to-indigo-600' },
        { name: 'VueJS', level: 80, color: 'from-emerald-400 to-emerald-600' },
        { name: 'Tailwind CSS', level: 100, color: 'from-cyan-400 to-cyan-600' }
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      items: [
        { name: 'ExpressJS', level: 80, color: 'from-purple-400 to-purple-600' },
        { name: 'Laravel', level: 100, color: 'from-red-400 to-red-600' },
        { name: 'NodeJS', level: 80, color: 'from-green-400 to-green-600' },
        { name: 'Golang', level: 50, color: 'from-sky-400 to-sky-600' }
      ]
    },
    {
      category: 'Database',
      icon: '🗄️',
      items: [
        { name: 'MongoDB', level: 80, color: 'from-green-400 to-emerald-600' },
        { name: 'PostgreSQL', level: 100, color: 'from-blue-400 to-indigo-600' },
        { name: 'MariaDB', level: 60, color: 'from-orange-400 to-orange-600' }
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: '🛠️',
      items: [
        { name: 'GitHub', level: 60, color: 'from-violet-400 to-violet-600' },
        { name: 'Docker', level: 40, color: 'from-blue-400 to-blue-600' },
        { name: 'Linux', level: 80, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Apache', level: 80, color: 'from-red-400 to-red-600' }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Me - Fahrettin Rıza Ergin</title>
        <meta
          name="description"
          content="Learn more about my background, skills, and experience as a full-stack developer."
        />
      </Helmet>

      <div className={`min-h-screen pb-20 pt-32 bg-gradient-to-b from-blue-50/30 to-white ${isLoaded ? 'loaded' : 'initial-load'}`}>
        {/* About Section */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl font-bold text-center mb-12">
                <span className="gradient-text">About Me</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-blue-100 to-purple-100">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      👨‍💻
                    </div>
                  </div>
                </motion.div>
                
                <div className="space-y-6">
                  <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Hello! I'm a passionate full-stack developer with a strong
                    foundation in modern web technologies. I love creating beautiful,
                    functional, and user-friendly applications that solve real-world
                    problems.
                  </motion.p>
                  <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    With several years of experience in the industry, I've had the
                    opportunity to work on diverse projects ranging from small
                    business websites to large-scale enterprise applications.
                  </motion.p>
                  <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    When I'm not coding, you can find me exploring new technologies,
                    contributing to open-source projects, or sharing my knowledge
                    through technical writing and mentoring.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
                <span className="text-3xl">💼</span>
                Professional Experience
              </h2>

              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                <div className="space-y-8">
                  <motion.div
                    className="relative pl-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-400 shadow-md"></div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm border border-blue-50 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span className="text-blue-600 font-mono font-bold">2020 - Present</span>
                        <h3 className="text-lg font-semibold text-gray-800">Full Stack Developer</h3>
                        <span className="text-gray-600">@ EticSoft A.Ş.</span>
                      </div>
                      <p className="text-gray-600 mt-2 mb-3">
                        Developed and maintained full-stack applications using React, Laravel and PostgreSQL.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Laravel', 'PostgreSQL', 'Docker'].map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
                <span className="text-3xl">⚡</span>
                Skills & Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="bg-white rounded-lg p-6 shadow-sm border border-blue-50 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                      <span>{category.icon}</span>
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.items.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">{skill.name}</span>
                            <span className="text-gray-600 font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
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

export default About; 