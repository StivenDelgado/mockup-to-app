import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Edit } from "lucide-react";
import { mockUser, mockComments } from "@/lib/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const userComments = mockComments.filter((c) => c.userId === mockUser.id);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Perfil</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/edit-profile")}
            className="rounded-full text-primary"
          >
            <Edit className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Info */}
        <div className="text-center space-y-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-background shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold">{mockUser.name}</h2>
            <p className="text-muted-foreground">@{mockUser.username}</p>
          </div>

          {/* Quick Tabs */}
          <div className="flex gap-2 justify-center">
            <Badge variant="secondary" className="px-4 py-2">
              Categoria
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Ciudad
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Buscar
            </Badge>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          <div className="bg-card rounded-xl border p-4 flex justify-between items-center">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{mockUser.email}</span>
          </div>
          <div className="bg-card rounded-xl border p-4 flex justify-between items-center">
            <span className="text-muted-foreground">Ciudad</span>
            <span className="font-medium">{mockUser.city}</span>
          </div>
          <div className="bg-card rounded-xl border p-4 flex justify-between items-center">
            <span className="text-muted-foreground">Username</span>
            <span className="font-medium">{mockUser.username}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tus comentarios</h3>
          {userComments.map((comment) => (
            <div key={comment.id} className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium mb-1">{comment.comment}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.date} • {comment.placeName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Profile Section */}
        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Editar perfil</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Nombre</span>
              <span className="font-medium">{mockUser.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">Min 2 — Máx 40 caracteres</p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-muted-foreground text-sm">Username</span>
                <p className="font-medium">{mockUser.username}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Ciudad</span>
                <p className="font-medium">{mockUser.city}</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/edit-profile")}
          className="w-full"
          size="lg"
        >
          Editar perfil completo
        </Button>
      </div>
    </div>
  );
};

export default Profile;
