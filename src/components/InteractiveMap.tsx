import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Place } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface InteractiveMapProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

const InteractiveMap = ({ places, onPlaceClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem('mapbox_token') || ''
  );
  const [tokenInput, setTokenInput] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      // Initialize map centered on Bogotá
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.0721, 4.7110], // Bogotá coordinates
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add markers for each place
      places.forEach((place, index) => {
        // Generate coordinates around Bogotá
        const lat = 4.7110 + (Math.random() - 0.5) * 0.1;
        const lng = -74.0721 + (Math.random() - 0.5) * 0.1;

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = place.isOpen ? 'hsl(var(--primary))' : 'hsl(var(--muted))';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '20px';
        el.textContent = place.category.charAt(0);
        el.style.color = 'white';
        el.style.fontWeight = 'bold';

        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map.current!);

        // Add click event
        el.addEventListener('click', () => {
          onPlaceClick(place);
        });

        markers.current.push(marker);
      });

      return () => {
        markers.current.forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Error al cargar el mapa. Verifica tu token de Mapbox.');
    }
  }, [places, onPlaceClick, mapboxToken]);

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem('mapbox_token', tokenInput.trim());
      setMapboxToken(tokenInput.trim());
      toast.success('Token de Mapbox guardado correctamente');
    } else {
      toast.error('Por favor ingresa un token válido');
    }
  };

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-muted/20">
        <div className="max-w-md w-full space-y-4 bg-card p-6 rounded-xl border">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Configura Mapbox</h3>
            <p className="text-sm text-muted-foreground">
              Para usar el mapa interactivo, necesitas un token público de Mapbox.
            </p>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="Ingresa tu token público de Mapbox"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full"
            />
            <button
              onClick={handleSaveToken}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 rounded-md font-medium transition-colors"
            >
              Guardar token
            </button>
          </div>

          <div className="text-xs text-muted-foreground space-y-2">
            <p>1. Ve a <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a></p>
            <p>2. Crea una cuenta o inicia sesión</p>
            <p>3. Copia tu token público desde el dashboard</p>
            <p>4. Pégalo arriba y guárdalo</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
