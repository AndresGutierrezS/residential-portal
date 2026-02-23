
import { Outlet } from "react-router";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSidebar } from "../components/AdminSidebar";
import { useState } from "react";

export const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const userRole = localStorage.getItem("userRole") || "user";
  // const currentUser = localStorage.getItem("currentUser") || "Usuario";


  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>

      </div>
    );
}