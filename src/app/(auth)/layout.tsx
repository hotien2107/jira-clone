import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";

type LayoutProps = {
    children: React.ReactNode;
}

const AuthLayout = ({children}: LayoutProps) => {
    return (
        <main className="bg-zinc-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src={"/logo.svg"} alt={"logo"} width={56} height={56}/>
                        <span className="text-4xl font-bold">Jira-clone</span>
                    </div>
                    <Button variant={"secondary"}>
                        Sign Up
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