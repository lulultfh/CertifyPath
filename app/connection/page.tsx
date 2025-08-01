import FeatureUnavailable from "../error";
import SidebarLayout from "../../components/sidebar";

export default function ConnectionPage() {
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
          <FeatureUnavailable />
        </div>
      </div>
    </div>
  );
}
