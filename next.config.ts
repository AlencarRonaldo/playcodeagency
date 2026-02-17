import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração absolutamente mínima
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;