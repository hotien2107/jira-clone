"use client"
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {loginSchema} from "@/features/auth/schemas";
import {useLogin} from "@/features/auth/auth/use-login";

type formType = z.infer<typeof loginSchema>

const SignInCard = () => {
    const {mutate} = useLogin()
    const form = useForm<formType>({
        defaultValues: {email: "", password: ""},
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = (value: formType) => {
        mutate(value)
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Welcome to Jira-Clone
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder={"Enter email"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"password"}
                                            placeholder={"Enter password"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="mr-2"/>
                    Login with Google
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                    <FaGithub className="mr-2"/>
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 text-center">
                You don't have an account! <Link href={"/sign-up"} className="text-blue-700">Sign up</Link>
            </CardContent>
        </Card>
    );
};

export default SignInCard;