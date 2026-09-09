import { Home } from "lucide-react";
import { useAuthStore } from "@/auth/store/auth.store";

interface WelcomeCardProps {
  unit: string;
}

export function WelcomeCard({ unit }: WelcomeCardProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ¡Hola, {user?.person.name}! 👋
          </h1>

          <p className="text-gray-600 mt-1">
            Bienvenido a tu portal de residente
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <Home className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs text-blue-600 font-medium">
              Mi Unidad
            </p>

            <p className="text-lg font-bold text-blue-900">
              {unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}