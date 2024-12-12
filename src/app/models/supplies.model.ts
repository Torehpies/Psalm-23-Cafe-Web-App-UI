export interface Supplies {
    _id?: string;
    name: string;
    category: "Supply" | "Ingredient";
    currentStock: number;
    unit: string;
    par: number;
}
