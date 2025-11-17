import { useState } from "react";
import { Search, SlidersHorizontal, Phone, Navigation, Heart, MapIcon, List, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockPlaces } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Relevancia");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (placeId: string) => {
    setFavorites(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">U</span>
              </div>
              <span className="text-xl font-semibold">uniLocal</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/favorites")}
                className="rounded-full"
              >
                <Heart className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/profile")}
                className="rounded-full"
              >
                <UserIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o tipo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            <span className="text-sm text-muted-foreground whitespace-nowrap py-2">Ordenar por</span>
            {["Relevancia", "Distancia", "Rating"].map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(option)}
                className="whitespace-nowrap"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Places List */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {mockPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/place/${place.id}`)}
          >
            <div className="flex gap-4 p-4">
              <img
                src={place.image}
                alt={place.name}
                className="w-24 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg truncate">{place.name}</h3>
                  <Badge variant={place.isOpen ? "default" : "destructive"} className="shrink-0">
                    {place.isOpen ? "Abierto" : "Cerrado"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {place.category} • ⭐ {place.rating} ({place.reviewCount.toLocaleString()}) • {place.distance} km
                </p>
                <p className="text-sm text-foreground line-clamp-2 mb-3">
                  {place.description}
                </p>
                <div className="flex items-center gap-2">
                  {place.priceLevel && (
                    <Badge variant="outline">{place.priceLevel}</Badge>
                  )}
                  {place.hasWifi && (
                    <Badge variant="outline">WiFi</Badge>
                  )}
                  {place.hasDelivery && (
                    <Badge variant="outline">Entrega</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex border-t">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(place.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-muted/50 transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(place.id) ? "fill-primary text-primary" : ""
                  }`}
                />
              </button>
              <div className="w-px bg-border" />
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-muted/50 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </button>
              <div className="w-px bg-border" />
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-muted/50 transition-colors"
              >
                <Navigation className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="max-w-2xl mx-auto flex items-center justify-around h-16">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2">
            <MapIcon className="h-6 w-6" />
            <span className="text-xs">Mapa</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 text-primary">
            <List className="h-6 w-6" />
            <span className="text-xs font-semibold">Lista</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate("/favorites")}
          >
            <Heart className="h-6 w-6" />
            <span className="text-xs">Favoritos</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate("/create-place")}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs">Mis lugares</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => navigate("/profile")}
          >
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
