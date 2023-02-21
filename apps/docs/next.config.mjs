import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};
export default withContentlayer(nextConfig);
