export interface ProductPerformance {
    _id: string,
    date: string,
    total: number,
    products: Product[],
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