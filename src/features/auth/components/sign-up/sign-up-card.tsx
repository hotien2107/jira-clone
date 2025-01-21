import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {registerSchema} from "@/features/auth/schemas";
import {useRegister} from "@/features/auth/api/use-register";

type FormType = z.infer<typeof registerSchema>

const SignUpCard = () => {
    const {mutate, isPending} = useRegister()
    const form = useForm<FormType>({
        defaultValues: {email: "", password: "", username: ""},
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = (value: FormType) => {
        mutate(value)
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our <Link href={"/policy"} className="text-blue-700">Private
                    Policy</Link> and <Link href={"/terms"} className="text-blue-700">Terms of Service</Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Enter your name"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                        <Button disabled={isPending} size="lg" className="w-full">
                            Register
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button disabled={isPending} variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="mr-2"/>
                    Login with Google
                </Button>
                <Button disabled={isPending} variant="secondary" size="lg" className="w-full">
                    <FaGithub className="mr-2"/>
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 text-center">
                You already have an account! <Link href={"/sign-in"} className="text-blue-700">Sign in</Link>
            </CardContent>
        </Card>
    );
};

export default SignUpCard;