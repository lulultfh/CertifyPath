'use client'
import React, { useState } from 'react'
import BootcampCards from './bootcamp'

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('Bootcamp')

    const navItems = [
        { name: 'For You', id: 'foryou' },
        { name: 'Bootcamp', id: 'bootcamp' },
        { name: 'Article', id: 'article' },
        { name: 'Posts', id: 'posts' }
    ]

    return (
        <div className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
                <nav className="flex justify-center items-center py-4">
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.name)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                    activeTab === item.name 
                                        ? 'text-gray-900' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {item.name}
                                {activeTab === item.name && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </nav>
                {/* Tampilkan BootcampCards jika tab Bootcamp aktif */}
                {activeTab === 'Bootcamp' && (
                    <div className="flex justify-center items-center min-h-screen">
                    <BootcampCards />

                    </div>
                )}
            </div>
        </div>
    )
}