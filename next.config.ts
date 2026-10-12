import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
      ],
    },
};

export default nextConfig;