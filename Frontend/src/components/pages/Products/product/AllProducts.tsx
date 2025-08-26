import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import usePaggination from "../../../hooks/usePaggination";
import Spiner from "../../../utils/Spiner";
// Preload the ShoppingCard component for faster loading
const ShopingCard = React.lazy(() => import("../../../utils/ShopingCard"));
import { Helmet } from "react-helmet";
const AllProducts: React.FC = () => {
  const [sortOrder, setSortOrder] = useState("");
  const { slug1 = "" , slug2 ="" } = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const { FiltredProducts, hasMore, loading } = usePaggination(
    pageNumber,
    slug1,
    slug2,
    sortOrder,
  );
 
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPageNumber(1);
  }, [slug1 , slug2, sortOrder]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };
  return (
    <div className="md:container md:mx-auto mx-2">
      <Helmet>
        <title>{slug1}</title>
        <meta name="description" content="Browse our wide range of products." />
      </Helmet>

      {/* Sort Options */}
      <div className="my-4">
        <label htmlFor="sortOrder" className="sr-only">
          Sort Order
        </label>
        <select
          id="sortOrder"
          title="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="highToLow">گرانترین</option>
          <option value="lowToHigh">ارزان ترین</option>
        </select>
      </div>

      {/* Products Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        <Suspense fallback={<Spiner />}>
          {FiltredProducts &&
            FiltredProducts.map((product, index) => (
              <div
                key={product._id}
                ref={
                  FiltredProducts.length === index + 1 ? lastProductRef : null
                }
              >
                <ShopingCard
                  title={product.title}
                  price={product.price}
                  primaryImage={product.primaryImage} // ensure optimized and preloaded images
                  additionalImages={product.additionalImages}
                  _id={product._id}
                  tags={product.tags}
                  averageRating={product.averageRating}
                />
              </div>
            ))}
        </Suspense>
      </section>

      <div className="flex w-full items-center justify-center">
        {loading && <Spiner />}
      </div>
    </div>
  );
};

export default AllProducts;
