import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff, MapPin, Utensils } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    category: "",
    acceptTerms: false
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/login")}
            className="rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Crear cuenta</h1>
          <div className="w-10" />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Únete a uniLocal</h2>
            <p className="text-muted-foreground">
              Crea tu cuenta para ver lugares cercanos y guardar tu historial.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Nombre completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-14 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-14 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-muted-foreground">
                  Contraseña
                </Label>
                <span className="text-sm text-muted-foreground">min. 8 caracteres</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-14 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </button>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success w-1/2" />
              </div>
              <p className="text-sm text-success">Segura</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-muted-foreground">
                  Ciudad
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="Selecciona ciudad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="pl-10 h-14 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-muted-foreground">
                  Categoría favorita
                </Label>
                <div className="relative">
                  <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="category"
                    type="text"
                    placeholder="Comida, cafés..."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="pl-10 h-14 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                Acepto los Términos y la Privacidad.
              </label>
            </div>

            <Button type="submit" className="w-full h-14 text-base" size="lg">
              Crear cuenta
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full h-14 text-base"
              size="lg"
            >
              Ya tengo cuenta
            </Button>

            <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
              <span className="inline-block w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">i</span>
              Usaremos tu correo para confirmar tu cuenta.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
