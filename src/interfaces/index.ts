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
}

export interface IUser {
  id: string | number;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  loading: "idle" | "pending" | "succeed" | "failed";
  error: string | null;
}

export type TLoginResponse = {
  user: IUser | null;
  accessToken: string | null;
};
