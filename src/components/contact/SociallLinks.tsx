import Image from "next/image";
import { motion } from "framer-motion";

const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/azizbekdevuz",
    icon: "/icons/github.svg",
    description: "Code and contributions",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/azizbek-arzikulov",
    icon: "/icons/linkedin.svg",
    description: "Professional profile",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: "https://t.me/+Abz6kYFkTX9hNzFi",
    icon: "/icons/telegram.svg",
    description: "Direct message",
  },
  {
    id: "linktree",
    name: "Linktree",
    url: "https://linktr.ee/azizbekuz",
    icon: "/icons/linktree.svg",
    description: "Other links",
  },
];

export const SocialLinks: React.FC = () => {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="rounded-lg border border-border bg-surface-soft p-6">
        <h3 className="mb-2 text-lg font-semibold text-fg">Connect</h3>
        <p className="mb-6 text-sm text-muted">
          Direct links—no extra steps. Pick what you need for screening or a conversation.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-lg border border-border bg-card-muted/80 p-4 transition-colors hover:border-accent/40 hover:bg-primary/5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="relative mx-auto mb-3 h-10 w-10">
                <Image src={link.icon} alt="" fill className="object-contain" />
              </div>
              <span className="text-center text-sm font-medium text-fg">{link.name}</span>
              <span className="mt-1 text-center text-xs text-muted">{link.description}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
