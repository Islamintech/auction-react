export interface CarPart {
  name: string;
  price: number;
  oem?: string;
  ship?: boolean;
}

export type CarCategory = "ready" | "crashed";

export interface AuctionCar {
  id: string;
  year: number;
  model: string;
  make?: string;
  price: number;
  category: CarCategory;
  damage?: string;
  parts?: CarPart[];
  image?: string;
  fuel?: string;
  trans?: string;
  km?: number;
  color?: string;
  damageDesc?: string;
}

export interface LandingPageState {
  cars: AuctionCar[];
  savedIds: string[];
}
