module.exports = {
  reactStrictMode: true,
  pageExtensions: ["tsx"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/game",
        permanent: false,
      },
    ];
  },
};
