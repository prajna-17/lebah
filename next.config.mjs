/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"https://lebah-next-backend.vercel.app/api/:path*",
			},
		];
	},
};

export default nextConfig;
