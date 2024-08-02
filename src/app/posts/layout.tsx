import {ContainerLayout} from "@/layout/layout";

export default async function PostLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ContainerLayout>{children}</ContainerLayout>;
}
