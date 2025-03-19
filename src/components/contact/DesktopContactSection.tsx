"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Import components
import { CircuitBackground } from "../contact/CircuitBackground";
import { QRCodeDisplay } from "../contact/QRCodeDisplay";
import { LanguageSection } from "../contact/LanguageSection";
import { SocialLinks } from "../contact/SociallLinks";

// Types
interface FormData {
  from_name: string;
  email: string;
  message: string;
}

// Interactive Contact Card Component
const ContactCard: React.FC = () => {
  // Component code remains the same
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-lg bg-dark-light/30 border border-primary/20 backdrop-blur-sm overflow-hidden"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Circuit Background */}
      <CircuitBackground />

      <div className="relative z-10 space-y-4">
        <motion.h2
          className="text-2xl font-bold text-primary"
          animate={{
            color: isHovered ? "#2980b9" : "#149ddd",
          }}
        >
          Azizbek Arzikulov
        </motion.h2>
        <p className="text-text-light">Full Stack Developer</p>
        <motion.a
          href="mailto:azizbek.dev.uz@gmail.com"
          className="block text-text-secondary hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          azizbek.dev.uz@gmail.com
        </motion.a>

        {/* QR Code with animation */}
        <div className="absolute top-4 right-4">
          <QRCodeDisplay
            value="https://portfolio-next-silk-two.vercel.app/"
            isHovered={isHovered}
          />
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

// Renamed to ContactSectionDesktop
export function DesktopContactSection() {
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    email: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

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

    // Get EmailJS credentials from environment variables only
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Validate that all required environment variables exist
    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "Missing EmailJS configuration. Please check your environment variables.",
      );
      setError(
        "Email service configuration is missing. Please contact the administrator.",
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
      toNameInput.value = "Azizbek"; // This should also come from env if possible
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
          : "Failed to send message. Please try again later.",
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
      className="relative min-h-screen py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
        <div className="flex items-center gap-3 mb-4 font-mono">
          <span className="text-primary/50">class</span>
          <h2 className="text-4xl font-bold text-text-light">ContactMatrix</h2>
          <span className="text-primary/50">extends</span>
          <span className="text-text-light">Connection</span>
        </div>
      </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactCard />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field - Changed name attribute to match template */}
              <div className="relative">
                <motion.div
                  className={`relative border ${
                    activeField === "from_name"
                      ? "border-primary"
                      : "border-primary/20"
                  } rounded-lg p-2 transition-all duration-300`}
                  whileHover={{ scale: 1.01 }}
                  animate={{
                    boxShadow:
                      activeField === "from_name"
                        ? "0 0 20px rgba(20, 157, 221, 0.2)"
                        : "none",
                  }}
                >
                  <input
                    type="text"
                    name="from_name" // Changed to match template variable
                    value={formData.from_name}
                    onChange={(e) =>
                      setFormData({ ...formData, from_name: e.target.value })
                    }
                    onFocus={() => setActiveField("from_name")}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent outline-none text-text-light px-3 py-2"
                    placeholder="Your Name"
                    required
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: activeField === "from_name" ? 1 : 0,
                    }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.div
                  className={`relative border ${
                    activeField === "email"
                      ? "border-primary"
                      : "border-primary/20"
                  } rounded-lg p-2`}
                  whileHover={{ scale: 1.01 }}
                  animate={{
                    boxShadow:
                      activeField === "email"
                        ? "0 0 20px rgba(20, 157, 221, 0.2)"
                        : "none",
                  }}
                >
                  <input
                    ref={emailInputRef}
                    type="email"
                    name="email" // This field name is fine
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent outline-none text-text-light px-3 py-2"
                    placeholder="Your Email"
                    required
                  />
                </motion.div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.div
                  className={`relative border ${
                    activeField === "message"
                      ? "border-primary"
                      : "border-primary/20"
                  } rounded-lg p-2`}
                  whileHover={{ scale: 1.01 }}
                  animate={{
                    boxShadow:
                      activeField === "message"
                        ? "0 0 20px rgba(20, 157, 221, 0.2)"
                        : "none",
                  }}
                >
                  <textarea
                    name="message" // This field name is fine
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    rows={5}
                    maxLength={500}
                    className="w-full bg-transparent outline-none text-text-light 
                             px-3 py-2 resize-none"
                    placeholder="Your Message"
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-text-secondary">
                    {formData.message.length}/500
                  </div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-primary text-white relative 
                         overflow-hidden group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {isLoading ? "Sending..." : "Send Message"}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-[#2980b9] to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.button>

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
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Social Links Section */}
        <SocialLinks />

        {/* Language Section */}
        <LanguageSection />
      </div>
    </motion.section>
  );
}