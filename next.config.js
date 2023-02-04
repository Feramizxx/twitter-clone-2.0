/** @type {import('next').NextConfig} */
const nextConfig = {
 
  reactStrictMode: true,
  images:{
    domains: ["cdn-icons-png.flaticon.com", "cdn.pixabay.com","lh3.googleusercontent.com"]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
}


module.exports = nextConfig
