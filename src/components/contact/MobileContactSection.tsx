"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// Types
interface FormData {
  from_name: string;
  email: string;
  message: string;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface Language {
  code: string;
  name: string;
  icon: string;
}

// Export as named export for importing in other components
export function MobileContactSection() {
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    email: "",
    message: "",
  });
  const [activeTab, setActiveTab] = useState<'form' | 'socials' | 'about'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/azizbekdevuz",
      icon: "/icons/github.svg",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/azizbekdev",
      icon: "/icons/linkedin.svg",
    },
    {
      id: "telegram",
      name: "Telegram",
      url: "https://t.me/azizbek_dev",
      icon: "/icons/telegram.svg",
    },
    {
      id: "linktree",
      name: "LinkTree",
      url: "https://linktr.ee/azizbekuz",
      icon: "/icons/linktree.svg",
    },
  ];

  // Languages
  const languages: Language[] = [
    {
      code: "en",
      name: "English",
      icon: "/icons/uk.svg",
    },
    {
      code: "ko",
      name: "Korean",
      icon: "/icons/kr.svg",
    },
    {
      code: "uz",
      name: "Uzbek",
      icon: "/icons/uz.svg",
    },
    {
      code: "ru",
      name: "Russian",
      icon: "/icons/ru.svg",
    },
  ];

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (success || error) {
      timeoutId = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [success, error]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Get EmailJS credentials from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Validate that all required environment variables exist
    if (!serviceId || !templateId || !publicKey) {
      setError(
        "Email service configuration is missing. Please contact the administrator."
      );
      setIsLoading(false);
      return;
    }

    try {
      // Add recipient name as a hidden field for the template
      const form = formRef.current;
      const toNameInput = document.createElement("input");
      toNameInput.type = "hidden";
      toNameInput.name = "to_name";
      toNameInput.value = "Azizbek";
      form.appendChild(toNameInput);

      // Send the form
      await emailjs.sendForm(serviceId, templateId, form, publicKey);

      // Success handling
      setSuccess(true);
      setFormData({ from_name: "", email: "", message: "" });

      // Remove the temporary hidden field
      form.removeChild(toNameInput);
    } catch (err) {
      // Error handling with better logging
      console.error("EmailJS error:", err);
      setError(
        err instanceof Error
          ? `Failed to send message: ${err.message}`
          : "Failed to send message. Please try again later."
      );

      // Clean up temp field if it exists
      const form = formRef.current;
      const tempField = form.querySelector('input[name="to_name"]');
      if (tempField) {
        form.removeChild(tempField);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen py-10 px-4 bg-dark-light/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Section Title - Simple and clear */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-text-light mb-1">Get in Touch</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* Contact Card - Simplified for mobile */}
      <motion.div
        className="mb-8 p-4 rounded-lg bg-dark-light/30 border border-primary/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          {/* QR Code - Smaller size for mobile */}
          <div className="w-16 h-16 flex-shrink-0">
            <div className="p-1 rounded border-white">
              <Image 
                src="/icons/contact.png" 
                alt="QR Code for portfolio" 
                width={56} 
                height={56}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary">Azizbek Arzikulov</h3>
            <p className="text-sm text-text-light">Full Stack Developer</p>
            <a 
              href="mailto:azizbek.dev.uz@gmail.com" 
              className="text-sm text-text-secondary hover:text-primary transition-colors"
            >
              azizbek.dev.uz@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation - Mobile-friendly navigation */}
      <div className="flex rounded-lg bg-dark-light/20 p-1 mb-6 sticky top-4 z-30 border border-primary/10 backdrop-blur-md shadow-lg">
        {[
          { id: 'form', label: 'Message' },
          { id: 'socials', label: 'Connect' },
          { id: 'about', label: 'About' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'form' | 'socials' | 'about')}
            className={`flex-1 py-2 text-center rounded-md text-sm font-medium transition-colors 
              ${activeTab === tab.id 
                ? 'bg-primary text-white shadow-md' 
                : 'text-text-secondary hover:bg-primary/10'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="bg-dark-light/20 rounded-lg overflow-hidden border border-primary/10">
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={(e) =>
                    setFormData({ ...formData, from_name: e.target.value })
                  }
                  className="w-full bg-transparent outline-none text-text-light px-4 py-3 text-base"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="bg-dark-light/20 rounded-lg overflow-hidden border border-primary/10">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="w-full bg-transparent outline-none text-text-light px-4 py-3 text-base"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="bg-dark-light/20 rounded-lg overflow-hidden border border-primary/10">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-transparent outline-none text-text-light px-4 py-3 text-base resize-none"
                  placeholder="Your Message"
                  required
                />
                <div className="px-4 py-1 text-xs text-text-secondary text-right">
                  {formData.message.length}/500
                </div>
              </div>

              {/* Submit Button - Full width and easy to tap */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-primary text-white font-medium text-base
                         disabled:opacity-50 active:bg-primary/80 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> 
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Status Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}

        {activeTab === 'socials' && (
          <motion.div
            key="socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Social Links - Card style for easy tapping */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-dark-light/30 rounded-lg border border-primary/20 flex flex-col items-center gap-3 active:bg-primary/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={link.icon}
                      alt={link.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-text-light font-medium text-sm">{link.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Contact info card */}
            <motion.div 
              className="mt-6 p-4 bg-dark-light/30 rounded-lg border border-primary/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-primary font-medium mb-3">Direct Contact</h3>
              <div className="space-y-2">
                <a href="tel:+998901234567" className="flex items-center gap-3 text-text-light hover:text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <span>+998 90 1227 88 79</span>
                </a>
                <a href="mailto:azizbek.dev.uz@gmail.com" className="flex items-center gap-3 text-text-light hover:text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <span>azizbek.dev.uz@gmail.com</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Languages list */}
            <motion.div 
              className="bg-dark-light/30 rounded-lg border border-primary/20 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4 border-b border-primary/10">
                <h3 className="text-primary font-medium">Languages</h3>
              </div>
              <div>
                {languages.map((lang, index) => (
                  <div 
                    key={lang.code}
                    className={`flex items-center gap-3 p-3 ${index !== languages.length - 1 ? 'border-b border-primary/10' : ''}`}
                  >
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={lang.icon}
                        alt={`${lang.name} flag`}
                        fill
                        className="object-contain rounded-sm"
                      />
                    </div>
                    <span className="text-text-light">{lang.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* About card */}
            <motion.div 
              className="bg-dark-light/30 rounded-lg border border-primary/20 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-primary font-medium mb-2">About Me</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Full Stack Developer with expertise in React, Next.js, and TypeScript. Passionate about creating responsive, 
                user-friendly applications with clean code and modern best practices.
              </p>
            </motion.div>

            {/* Location card */}
            <motion.div 
              className="bg-dark-light/30 rounded-lg border border-primary/20 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-primary font-medium mb-2">Location</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-text-light">Seoul, South Korea</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}