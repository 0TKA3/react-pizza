export type ProductType = {
  title: string;
  price: number;
  id: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
  count?: number;
};
