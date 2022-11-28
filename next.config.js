/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.pokemon.com"],
  },
};

module.exports = nextConfig;
