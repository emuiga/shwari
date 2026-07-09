export const LOCATIONS = [
  // Nairobi CBD & Central
  'CBD, Nairobi',
  'Upper Hill, Nairobi',
  'Community, Nairobi',
  'Ngara, Nairobi',
  'Pangani, Nairobi',
  'Parklands, Nairobi',

  // Westlands Area
  'Westlands, Nairobi',
  'Spring Valley, Nairobi',
  'Loresho, Nairobi',
  'Kyuna, Nairobi',
  'Kitisuru, Nairobi',
  'Gigiri, Nairobi',
  'Muthaiga, Nairobi',
  'Old Muthaiga, Nairobi',
  'Rosslyn, Nairobi',
  'Runda, Nairobi',
  'Ridgeways, Nairobi',
  'Garden Estate, Nairobi',
  'Thome, Nairobi',
  'Zimmerman, Nairobi',
  'Kahawa West, Nairobi',
  'Kahawa Sukari, Nairobi',

  // Eastern Nairobi
  'Kasarani, Nairobi',
  'Roysambu, Nairobi',
  'Githurai 44, Nairobi',
  'Githurai 45, Kiambu',
  'Mwiki, Nairobi',
  'Njiru, Nairobi',
  'Ruai, Nairobi',
  'Komarock, Nairobi',
  'Kayole, Nairobi',
  'Umoja, Nairobi',
  'Donholm, Nairobi',
  'Savannah, Nairobi',
  'Embakasi, Nairobi',
  'Pipeline, Nairobi',
  'Fedha, Nairobi',
  'Tassia, Nairobi',
  'Utawala, Nairobi',
  'Mihango, Nairobi',
  'Greenspan, Nairobi',

  // South Nairobi
  'South B, Nairobi',
  'South C, Nairobi',
  'Bellevue, Nairobi',
  'Nairobi West, Nairobi',
  "Lang'ata, Nairobi",
  'Karen, Nairobi',
  'Hardy, Nairobi',
  'Bogani, Nairobi',
  'Ngong Road, Nairobi',
  'Kibera, Nairobi',
  'Madaraka, Nairobi',

  // Kilimani Area
  'Kilimani, Nairobi',
  'Kileleshwa, Nairobi',
  'Lavington, Nairobi',
  'Hurlingham, Nairobi',
  'Valley Arcade, Nairobi',
  'Dagoretti Corner, Nairobi',
  'Riruta, Nairobi',
  'Kawangware, Nairobi',

  // Waiyaki Way
  'Kangemi, Nairobi',
  'Mountain View, Nairobi',
  'Uthiru, Nairobi',

  // Thika Road Corridor
  'Kahawa Wendani, Kiambu',
  'Kahawa Garrison, Nairobi',
  'Membley, Kiambu',
  'Membley Estate, Kiambu',
  'Eastern Bypass, Kiambu',

  // Kiambu Town Area
  'Kiambu Town, Kiambu County',
  'Kiambu Road, Kiambu County',
  'Kiambu CBD, Kiambu County',
  'Ndumberi, Kiambu County',
  "Ting'ang'a, Kiambu County",
  'Riabai, Kiambu County',
  'Kihara, Kiambu County',
  'Karuri, Kiambu County',
  'Cianda, Kiambu County',
  'Muchatha, Kiambu County',
  'Ndenderu, Kiambu County',

  // Kiambaa
  'Banana, Kiambu County',
  'Ruaka, Kiambu County',
  'Two Rivers, Kiambu County',
  'Redhill, Kiambu County',
  'Wangige, Kiambu County',
  'Lower Kabete, Kiambu County',

  // Kabete
  'Kabete, Kiambu County',
  'Gitaru, Kiambu County',
  'Muguga, Kiambu County',
  'Nyathuna, Kiambu County',

  // Kikuyu
  'Kikuyu, Kiambu County',
  'Sigona, Kiambu County',
  'Kinoo, Kiambu County',
  'Karai, Kiambu County',
  'Nachu, Kiambu County',
  'Thogoto, Kiambu County',

  // Limuru
  'Limuru, Kiambu County',
  'Tigoni, Kiambu County',
  'Bibirioni, Kiambu County',
  'Limuru East, Kiambu County',
  'Limuru Central, Kiambu County',
  'Ngecha, Kiambu County',

  // Ruiru
  'Ruiru, Kiambu County',
  'Membley, Kiambu County',
  'Gitothua, Kiambu County',
  'Biashara, Kiambu County',
  'Mwihoko, Kiambu County',
  'Kiuu, Kiambu County',
  'Gatongora, Kiambu County',

  // Juja
  'Juja, Kiambu County',
  'JKUAT, Juja',
  'Kalimoni, Kiambu County',
  'Murera, Kiambu County',
  'Theta, Kiambu County',
  'Witeithie, Kiambu County',

  // Thika
  'Thika Town, Kiambu County',
  'Makongeni, Thika',
  'Landless, Thika',
  'Blue Post, Thika',
  'Ngoigwa, Thika',
  'Section 9, Thika',
  'Thika Greens, Thika',

  // Gatundu
  'Gatundu, Kiambu County',
  'Kiamwangi, Kiambu County',
  'Kiganjo, Kiambu County',
  'Ngenda, Kiambu County',
  'Mangu, Kiambu County',

  // Githunguri
  'Githunguri, Kiambu County',
  'Komothai, Kiambu County',
  'Ikinu, Kiambu County',
  'Ngewa, Kiambu County',

  // Lari
  'Lari, Kiambu County',
  'Kijabe, Kiambu County',
  'Kinale, Kiambu County',
  'Nyanduma, Kiambu County',

  // Nearby Satellite Towns
  'Syokimau, Machakos County',
  'Mlolongo, Machakos County',
  'Athi River, Machakos County',
  'Kitengela, Kajiado County',
  'Ngong, Kajiado County',
  'Ongata Rongai, Kajiado County',
  'Ruiru Bypass, Kiambu County',
  'Tatu City, Kiambu County',
  'Tilisi, Kiambu County',
];

export function searchLocations(query: string): string[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return LOCATIONS;
  }
  return LOCATIONS.filter((location) => location.toLowerCase().includes(trimmed));
}

export function locationLabel(location: string): string {
  return location.split(',')[0].trim();
}
