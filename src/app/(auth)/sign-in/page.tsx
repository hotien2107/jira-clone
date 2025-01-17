import React from 'react';
import SignInCard from "@/features/auth/components/sign-in/sign-in-card";
import {getCurrentUser} from "@/features/auth/action";
import {redirect} from "next/navigation";

const SignInPage = async () => {
    const user = await getCurrentUser()
    if (user) redirect("/")
    return (
        <SignInCard/>
    );
};

export default SignInPage;