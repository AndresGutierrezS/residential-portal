import { Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function QuickContactCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="h-6 w-6" />
            </div>

            <div>
              <p className="font-medium">
                ¿Necesitas ayuda?
              </p>

              <p className="text-sm text-blue-100">
                Contacta a la administración
              </p>
            </div>
          </div>

          <Link to="/chat">
            <Button variant="secondary" size="sm">
              Enviar Mensaje
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}