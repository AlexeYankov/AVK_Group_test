/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["via.assets.so"]
    },
    env: {
        NEXT_PUBLIC_BASE_URL: "https://jsonplaceholder.typicode.com/posts",
        NEXT_PUBLIC_COMMENTS_BASE_URL: "https://jsonplaceholder.typicode.com/comments"
    }
};

export default nextConfig;
