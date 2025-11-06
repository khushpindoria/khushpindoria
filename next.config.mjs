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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
  webpack: (config, {isServer}) => {
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        // Force xterm into a separate chunk
        xterm: {
          test: /[\\/]node_modules[\\/](@xterm|xterm-addon-fit)[\\/]/,
          name: 'xterm',
          chunks: 'all',
          priority: 20,
        },
        // Force all node_modules into a vendor chunk
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
            return `npm.${packageName?.replace('@', '')}`;
          },
          chunks: 'all',
          priority: 10,
        },
      },
    };
    return config;
  }
};

export default nextConfig;
