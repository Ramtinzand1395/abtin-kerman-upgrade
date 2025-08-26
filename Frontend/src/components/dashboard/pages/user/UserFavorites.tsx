import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserFavoritesService,
  remUserFavoriteService,
} from "../../../../services/ApiServices";
import { toast } from "react-toastify";
import { FavoritespopulatedProps } from "../../../../types";
import Spiner from "../../../utils/Spiner";
import { Helmet } from "react-helmet";

const UserFavorites: React.FC = () => {
  const [Favorites, setFavorites] = useState<FavoritespopulatedProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId) {
          const { data } = await getUserFavoritesService(userId);
          setFavorites(data.favorites);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);

  const handleRemove = async (itemId: string) => {
    setIsLoading(true);
    try {
      if (userId) {
        const { data } = await remUserFavoriteService(userId, itemId);
        setFavorites((prev) => prev.filter((fav) => fav._id !== itemId));
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="flex w-full items-center justify-center">
<Spiner />
  </div> ;

  return (
    <div className=" w-full md:container md:mx-auto mx-2 my-10">
      <Helmet>
      <title>favorites</title>
      <meta name="description" content="User Favorites Products" />
      </Helmet>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        {Favorites.length > 0 ? (
          Favorites.map((fav) => (
            <div key={fav._id} className="border-2 rounded-lg">
              <Link
                to={`${
                  fav.itemType === "Product" && typeof fav.itemId !== "string"
                    ? `/product/${fav.itemId._id}`
                    : `/accountgame/${fav.itemId._id}`
                }`}
              >
                <div className="">
                  <img
                    className="w-full h-52"
                    src={fav.itemId?.primaryImage?.direction}
                    alt={fav.itemId?.primaryImage?.imageName}
                  />
                  <h5 className="m-5 ">{fav.itemId.title}</h5>
                </div>
              </Link>

              <div className="flex items-center p-2">
                <button
                  onClick={() => handleRemove(fav._id)}
                  className="w-full ml-5"
                  title="remove"
                >
                  <svg
                    className="cursor-pointer bg-red-500 w-full p-2"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20.5 6H3.49988"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 11L10 16"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 11L14 16"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>هیچ کالایی در علاقه مندی ها موجود نیست</p>
        )}
      </div>
    </div>
  );
};

export default UserFavorites;
