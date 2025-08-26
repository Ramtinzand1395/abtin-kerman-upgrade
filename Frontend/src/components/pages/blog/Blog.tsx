import React, { useEffect, useState } from "react";
import { Weblog } from "../../../types";
import { getBlogService } from "../../../services/ApiServices";
import { useParams } from "react-router-dom";
import Spiner from "../../utils/Spiner";

const Blog: React.FC = () => {
  const { blogId } = useParams();
  const [Blog, setBlog] = useState<Weblog | null>(null);
  const [LoadingBlog, setLoadingBlog] = useState(false);
  useEffect(() => {
    setLoadingBlog(true);
    const getBlog = async () => {
      try {
        const { data } = await getBlogService(blogId);
        setBlog(data.blog);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBlog(false);
      }
    };
    getBlog();
  }, []);
  if (LoadingBlog) return <Spiner />;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: Blog?.body || "",
      }}
      className="p-5 rounded-xl bg-white"
    ></div>
  );
};

export default Blog;
