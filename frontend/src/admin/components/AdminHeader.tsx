import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/notifications/components/NotificationBell";
import { X, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminHeader = ({setIsMobileMenuOpen, isMobileMenuOpen}: Props) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userUnit");
        navigate("/login");
    };

    return(
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
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

              <div className="flex items-center gap-4">
                <NotificationBell />
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
    );
}