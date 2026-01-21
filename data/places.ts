export type Place = {
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

export const places: Place[] = [
  {
    "id": 1,
    "name": "Starbucks (Bd Anfa)",
    "lat": 33.5981399,
    "lng": -7.6647762,
    "category": "work",
    "description": "Spacieux, prises partout.",
    "openHour": 7,
    "closeHour": 23,
    "rating": 4.2
  },
  {
    "id": 2,
    "name": "Technopark",
    "lat": 33.5446113,
    "lng": -7.6380962,
    "category": "work",
    "description": "Hub startups.",
    "openHour": 8,
    "closeHour": 20,
    "rating": 4.5
  },
  {
    "id": 3,
    "name": "Le Cabestan",
    "lat": 33.6080257,
    "lng": -7.6553304,
    "category": "date",
    "description": "Vue océan luxe.",
    "openHour": 12,
    "closeHour": 2,
    "rating": 4.9
  },
  {
    "id": 4,
    "name": "La Sqala",
    "lat": 33.6028481,
    "lng": -7.619212,
    "category": "date",
    "description": "Cadre historique.",
    "openHour": 10,
    "closeHour": 23,
    "rating": 4.6
  },
  {
    "id": 5,
    "name": "Rick's Café",
    "lat": 33.604995,
    "lng": -7.620406,
    "category": "date",
    "description": "Ambiance film.",
    "openHour": 12,
    "closeHour": 23,
    "rating": 4.5
  },
  {
    "id": 6,
    "name": "Sky 28",
    "lat": 33.5865866,
    "lng": -7.6320846,
    "category": "date",
    "description": "Rooftop vue incroyable.",
    "openHour": 17,
    "closeHour": 2,
    "rating": 4.7
  },
  {
    "id": 7,
    "name": "Dar Dada",
    "lat": 33.6041396,
    "lng": -7.6216351,
    "category": "date",
    "description": "Marocain branché.",
    "openHour": 19,
    "closeHour": 2,
    "rating": 4.8
  },
  {
    "id": 8,
    "name": "Le Petit Rocher",
    "lat": 33.6096729,
    "lng": -7.6514204,
    "category": "date",
    "description": "Phare d'El Hank.",
    "openHour": 12,
    "closeHour": 1,
    "rating": 4.4
  },
  {
    "id": 9,
    "name": "Iloli",
    "lat": 33.5906169,
    "lng": -7.6345122,
    "category": "date",
    "description": "Meilleur japonais.",
    "openHour": 12,
    "closeHour": 23,
    "rating": 4.9
  },
  {
    "id": 10,
    "name": "Organic Kitchen",
    "lat": 33.5905909,
    "lng": -7.6381864,
    "category": "date",
    "description": "Healthy et zen.",
    "openHour": 10,
    "closeHour": 22,
    "rating": 4.3
  },
  {
    "id": 11,
    "name": "La Bavaroise",
    "lat": 33.5952135,
    "lng": -7.6113257,
    "category": "date",
    "description": "Steakhouse français.",
    "openHour": 12,
    "closeHour": 23,
    "rating": 4.4
  },
  {
    "id": 12,
    "name": "NKOA",
    "lat": 33.5867588,
    "lng": -7.6294077,
    "category": "date",
    "description": "Fusion world.",
    "openHour": 12,
    "closeHour": 23,
    "rating": 4.7
  },
  {
    "id": 13,
    "name": "Milk & Honey",
    "lat": 33.588257,
    "lng": -7.6393618,
    "category": "date",
    "description": "Brunch top.",
    "openHour": 9,
    "closeHour": 18,
    "rating": 4.2
  },
  {
    "id": 14,
    "name": "Trica",
    "lat": 33.5926142,
    "lng": -7.6288982,
    "category": "date",
    "description": "Intime.",
    "openHour": 19,
    "closeHour": 23,
    "rating": 4.4
  },
  {
    "id": 15,
    "name": "Snack Amine",
    "lat": 33.5766703,
    "lng": -7.6334533,
    "category": "budget",
    "description": "Roi du Tacos.",
    "openHour": 11,
    "closeHour": 23,
    "rating": 4.7
  },
  {
    "id": 16,
    "name": "Snack Yassine",
    "lat": 33.5896722,
    "lng": -7.5921423,
    "category": "budget",
    "description": "Rapide et bon.",
    "openHour": 10,
    "closeHour": 2,
    "rating": 4.1
  },
  {
    "id": 17,
    "name": "McDonald's Corniche",
    "lat": 33.6012598,
    "lng": -7.66158,
    "category": "budget",
    "description": "Vue mer.",
    "openHour": 9,
    "closeHour": 4,
    "rating": 4
  },
  {
    "id": 18,
    "name": "KFC",
    "lat": 33.5764438,
    "lng": -7.7065764,
    "category": "budget",
    "description": "Poulet frit.",
    "openHour": 11,
    "closeHour": 23,
    "rating": 3.8
  },
  {
    "id": 19,
    "name": "Tacos de Lyon",
    "lat": 33.5718335,
    "lng": -7.6138768,
    "category": "budget",
    "description": "Sauce fromagère.",
    "openHour": 11,
    "closeHour": 23,
    "rating": 4.3
  },
  {
    "id": 20,
    "name": "Jus Oliveri",
    "lat": 33.5859526,
    "lng": -7.6407814,
    "category": "budget",
    "description": "Glaces et jus.",
    "openHour": 8,
    "closeHour": 23,
    "rating": 4.7
  },
  {
    "id": 21,
    "name": "Twin Center",
    "lat": 33.5865844,
    "lng": -7.6322923,
    "category": "work",
    "description": "Centre d'affaires.",
    "openHour": 8,
    "closeHour": 20,
    "rating": 5
  },
  {
    "id": 22,
    "name": "Pomme de Pain",
    "lat": 33.6232651,
    "lng": -7.5249887,
    "category": "budget",
    "description": "Sandwichs baguette.",
    "openHour": 8,
    "closeHour": 21,
    "rating": 3.9
  },
  {
    "id": 23,
    "name": "Gare Casa Voyageurs",
    "lat": 33.5902297,
    "lng": -7.590001,
    "category": "budget",
    "description": "Gare historique.",
    "openHour": 6,
    "closeHour": 23,
    "rating": 4.2
  },
  {
    "id": 24,
    "name": "Gare L'Oasis",
    "lat": 33.554127,
    "lng": -7.6313118,
    "category": "work",
    "description": "Quartier calme.",
    "openHour": 6,
    "closeHour": 22,
    "rating": 4
  },
  {
    "id": 25,
    "name": "Marina Shopping",
    "lat": 33.6068698,
    "lng": -7.6206498,
    "category": "date",
    "description": "Shopping vue mer.",
    "openHour": 10,
    "closeHour": 21,
    "rating": 4.5
  },
  {
    "id": 26,
    "name": "Tachfine Center",
    "lat": 33.586255,
    "lng": -7.5926296,
    "category": "budget",
    "description": "Centre commercial Belvédère.",
    "openHour": 9,
    "closeHour": 22,
    "rating": 4.1
  },
  {
    "id": 27,
    "name": "Anfa Park",
    "lat": 33.5630718,
    "lng": -7.6573132,
    "category": "date",
    "description": "Grand espaces verts.",
    "openHour": 7,
    "closeHour": 20,
    "rating": 4.8
  },
  {
    "id": 28,
    "name": "Parc Sindibad",
    "lat": 33.5809286,
    "lng": -7.6924168,
    "category": "date",
    "description": "Parc d'attraction.",
    "openHour": 10,
    "closeHour": 19,
    "rating": 4.3
  },
  {
    "id": 29,
    "name": "Megarama",
    "lat": 33.5964047,
    "lng": -7.6672777,
    "category": "date",
    "description": "Cinéma sur la corniche.",
    "openHour": 14,
    "closeHour": 1,
    "rating": 4.4
  },
  {
    "id": 30,
    "name": "Hyatt Regency",
    "lat": 33.5961037,
    "lng": -7.6188156,
    "category": "date",
    "description": "Luxe centre ville.",
    "openHour": 24,
    "closeHour": 24,
    "rating": 4.7
  },
  {
    "id": 31,
    "name": "Onomo Hotel Sidi Maarouf",
    "lat": 33.521383,
    "lng": -7.6321736,
    "category": "work",
    "description": "Hôtel Business.",
    "openHour": 24,
    "closeHour": 24,
    "rating": 4
  },
  {
    "id": 32,
    "name": "Lycée Lyautey",
    "lat": 33.5956679,
    "lng": -7.6321806,
    "category": "work",
    "description": "Quartier Bourgogne.",
    "openHour": 8,
    "closeHour": 18,
    "rating": 4.5
  },
  {
    "id": 33,
    "name": "Marché Central",
    "lat": 33.5948849,
    "lng": -7.6119963,
    "category": "budget",
    "description": "Poisson frais et histoire.",
    "openHour": 8,
    "closeHour": 16,
    "rating": 4.6
  },
  {
    "id": 34,
    "name": "Villa des Arts",
    "lat": 33.5864207,
    "lng": -7.6295534,
    "category": "date",
    "description": "Musée et jardin.",
    "openHour": 10,
    "closeHour": 19,
    "rating": 4.5
  },
  {
    "id": 35,
    "name": "Decathlon Ain Sebaa",
    "lat": 33.5926664,
    "lng": -7.5304674,
    "category": "budget",
    "description": "Zone industrielle.",
    "openHour": 9,
    "closeHour": 21,
    "rating": 4.2
  },
  {
    "id": 36,
    "name": "Cinema Rialto",
    "lat": 33.5943859,
    "lng": -7.614541,
    "category": "date",
    "description": "Art déco.",
    "openHour": 14,
    "closeHour": 23,
    "rating": 4.3
  },
  {
    "id": 37,
    "name": "Place Mohammed V",
    "lat": 33.5916377,
    "lng": -7.6198406,
    "category": "date",
    "description": "Avec les pigeons.",
    "openHour": 24,
    "closeHour": 24,
    "rating": 4.4
  },
  {
    "id": 38,
    "name": "Mahkama du Pacha",
    "lat": 33.5789531,
    "lng": -7.6063203,
    "category": "date",
    "description": "Architecture magnifique.",
    "openHour": 9,
    "closeHour": 16,
    "rating": 4.7
  },
  {
    "id": 39,
    "name": "Église du Sacré-Cœur",
    "lat": 33.5911809,
    "lng": -7.624501,
    "category": "date",
    "description": "Ancienne église blanche.",
    "openHour": 10,
    "closeHour": 18,
    "rating": 4.5
  },
  {
    "id": 40,
    "name": "Hotel Barcelo Anfa",
    "lat": 33.5910965,
    "lng": -7.6353824,
    "category": "work",
    "description": "Moderne et bien situé.",
    "openHour": 24,
    "closeHour": 24,
    "rating": 4.5
  }
];