import React from "react";
import { Link } from "react-router-dom";
import { Weblog } from "../../types";
interface BlogCradProps {
  blog: Weblog;
}
const BlogCrad: React.FC<BlogCradProps> = ({ blog }) => {
  const { _id, primaryImage, title, createdAt, body } = blog;
  return (
    <div className="flex flex-col rounded-t-lg shadowhand  justify-between ">
      <img
        // src={`http://localhost:5000/${primaryImage?.direction}`}
        //! change
        src={`${primaryImage?.direction}`}
        className="w-full h-[50vh] mb-5 rounded-t-lg primaryImage"
        alt="Primary Image"
      />

      <div className="  text-primary px-2">
        <h4 className="font-bold font-tanha mb-5">{title}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: body || "",
          }}
          className="line-clamp-3 my-5"
        ></div>
        <span className="mt-2">ساخته شده در :{createdAt}</span>
        <Link to={`/blog/${_id}`}>
          <button
            className="my-2 bottom-0 group group-hover:before:duration-500 
          group-hover:after:duration-1000 after:duration-500 hover:border-sky-300 
           duration-500 before:duration-500 hover:duration-500  
             hover:after:-left-2 hover:before:top-8 hover:before:left-16 hover:after:scale-150 
             hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 
             hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 
             relative bg-sky-800 h-12 w-full border text-start p-3 text-gray-50 text-base font-bold rounded-lg  
             overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:left-1 before:top-1
              before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 
              after:h-20 after:content['']  after:bg-cyan-600 after:left-8 after:top-3 after:rounded-full after:blur"
          >
            مطالعه بیشتر
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCrad;
