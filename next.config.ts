import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimize image sizes for responsive design
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimize image quality for faster loading
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache images for a longer time
    minimumCacheTTL: 31536000, // 1 year
    // Format optimization for modern browsers
    formats: ['image/webp', 'image/avif'],
  },
  // Don't generate source maps in production for better performance
  productionBrowserSourceMaps: false,
  // Experimental features for better performance
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: [
      'framer-motion',
      'react-type-animation',
      'lucide-react',
    ],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;