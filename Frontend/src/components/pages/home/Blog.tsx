import React, { useEffect, useState } from "react";
import LeftAnimation from "../../utils/LeftAnimation";
import Animations from "../../utils/Animations";
import BlogCrad from "../../utils/BlogCrad";
import { getBlogsService } from "../../../services/ApiServices";
import BtnTow from "../../utils/BtnTow";
import { Weblog } from "../../../types";
import { useNavigate } from "react-router-dom";
const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState<Weblog[] | null>(null);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await getBlogsService(1, "newestFirst");
        setBlogs(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogs();
  }, []);
  const navigateBlogs = () => {
    navigate("/blogs");
  };
  return (
    <div>
      <Animations>
        <div className="flex items-center mt-10 mb-2">
          <h2 className="font-bold text-lg lg:text-2xl whitespace-nowrap ml-5">
            مقالات
          </h2>{" "}
          <div className="w-full h-[8px] rounded-3xl bg-primary"></div>{" "}
        </div>
      </Animations>
      <LeftAnimation>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10 ">
          {Blogs &&
            Blogs?.map((blog) => <BlogCrad key={blog._id} blog={blog} />)}
        </div>
      </LeftAnimation>
      <BtnTow
        ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400"
        ButtonText={" همه مقالات"}
        onClick={navigateBlogs}
      />
    </div>
  );
};

export default Blog;
