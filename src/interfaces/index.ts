export interface ICategory {
  _id?: string | undefined;
  name: string;
  image: FileList;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  brand: string;
  category: string;
  inStock: number;
  images: FileList[];
  colors: string[];
  sizes?: string[] | undefined;
  rating?: {
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
  _id: string | number;
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
