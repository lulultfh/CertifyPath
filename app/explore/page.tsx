import React from 'react'
import Search from '../../components/search'
import SidebarLayout from '../../components/sidebar'
import Explore from '../../components/explore'

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <SidebarLayout />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          {/* Search Bar */}
          <div className="w-full">
            <Search />
          </div>
        </div>

        {/* Explore (bisa kamu tambahkan padding atas bila perlu) */}
        <div className="max-w-5xl mx-auto px-4 mt-4">
          <Explore />
        </div>
      </div>
    </div>
  )
}
