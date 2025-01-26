/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "1024mb",
    },
  },
};

export default nextConfig;
