import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socials } from '../utils/socials';

const Footer = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hello! How can I help you today? Please select an option below.' }
  ]);

  const menuOptions = [
    {
      id: 'about',
      title: 'About Me',
      icon: '👨‍💻',
      response: "I'm Fahrettin Rıza Ergin, a Full Stack Developer with expertise in React, Node.js, and Go. I'm passionate about creating efficient and scalable web applications."
    },
    {
      id: 'skills',
      title: 'My Skills',
      icon: '🚀',
      response: "I specialize in:\n• Frontend: React, Vue, Next.js\n• Backend: Node.js, Go, Python\n• Database: PostgreSQL, MongoDB\n• DevOps: Docker, Kubernetes"
    },
    {
      id: 'contact',
      title: 'Contact Info',
      icon: '📧',
      response: "You can reach me at:\n• Email: fahrettinrizaergin@gmail.com\n• Location: Antalya, Turkey\n• LinkedIn: Check my profile in the social links below"
    },
    {
      id: 'projects',
      title: 'View Projects',
      icon: '💼',
      response: "Check out my projects section to see my work in:\n• Web Development\n• Mobile Solutions\n• Cloud & DevOps\n• And more! \n• You can also check my projects on my <a href='https://github.com/fahrettinriza'>GitHub</a> page."
    },
    {
      id: 'availability',
      title: 'Availability',
      icon: '📅',
      response: "I'm currently open to:\n• Full-time opportunities\n• Freelance projects\n• Technical consulting\n• Interesting collaborations"
    }
  ];

  const handleOptionSelect = (option) => {
    setMessages([
      ...messages,
      { type: 'user', content: option.title },
      { type: 'ai', content: option.response }
    ]);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: socials.github.url,
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: socials.linkedin.url,
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: socials.twitter.url,
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-primary py-8 mt-16 relative">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <motion.div
            className="flex space-x-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors duration-300"
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </motion.div>
          <motion.p
            className="text-textSecondary text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {new Date().getFullYear()} Fahrettin Rıza Ergin. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* AI Chat Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
            {isAIChatOpen ? '✕' : '🤖'}
          </span>
        </button>
      </motion.div>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isAIChatOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-40"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-blue-100 text-sm">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white shadow-md rounded-bl-none'
                    }`}
                  >
                    <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-700'} whitespace-pre-line`} dangerouslySetInnerHTML={{ __html: message.content }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Menu Options */}
            <div className="p-4 bg-white border-t">
              <div className="grid grid-cols-2 gap-2">
                {menuOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 transition-colors duration-300 flex flex-col items-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                      {option.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer; 