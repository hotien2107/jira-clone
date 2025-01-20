import React from 'react';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

type DashboardLayoutProps = {
    children: React.ReactNode;
}
const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="flex w-full h-full">
                <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-hidden">
                    <Sidebar/>
                </div>
                <div className="lg:pl-[264px] w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar/>
                        <main className="w-full h-full py-8 px-6 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;