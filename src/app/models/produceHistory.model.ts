export interface ProduceHistory {
    _id?: string,
    product: ProductSummary,
    quantity: number,
    employee: string | null,
    usedAt: string
}

export interface ProductSummary {
    _id: string,
    name: string
}