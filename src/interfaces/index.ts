export interface ICategory {
  id?: string | undefined;
  name: string;
  description: string;
  image?: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
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

export interface IProductsState {
  products: IProduct[];
  loading: "idle" | "pending" | "succeed" | "failed";
  error: string | null;
  product: IProduct;
}
export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IRegisterFormData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  image: FileList;
  username?: string;
}

export interface IUser {
  id: string | number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  image?: File;
  isAdmin?: boolean;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: "idle" | "pending" | "succeed" | "failed";
  error: string | null;
}

export type TLoginResponse = {
  user: IUser | null;
  token: string | null;
};

export type TRejected = {
  rejectValue: string;
};

export interface ICartState {
  items: IProduct[];
}
