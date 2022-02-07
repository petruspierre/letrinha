module.exports = {
  reactStrictMode: true,
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
