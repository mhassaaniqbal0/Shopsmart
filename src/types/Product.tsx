export interface PlatformPrice {
  platform: string;
  price: string;
  link: string;
  rating: number;
  deliveryTime: string;
  stockAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  summary: string;
  platformPrices: PlatformPrice[];
}
