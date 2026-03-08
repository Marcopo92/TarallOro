import type { NextConfig } from "next";

// Configurazione Next.js per TarallOro
const nextConfig: NextConfig = {
  // Permetti immagini da Cloudinary e placeholder
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
