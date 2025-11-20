export interface Word {
  id: string;
  modern: string; // Zamonaviy so'z
  traditional: string; // Asl o'zbek
  description: string; // Izoh
  createdAt: string;
}

export type SearchDirection = 'modern-to-traditional' | 'traditional-to-modern';
