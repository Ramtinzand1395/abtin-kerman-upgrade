import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";
import { createBlogService } from "../../../services/ApiServices";
import { toast } from "react-toastify";
import { Weblog } from "../../../types";
import EditorImageModall from "./EditorImageModall";
import { Editor, EventInfo } from "ckeditor5";
const Ckeditor = () => {
  const [WeblogData, setWeblogData] = useState<Weblog>({
    title: "",
    body: "",
    primaryImage: null,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWeblogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCkeditorState = (
    e: EventInfo<string, unknown>,
    editor: Editor
  ) => {
    console.log(e);
    const data = editor.getData();
    setWeblogData((prev) => ({
      ...prev,
      body: data,
    }));
  };
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createBlogService(WeblogData);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  };
  // const [Blogs, setBlogs] = useState([]);
  // useEffect(() => {
  //   const getBlogs = async () => {
  //     try {
  //       const { data } = await getBlogsService();
  //       setBlogs(data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getBlogs();
  // }, []);
  const [OpenAddImageModall, setOpenAddImageModall] = useState(false);
  const removePrimaryImage = () => {
    setWeblogData((prev) => ({
      ...prev,
      primaryImage: null,
    }));
  };
  return (
    <div className="mx-5">
      <form onSubmit={handleAddBlog}>
        <input
          className="px-16 py-2 rounded-lg border-primary border-2 ml-5"
          type="text"
          title="title"
          name="title"
          value={WeblogData.title}
          onChange={handleChange}
        />
        <label className="font-bold text-2xl flex items-center my-5">
          اصلی انتخاب عکس
          <span
            onClick={() => setOpenAddImageModall(!OpenAddImageModall)}
            className="border-2 p-2 mx-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-150 ease-in-out delay-150 rounded-xl"
          >
             <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 6V18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </span>
        </label>
        {OpenAddImageModall && (
          <EditorImageModall
            setWeblogData={setWeblogData}
            WeblogData={WeblogData}
            setOpenAddImageModall={setOpenAddImageModall}
          />
        )}
        {WeblogData?.primaryImage?.direction && (
          <img
            onClick={() => removePrimaryImage()}
            className="w-[20vh] h-[20vh] rounded-lg"
            // src={`http://localhost:5000/${WeblogData?.primaryImage?.direction}`}
            //! change
            src={`${WeblogData?.primaryImage?.direction}`}
            alt={WeblogData?.primaryImage?.imageName}
          />
        )}
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {
            console.log("Editor 2 is ready to use!", editor);
          }}
          onError={(error) => {
            alert("Error uploading image: " + error);
            console.log(error);
          }}
          config={{
            ckfinder: {
              // uploadUrl: "http://localhost:5000/api/upload", // Your API endpoint for handling image uploads
              // uploadUrl: "https://abtin-kerman-backend-new.vercel.app/api/upload", // Your API endpoint for handling image uploads
              uploadUrl: "https://api.kermanatari.ir/api/upload", // Your API endpoint for handling image uploads
              options:{language:"fa" }
            },alignment: {
              options: ["left", "right", "center", "justify"],
            },
          }}
          onChange={handleCkeditorState}
        />
        <button type="submit">ساخت</button>
      </form>
    </div>
  );
};

export default Ckeditor;
