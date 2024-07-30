export interface ICategory {
  id?: string | undefined;
  name: string;
  description: string;
  image?: string;
}

export interface IProduct {
  id?: string | number | undefined;
  title: string;
  description: string;
  price: string;
  quantity?: number;
  brand: string;
  category: {
    name: string;
    image?: string;
  };
  inStock: number;
  images: string[];
  colors: string[];
  sizes?: string[];
  rating: {
    rate: number;
    count: number;
  };
}
