const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    // "@mui/material": {
    //   transform: "@mui/material/{{member}}",
    // },
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  output: "standalone",
};

module.exports = nextConfig;
