export interface ErrorResponse {
    errors: {
        code?: number
        message: string
        status: number
        details: unknown | null
    }[]
}