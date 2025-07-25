'use client'
import React, { useState } from "react";

export default function SidebarLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex overflow-hidden bg-white rounded-lg min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed md:relative z-50 bg-white h-full
                    ${isSidebarOpen ? "animate-slide-right" : "hidden"}
                    md:w-64
                `}
                style={{
                    overflow: isSidebarOpen ? "visible" : "hidden",
                }}
            >
                <div className="flex flex-col w-64" style={{ display: isSidebarOpen ? "flex" : "none" }}>
                    <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-50">
                        <div className="flex flex-col items-center px-4">
                            <a href="#" className="px-8 text-left focus:outline-none">
                                <div className="sidebar flex items-center space-x-2 mt-4">
                                    <img src="/logo.svg" alt="My Icon" className="w-48 h-12" />
                                </div>
                            </a>
                        </div>
                        {/* Navigation */}
                        <div className="flex flex-col flex-grow px-4 mt-5">
                            <nav className="flex-1 space-y-1">
                                <ul>
                                    {[
                                        { label: "Home", icon: "/home.svg" },
                                        { label: "Explore", icon: "/explore.svg" },
                                        { label: "Chat", icon: "/chat.svg" },
                                        { label: "Connection", icon: "/connection.svg" },
                                     
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href="#"
                                                className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-300 transform rounded-lg bg-gray-50 hover:bg-[#EDEDED] hover:text-black"
                                            >
                                                <img src={item.icon} alt={`${item.label} Icon`} className="w-5 h-5" />
                                                <span className="ml-4 font-semibold">{item.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <p className="px-4 pt-4 font-medium text-gray-500">
                                    NEW ON OUR PAGE
                                </p>
                                <ul>
                                    {[
                                        { label: "About", icon: "/about.svg" },
                                        { label: "Settings", icon: "/settings.svg" },
                                        { label: "Profile", icon: "/profile.svg"}
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href="#"
                                                className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-300 transform rounded-lg bg-gray-50 hover:bg-[#EDEDED] hover:text-black"
                                            >
                                                <img src={item.icon} alt={`${item.label} Icon`} className="w-5 h-5" />
                                                <span className="ml-4 font-semibold">{item.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hamburger menu on mobile */}
            <div className="absolute top-4 left-4 md:hidden z-50">
                <button onClick={toggleSidebar}>
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <main className="relative flex-1 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                            <div className="py-4">
                                <div className="rounded-lg bg-gray-50 h-96" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
