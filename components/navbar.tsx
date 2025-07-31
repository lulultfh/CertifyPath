'use client';

import React, { useState } from 'react';
import ForYouCard from './foryou'
import BootcampCards from './bootcamp';
import ArticleCards from './article';
import PostCard from './post';
import SearchBar from './search';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('ForYou');

  const navItems = [
    { name: 'ForYou', id: 'foryou' },
    { name: 'Bootcamp', id: 'bootcamp' },
    { name: 'Article', id: 'article' },
    { name: 'Posts', id: 'posts' },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        {/* Search Bar */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="flex justify-center items-center py-4">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.name)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === item.name
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
                {activeTab === item.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        {activeTab === 'ForYou' && (
          <div className="flex justify-center items-center min-h-screen">
            <ForYouCard />
          </div>
        )}
        {activeTab === 'Bootcamp' && (
          <div className="flex justify-center items-center min-h-screen">
            <BootcampCards />
          </div>
        )}
        {activeTab === 'Article' && (
          <div className="flex justify-center items-center min-h-screen">
            <ArticleCards />
          </div>
        )}
        {activeTab === 'Posts' && (
          <div className="flex justify-center items-center min-h-screen">
            <PostCard />
          </div>
        )}
      </div>
    </div>
  );
}
