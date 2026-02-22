/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://lebah-backend-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
