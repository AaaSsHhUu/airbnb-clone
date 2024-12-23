export type SearchQueryInputs = {
    category ?: string;
    price ?: number;
}

export type BaseQuery = {
    category ?: {
        $regex ?: string;
        $options ?: string;
    },
    price ?: {
        $lte ?: number;
    }
}
