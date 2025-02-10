import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Create a timeline for the loading animation
    const tl = gsap.timeline();

    // Initial animations for the preloader elements with longer durations
    tl.from('.preloader-text', {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.3
    })
    .from('.preloader-icon', {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .from('.progress-wrapper', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to('.progress-bar', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    });

    // After all content is loaded
    window.addEventListener('load', () => {
      // Fade out animation for the entire preloader with longer duration
      gsap.to('.preloader', {
        opacity: 0,
        duration: 5.2,
        ease: 'power3.inOut',
        onComplete: () => {
          setLoading(false);
        }
      });
    });

    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="relative w-screen h-screen">
        {/* Particle Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 3 + 2}s linear infinite`,
                transform: `scale(${Math.random() * 2 + 0.5})`
              }}
            />
          ))}
        </div>

        {/* 3D Cube Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="cube-wrapper perspective-1000 w-32 h-32">
            <div className="cube relative transform-style-3d animate-spin-slow w-full h-full">
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform -translate-z-16 rotate-y-0"></div>
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform translate-z-16 rotate-y-180"></div>
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform rotate-y-90 translate-x-16"></div>
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform rotate-y-270 -translate-x-16"></div>
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform rotate-x-90 translate-y-16"></div>
              <div className="cube-face absolute w-full h-full border-2 border-blue-400/50 bg-blue-900/20 backdrop-blur-sm transform rotate-x-270 -translate-y-16"></div>
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 p-8 rounded-2xl backdrop-blur-md bg-gray-900/40 border border-blue-400/20 shadow-2xl">
            <div className="preloader-icon text-5xl transform hover:scale-110 transition-transform duration-300 animate-bounce-slow">👨‍💻</div>
            <div className="space-y-2">
              <h2 className="preloader-text text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Fahrettin Rıza Ergin
              </h2>
              <p className="preloader-text text-lg text-blue-200/80">
                {t('home.title')}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="progress-wrapper w-full max-w-md">
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div className="progress-bar w-0 h-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes spin {
          from { transform: rotateX(0) rotateY(0); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;