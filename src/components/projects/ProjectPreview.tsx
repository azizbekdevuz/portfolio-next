import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectUnavailable from "./ProjectUnavaliable";

interface ProjectPreviewProps {
  liveLink?: string;
  title: string;
}

export default function ProjectPreview({
  liveLink,
  title,
}: ProjectPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // Add client-side only rendering flag
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state
    setIsMounted(true);
    
    // Reset states when liveLink changes
    setIsLoading(true);
    setHasError(false);
  }, [liveLink]);

  // Don't render anything on the server
  if (!isMounted) {
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-primary/20 bg-dark/80 flex items-center justify-center">
        <div className="text-text-secondary">Loading preview...</div>
      </div>
    );
  }

  if (!liveLink) {
    return <ProjectUnavailable />;
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-primary/20">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10
                      flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="text-text-secondary font-mono">
                Loading preview...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Overlay */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10
                      flex items-center justify-center text-center p-6"
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-red-500/10 border-2 border-red-500/20
                          flex items-center justify-center text-red-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-red-500 font-medium mb-2">
                  Preview Unavailable
                </div>
                <div className="text-text-secondary text-sm">
                  The live preview cannot be displayed.
                  <br />
                  Please visit the site directly.
                </div>
              </div>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-primary/10 text-primary
                         hover:bg-primary/20 transition-colors"
              >
                Open in New Tab
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iframe - only rendered on client side now */}
      {isMounted && (
        <iframe
          src={liveLink}
          title={`${title} preview`}
          className="w-full h-full bg-white"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}