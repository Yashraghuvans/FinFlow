import React from 'react';
import { Heart, Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "API", href: "#" },
        { name: "Documentation", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Status", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Yashraghuvans/FinFlow" },
    { name: "Email", icon: Mail, href: "mailto:contact@finflow.com" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="favicon.ico" 
                alt="FinFlow Logo" 
                className="h-10 w-10 rounded-xl mr-3" 
              />
              <span className="text-2xl font-bold text-white">FinFlow</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Your comprehensive financial management platform for home loan tracking, 
              EMI calculations, and contractor project management. Simplify your 
              financial journey with powerful analytics and insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-400 hover:bg-slate-700 transition-all duration-200 focus-ring"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-primary-400 transition-colors duration-200 focus-ring"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-slate-400">
              <span>© {currentYear} FinFlow. All rights reserved.</span>
            </div>
            
            <div className="flex items-center text-slate-400">
              <span className="mr-2">Made with</span>
              <Heart className="w-4 h-4 text-error-500 animate-pulse" />
              <span className="ml-2">by Yash Raghuvanshi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section (Optional) */}
      <div className="bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-slate-300 mb-6">
              Get the latest updates and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
