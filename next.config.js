module.exports = {
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
    HOST: process.env.HOST,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
    MEASUREMENTID: process.env.MEASUREMENTID,
  },

  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/api/shopify/auth",

        // Set this to true if you're sure you'll never use the /auth page (beware, permanent redirects as they are difficult to invalidate in clients)
        permanent: false,
      },
    ];
  },
};
