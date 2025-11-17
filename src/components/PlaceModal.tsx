import { Place } from '@/lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Navigation, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceModalProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (placeId: string) => void;
  isFavorite: boolean;
}

const PlaceModal = ({ place, open, onOpenChange, onToggleFavorite, isFavorite }: PlaceModalProps) => {
  const navigate = useNavigate();

  if (!place) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">{place.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image */}
          <div className="relative h-48 -mx-6 -mt-2 overflow-hidden">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <Badge 
              variant={place.isOpen ? "default" : "destructive"}
              className="absolute top-3 right-3"
            >
              {place.isOpen ? "Abierto" : "Cerrado"}
            </Badge>
          </div>

          {/* Category and Rating */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🍽️ {place.category}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{place.rating}</span>
              <span>({place.reviewCount})</span>
            </div>
            <span>•</span>
            <span>{place.distance} km</span>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground leading-relaxed">
            {place.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
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

          {/* Hours */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="font-semibold mb-2 text-sm">Horario</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lun–Jue</span>
                <span>{place.hours.weekday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sáb–Dom</span>
                <span>{place.hours.weekend}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(place.id);
              }}
              className="h-12"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-primary text-primary" : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="h-12"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="h-12"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>

          {/* View Details Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              onOpenChange(false);
              navigate(`/place/${place.id}`);
            }}
          >
            Ver detalles completos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceModal;
