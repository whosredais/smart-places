const fs = require('fs');

// --- PARTIE 1 : LES LIEUX DÉJÀ TROUVÉS (On les garde tels quels) ---
// J'ai récupéré ceux qui avaient des coordonnées uniques dans ton log précédent.
const keptPlaces = [
  { id: 2, name: "Starbucks (Bd Anfa)", lat: 33.5981399, lng: -7.6647762, category: "work", description: "Spacieux, prises partout.", openHour: 7, closeHour: 23, rating: 4.2 },
  { id: 15, name: "Technopark", lat: 33.5446113, lng: -7.6380962, category: "work", description: "Hub startups.", openHour: 8, closeHour: 20, rating: 4.5 },
  { id: 16, name: "Le Cabestan", lat: 33.6080257, lng: -7.6553304, category: "date", description: "Vue océan luxe.", openHour: 12, closeHour: 2, rating: 4.9 },
  { id: 17, name: "La Sqala", lat: 33.6028481, lng: -7.619212, category: "date", description: "Cadre historique.", openHour: 10, closeHour: 23, rating: 4.6 },
  { id: 18, name: "Rick's Café", lat: 33.604995, lng: -7.620406, category: "date", description: "Ambiance film.", openHour: 12, closeHour: 23, rating: 4.5 },
  { id: 19, name: "Sky 28", lat: 33.5865866, lng: -7.6320846, category: "date", description: "Rooftop vue incroyable.", openHour: 17, closeHour: 2, rating: 4.7 },
  { id: 20, name: "Dar Dada", lat: 33.6041396, lng: -7.6216351, category: "date", description: "Marocain branché.", openHour: 19, closeHour: 2, rating: 4.8 },
  { id: 21, name: "Le Petit Rocher", lat: 33.6096729, lng: -7.6514204, category: "date", description: "Phare d'El Hank.", openHour: 12, closeHour: 1, rating: 4.4 },
  { id: 23, name: "Iloli", lat: 33.5906169, lng: -7.6345122, category: "date", description: "Meilleur japonais.", openHour: 12, closeHour: 23, rating: 4.9 },
  { id: 24, name: "Organic Kitchen", lat: 33.5905909, lng: -7.6381864, category: "date", description: "Healthy et zen.", openHour: 10, closeHour: 22, rating: 4.3 },
  { id: 25, name: "La Bavaroise", lat: 33.5952135, lng: -7.6113257, category: "date", description: "Steakhouse français.", openHour: 12, closeHour: 23, rating: 4.4 },
  { id: 27, name: "NKOA", lat: 33.5867588, lng: -7.6294077, category: "date", description: "Fusion world.", openHour: 12, closeHour: 23, rating: 4.7 },
  { id: 28, name: "Milk & Honey", lat: 33.588257, lng: -7.6393618, category: "date", description: "Brunch top.", openHour: 9, closeHour: 18, rating: 4.2 },
  { id: 31, name: "Trica", lat: 33.5926142, lng: -7.6288982, category: "date", description: "Intime.", openHour: 19, closeHour: 23, rating: 4.4 },
  { id: 32, name: "Snack Amine", lat: 33.5766703, lng: -7.6334533, category: "budget", description: "Roi du Tacos.", openHour: 11, closeHour: 23, rating: 4.7 },
  { id: 37, name: "Snack Yassine", lat: 33.5896722, lng: -7.5921423, category: "budget", description: "Rapide et bon.", openHour: 10, closeHour: 2, rating: 4.1 },
  { id: 38, name: "McDonald's Corniche", lat: 33.6012598, lng: -7.66158, category: "budget", description: "Vue mer.", openHour: 9, closeHour: 4, rating: 4 },
  { id: 40, name: "KFC", lat: 33.5764438, lng: -7.7065764, category: "budget", description: "Poulet frit.", openHour: 11, closeHour: 23, rating: 3.8 },
  { id: 41, name: "Tacos de Lyon", lat: 33.5718335, lng: -7.6138768, category: "budget", description: "Sauce fromagère.", openHour: 11, closeHour: 23, rating: 4.3 },
  { id: 43, name: "Jus Oliveri", lat: 33.5859526, lng: -7.6407814, category: "budget", description: "Glaces et jus.", openHour: 8, closeHour: 23, rating: 4.7 },
  { id: 46, name: "Twin Center", lat: 33.5865844, lng: -7.6322923, category: "work", description: "Centre d'affaires.", openHour: 8, closeHour: 20, rating: 5 },
  { id: 49, name: "Pomme de Pain", lat: 33.6232651, lng: -7.5249887, category: "budget", description: "Sandwichs baguette.", openHour: 8, closeHour: 21, rating: 3.9 },
];

