import { animate, stagger } from 'framer-motion';

// Floating animation for 3D objects
export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 0, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Parallax scroll animation
export const parallaxScroll = (direction = 'up', distance = 50) => ({
  initial: { opacity: 0, y: direction === 'up' ? distance : -distance },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1.5
    }
  },
  viewport: { once: true, margin: '-100px' }
});

// Staggered children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Fade in animation with scale
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Text reveal animation
export const textReveal = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95]
    }
  }
};

// Cursor follower effect
export const initCursorEffect = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const moveCursor = (e) => {
    requestAnimationFrame(() => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  };

  window.addEventListener('mousemove', moveCursor);
  return () => {
    window.removeEventListener('mousemove', moveCursor);
    document.body.removeChild(cursor);
  };
};

// Magnetic effect for buttons and links
export const initMagneticEffect = (element, intensity = 0.5) => {
  const magnetic = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    element.style.transform = `translate(${distanceX * intensity}px, ${distanceY * intensity}px)`;
  };

  const resetPosition = () => {
    element.style.transform = 'translate(0px, 0px)';
  };

  element.addEventListener('mousemove', magnetic);
  element.addEventListener('mouseleave', resetPosition);

  return () => {
    element.removeEventListener('mousemove', magnetic);
    element.removeEventListener('mouseleave', resetPosition);
  };
};