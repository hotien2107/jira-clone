"use client"
import React, {ChangeEvent, useEffect, useRef} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {createWorkspaceSchema} from "@/features/workspace/schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {useCreateWorkspace} from "@/features/workspace/api/use-create-workspace";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import {ImageIcon} from "lucide-react";
import {toast} from "sonner";

type CreateWorkspaceFormProps = {
    onCancel?: () => void;
}

type FormType = z.infer<typeof createWorkspaceSchema>

const CreateWorkspaceForm = (props: CreateWorkspaceFormProps) => {
    const {onCancel} = props;
    const {mutate, isPending, status} = useCreateWorkspace()
    const fileRef = useRef<HTMLInputElement>(null)
    const form = useForm<FormType>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: ""
        }
    })

    const iconChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            toast.error("No file selected")
            return
        }
        form.setValue("image", file)
    }

    const onSubmit = (values: FormType) => {
        mutate({form: values})
    }

    useEffect(() => {
        if (status === "success")
            form.reset()
    }, [isPending, status])

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <DottedSeparator className="px-7"/>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Workspace name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder={"Enter workspace name"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({field}) => (
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center gap-x-5">
                                        {
                                            field.value ?
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        src={
                                                            field.value instanceof File ? URL.createObjectURL(field.value) : field.value
                                                        }
                                                        alt="workspace-upload-image"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                :
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-zinc-400"/>
                                                    </AvatarFallback>
                                                </Avatar>
                                        }
                                        <div className="flex flex-col">
                                            {
                                                field.value ?
                                                    <>
                                                        <p className="text-sm">{field.value.name}</p>
                                                        <p className="text-sm text-muted-foreground">{Intl.NumberFormat("en-US").format(field.value.size) + " bytes"}</p>
                                                    </>
                                                    :
                                                    <>
                                                        <p className="text-sm">Workspace Icon</p>
                                                        <p className="text-sm text-muted-foreground">JPG, JPEG, PNG or
                                                            SVG, maximum
                                                            1mb </p>
                                                    </>
                                            }

                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png, .svg"
                                                ref={fileRef}
                                                className="hidden"
                                                disabled={isPending}
                                                onChange={iconChangeHandler}
                                                value=""
                                            />
                                            <Button
                                                type="button"
                                                disabled={isPending}
                                                onClick={() => fileRef.current?.click()}
                                                variant="tertiary"
                                                size="xs"
                                                className="w-fit mt-2"
                                            >
                                                Upload image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        />
                        <div className="flex justify-between items-center">
                            <Button variant="secondary" disabled={isPending} onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isPending}>
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateWorkspaceForm;
