import React, { useEffect, useState } from "react";
import {  ImageType, Weblog } from "../../../types";
import { GetImageService } from "../../../services/ApiServices";
interface EditorImageModallrops {
  WeblogData: Weblog;
  setWeblogData: React.Dispatch<React.SetStateAction<Weblog>>;
  setOpenAddImageModall: (open: boolean) => void;
}
const EditorImageModall: React.FC<EditorImageModallrops> = ({
  WeblogData,
  setWeblogData,
  setOpenAddImageModall,
}) => {
  const [Images, setImages] = useState<ImageType[]>([]);
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Stop event propagation to prevent closing the modal when clicked inside
    event.stopPropagation();
  };
  useEffect(() => {
    const getImage = async () => {
      try {
        const { data } = await GetImageService();
        setImages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
    // Prevent body scroll when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the modal is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const togglePrimaryImage = (image: ImageType) => {
    if (WeblogData.primaryImage?._id === image._id) {
      // If the selected image is already the primary, deselect it
      setWeblogData((prev) => ({
        ...prev,
        primaryImage: null,
      }));
    } else {
      // Set selected image as primary image
      setWeblogData((prev) => ({
        ...prev,
        primaryImage: image,
      }));
    }
  };
  return (
    <div
      onClick={() => setOpenAddImageModall(false)}
      className="fixed z-10 w-full bg-gray-700 top-0 left-0 flex items-center justify-center bg-opacity-30 min-h-screen  overflow-y-auto"
    >
      <div
        onClick={handleModalClick}
        className="bg-white my-10 rounded-lg p-4 max-h-[80vh] overflow-y-auto"
      >
        <button onClick={() => setOpenAddImageModall(false)} className="">
          {""}
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
              fill="#292D32"
            />
          </svg>
        </button>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {Images.map((image) => (
            <div key={image.imageName} className="relative">
              <img
                onClick={() => togglePrimaryImage(image)}
                className={`w-full h-[20vh] rounded-lg cursor-pointer p-1 ${
                  WeblogData.primaryImage?._id === image._id
                    ? " text-red-700 "
                    : "text-gray-500"
                }`}
                // src={`http://localhost:5000/${image.direction}`}
                //! change
                src={`${image.direction}`}
                alt={image.imageName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EditorImageModall;
