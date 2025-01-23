"use client"
import React, {useEffect} from 'react';
import SignInCard from "@/features/auth/components/sign-in/sign-in-card";
import {useGetUserInfo} from "@/features/auth/api/use-get-user-info";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";

const SignInPage = () => {
    const router = useRouter();
    const {data: user, isLoading: isUserLoading} = useGetUserInfo()
    useEffect(() => {
        if (!isUserLoading && user) {
            router.push("/")
        }
    }, [isUserLoading, user, router])
    if (isUserLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-zinc-100 ">
                <Loader className="size-4 animate-spin text-muted-foreground"/>
            </div>
        )
    }
    return (
        <SignInCard/>
    );
};

export default SignInPage;