// --- PARTIE 2 : NOUVEAUX LIEUX À CHERCHER (Lieux faciles à trouver pour compléter) ---
const newPlacesToSearch = [
  // Lieux emblématiques et faciles à géolocaliser
  { name: "Gare Casa Voyageurs", query: "Gare Casa Voyageurs", category: "budget", description: "Gare historique.", openHour: 6, closeHour: 23, rating: 4.2 },
  { name: "Gare L'Oasis", query: "Gare Oasis Casablanca", category: "work", description: "Quartier calme.", openHour: 6, closeHour: 22, rating: 4.0 },
  { name: "Marina Shopping", query: "Marina Shopping Casablanca", category: "date", description: "Shopping vue mer.", openHour: 10, closeHour: 21, rating: 4.5 },
  { name: "Tachfine Center", query: "Tachfine Center Casablanca", category: "budget", description: "Centre commercial Belvédère.", openHour: 9, closeHour: 22, rating: 4.1 },
  { name: "Anfa Park", query: "Anfa Park Casablanca", category: "date", description: "Grand espaces verts.", openHour: 7, closeHour: 20, rating: 4.8 },
  { name: "Parc Sindibad", query: "Parc Sindibad Casablanca", category: "date", description: "Parc d'attraction.", openHour: 10, closeHour: 19, rating: 4.3 },
  { name: "Megarama", query: "Megarama Casablanca", category: "date", description: "Cinéma sur la corniche.", openHour: 14, closeHour: 1, rating: 4.4 },
  { name: "Hyatt Regency", query: "Hyatt Regency Casablanca", category: "date", description: "Luxe centre ville.", openHour: 24, closeHour: 24, rating: 4.7 },
  { name: "Sofitel Tour Blanche", query: "Sofitel Tour Blanche Casablanca", category: "work", description: "Business et luxe.", openHour: 24, closeHour: 24, rating: 4.8 },
  { name: "Onomo Hotel Sidi Maarouf", query: "Onomo Hotel Sidi Maarouf", category: "work", description: "Hôtel Business.", openHour: 24, closeHour: 24, rating: 4.0 },
  { name: "Novotel Casablanca City Center", query: "Novotel Casablanca City Center", category: "work", description: "Pratique et central.", openHour: 24, closeHour: 24, rating: 4.1 },
  { name: "Lycée Lyautey", query: "Lycée Lyautey Casablanca", category: "work", description: "Quartier Bourgogne.", openHour: 8, closeHour: 18, rating: 4.5 },
  { name: "Université Mundiapolis", query: "Université Mundiapolis Nouaceur", category: "work", description: "Campus universitaire.", openHour: 8, closeHour: 18, rating: 4.2 },
  { name: "Marché Central", query: "Marché Central Casablanca", category: "budget", description: "Poisson frais et histoire.", openHour: 8, closeHour: 16, rating: 4.6 },
  { name: "Restaurant du Port de Pêche", query: "Restaurant du Port de Pêche Casablanca", category: "budget", description: "Poisson frais abordable.", openHour: 11, closeHour: 23, rating: 4.3 },
  { name: "Villa des Arts", query: "Villa des Arts Casablanca", category: "date", description: "Musée et jardin.", openHour: 10, closeHour: 19, rating: 4.5 },
  { name: "Mosquée Al Saud", query: "Mosquée Al Saud Casablanca", category: "budget", description: "Quartier Californie.", openHour: 5, closeHour: 22, rating: 4.8 },
  { name: "Burger King California", query: "Burger King California Casablanca", category: "budget", description: "Fast food.", openHour: 10, closeHour: 23, rating: 3.9 },
  { name: "Venezia Ice Place Nations Unies", query: "Venezia Ice Place des Nations Unies", category: "budget", description: "Glaces centre ville.", openHour: 9, closeHour: 22, rating: 4.1 },
  { name: "Decathlon Ain Sebaa", query: "Decathlon Ain Sebaa", category: "budget", description: "Zone industrielle.", openHour: 9, closeHour: 21, rating: 4.2 },
  { name: "Marjane California", query: "Marjane California Casablanca", category: "budget", description: "Grand hypermarché.", openHour: 9, closeHour: 22, rating: 4.0 },
  { name: "Cinema Rialto", query: "Cinema Rialto Casablanca", category: "date", description: "Art déco.", openHour: 14, closeHour: 23, rating: 4.3 },
  { name: "Parc Isesco", query: "Parc Isesco Casablanca", category: "date", description: "Jardin Murdoch.", openHour: 8, closeHour: 19, rating: 4.2 },
  { name: "Place Mohammed V", query: "Place Mohammed V Casablanca", category: "date", description: "Avec les pigeons.", openHour: 24, closeHour: 24, rating: 4.4 },
  { name: "Mahkama du Pacha", query: "Mahkama du Pacha Casablanca", category: "date", description: "Architecture magnifique.", openHour: 9, closeHour: 16, rating: 4.7 },
  { name: "Église du Sacré-Cœur", query: "Église du Sacré-Cœur Casablanca", category: "date", description: "Ancienne église blanche.", openHour: 10, closeHour: 18, rating: 4.5 },
  { name: "Café Maure", query: "Café Maure Sqala Casablanca", category: "date", description: "Thé à la menthe.", openHour: 9, closeHour: 22, rating: 4.6 },
  { name: "Hotel Barcelo Anfa", query: "Barcelo Anfa Casablanca", category: "work", description: "Moderne et bien situé.", openHour: 24, closeHour: 24, rating: 4.5 },
];

