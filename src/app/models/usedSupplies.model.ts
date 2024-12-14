export interface UsedSupplies {
    _id: string,
    supply: SupplySummary,
    quantity: number,
    employee: string,
    usedAt: string
}

export interface SupplySummary {
    _id: string,
    name: string
}