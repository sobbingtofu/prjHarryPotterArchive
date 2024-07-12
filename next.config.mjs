/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
      },
      {
        hostname: "www.wizardingworld.com",
      },
    ],
  },
}

export default nextConfig
