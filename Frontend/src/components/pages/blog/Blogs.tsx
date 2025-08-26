import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Spiner from "../../utils/Spiner";
import { Helmet } from "react-helmet";
import usePaginationBlogs from "../../hooks/usePaginationBlogs";
import BlogCrad from "../../utils/BlogCrad";
const Blogs = () => {
  const [sortOrder, setSortOrder] = useState("");
  const { category } = useParams();

  const [pageNumber, setpageNumber] = useState(1);
  const { Blogs, hasMore, loading } = usePaginationBlogs(pageNumber, sortOrder);
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

  return (
    <div className="md:container md:mx-auto mx-2">
      <Helmet>
        <title>blogs</title>
        <meta name="description" content="Browse our wide range of blogs." />
      </Helmet>
      {/* مرتب سازی */}
      {
        loading ? <Spiner /> :
      <div className="">
        <select
          id="sortOrder"
          title="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="newestFirst"> جدیدترین </option>
          <option value="newestLast"> قدیمی ترین </option>
        </select>
      </div>
      }
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
        {Blogs &&
          Blogs?.map((blog, index) =>
            Blogs.length === index + 1 ? (
              <div key={blog._id} ref={lastgame} className="">
                <BlogCrad key={blog._id} blog={blog} />
              </div>
            ) : (
              <div className="">
                <BlogCrad key={blog._id} blog={blog} />
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
export default Blogs;
