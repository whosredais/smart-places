"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Place } from "@/data/places";

// --- 1. ICONS & LOGIC ---
const createIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12]
  });
};
const icons = {
  work: createIcon("#2563EB"), date: createIcon("#DB2777"), budget: createIcon("#16A34A"), user: createIcon("#000000"),
};

// Fonction pour savoir si c'est ouvert
function isOpen(open: number, close: number) {
  const now = new Date().getHours();
  // Gestion simple des horaires (ex: ferme à 2h du matin = 26h pour le calcul, simplifié ici)
  if (close < open) close += 24; 
  return now >= open && now < close;
}

// --- 2. CONTROLLER (Gère le Zoom Automatique) ---
function MapController({ 
  selectedPlace, 
  userLocation 
}: { 
  selectedPlace: Place | null; 
  userLocation: [number, number] | null 
}) {
  const map = useMap();

  // Effet 1 : Si on sélectionne un lieu dans la liste, on vole vers lui
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 16, { animate: true });
    }
  }, [selectedPlace, map]);

  // Effet 2 : Si on se géolocalise, on vole vers l'utilisateur
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 14, { animate: true });
    }
  }, [userLocation, map]);

  return null;
}

interface MapProps {
  places: Place[];
  userLocation: [number, number] | null;
  selectedPlace: Place | null; // Nouvelle prop !
  onMarkerClick: (place: Place) => void; // Pour remonter l'info
}

export default function Map({ places, userLocation, selectedPlace, onMarkerClick }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);
  // Références pour ouvrir les popups manuellement
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  useEffect(() => { setIsMounted(true); }, []);

  // Quand selectedPlace change, on ouvre son popup
  useEffect(() => {
    if (selectedPlace && markerRefs.current[selectedPlace.id]) {
      markerRefs.current[selectedPlace.id]?.openPopup();
    }
  }, [selectedPlace]);

  if (!isMounted) return <div className="w-full h-full bg-gray-100 flex items-center justify-center">Chargement...</div>;

  return (
    <MapContainer key="map-pro" center={[33.5731, -7.5898]} zoom={12} className="w-full h-full z-0">
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapController selectedPlace={selectedPlace} userLocation={userLocation} />

      {userLocation && <Marker position={userLocation} icon={icons.user}><Popup>📍 C'est vous !</Popup></Marker>}

      {places.map((place) => {
        const open = isOpen(place.openHour, place.closeHour);
        return (
          <Marker 
            key={place.id} 
            position={[place.lat, place.lng]} 
            icon={icons[place.category]}
            ref={(ref) => { markerRefs.current[place.id] = ref; }} // On stocke la ref
            eventHandlers={{
              click: () => onMarkerClick(place) // On informe le parent qu'on a cliqué
            }}
          >
            <Popup>
              <div className="text-center min-w-[120px]">
                <h3 className="font-bold">{place.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{place.description}</p>
                <div className="flex gap-2 justify-center">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 border">
                    {place.category}
                  </span>
                  {/* Badge Ouvert/Fermé */}
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white ${open ? "bg-green-500" : "bg-red-500"}`}>
                    {open ? "OUVERT" : "FERMÉ"}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}