import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocallStorage";
import { Feature, ImageType, Tag } from "../../types";
import { toast } from "react-toastify";

type shopingcardProps = {
  children: ReactNode;
};
type SelectedPlatform = {
  platform: string;
  capacity: string;
  price: number;
};
type data = {
  title: string;
  image: ImageType;
  price: number;
  features: Feature[];
  tags: Tag[];
  mainQty:number,
};
type shopingcardContext = {
  getItemqty: (id: string) => number;
  InceraseCardQty: (
    id: string,
    SelectedPlatform: null | SelectedPlatform,
    data: data,
  ) => void;
  DecreaseCardQty: (id: string) => void;
  removeFromCard: (id: string) => void;
  CardItems: cardItem[];
  OpenMiniShoppingcard: boolean;
  setOpenMiniShoppingcard: React.Dispatch<React.SetStateAction<boolean>>;
  cardQty: number;
};
type cardItem = {
  id: string;
  ItemQty: number;
  SelectedPlatform: null | SelectedPlatform;
  data: data;
};
const ShopingCardContext = createContext({} as shopingcardContext);
export const useShopingcard = () => {
  return useContext(ShopingCardContext);
};
export const ShopingcardProvider = ({ children }: shopingcardProps) => {
  const [CardItems, setCardItems] = useLocalStorage<cardItem[]>(
    "shopping-card",
    []
  );
  const [OpenMiniShoppingcard, setOpenMiniShoppingcard] = useState(false);

  const getItemqty = (id: string) => {
    return CardItems.find((item) => item.id === id)?.ItemQty || 0;
  };
  const InceraseCardQty = (
    id: string,
    SelectedPlatform: SelectedPlatform | null,
    data: data
  ) => {
    setCardItems((prev) => {
      if (prev.find((item) => item.id === id) == null) {
        toast.success("با موفقیت به سبد خرید اضافه شد.")
        return [...prev, { id, ItemQty: 1, SelectedPlatform, data }];
      } else {
        return prev?.map((item) => {
          if (item.id === id) {
            return { ...item, ItemQty: item.ItemQty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const DecreaseCardQty = (id: string) => {
    setCardItems((prev) => {
      if (prev.find((item) => item.id === id)?.ItemQty == 1) {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev?.map((item) => {
          if (item.id === id) {
            return { ...item, ItemQty: item.ItemQty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCard = (id: string) => {
    setCardItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  const cardQty = CardItems.reduce((qty, item) => item.ItemQty + qty, 0);
  return (
    <ShopingCardContext.Provider
      value={{
        getItemqty,
        InceraseCardQty,
        DecreaseCardQty,
        removeFromCard,
        CardItems,
        OpenMiniShoppingcard,
        setOpenMiniShoppingcard,
        cardQty,
      }}
    >
      {children}
    </ShopingCardContext.Provider>
  );
};
