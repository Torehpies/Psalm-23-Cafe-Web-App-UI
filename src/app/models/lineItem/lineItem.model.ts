import { Size } from '../product/product.model';

export type LineItem = {
    _id: string | undefined;
    name: string | undefined;
    quantity: number | null;
    price: number | undefined;
    sizes: Size[] | undefined;
    selectedSize: string | undefined; // Add selectedSize property
}