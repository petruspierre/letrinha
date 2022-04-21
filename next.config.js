const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.jsx"],
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
