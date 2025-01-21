"use client"

import React from 'react';
import {useGetUserInfo} from "@/features/auth/api/use-get-user-info";
import {Loader, LogOut} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import DottedSeparator from "@/components/dotted-separator";
import {useLogout} from "@/features/auth/api/use-logout";


const UserButton = () => {
    const {data: user, isLoading: isUserLoading} = useGetUserInfo()
    const {mutate: logoutMutate, isPending: isLogoutPending} = useLogout()
    if (isUserLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-zinc-100 ">
                <Loader className="size-4 animate-spin text-muted-foreground"/>
            </div>
        )
    }
    if (!user) return null

    const {name, email} = user
    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "A"

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-zinc-300">
                    <AvatarFallback
                        className="bg-zinc-200 font-medium text-zinc-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col justify-between items-center gap-2 px-2.5 py-5">
                    <Avatar className="size-16 border border-zinc-300">
                        <AvatarFallback
                            className="bg-zinc-200 text-xl font-medium text-zinc-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between items-center text-center">
                        <p className="text-sm font-medium text-zinc-900">{name ?? "User"}</p>
                        <p className="text-xs text-zinc-500">{email}</p>
                    </div>
                </div>
                <DottedSeparator className="mb-1"/>
                <DropdownMenuItem
                    onClick={() => logoutMutate()}
                    className="h-10 flex justify-center items-center text-rose-600 font-medium cursor-pointer">
                    {
                        isLogoutPending ? <Loader className="size-4 animate-spin text-muted-foreground"/> : <LogOut/>
                    }
                    <p>Logout</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;