/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: 'all',
    };
    return config;
  },
};

export default nextConfig;
