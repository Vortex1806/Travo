"use client"
import React from "react";
import { ThemeProvider } from 'next-themes'


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <main >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </main>

    );
}

export default DashboardLayout;