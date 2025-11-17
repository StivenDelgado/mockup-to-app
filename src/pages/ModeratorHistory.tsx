import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, SlidersHorizontal, CheckCircle2, XCircle } from "lucide-react";

interface ModeratedPlace {
  id: string;
  name: string;
  category: string;
  city: string;
  creator: string;
  status: "approved" | "rejected";
  date: string;
  reason: string;
  image: string;
}

const ModeratorHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"approved" | "rejected">("approved");
  const [searchQuery, setSearchQuery] = useState("");

  const moderatedPlaces: ModeratedPlace[] = [
    {
      id: "1",
      name: "Café Andino",
      category: "Cafetería",
      city: "Bogotá",
      creator: "@camila",
      status: "approved",
      date: "12 Jun 2025",
      reason: "Verificado localmente, información completa y horario claro.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    },
    {
      id: "2",
      name: "Bistro Central",
      category: "Restaurante",
      city: "Medellín",
      creator: "@diego",
      status: "approved",
      date: "05 Jun 2025",
      reason: "Fotos y datos consistentes con ubicación; reseñas positivas iniciales.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    },
    {
      id: "3",
      name: "Librería Aurora",
      category: "Librería",
      city: "Cali",
      creator: "@sofia",
      status: "rejected",
      date: "28 May 2025",
      reason: "Dirección imprecisa y horario faltante. Se solicitó corrección al creador.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
    },
  ];

  const filteredPlaces = moderatedPlaces.filter(
    (place) =>
      place.status === activeTab &&
      (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.creator.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-xl font-bold">Historial del Moderador</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SlidersHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-3">
          <Button
            onClick={() => setActiveTab("approved")}
            className={`flex-1 h-12 rounded-full ${
              activeTab === "approved"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Autorizados
          </Button>
          <Button
            onClick={() => setActiveTab("rejected")}
            className={`flex-1 h-12 rounded-full ${
              activeTab === "rejected"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <XCircle className="h-5 w-5 mr-2" />
            Rechazados
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o creador"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-card rounded-2xl border overflow-hidden">
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg">{place.name}</h3>
                      <Badge
                        variant={place.status === "approved" ? "default" : "destructive"}
                        className="shrink-0"
                      >
                        {place.status === "approved" ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Autorizado
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Rechazado
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <span>📚 {place.category}</span>
                      <span>•</span>
                      <span>📍 {place.city}</span>
                      <span>•</span>
                      <span>👤 {place.creator}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>📅</span>
                    <span>{place.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Motivo:</span> {place.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron lugares</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeratorHistory;
