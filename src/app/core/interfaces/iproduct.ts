
// interface Iproduct {
//   sold: number;
//   images: string[];
//   subcategory: Subcategory[];
//   ratingsQuantity: number;
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   quantity: number;
//   price: number;
//   imageCover: string;
//   category: Category;
//   brand: Category;
//   ratingsAverage: number;
//   createdAt: string;
//   updatedAt: string;
//   id: string;
// }

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
// }

// interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
//   category: string;
// }
export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}