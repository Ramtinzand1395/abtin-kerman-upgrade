import { useEffect, useState } from "react";
import { getBlogsService } from "../../services/ApiServices";
import { Weblog } from "../../types";

export default function usePaginationBlogs(
  pageNumber: number,
  sortOrder: string
) {
  const [Blogs, setBlogs] = useState<Weblog[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFiltredAccountGames = async () => {
      try {
        const { data } = await getBlogsService(
          pageNumber,
          sortOrder
        );
        if (pageNumber === 1) {
          setBlogs(data.data);
        } else {
          setBlogs((prev) => [...prev, ...data.data]);
        }
        if (data.data.length < 4) {
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
  }, [ pageNumber, sortOrder]);
  return { loading, Blogs, hasMore };
}
