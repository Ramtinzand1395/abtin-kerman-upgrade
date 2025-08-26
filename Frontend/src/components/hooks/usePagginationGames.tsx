import { useEffect, useState } from "react";
import { getFiltredAccountGamesService } from "../../services/ApiServices";
import { GameData } from "../../types";

export default function usePagginationGames(
  pageNumber: number,
  category: string,
  sortOrder: string
) {
  const [FiltredAccountGames, setFiltredAccountGames] = useState<GameData[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFiltredAccountGames = async () => {
      try {
        const { data } = await getFiltredAccountGamesService(
          category,
          pageNumber,
          sortOrder
        );
        if (pageNumber === 1) {
          setFiltredAccountGames(data.filteredProducts);
        } else {
          setFiltredAccountGames((prev) => [...prev, ...data.filteredProducts]);
        }
        if (data.filteredProducts.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getFiltredAccountGames();
  }, [category, pageNumber, sortOrder]);
  return { loading, FiltredAccountGames, hasMore };
}
