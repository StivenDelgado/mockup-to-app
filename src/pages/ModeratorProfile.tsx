import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, History, LayoutGrid, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ModeratorProfile = () => {
  const navigate = useNavigate();

  const moderatorData = {
    name: "Mariana López",
    username: "@mariana",
    email: "mariana@unilocal.app",
    role: "Moderador",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    stats: {
      reviewed: 128,
      approved: 96,
      rejected: 32,
    },
    city: "Bogotá",
    memberSince: "Mar 2024",
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Perfil del Moderador</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/edit-profile")}
            className="rounded-full"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <img
              src={moderatorData.avatar}
              alt={moderatorData.name}
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">{moderatorData.name}</h2>
              <p className="text-muted-foreground">
                {moderatorData.username} • {moderatorData.email}
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <span className="mr-1">🛡️</span> {moderatorData.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl border p-6 text-center space-y-2">
            <div className="text-4xl font-bold">{moderatorData.stats.reviewed}</div>
            <div className="text-sm text-muted-foreground">
              Lugares
              <br />
              revisados
            </div>
          </div>
          <div className="bg-card rounded-2xl border p-6 text-center space-y-2">
            <div className="text-4xl font-bold">{moderatorData.stats.approved}</div>
            <div className="text-sm text-muted-foreground">Autorizados</div>
          </div>
          <div className="bg-card rounded-2xl border p-6 text-center space-y-2">
            <div className="text-4xl font-bold">{moderatorData.stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rechazados</div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Datos básicos</h3>
          </div>
          <div className="divide-y">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">👤</span>
                <span>Nombre</span>
              </div>
              <span className="font-medium">{moderatorData.name}</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">✉️</span>
                <span>Correo</span>
              </div>
              <span className="font-medium text-sm">{moderatorData.email}</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">🛡️</span>
                <span>Rol</span>
              </div>
              <span className="font-medium">{moderatorData.role}</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">📍</span>
                <span>Ciudad base</span>
              </div>
              <span className="font-medium">{moderatorData.city}</span>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg">⏰</span>
                <span>Miembro desde</span>
              </div>
              <span className="font-medium">{moderatorData.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/moderator-history")}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-base"
          >
            <History className="h-5 w-5 mr-2" />
            Ver historial
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/moderator-panel")}
            className="w-full h-14 text-base"
          >
            <LayoutGrid className="h-5 w-5 mr-2" />
            Ir al Panel de Moderación
          </Button>
          <Button
            variant="destructive"
            onClick={() => navigate("/login")}
            className="w-full h-14 text-base"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;
