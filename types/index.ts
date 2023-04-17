export type VotesType = {
  count: number;
  value: number;
}

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[]
}

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
}

export type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
}

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];
  discount?: string;
  currentPrice?: number;
}

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
}

export type GtagEventType = {
  action: string;
  category: string; 
  label: string;
  value: string
}
export type Category = {
  id: string,
  categoryName: string,
  sku: string,
  status: number

}
export type InputProduct = {
  filter: {
    product_id: number[],
    category_id: number[],
    price:{
      min: number,
      max: number
    }
  },
  sort: {
    field: string,
    order: string
  },
  pagination:{
    page: number,
    perPage: number
  }
}
export type Product = {
  id: number,
  name: string,
  sku: string
  description: string,
  price: number,
  thumb: string,
  status: number,
  hot: number,
  category_id: number,
  campaign_id: number,
  discount_id: number,
  import_date: string,
  update_date: string,
  favorite: number,
  priority: number
}
export type Inventory ={
  id: number,
  name: string,
  size: string,
  quantity: number,
  size_id: number,
  color_id: number,
  product_id: number
}