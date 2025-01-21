import React from 'react';
import Image from "next/image";
import Navigation from "@/components/navigation";
import DottedSeparator from "@/components/dotted-separator";

const Sidebar = () => {
    return (
        <aside className="w-full h-full bg-zinc-100 p-4">
            <div className="flex items-center gap-2 cursor-pointer">
                <Image src={"/logo.svg"} alt={"logo"} width={48} height={48}/>
                <span className="text-2 xl font-bold">Jira-clone</span>
            </div>
            <DottedSeparator className="py-4"/>
            <Navigation/>
        </aside>
    );
};

export default Sidebar;