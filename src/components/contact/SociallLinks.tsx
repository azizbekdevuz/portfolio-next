import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  command: string;
  description: string;
}

const socialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/azizbekdevuz",
    icon: "/icons/github.svg",
    command: "git checkout profile",
    description: "Open source contributions",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/azizbek-arzikulov",
    icon: "/icons/linkedin.svg",
    command: "connect --professional",
    description: "Professional network",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: "https://t.me/azizbek_dev",
    icon: "/icons/telegram.svg",
    command: "send message",
    description: "Direct messaging",
  },
  {
    id: "linktree",
    name: "LinkTree",
    url: "https://linktr.ee/azizbekuz",
    icon: "/icons/linktree.svg",
    command: "explore links",
    description: "All social profiles",
  },
];

export const SocialLinks: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeCommand = async (link: SocialLink) => {
    setIsProcessing(true);
    setActiveLink(link.id);

    // Add command to terminal history
    setTerminalHistory((prev) => [...prev, `> ${link.command}`]);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800));
    setTerminalHistory((prev) => [...prev, `Connecting to ${link.name}...`]);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setTerminalHistory((prev) => [
      ...prev,
      `Establishing secure connection...`,
    ]);

    await new Promise((resolve) => setTimeout(resolve, 400));
    window.open(link.url, "_blank");

    setTerminalHistory((prev) => [
      ...prev,
      `Connection established. Redirecting...`,
    ]);
    setIsProcessing(false);

    // Clear history after some time
    setTimeout(() => {
      setTerminalHistory([]);
      setActiveLink(null);
    }, 2000);
  };

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Integrated terminal and social links container */}
      <div className="bg-dark-light/30 rounded-lg border border-primary/20 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-light/50 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-sm text-primary/70 font-mono">
            social-matrix ~ connect
          </div>
          <div className="text-sm text-primary/50">●</div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm h-32 overflow-hidden">
          <AnimatePresence mode="wait">
            {terminalHistory.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {terminalHistory.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={
                      line.startsWith(">")
                        ? "text-primary"
                        : "text-text-secondary"
                    }
                  >
                    {line}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-secondary"
              >
                Ready for connection... Click a social link below to connect
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connection line between terminal and links */}
        <div className="relative h-6 border-t border-primary/20">
          <div className="absolute left-1/2 top-0 w-px h-6 bg-primary/30"></div>
          <div className="absolute left-1/2 top-5 w-2 h-2 rounded-full bg-primary/50 transform -translate-x-1/2"></div>

          {/* Horizontal connection lines */}
          <div className="absolute top-3 left-0 right-0 h-px bg-primary/20"></div>

          {/* Accent dots */}
          <div className="absolute top-3 left-1/4 w-1 h-1 rounded-full bg-primary/40 transform -translate-x-1/2"></div>
          <div className="absolute top-3 right-1/4 w-1 h-1 rounded-full bg-primary/40 transform translate-x-1/2"></div>
        </div>

        {/* Social Links Grid - now inside the terminal container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-light/20">
          {socialLinks.map((link, index) => (
            <motion.button
              key={link.id}
              onClick={() => executeCommand(link)}
              disabled={isProcessing}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`relative p-4 rounded-lg border backdrop-blur-sm overflow-hidden
                           ${
                             activeLink === link.id
                               ? "border-primary bg-primary/10"
                               : "border-primary/20 bg-dark-light/30"
                           }`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon */}
                <div className="relative w-10 h-10 mx-auto mb-3">
                  <Image
                    src={link.icon}
                    alt={link.name}
                    fill
                    className="object-contain"
                  />

                  {/* Scanning Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                    animate={{
                      y: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Command Text */}
                <div className="text-center space-y-1">
                  <p className="text-text-light font-medium">{link.name}</p>
                  <p className="text-xs font-mono text-primary/70">
                    {link.command}
                  </p>
                </div>

                {/* Vertical connection line from parent terminal */}
                <div
                  className={`absolute top-0 left-1/2 w-px h-4 -mt-4 transform -translate-x-1/2 
                                ${activeLink === link.id ? "bg-primary" : "bg-primary/30"}`}
                ></div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1 }}
                />

                {/* Circuit Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.657 0L26.172 6.485 22.686 9.97 33.515 0h-.858zM42.1 0L29.244 12.858 33.515 17.13 46.37 4.272 42.1 0zM37.03 0L24.172 12.858 28.444 17.13 41.3 4.272 37.03 0zM44.93 0L32.072 12.858l-.515.515L41.3 4.272 44.93 0zM35.03 0L22.172 12.858l-.515.515L30.3 4.272 35.03 0z' fill='%23149ddd' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-light/50 border-t border-primary/20">
          <div className="text-xs text-primary/50 font-mono">
            4 connections available
          </div>
          <div className="text-xs text-primary/70 font-mono">
            {isProcessing ? "Processing..." : "Ready"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
