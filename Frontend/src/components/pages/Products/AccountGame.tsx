import React, { ChangeEvent, useEffect, useState } from "react";
import ConnectedProducts from "../../utils/ConnectedProducts";
import BtnTow from "../../utils/BtnTow";
import {  getGameSingleService } from "../../../services/ApiServices";
import { useParams } from "react-router-dom";
import {  GameData } from "../../../types";
import Tabs from "../../utils/tab/Tabs";
import { useShopingcard } from "../../context/ShopingCard";


const AccountGame: React.FC = () => {
  // !Context
  const { InceraseCardQty, CardItems } = useShopingcard();
  const [game, setgame] = useState<GameData | null>(null);
  const { gameId } = useParams();
  const [currentImage, setCurrentImage] = useState<string>("");
  // const user = localStorage.getItem("User") || "{}";
  // const decodedToken = jwtDecode<decodedUser>(user);

  // const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (!gameId) return;
    const getGame = async () => {
      try {
        const { data } = await getGameSingleService(gameId);
        // const { data: favorites } = await getUserFavoritesService(
        //   decodedToken.userId
        // );
        setgame(data);
        // setFavorites(favorites.favorites);
        setCurrentImage(data?.primaryImage?.direction);
      } catch (err) {
        console.log(err);
      }
    };
    getGame();
  }, [gameId]);
  const sortedPrices = game?.info
    ? [...game.info].sort((a, b) => a.price - b.price)
    : [];

  const [SelectedPlatform, setSelectedPlatform] = useState({
    platform: "",
    capacity: "",
    price: 0,
  });
  const handleUserSelectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setSelectedPlatform({
      ...SelectedPlatform,
      [e.target.name]: e.target.value,
    });
  };
  const isInStock = () => {
    if (game?.info) {
      const gameInfo = game.info.find(
        (item) =>
          item.platform === SelectedPlatform.platform &&
          item.capacity === SelectedPlatform.capacity &&
          item.inStock === true
      );
      if (gameInfo) {
        setSelectedPlatform((prev) => ({ ...prev, price: gameInfo.price }));
        return gameInfo;
      }
    }
    setSelectedPlatform((prev) => ({ ...prev, price: 0 }));
    return null;
  };
  const handleAddToCart = () => {
    const data = {
      title: game?.title || "",
      image: game?.primaryImage || {
        imageName: "",
        direction: "",
        createdAt: "",
        _id: "",
      },
      mainQty: 1,
      price: SelectedPlatform?.price || 0,
      features: game?.features || [],
      tags: game?.tags || [],
    };
    game?._id && InceraseCardQty(game?._id, SelectedPlatform, data);
  };
  useEffect(() => {
    if (
      SelectedPlatform.platform.length > 0 &&
      SelectedPlatform.capacity.length > 0
    ) {
      isInStock();
    }
  }, [SelectedPlatform.platform, SelectedPlatform.capacity]);
  const handleImageClick = (imageDirection: string) => {
    setCurrentImage(imageDirection);
  };
  const hasMultiplePrices = game?.info && game.info.length > 1;

  // const handleAddToFavorites = async () => {
  //   try {
  //     const { data } = await addUserFavoritesService(
  //       decodedToken.userId,
  //       gameId,
  //       "Product"
  //     );
  //     setFavorites(data.favorites);
  //     toast.success(data.message);
  //   } catch (err) {
  //     toast.error(err.response.data.message);
  //     console.log(err);
  //   }
  // };
  return (
    <div className="md:container md:mx-auto mx-2">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Game picture */}
        <div className="">
          <img
            // src={`http://localhost:5000/${currentImage}`}
            //! change
            src={`${currentImage}`}
            alt=""
            className=" h-full object-contain w-full max-h-[60vh] my-5"
          />
          <div className=" items-center hidden md:flex mb-10">
            {game?.additionalImages?.map((img) => (
              <img
                key={img._id}
                // src={`http://localhost:5000/${img?.direction}`}
                //! change
                src={`${img?.direction}`}
                alt=""
                className="w-full h-full object-contain max-w-[70px] max-h-[70px] mx-2 border-2 rounded-lg border-primary p-2 cursor-pointer"
                onClick={() => handleImageClick(img?.direction)}
              />
            ))}
            <img
              // src={`http://localhost:5000/${game?.primaryImage?.direction}`}
              //! change
              src={`${game?.primaryImage?.direction}`}
              alt=""
              className="w-full h-full object-contain max-w-[70px] max-h-[70px] border-2 border-primary rounded-lg p-2 mx-2 cursor-pointer"
              onClick={() =>
                game?.primaryImage?.direction &&
                handleImageClick(game?.primaryImage?.direction)
              }
            />
          </div>
        </div>
        {/* Select  */}
        <div className="flex flex-col items-start justify-evenly">
          <h1 className="font-tanha text-4xl font-bold">{game?.title}</h1>
          <p>
            {hasMultiplePrices ? (
              <>
                <p className="my-2">
                  از {sortedPrices[0].price} _{" "}
                  {sortedPrices[sortedPrices.length - 1].price} تومان
                </p>
              </>
            ) : (
              game?.info.map((item, index) => (
                <div key={index} className="my-2">
                  {item.price} تومان
                </div>
              ))
            )}
          </p>
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2 text-secondery">
              پلتفرم
            </label>
            <select
              value={SelectedPlatform.platform}
              onChange={handleUserSelectChange}
              name="platform"
              className="px-16 py-2 rounded-lg border-primary border-2 ml-5"
              title="یک کزینه را انتخاب "
            >
              <option value=""> یک کزینه را انتخاب کنید</option>
              <option value="ps5">ps5</option>
              <option value="ps4">ps4</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2 text-secondery">
              ظرفیت
            </label>
            <select
              value={SelectedPlatform.capacity}
              onChange={handleUserSelectChange}
              name="capacity"
              className="px-16 py-2 rounded-lg border-primary border-2"
              title="یک کزینه را انتخاب "
            >
              <option value=""> یک کزینه را انتخاب کنید</option>
              <option value="ظرفیت یک">ظرفیت یک</option>
              <option value="ظرفیت دو">ظرفیت دو</option>
              <option value="ظرفیت سه">ظرفیت سه</option>
            </select>
          </div>
          <div className="flex items-center">
            {SelectedPlatform.platform && SelectedPlatform.capacity ? (
              <div className="ml-5">
                {SelectedPlatform.price > 0 ? (
                  <label className="mr-2">
                    قیمت: {SelectedPlatform.price} تومان
                  </label>
                ) : (
                  <p className="text-red-500">در انبار موجود نیست</p>
                )}
              </div>
            ) : (
              ""
            )}
            {CardItems.some((card) => card.id === game?._id) ? (
              <p className="text-green-500 font-bold">در سبد خرید موجود است.</p>
            ) : SelectedPlatform.price > 0 ? (
              <BtnTow
                ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400"
                ButtonText="افزودن به سبد خرید"
                onClick={handleAddToCart}
              />
            ):""}
          </div>
        </div>
      </div>
      {/* Secont tabs */}
      <div className=" my-10">{game && <Tabs Product={game} />}</div>
      <div className="my-10">
        <ConnectedProducts />
      </div>
    </div>
  );
};

export default AccountGame;
