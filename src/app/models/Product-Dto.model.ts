

export interface ProductDTO {
    id: string; // Include the 'id' property
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: string; 
    isFeatured: boolean
    imageData: string;
  }