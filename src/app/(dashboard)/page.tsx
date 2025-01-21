import {getCurrentUser} from "@/features/auth/action";
import {redirect} from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser()
    if (!user) redirect("/sign-in")
    return (
        <div>
            this is home page
        </div>
    );
}
