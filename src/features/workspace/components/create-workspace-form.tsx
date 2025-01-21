"use client"
import React from 'react';
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

type CreateWorkspaceFormProps = {
    onCancel?: () => void;
}

type FormType = z.infer<typeof createWorkspaceSchema>

const CreateWorkspaceForm = (props: CreateWorkspaceFormProps) => {
    const {onCancel} = props;
    const {mutate, isPending} = useCreateWorkspace()
    const form = useForm<FormType>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: ""
        }
    })
    const onSubmit = (values: FormType) => {
        mutate({json: values})
    }

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
