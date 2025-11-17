import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Trash2, Plus, Loader2 } from "lucide-react";

const CreatePlace = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    phone: "",
    photos: [] as string[]
  });

  const steps = [
    { number: 1, label: "Básicos" },
    { number: 2, label: "Ubicación" },
    { number: 3, label: "Horario" },
    { number: 4, label: "Revisión" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const mockPhotos = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
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
          <h1 className="text-xl font-semibold">Crear lugar</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Trash2 className="h-6 w-6" />
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-muted mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ej. Café Andino"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Breve descripción del lugar..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-32 text-base resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Incluye lo más relevante para visitantes.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Categoría <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                placeholder="Selecciona categoría"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="h-14 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfonos</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+57 300 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-14 text-base"
              />
              <p className="text-sm text-muted-foreground">
                Opcional. Puedes agregar varios separados por coma.
              </p>
            </div>

            <div className="space-y-3">
              <Label>
                Fotos <span className="text-destructive">* (1-5)</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <button className="aspect-square border-2 border-dashed rounded-xl flex items-center justify-center hover:border-primary transition-colors">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </button>
                {mockPhotos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subiendo a Firebase...
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep > 1 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Paso {currentStep} en construcción...</p>
            <p className="text-sm mt-2">Continúa para ver el resultado final</p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="flex-1"
            >
              Atrás
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Guardar borrador
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === 4 ? "Publicar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
