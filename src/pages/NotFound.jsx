import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary to-secondary/5"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-8xl font-bold mb-8 gradient-text">404</h1>
              <h2 className="text-3xl font-semibold mb-6 text-textPrimary">
                Page Not Found
              </h2>
              <p className="text-textSecondary text-lg mb-12">
                Oops! The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/"
                  className="btn btn-primary hover-translate focus-ring"
                >
                  Go Home
                </Link>
                <Link
                  to="/contact"
                  className="btn glass-effect text-textPrimary hover-translate focus-ring"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-secondary/20 border-dashed"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
