import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Eye, Camera } from "lucide-react";
import { mockUser, mockComments } from "@/lib/mockData";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: mockUser.name,
    username: mockUser.username,
    city: mockUser.city,
    email: mockUser.email
  });

  const userComments = mockComments.filter((c) => c.userId === mockUser.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

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
          <h1 className="text-xl font-semibold">Editar perfil</h1>
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => navigate("/profile")}
          >
            <Eye className="h-5 w-5 mr-2" />
            Vista previa
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Warning Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6 flex gap-3">
          <div className="text-warning">✏️</div>
          <p className="text-sm text-foreground">
            Estás editando tu perfil. La contraseña no se puede cambiar aquí.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="text-muted-foreground">@{formData.username}</p>
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

          {/* Form Section */}
          <div className="bg-muted/30 rounded-xl p-6 space-y-5">
            <h3 className="text-lg font-semibold">Información básica</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 border-2 border-primary"
              />
              <p className="text-xs text-muted-foreground">Min 2 — Máx 40 caracteres</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-muted-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">Solo letras, números y punto</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-muted-foreground">
                  Ciudad
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-12 border-2 border-primary"
                />
                <p className="text-xs text-muted-foreground">Selecciona o escribe tu ciudad</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="h-12 bg-muted"
              />
              <p className="text-xs text-muted-foreground">No editable desde aquí</p>
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

          <Button type="submit" className="w-full h-14" size="lg">
            Cambios guardados
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
