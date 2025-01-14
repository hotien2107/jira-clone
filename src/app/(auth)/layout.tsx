"use client"
import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";

type LayoutProps = {
    children: React.ReactNode;
}

const AuthLayout = ({children}: LayoutProps) => {
    const pathname = usePathname()
    const isSignUp = pathname === "/sign-up";
    return (
        <main className="bg-zinc-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src={"/logo.svg"} alt={"logo"} width={56} height={56}/>
                        <span className="text-4xl font-bold">Jira-clone</span>
                    </div>
                    <Button asChild variant={"secondary"}>
                        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
                            {
                                isSignUp ? "Sign In" : "Sign Up"
                            }
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;