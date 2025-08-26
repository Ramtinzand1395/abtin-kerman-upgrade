import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Spiner from "../../utils/Spiner";
import usePagginationGames from "../../hooks/usePagginationGames";
import AccountsGames from "../../utils/AccountsGames";
import { Helmet } from "react-helmet";
const AllAcountGames = () => {
  const [sortOrder, setSortOrder] = useState("");
  const { category } = useParams();
  const safeCategory = category || "";

  const [pageNumber, setpageNumber] = useState(1);
  const { FiltredAccountGames, hasMore, loading } = usePagginationGames(
    pageNumber,
    safeCategory,
    sortOrder
  );
  const observer = useRef<IntersectionObserver | null>(null);
  const lastgame = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entery) => {
        if (entery[0].isIntersecting && hasMore) {
          setpageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setpageNumber(1);
  }, [category, sortOrder]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    setSortOrder(order);
  };
console.log(FiltredAccountGames)
  return (
    <div className="md:container md:mx-auto mx-2">
      <Helmet>
        <title>acount games</title>
        <meta
          name="description"
          content="Browse our wide range of acount games."
        />
      </Helmet>
      {/* مرتب سازی */}
      <div className="">
        <select
          id="sortOrder"
          title="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="highToLow"> گرانترین </option>
          <option value="lowToHigh"> ارزان ترین </option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {FiltredAccountGames &&
          FiltredAccountGames?.map((game, index) =>
            FiltredAccountGames.length === index + 1 ? (
              <div key={game._id} ref={lastgame} className="">
                <AccountsGames
                  primaryImage={game.primaryImage}
                  additionalImages={game.additionalImages}
                  averageRating={game.averageRating}
                  title={game.title}
                  info={game.info}
                  _id={game._id}
                  tags={game.tags}
                  key={game._id}
                />
              </div>
            ) : (
              <div className="">
                <AccountsGames
                  primaryImage={game.primaryImage}
                  additionalImages={game.additionalImages}
                  title={game.title}
                  info={game.info}
                  _id={game._id}
                  tags={game.tags}
                  averageRating={game.averageRating}
                  key={game._id}
                />
              </div>
            )
          )}
      </div>
      <div className="flex w-full items-center justify-center">
        {loading && <Spiner />}
      </div>
    </div>
  );
};
export default AllAcountGames;
