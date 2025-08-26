import { useEffect, useState } from "react";
import { getFiltredProductsService } from "../../services/ApiServices";
import { Product } from "../../types";

export default function usePaggination(
  pageNumber: number,
  slug1: string,
  slug2: string,
  sortOrder: string
) {
  const [FiltredProducts, setFiltredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFiltredProducts = async () => {
      try {
        const { data } = await getFiltredProductsService(
          slug1,
          slug2,
          pageNumber,
          sortOrder
        );
        if (pageNumber === 1) {
          setFiltredProducts(data.filteredProducts);
        } else {
          setFiltredProducts((prev) => [...prev, ...data.filteredProducts]);
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
    getFiltredProducts();
  }, [slug1, slug2, pageNumber, sortOrder]);
  return { loading, FiltredProducts, hasMore };
}
