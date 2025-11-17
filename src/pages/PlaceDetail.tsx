import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Heart, Share2, Phone, Navigation, Star } from "lucide-react";
import { mockPlaces, mockComments } from "@/lib/mockData";

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = mockPlaces.find((p) => p.id === id);
  const placeComments = mockComments.filter((c) => c.placeId === id);

  if (!place) {
    return <div>Lugar no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Detalle de lugar</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Hero Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/90 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/90 backdrop-blur-sm"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>🍽️ {place.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{place.rating}</span>
                  <span>• {place.reviewCount}</span>
                </div>
              </div>
            </div>
            <Badge variant={place.isOpen ? "default" : "destructive"} className="shrink-0">
              {place.isOpen ? "Abierto" : "Cerrado"}
            </Badge>
          </div>

          {/* Hours */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Horario</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lun–Jue</span>
                <span>{place.hours.weekday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sáb–Dom</span>
                <div className="text-right">
                  <span className="text-primary font-medium">Hoy (Vie)</span>
                  <span className="ml-1">{place.hours.weekend}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="h-14">
              <Phone className="h-5 w-5 mr-2" />
              Llamar
            </Button>
            <Button variant="outline" size="lg" className="h-14">
              <Navigation className="h-5 w-5 mr-2" />
              Cómo llegar
            </Button>
          </div>

          {/* Map */}
          <div className="h-48 bg-muted rounded-xl overflow-hidden">
            <img
              src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+0d9488(-74.0721,4.7110)/-74.0721,4.7110,13,0/600x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-foreground leading-relaxed">{place.description}</p>
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Comentarios</h3>
              <Button size="lg" className="rounded-full">
                Comentar/Calificar
              </Button>
            </div>

            <div className="space-y-4">
              {placeComments.map((comment) => (
                <div key={comment.id} className="bg-muted/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{comment.userName}</h4>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-foreground mb-2">{comment.comment}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < comment.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
