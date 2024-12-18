export interface ProductPerformance {
    _id: string,
    date: string,
    total: number,
    categories: Category[],
    products: Product[],
}

export interface Category {
    category: string;
    products: Product[];
}

interface Product {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
}

export interface AggregatedProductPerformance {
    productId: string;
    name: string;
    quantity: number;
    amount: number;
}