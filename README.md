
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
Create file .env.local and add the following code:

```env
NEXT_PUBLIC_API_KEY ="AIzaSyBmH23c5irhSjHSGmYk813xeq9-BLaHUtw"
NEXT_PUBLIC_AUTH_DOMAIN= "medireminder-3e5eb.firebaseapp.com"
NEXT_PUBLIC_FB_DB_URL="https://medireminder-3e5eb-default-rtdb.asia-southeast1.firebasedatabase.app"
NEXT_PUBLIC_FB_PROJECT_ID="medireminder-3e5eb"
NEXT_PUBLIC_STORAGE_BUCKET= "medireminder-3e5eb.appspot.com"
NEXT_PUBLIC_MESSAGING_SENDER_ID= "389970183616"
NEXT_PUBLIC_APP_ID="1:389970183616:web:787863b441d9a2d4907425"
NEXT_PUBLIC_MEASUREMENT_ID="G-ZW5GY2GQGE"
```
# capstone-project