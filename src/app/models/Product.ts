export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: string; // ID of the associated category
    isFeatured: boolean;
    imageData: string;
    //marketId: string; // Assuming MarketId is required for products
}
