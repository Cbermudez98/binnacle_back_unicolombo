interface CustomError {
    status: number;
    error: string;
}

export const isCustomError = (obj: any): obj is CustomError => {
    return 'error' in obj && 'status' in obj;
}