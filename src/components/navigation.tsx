import React from 'react';
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import {SettingsIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

const routes = [
    {
        label: 'Home',
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: 'My task',
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: 'Settings',
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        label: 'Members',
        href: "/tasks",
        icon: UsersIcon,
        activeIcon: UsersIcon
    },
]

const Navigation = () => {
    return (
        <ul className="flex flex-col">
            {
                routes.map(route => {
                    const isActive = false
                    const Icon = isActive ? route.activeIcon : route.icon
                    return (
                        <Link key={route.href} href={route.href}>
                            <div className={cn(
                                "cursor-pointer flex items-center gap-2.5 p-2.5 rounded-md font-medium text-zinc-500 hover:text-primary transition",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className="size-5 text-zinc-500"/>
                                {route.label}
                            </div>
                        </Link>
                    )
                })
            }
        </ul>
    );
};

export default Navigation;