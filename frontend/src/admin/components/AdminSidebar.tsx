import { ADMIN_ROUTES } from "../routes";
import { Link, useLocation } from "react-router";
import { Home, Users, Building, CreditCard, Car, TrendingDown, Calendar, FileText, MessageSquare } from "lucide-react";

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminSidebar = ({isMobileMenuOpen, setIsMobileMenuOpen}: Props) => {

    const location = useLocation();

    const adminMenuItems = [
    { path: ADMIN_ROUTES.DASHBOARD, label: "Inicio", icon: Home },
    { path: ADMIN_ROUTES.RESIDENTS, label: "Residentes", icon: Users },
    { path: ADMIN_ROUTES.UNITS, label: "Unidades", icon: Building },
    { path: ADMIN_ROUTES.PAYMENTS, label: "Pagos", icon: CreditCard },
    { path: ADMIN_ROUTES.CARS, label: "Vehículos", icon: Car },
    { path: ADMIN_ROUTES.EXPENSES, label: "Gastos", icon: TrendingDown },
    { path: ADMIN_ROUTES.EVENTS, label: "Eventos", icon: Calendar },
    { path: ADMIN_ROUTES.REPORTS, label: "Reportes", icon: FileText },
    { path: ADMIN_ROUTES.CHAT, label: "Chat", icon: MessageSquare },
    ];

    
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const menuItems = adminMenuItems;

    return (
        <>
            <aside className="hidden lg:block w-64 shrink-0">
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
        </>
    );
}