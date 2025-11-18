export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: number;
  description: string;
  isOpen: boolean;
  image: string;
  priceLevel?: string;
  hasWifi?: boolean;
  hasDelivery?: boolean;
  phone?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  placeId: string;
  placeName: string;
  comment: string;
  date: string;
  rating: number;
}

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "La Trattoria",
    category: "Restaurante italiano",
    rating: 4.8,
    reviewCount: 1200,
    distance: 0.6,
    description: "Pasta artesanal y ambiente acogedor con opciones vegetarianas",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    priceLevel: "$$",
    phone: "+57 300 123 4567",
    coordinates: {
      lat: 4.7110,
      lng: -74.0721
    },
    hours: {
      weekday: "12:00-22:00",
      weekend: "12:00-23:30"
    }
  },
  {
    id: "2",
    name: "Café Aurora",
    category: "Café",
    rating: 4.6,
    reviewCount: 320,
    distance: 0.35,
    description: "Café de especialidad, repostería casera y Wi-Fi rápido.",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
    hasWifi: true,
    phone: "+57 300 234 5678",
    coordinates: {
      lat: 4.7089,
      lng: -74.0701
    },
    hours: {
      weekday: "07:00-20:00",
      weekend: "08:00-21:00"
    }
  },
  {
    id: "3",
    name: "Museo Central",
    category: "Museo",
    rating: 4.5,
    reviewCount: 980,
    distance: 1.2,
    description: "Exhibiciones permanentes y temporales de arte moderno.",
    isOpen: false,
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&auto=format&fit=crop",
    phone: "+57 300 345 6789",
    coordinates: {
      lat: 4.7150,
      lng: -74.0680
    },
    hours: {
      weekday: "09:00-17:00",
      weekend: "10:00-18:00"
    }
  },
  {
    id: "4",
    name: "Sora Sushi",
    category: "Sushi",
    rating: 4.5,
    reviewCount: 920,
    distance: 2.3,
    description: "Sushi fresco preparado por chef japonés con ingredientes premium",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop",
    priceLevel: "$$$",
    hasDelivery: true,
    phone: "+57 300 456 7890",
    coordinates: {
      lat: 4.7200,
      lng: -74.0650
    },
    hours: {
      weekday: "12:00-22:00",
      weekend: "12:00-23:00"
    }
  },
  {
    id: "5",
    name: "Trattoria Roma",
    category: "Italiano",
    rating: 4.8,
    reviewCount: 120,
    distance: 1.5,
    description: "Cocina italiana casera con pastas frescas y horno de leña. Ambiente cálido y música suave.",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    priceLevel: "$$",
    phone: "+57 300 567 8901",
    coordinates: {
      lat: 4.7130,
      lng: -74.0740
    },
    hours: {
      weekday: "12:00-22:00",
      weekend: "12:00-23:30"
    }
  }
];

export const mockComments: Comment[] = [
  {
    id: "1",
    userId: "1",
    userName: "Ana Gómez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    placeId: "5",
    placeName: "Café Andino",
    comment: "Excelente café en Chapinero, buen WiFi.",
    date: "02 Feb 2025",
    rating: 5
  },
  {
    id: "2",
    userId: "1",
    userName: "María González",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    placeId: "6",
    placeName: "Parque Simón Bolívar",
    comment: "Parque tranquilo para estudiar.",
    date: "28 Ene 2025",
    rating: 4
  },
  {
    id: "3",
    userId: "2",
    userName: "Luis Pérez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    placeId: "5",
    placeName: "Trattoria Roma",
    comment: "Excelente comida y atención.",
    date: "28 Ene 2025",
    rating: 5
  }
];

export const mockUser = {
  id: "1",
  name: "María González",
  username: "maria.g",
  email: "maria@example.com",
  city: "Bogotá",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  favoriteCategory: "Comida, cafés..."
};
