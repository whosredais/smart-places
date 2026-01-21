const fs = require('fs');

// Liste des 50 lieux avec leurs métadonnées
// On utilise "query" pour aider OpenStreetMap à trouver l'endroit exact
const placesToSearch = [
  // --- WORK ---
  { id: 1, name: "Espresso Lab (Gauthier)", query: "Espresso Lab Gauthier Casablanca", category: "work", description: "Le QG des développeurs.", openHour: 7, closeHour: 22, rating: 4.8 },
  { id: 2, name: "Starbucks (Bd Anfa)", query: "Starbucks Boulevard Anfa Casablanca", category: "work", description: "Spacieux, prises partout.", openHour: 7, closeHour: 23, rating: 4.2 },
  { id: 3, name: "Go4Work", query: "Go4Work Casablanca", category: "work", description: "Coworking pro.", openHour: 8, closeHour: 20, rating: 4.6 },
  { id: 4, name: "Bondi Coffee Kitchen", query: "Bondi Coffee Kitchen Casablanca", category: "work", description: "Ambiance Australie.", openHour: 9, closeHour: 19, rating: 4.7 },
  { id: 5, name: "Coffeeshop Company", query: "Coffeeshop Company Zenith Casablanca", category: "work", description: "Réunions nearshore.", openHour: 7, closeHour: 22, rating: 4.0 },
  { id: 6, name: "Boost Coffee", query: "Boost Coffee Casablanca", category: "work", description: "Petit mais excellent.", openHour: 8, closeHour: 21, rating: 4.5 },
  { id: 7, name: "L'Atelier du Grain", query: "L'Atelier du Grain Casablanca", category: "work", description: "Calme absolu.", openHour: 8, closeHour: 20, rating: 4.4 },
  { id: 8, name: "Commons Zerktouni", query: "Commons Zerktouni Casablanca", category: "work", description: "Espace premium.", openHour: 9, closeHour: 18, rating: 4.9 },
  { id: 9, name: "Caribou Coffee", query: "Caribou Coffee Anfa Place Casablanca", category: "work", description: "Vue mer cosy.", openHour: 7, closeHour: 23, rating: 4.3 },
  { id: 10, name: "Paul Villa Zevaco", query: "Paul Zevaco Casablanca", category: "work", description: "RDV business.", openHour: 7, closeHour: 21, rating: 4.1 },
  { id: 11, name: "Costa Coffee Marina", query: "Costa Coffee Marina Casablanca", category: "work", description: "Vue sur le port.", openHour: 8, closeHour: 22, rating: 4.3 },
  { id: 12, name: "Vendor Coffee", query: "Vendor Coffee Casablanca", category: "work", description: "Café de spécialité.", openHour: 8, closeHour: 20, rating: 4.6 },
  { id: 13, name: "New York Lab", query: "New York Lab Casablanca", category: "work", description: "Bagels et wifi.", openHour: 9, closeHour: 21, rating: 4.0 },
  { id: 14, name: "Café La Scène", query: "Café La Scène Casablanca", category: "work", description: "Artistique.", openHour: 9, closeHour: 22, rating: 4.2 },
  { id: 15, name: "Technopark", query: "Technopark Casablanca", category: "work", description: "Hub startups.", openHour: 8, closeHour: 20, rating: 4.5 },

  // --- DATE ---
  { id: 16, name: "Le Cabestan", query: "Le Cabestan Casablanca", category: "date", description: "Vue océan luxe.", openHour: 12, closeHour: 2, rating: 4.9 },
  { id: 17, name: "La Sqala", query: "La Sqala Casablanca", category: "date", description: "Cadre historique.", openHour: 10, closeHour: 23, rating: 4.6 },
  { id: 18, name: "Rick's Café", query: "Rick's Café Casablanca", category: "date", description: "Ambiance film.", openHour: 12, closeHour: 23, rating: 4.5 },
  { id: 19, name: "Sky 28", query: "Kenzi Tower Hotel Casablanca", category: "date", description: "Rooftop vue incroyable.", openHour: 17, closeHour: 2, rating: 4.7 },
  { id: 20, name: "Dar Dada", query: "Dar Dada Casablanca", category: "date", description: "Marocain branché.", openHour: 19, closeHour: 2, rating: 4.8 },
  { id: 21, name: "Le Petit Rocher", query: "Le Petit Rocher Casablanca", category: "date", description: "Phare d'El Hank.", openHour: 12, closeHour: 1, rating: 4.4 },
  { id: 22, name: "Lily's", query: "Lily's Casablanca", category: "date", description: "Asiatique face mer.", openHour: 12, closeHour: 23, rating: 4.5 },
  { id: 23, name: "Iloli", query: "Iloli Casablanca", category: "date", description: "Meilleur japonais.", openHour: 12, closeHour: 23, rating: 4.9 },
  { id: 24, name: "Organic Kitchen", query: "Organic Kitchen Casablanca", category: "date", description: "Healthy et zen.", openHour: 10, closeHour: 22, rating: 4.3 },
  { id: 25, name: "La Bavaroise", query: "La Bavaroise Casablanca", category: "date", description: "Steakhouse français.", openHour: 12, closeHour: 23, rating: 4.4 },
  { id: 26, name: "Blend Burger", query: "Blend Burger Casablanca", category: "date", description: "Gourmet burger.", openHour: 12, closeHour: 23, rating: 4.6 },
  { id: 27, name: "NKOA", query: "NKOA Casablanca", category: "date", description: "Fusion world.", openHour: 12, closeHour: 23, rating: 4.7 },
  { id: 28, name: "Milk & Honey", query: "Milk & Honey Casablanca", category: "date", description: "Brunch top.", openHour: 9, closeHour: 18, rating: 4.2 },
  { id: 29, name: "Le Kimmy'z", query: "Le Kimmy'z Casablanca", category: "date", description: "Bistrot animé.", openHour: 12, closeHour: 2, rating: 4.3 },
  { id: 30, name: "Umayya", query: "Umayya Casablanca", category: "date", description: "Oriental chic.", openHour: 19, closeHour: 3, rating: 4.5 },
  { id: 31, name: "Trica", query: "Trica Casablanca", category: "date", description: "Intime.", openHour: 19, closeHour: 23, rating: 4.4 },

  // --- BUDGET ---
  { id: 32, name: "Snack Amine", query: "Snack Amine Derb Ghallef", category: "budget", description: "Roi du Tacos.", openHour: 11, closeHour: 23, rating: 4.7 },
  { id: 33, name: "Moumni", query: "Moumni Mers Sultan", category: "budget", description: "Sandwichs mythiques.", openHour: 10, closeHour: 4, rating: 4.3 },
  { id: 34, name: "Bomba Panini", query: "Bomba Panini Casablanca", category: "budget", description: "Paninis chargés.", openHour: 11, closeHour: 23, rating: 4.2 },
  { id: 35, name: "O'Tacos Maarif", query: "O'Tacos Maarif Casablanca", category: "budget", description: "Valeur sûre.", openHour: 11, closeHour: 23, rating: 4.0 },
  { id: 36, name: "Chawarma Elaji", query: "Chawarma Elaji Casablanca", category: "budget", description: "Meilleure chawarma.", openHour: 12, closeHour: 1, rating: 4.6 },
  { id: 37, name: "Snack Yassine", query: "Snack Yassine Casablanca", category: "budget", description: "Rapide et bon.", openHour: 10, closeHour: 2, rating: 4.1 },
  { id: 38, name: "McDonald's Corniche", query: "McDonald's Corniche Casablanca", category: "budget", description: "Vue mer.", openHour: 9, closeHour: 4, rating: 4.0 },
  { id: 39, name: "Pizza Hut", query: "Pizza Hut 2 Mars Casablanca", category: "budget", description: "Classique.", openHour: 11, closeHour: 23, rating: 3.9 },
  { id: 40, name: "KFC", query: "KFC Boulevard d'Anfa Casablanca", category: "budget", description: "Poulet frit.", openHour: 11, closeHour: 23, rating: 3.8 },
  { id: 41, name: "Tacos de Lyon", query: "Tacos de Lyon Maarif", category: "budget", description: "Sauce fromagère.", openHour: 11, closeHour: 23, rating: 4.3 },
  { id: 42, name: "Garage Burger", query: "Garage Burger Mers Sultan", category: "budget", description: "Burgers simples.", openHour: 12, closeHour: 22, rating: 4.2 },
  { id: 43, name: "Jus Oliveri", query: "Oliveri Maarif Casablanca", category: "budget", description: "Glaces et jus.", openHour: 8, closeHour: 23, rating: 4.7 },
  { id: 44, name: "Snack Al Mansour", query: "Snack Al Mansour Casablanca", category: "budget", description: "Vrai goût.", openHour: 11, closeHour: 1, rating: 4.1 },
  { id: 45, name: "Patisserie Bennis", query: "Patisserie Bennis Habous", category: "budget", description: "Gâteaux traditionnels.", openHour: 9, closeHour: 20, rating: 4.8 },
  { id: 46, name: "Twin Center", query: "Twin Center Casablanca", category: "work", description: "Centre d'affaires.", openHour: 8, closeHour: 20, rating: 5.0 }, // Remplacement d'un lieu difficile à trouver
  { id: 47, name: "Creperie Bretonne", query: "Creperie Bretonne Casablanca", category: "budget", description: "Crêpes.", openHour: 10, closeHour: 22, rating: 4.2 },
  { id: 48, name: "Wok to Walk", query: "Wok to Walk Maarif", category: "budget", description: "Asiatique rapide.", openHour: 11, closeHour: 23, rating: 4.0 },
  { id: 49, name: "Pomme de Pain", query: "Pomme de Pain Casablanca", category: "budget", description: "Sandwichs baguette.", openHour: 8, closeHour: 21, rating: 3.9 },
  { id: 50, name: "Domino's Pizza", query: "Domino's Pizza 2 Mars Casablanca", category: "budget", description: "Livraison.", openHour: 11, closeHour: 23, rating: 4.0 },
];

