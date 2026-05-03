export type CarCategory = "ready" | "crashed";

export interface DamagedPart {
  name: string;
  price: number;
  ship?: boolean;
  oem?: string;
}

export interface CarComment {
  _id?: string;
  memberId?: string;
  memberNick?: string;
  memberImage?: string;
  commentContent: string;
  createdAt?: string;
}

export interface AuctionCar {
  id: string;
  title: string;
  brand: string;
  myFavorite?: boolean;
  comments?: CarComment[];
  category: CarCategory;
  year: number;
  km: number;
  price: number;
  color: string;
  desc: string;
  damagedParts: DamagedPart[];
  image: string;
  images: string[];
  status: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  consultationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPageState {
  cars: AuctionCar[];
  savedIds: string[];
}
