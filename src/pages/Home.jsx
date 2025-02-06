import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background effect
      gsap.to('.hero-gradient', {
        backgroundPosition: '200% center',
        duration: 15,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.floating-particle', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          amount: 4,
          from: 'random'
        }
      });

      // Hero Section Animations
      const heroTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1 }
      });

      heroTl
        .fromTo('.hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1 }
        )
        .fromTo('.hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.5'
        )
        .fromTo('.hero-description',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.5'
        )
        .fromTo('.hero-buttons',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.3'
        );

      // Featured Section Animation
      ScrollTrigger.create({
        trigger: '.featured-section',
        start: 'top center+=100',
        onEnter: () => {
          gsap.to('.project-card', {
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

  return (
    <>
      <Helmet>
        <title>Fahrettin Rıza Ergin</title>
        <meta name="description" content="Welcome to my portfolio. I'm a full-stack developer specializing in modern web technologies." />
        <meta name="keywords" content="Fahrettin Rıza Ergin, full-stack developer, web developer, software engineer, portfolio" />
        <meta name="author" content="Fahrettin Rıza Ergin" />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="page-section min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-gradient bg-gradient-to-r from-secondary/5 via-primary to-secondary/5 bg-[length:200%_100%]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`floating-particle absolute w-2 h-2 rounded-full bg-secondary/10
                ${i % 2 === 0 ? 'backdrop-blur-sm' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] animate-pulse"></div>

        <div className="container relative z-10">
          <div className="section-content">
            <span className="text-secondary font-mono mb-4 block opacity-0 hero-subtitle">
              Hi, my name is
            </span>
            <h1 className="hero-title text-2xl md:text-4xl lg:text-6xl font-bold mb-6 opacity-0">
              <span className="gradient-text">Fahrettin Rıza Ergin</span>
            </h1>
            <h2 className="hero-subtitle text-3xl md:text-4xl text-textSecondary mb-8 opacity-0 font-semibold">
              I build things for the web
            </h2>
            <p className="hero-description text-lg md:text-xl text-textSecondary mb-12 max-w-2xl mx-auto opacity-0">
              Hello!!! I am a full-stack web developer. I use modern technologies to create a user-friendly and 
              I develop web applications with high performance. I like to learn new things and create projects.
            </p>
            <div className="hero-buttons flex justify-center space-x-6 opacity-0">
              <a href="/contact" className="btn btn-primary hover-translate focus-ring">
                Get in Touch
              </a>
              <a
                href="/projects"
                className="btn glass-effect text-textPrimary hover-translate focus-ring"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section ref={featuredRef} className="page-section bg-tertiary/30 relative">
        <div className="container relative z-10">
          <h2 className="section-title mb-16">Featured Projects</h2>
          <div className="grid-container grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


            <motion.div
              className="project-card card opacity-0 translate-y-10 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-accent mb-6">
                <div className="absolute inset-0 bg-secondary/5 transition-colors duration-300 hover:bg-secondary/10 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">FTA - Proxy & Gateway System</h3>
              <p className="text-textSecondary mb-6">
                FTA - Proxy & Gateway System is a system that allows you to proxy and gateway your requests.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-accent/50 px-3 py-1 rounded-full text-secondary">Golang</span>
                <span className="text-xs bg-accent/50 px-3 py-1 rounded-full text-secondary">PostgreSQL</span>
                <span className="text-xs bg-accent/50 px-3 py-1 rounded-full text-secondary">Docker</span>
                <span className="text-xs bg-accent/50 px-3 py-1 rounded-full text-secondary">ReactJS</span>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-secondary hover:text-secondary/80 transition-colors duration-300 hover-translate flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="#"
                  className="text-secondary hover:text-secondary/80 transition-colors duration-300 hover-translate flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Source Code
                </a>
              </div>
            </motion.div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Home; 