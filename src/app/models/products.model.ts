export interface Products {
    _id?: string;
    name: string;
    Category: string;
    unit: string;
    price: number;
    status: "Active" | "Inactive";
    currentStock: number;
    par: number;
}
