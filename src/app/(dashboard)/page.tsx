"use client"
import CreateWorkspaceForm from "@/features/workspace/components/create-workspace-form";
import {useGetUserInfo} from "@/features/auth/api/use-get-user-info";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const {data: user, isPending} = useGetUserInfo()
    useEffect(() => {
        if (!isPending && !user) {
            router.push("/sign-in")
        }
    }, [isPending, user, router])
    return (
        <div className="bg-zinc-500 p-4">
            <CreateWorkspaceForm/>
        </div>
    );
}
