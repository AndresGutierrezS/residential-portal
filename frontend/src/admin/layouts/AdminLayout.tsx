
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router";
import { 
  Home, 
  Users, 
  Building, 
  CreditCard, 
  MessageSquare, 
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Car,
  TrendingDown,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const userRole = localStorage.getItem("userRole") || "user";
  const currentUser = localStorage.getItem("currentUser") || "Usuario";

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userUnit");
    navigate("/login");
  };

  const adminMenuItems = [
    { path: "/admin", label: "Inicio", icon: Home },
    { path: "/admin/residents", label: "Residentes", icon: Users },
    { path: "/admin/units", label: "Unidades", icon: Building },
    { path: "/admin/payments", label: "Pagos", icon: CreditCard },
    { path: "/admin/cars", label: "Vehículos", icon: Car },
    { path: "/admin/expenses", label: "Gastos", icon: TrendingDown },
    { path: "/admin/events", label: "Eventos", icon: Calendar },
    { path: "/admin/reports", label: "Reportes", icon: FileText },
    { path: "/admin/chat", label: "Chat", icon: MessageSquare },
  ];


  const menuItems = adminMenuItems;

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Admin Layout - Sidebar
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <h1 className="text-xl font-bold text-blue-600">Portal Gate</h1>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav className="bg-white rounded-lg shadow-sm p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                <nav className="bg-white w-64 h-full p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    );
}