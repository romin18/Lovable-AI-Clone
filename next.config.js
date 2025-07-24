/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_APP_NAME: 'Lovable Clone',
    NEXT_PUBLIC_APP_DESCRIPTION: 'AI-powered app builder clone',
  },
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    // Handle monaco-editor
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    });

    return config;
  },
};

module.exports = nextConfig; 