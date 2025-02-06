import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About Content Animation
      ScrollTrigger.create({
        trigger: '.about-content',
        start: 'top center+=100',
        onEnter: () => {
          gsap.to('.about-content', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
          });
        },
        once: true
      });

      // Skills Section Animation
      ScrollTrigger.create({
        trigger: '.skills-section',
        start: 'top center+=100',
        onEnter: () => {
          gsap.to('.skill-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out'
          });
        },
        once: true
      });

      // Experience Section Animation
      ScrollTrigger.create({
        trigger: '.experience-section',
        start: 'top center+=100',
        onEnter: () => {
          gsap.to('.experience-item', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power4.out'
          });
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  const skills = [
    { category: 'Frontend', items: ['ReactJS 5/5', 'Next.js 5/5', 'VueJS 4/5', 'Tailwind CSS 5/5'] },
    { category: 'Backend', items: ['ExpressJS 4/5', 'Laravel 5/5', 'NodeJS 4/5', 'Golang 2.5/5'] },
    { category: 'Database', items: ['MongoDB 4/5', 'PostgreSQL 5/5', 'MariaDB 3/5'] },
    { category: 'Tools', items: ['GitHub 3/5', 'Docker 2/5', 'Linux 4/5', 'Apache 4/5'] },
    { category: 'Mobile', items: ['React Native 3/5'] },
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

      <div className="min-h-screen pb-20 pt-40">
        <div className="container mx-auto px-4">
          {/* About Section */}
          <div
            ref={aboutRef}
            className="about-content max-w-4xl mx-auto opacity-0 translate-y-10"
          >
            <h1 className="section-title text-center mb-12">About Me</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden bg-tertiary">
                  {/* Your Image Here */}
                  <div className="absolute inset-0 bg-secondary/10"></div>
                </div>
              </div>
              <div>
                <p className="text-lg text-textSecondary mb-6">
                  Hello! I'm a passionate full-stack developer with a strong
                  foundation in modern web technologies. I love creating beautiful,
                  functional, and user-friendly applications that solve real-world
                  problems.
                </p>
                <p className="text-lg text-textSecondary mb-6">
                  With several years of experience in the industry, I've had the
                  opportunity to work on diverse projects ranging from small
                  business websites to large-scale enterprise applications.
                </p>
                <p className="text-lg text-textSecondary">
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge
                  through technical writing and mentoring.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div
            ref={skillsRef}
            className="skills-section max-w-4xl mx-auto mt-20"
          >
            <h2 className="section-title text-center mb-12">Skills & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.category}
                  className="skill-card bg-tertiary rounded-lg p-6 opacity-0 translate-y-10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-secondary">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li
                        key={skill}
                        className="text-textSecondary flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div
            ref={experienceRef}
            className="experience-section max-w-4xl mx-auto mt-20"
          >
            <h2 className="section-title text-center mb-12">Experience</h2>
            <div className="space-y-8">
              <div className="experience-item bg-tertiary rounded-lg p-6 opacity-0 translate-y-10">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                    <p className="text-secondary">EticSoft A.Ş.</p>
                  </div>
                  <p className="text-textSecondary">2020 - Present</p>
                </div>
                <ul className="space-y-2 text-textSecondary">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 mt-1 text-secondary flex-shrink-0"
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
                    Developed and maintained full-stack applications using
                    React, Laravel and PostgreSQL.
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 mt-1 text-secondary flex-shrink-0"
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
                    Mentored junior developers and conducted code reviews.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About; 