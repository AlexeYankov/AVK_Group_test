/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            // 'storage.yandexcloud.net',
            "wdw"
        ]
    },
    env: {
        NEXT_PUBLIC_BASE_URL: "https://jsonplaceholder.typicode.com/posts"
    }
};

export default nextConfig;
