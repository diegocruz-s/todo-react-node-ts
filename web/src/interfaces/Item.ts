export interface Item {
    id: number
    title: string
    description: string
    checkItem: boolean
    userId: number
}

export interface ItemCreate {
    title: string
    description: string
}