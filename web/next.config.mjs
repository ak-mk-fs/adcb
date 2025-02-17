import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.resolve.alias['common'] = path.resolve('../common'); // to utilize the resources in common folder
    return config;
  },
  images: {
    domains: ['cdn.dummyjson.com'], // Add the domain of the external image source
  },
};

export default nextConfig;
