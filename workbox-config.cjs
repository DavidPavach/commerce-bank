module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,js,css,png,svg,jpg,ico,json,webmanifest,woff2}"],
  swDest: "dist/service-worker.js",
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: { maxEntries: 50 },
      },
    },
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
};
