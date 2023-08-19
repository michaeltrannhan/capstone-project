
# Getting Started

yarn install then : yarn dev
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open file next.config.js and replace with the following code:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;

# Config firebase
Create file .env.local and add the following code: Please contact for ENV


# capstone-project
