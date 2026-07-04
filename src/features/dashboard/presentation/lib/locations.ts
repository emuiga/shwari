export const LOCATIONS = [
  'Ruaka, Kiambu county',
  'Ruiru, Kiambu county',
  'Runda, Nairobi',
  'Rungiri, Kiambu county',
  'Ruaraka, Nairobi',
  'Kasarani, Nairobi',
  'Westlands, Nairobi',
  'Karen, Nairobi',
  'Kikuyu, Kiambu county',
  'Thika, Kiambu county',
];

export function searchLocations(query: string): string[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return LOCATIONS;
  }
  return LOCATIONS.filter((location) => location.toLowerCase().includes(trimmed));
}