async function generatePlaces() {
  console.log("🚀 Démarrage du scan GPS pour 50 lieux...\n");
  const finalPlaces = [];

  for (const place of placesToSearch) {
    // 1. On cherche les coordonnées
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place.query)}&format=json&limit=1`;
    
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "SmartPlacesProject/1.0" }
      });
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`✅ [${place.id}/50] Trouvé : ${place.name}`);
        
        // 2. On construit l'objet final
        finalPlaces.push({
          id: place.id,
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
        console.log(`❌ [${place.id}/50] Non trouvé : ${place.name} (Utilisation coords par défaut Twin Center)`);
        // Fallback si non trouvé (pour ne pas casser l'app)
        finalPlaces.push({ ...place, lat: 33.5865, lng: -7.6322 }); // Default Twin Center
      }
      
      // Pause de 1.1s pour respecter l'API
      await new Promise(r => setTimeout(r, 1100));

    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }

  // 3. Génération du fichier final
  console.log("\n✨ Scan terminé ! Voici ton nouveau fichier places.ts :\n");
  
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

export const places: Place[] = ${JSON.stringify(finalPlaces, null, 2)};
`;

  console.log(content);
  
  // Optionnel : écrire directement dans le fichier si on veut
  // fs.writeFileSync('src/data/places.ts', content);
}

generatePlaces();