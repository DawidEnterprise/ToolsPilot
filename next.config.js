/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export — images still work, just no server-side optimization
  },
  trailingSlash: true, // Produces /tools/json-formatter/index.html — better for static hosts
  // Note: custom headers and rewrites are not supported with static export.
  // Security headers are configured in staticwebapp.config.json for Azure SWA.
};

module.exports = nextConfig;
