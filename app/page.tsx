import BootcampCards from "../components/bootcamp";
import ArticleCards from "../components/article";
import Navbar from "../components/navbar";
import SidebarLayout from "../components/sidebar";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarLayout />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
      </div>
    </div>
  );
}