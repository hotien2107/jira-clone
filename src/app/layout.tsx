import type {Metadata} from "next";
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils";
import "./globals.css";
import {QueryProviders} from "@/components/query-provider";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Jira",
    description: "Create by NextJS",
    icons: "/logo.svg"
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className={cn(inter.className, "antialiased min-h-screen")}
        >
        <QueryProviders>
            {children}
        </QueryProviders>
        </body>
        </html>
    );
}
