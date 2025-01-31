export interface TProduct {
  _id: string;
  productName: string;
  brandName: string;
  productTitle: string;
  description: string;
  ProductType: {
    type: string;
    subType: string;
  };
  prices: {
    regular: number;
    sale: number;
  };
  thumbnail: string;
  extraImages: string[];
  quantity: number;
  tags: string;
  productStatus: "active" | "inActive";
}
