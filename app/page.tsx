"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { places, Place } from "@/data/places";

const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false, 
  loading: () => <div className="flex items-center justify-center h-full">Chargement...</div>
});

// Petite fonction pour afficher les étoiles (ex: 4.5 => ⭐⭐⭐⭐)
const renderStars = (rating: number) => {
  return "⭐".repeat(Math.floor(rating));
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<"all" | "work" | "date" | "budget">("all");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  // Barre de recherche
  const [searchQuery, setSearchQuery] = useState("");

  //  Liste des favoris (IDs)
  const [favorites, setFavorites] = useState<number[]>([]);

  // 1. Charger les favoris au démarrage (depuis le LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem("myFavorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // 2. Fonction pour ajouter/retirer un favori
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche de cliquer sur la carte en même temps
    const newFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) // Retirer
      : [...favorites, id]; // Ajouter
    
    setFavorites(newFavs);
    localStorage.setItem("myFavorites", JSON.stringify(newFavs)); // Sauvegarde
  };

  const handleLocateMe = () => {
    setLoadingLoc(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setUserLocation([pos.coords.latitude, pos.coords.longitude]); setLoadingLoc(false); },
        () => { alert("Erreur GPS"); setLoadingLoc(false); }
      );
    }
  };

  // LOGIQUE DE FILTRAGE PUISSANTE (Catégorie + Recherche)
  const filteredPlaces = places.filter(place => {
    const matchCategory = selectedMood === "all" || place.category === selectedMood;
    const matchSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    
    <main className="flex flex-col-reverse md:flex-row w-full h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      
      <div className="w-full h-[45%] md:w-96 md:h-full bg-white shadow-xl flex flex-col z-20 relative">
        
        {/* HEADER */}
        <div className="p-4 md:p-6 border-b border-gray-100 bg-white">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">Smart Places</h1>
            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">v2.0</span>
          </div>

          <div className="relative mb-3 md:mb-4">
            <input 
              type="text"
              placeholder="🔍 Chercher un lieu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 md:p-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          <button 
            onClick={handleLocateMe}
            className="w-full bg-black text-white py-2 md:py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex justify-center items-center gap-2 shadow-lg"
          >
            {loadingLoc ? "..." : "📍 Autour de moi"}
          </button>
        </div>

        {/* FILTRES */}
        <div className="px-4 pt-2 pb-2 bg-gray-50 grid grid-cols-4 gap-2 border-b border-gray-200">
           {/* (Le code des boutons reste le même) */}
           {[
             { id: 'all', emoji: '∞', label: 'Tout' },
             { id: 'work', emoji: '💻', label: 'Work' },
             { id: 'date', emoji: '❤️', label: 'Date' },
             { id: 'budget', emoji: '🍔', label: 'Food' },
           ].map((btn) => (
             <button
               key={btn.id}
               onClick={() => setSelectedMood(btn.id as any)}
               className={`flex flex-col items-center p-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                 selectedMood === btn.id 
                   ? "bg-white shadow-md text-blue-600 ring-2 ring-blue-600 transform scale-105" 
                   : "text-gray-400 hover:bg-gray-200 hover:text-gray-600"
               }`}
             >
               <span className="text-lg mb-1">{btn.emoji}</span>
               <span>{btn.label}</span>
             </button>
           ))}
        </div>

        {/* LISTE DES RÉSULTATS (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>Résultats</span>
            <span>{filteredPlaces.length} lieux</span>
          </p>
          
          
          {filteredPlaces.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              <p className="text-2xl mb-1">😕</p>
              <p className="text-xs">Aucun lieu trouvé.</p>
            </div>
          )}

          {filteredPlaces.map(place => {
            const isFav = favorites.includes(place.id);
            return (
              <div 
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`group relative p-3 md:p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlace?.id === place.id 
                    ? "border-blue-500 bg-white ring-1 ring-blue-500" 
                    : "border-gray-100 bg-white hover:border-gray-300"
                }`}
              >
                <button 
                  onClick={(e) => toggleFavorite(place.id, e)}
                  className="absolute top-3 right-3 text-lg hover:scale-110 transition-transform"
                >
                  {isFav ? "❤️" : "🤍"}
                </button>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-sm md:text-lg">{place.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-1">
                    <span>{renderStars(place.rating)}</span>
                    <span className="text-gray-400 font-medium ml-1">{place.rating}</span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">{place.description}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide ${
                      place.category === 'work' ? 'bg-blue-50 text-blue-600' :
                      place.category === 'date' ? 'bg-pink-50 text-pink-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {place.category}
                    </span>
                    <div className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                      {place.openHour}h - {place.closeHour}h
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MAP --- */}
      
      <div className="w-full h-[55%] md:flex-1 md:h-full relative z-10">
        <Map 
          places={filteredPlaces} 
          userLocation={userLocation} 
          selectedPlace={selectedPlace}
          onMarkerClick={setSelectedPlace}
        />
      </div>

    </main>
  );
}