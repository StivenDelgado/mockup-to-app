import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Search, Settings, Heart, Share2, HeartOff } from "lucide-react";
import { mockPlaces } from "@/lib/mockData";

const Favorites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [favorites] = useState(mockPlaces.slice(0, 3));

  const filters = ["Todos", "Restaurantes", "Cafés"];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Favoritos</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-6 w-6" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar en favoritos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              Cerca
            </Button>
            <Button variant="outline" className="shrink-0">
              Abierto ahora
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-2xl border-2 border-dashed border-border">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Aún no tienes favoritos</h3>
              <p className="text-muted-foreground mb-6">
                Toca el icono de corazón en un lugar para guardarlo aquí.
              </p>
              <Button onClick={() => navigate("/home")} size="lg">
                Explorar lugares
              </Button>
            </div>
          </div>
        )}

        {/* Favorites List */}
        {favorites.length > 0 && (
          <div className="space-y-4">
            {favorites.map((place) => (
              <div
                key={place.id}
                className="bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="flex gap-4 p-4 cursor-pointer"
                  onClick={() => navigate(`/place/${place.id}`)}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 truncate">{place.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {place.category} • ⭐ {place.rating} ({place.reviewCount}) • {place.distance} km
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={place.isOpen ? "default" : "destructive"}>
                        {place.isOpen ? "Abierto ahora" : "Cerrado"}
                      </Badge>
                      {place.hasWifi && (
                        <Badge variant="outline">WiFi</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex border-t">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-muted/50 transition-colors text-destructive">
                    <HeartOff className="h-5 w-5" />
                  </button>
                  <div className="w-px bg-border" />
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-muted/50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        {favorites.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto flex gap-3">
            <Button variant="outline" size="lg" className="flex-1">
              Gestionar listas
            </Button>
            <Button size="lg" className="flex-1">
              Abrir mapa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
