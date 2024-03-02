export interface Products {
  sold: number;
  images: string[];
  subcategory: object[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: {
    image: string;
    name: string;
    slug: string;
  };
  brand: object;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
