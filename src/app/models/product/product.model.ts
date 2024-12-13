export interface Size {
    size: string;
    price: number;
}

export type Product = {
    _id?: string;
    name: string;
    unit: string;
    category: string;
    price?: number;
    sizes: Size[];
    status: 'Active' | 'Inactive';
    currentStock: number;
    par: number
}
