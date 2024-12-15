export interface Scrapping {
  _id?: string;
  itemId: string;
  itemName: string;
  itemType: 'Products' | 'Supplies';
  quantity: number;
  employee: string | null;
  usedAt: string;
}

export interface ItemSummary {
  _id: string;
  name: string;
}