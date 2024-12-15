export interface Scrapping {
    _id?: string; 
    item: string; 
    itemType: 'Products' | 'Supplies'; 
    quantity: number;
    employee: string; 
}