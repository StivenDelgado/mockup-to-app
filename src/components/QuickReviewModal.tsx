import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Lock } from "lucide-react";
import { Place } from "@/lib/mockData";
import { toast } from "sonner";

interface QuickReviewModalProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoggedIn?: boolean;
}

const QuickReviewModal = ({ place, open, onOpenChange, isLoggedIn = false }: QuickReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!place) return null;

  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error("Inicia sesión para publicar una reseña");
      return;
    }

    if (rating === 0) {
      toast.error("Por favor selecciona una calificación");
      return;
    }

    if (!comment.trim()) {
      toast.error("Por favor escribe un comentario");
      return;
    }

    toast.success("Reseña publicada exitosamente");
    setRating(0);
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Reseña rápida</DialogTitle>
        </DialogHeader>

        {!isLoggedIn && (
          <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-5 w-5" />
              <span className="text-sm">Inicia sesión para publicar.</span>
            </div>
            <Button variant="ghost" className="text-primary font-semibold">
              Iniciar sesión
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <img
              src={place.image}
              alt={place.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{place.name}</h3>
              <p className="text-sm text-muted-foreground">{place.category}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Calificación</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-2 rounded-xl border-2 border-border hover:border-primary transition-colors"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Comentario</h4>
            <Textarea
              placeholder="Comparte brevemente tu experiencia..."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
              className="min-h-32 resize-none"
            />
            <p className="text-xs text-muted-foreground">Máx. 500 caracteres.</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 text-base"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isLoggedIn}
              className="flex-1 h-12 text-base bg-primary hover:bg-primary/90"
            >
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickReviewModal;
