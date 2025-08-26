export interface GameData {
  _id?: string;
  title: string;
  company: string;
  region: string;
  primaryImage: ImageType | null;
  additionalImages: ImageType[];
  multiplayer: boolean;
  info: GameDataInfo[];
  categories: Category[];
  tags: Tag[];
  createdAt?: string;
  comments?: Comment[];
  features: Feature[];
  additionalExplanations: string;
  rating?: ratingProps;
  averageRating: number;
}
export interface GameDataInfo {
  platform: string;
  capacity: string;
  price: number;
  qty: number;
  inStock: boolean;
}
export interface Tag {
  tagName: string;
  createdAt: string;
  _id: string;
}
export interface Category {
  categoryName: string;
  createdAt: string;
  _id: string;
}

export interface ImageType {
  imageName: string;
  direction: string;
  createdAt: string;
  _id: string;
}

export interface Comment {
  body: string;
  // ! این تایپ باید درست بشه
  user: User;
  relatedId?: string;
  relatedModel: string;
  isValidated?: boolean;
  createdAt?: string;
  rating: number;
  _id?: string;
  // ! حتما بعدا بررسی بشه
  relatedData?: Product | GameData;
}
export interface Feature {
  key: string;
  value: string;
}
export interface UserAddress {
  city: string;
  provider: string;
  address: string;
  plaque?: string;
  unit?: string;
  postalCode?: string;
}
export interface decodedUser {
  email: string;
  isAdmin: boolean;
  userId: string;
}
export interface User {
  email: string;
  order?: string;
  address?: UserAddress;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isAdmin: string;
  profile: string;
  createdAt?: string;
  _id: string;
}
export interface Product {
  _id?: string;
  title: string;
  price: number;
  features: Feature[];
  Specifications: Feature[];
  description?: string;
  primaryImage: ImageType | null;
  comments?: Comment[];
  additionalImages?: ImageType[];
  tags?: Tag[];
  categories?: Category[];
  sellOne: boolean;
  quantity: number;
  inStock?: boolean;
  createdAt?: string;
  additionalExplanations?: string;
  rating?: ratingProps;
  averageRating: number;
}
export interface ratingProps {
  averageRating: string;
  individualRatings: [
    {
      commentId: string;
      rating: number;
      userId: string;
    }
  ];
  totalRatings: number;
}
export interface Weblog {
  _id?: string;
  title: string;
  body: string;
  primaryImage?: ImageType | null;
  createdAt?: string;
}
export interface Order {
  _id?: string;
  createdAt?: string;
  user: User;
  items: OrderItems[];
  TrackingCode: string;
  status: string;
}
export interface OrderItems {
  _id?: string;
  id: string;
  ItemQty: number;
  SelectedPlatform: SelectedPlatform;
  itemType: string;
  populatedData: PopulatedData;
}
export interface SelectedPlatform {
  platform: string;
  capacity: string;
  price: string;
}
interface PopulatedData {
  primaryImage: string;
  title: string;
  _id: string;
  price: number | undefined;
}
export interface FavoritespopulatedProps {
  itemId: Product;
  itemType: string;
  _id: string;
}
export interface FavoritesProps {
  itemId: string;
  itemType: string;
}
export interface CommentStrProps {
  body: string;
  user: string;
  relatedId?: string;
  relatedModel: string;
  isValidated?: boolean;
  createdAt?: string;
  rating: number;
}

export interface Customer {
  _id: string;
  name: string;
  mobile: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  persianDate: string;
  sex: string;
  birthday: string;
  description: string;
}

export interface customerOrder {
  _id: string;
  list: string[];
  price: number | null;
  customer: Customer | string;
  description: string;
  consoleType: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
  persianDate: string;
  deliveryCode: string;
  deliveryDate: string;
}
export interface GameItem {
  _id: string;
  name: string;
  platform?: string;
}

export interface GameList {
  _id: string;
  platform: "ps5" | "ps4" | "کپی خور" | "xbox";
  items: GameItem[];
}

export interface newGameList {
  platform: string;
  name: string;
}
