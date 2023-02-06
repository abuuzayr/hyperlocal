const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "/public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    sw: "service-worker.js",
  },
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ["hyperlocal.builtforfifty.workers.dev", "images.unsplash.com"],
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  typescript: {
    ignoreBuildErrors: true,
  },
})
