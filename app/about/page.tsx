import AboutCards from "../../components/about";
import SidebarLayout from '../../components/sidebar'

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-64">
            <SidebarLayout />
          </div>
    
          {/* Main Content */}
          <div className="flex-1 bg-white border-gray-200">
             
            {/* About */}
            <div className="max-w-5xl mx-auto px-4 mt-4">
              <AboutCards />
            </div>
          </div>
        </div>
  );
}