async function generateFinalList() {
  console.log(`🚀 Démarrage...`);
  console.log(`✅ ${keptPlaces.length} lieux déjà valides conservés.`);
  console.log(`🔍 Recherche de ${newPlacesToSearch.length} nouveaux lieux pour compléter...`);
  
  const finalPlaces = [...keptPlaces]; // On commence avec les bons

  for (const place of newPlacesToSearch) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place.query)}&format=json&limit=1`;
    
    try {
      const response = await fetch(url, { headers: { "User-Agent": "SmartPlacesV2/1.0" } });
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`✅ Trouvé : ${place.name}`);
        finalPlaces.push({
          id: 0, // On mettra les ID à jour à la fin
          name: place.name,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          category: place.category,
          description: place.description,
          openHour: place.openHour,
          closeHour: place.closeHour,
          rating: place.rating
        });
      } else {
        console.log(`❌ Non trouvé (Ignoré) : ${place.name}`);
      }
      
      // Pause de sécurité pour l'API
      await new Promise(r => setTimeout(r, 1100));

    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }

  // RÉINDEXATION DES ID (Pour avoir 1, 2, 3... jusqu'à 50 proprement)
  const cleanList = finalPlaces.map((p, index) => ({
    ...p,
    id: index + 1
  }));

  console.log("\n✨ LISTE FINALE GÉNÉRÉE ! Copie le code ci-dessous dans src/data/places.ts :\n");
  
  const content = `export type Place = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: "work" | "date" | "budget";
  description: string;
  openHour: number;
  closeHour: number;
  rating: number;
};

export const places: Place[] = ${JSON.stringify(cleanList, null, 2)};
`;

  console.log(content);
}

generateFinalList();