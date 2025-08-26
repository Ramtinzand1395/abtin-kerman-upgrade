import React, { useEffect, useState } from "react";
// *
interface AddImageModallProps {
  Product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  setOpenAddImageModall: (open: boolean) => void;
}
import { Product, ImageType } from "../../types";
// *
import { GetImageService } from "../../services/ApiServices";

const AddImageModallProduct: React.FC<AddImageModallProps> = ({
  setOpenAddImageModall,
  setProduct,
  Product,
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
    if (Product.primaryImage?._id === image._id) {
      // If the selected image is already the primary, deselect it
      setProduct((prev) => ({
        ...prev,
        primaryImage: null,
      }));
    } else {
      // Set selected image as primary image
      setProduct((prev) => ({
        ...prev,
        primaryImage: image,
      }));
    }
  };

  const toggleAdditionalImage = (image: ImageType) => {
    setProduct((prev) => {
      // Ensure additionalImages is always an array
      const currentAdditionalImages = prev.additionalImages || [];

      const isSelected = currentAdditionalImages.some(
        (img) => img._id === image._id
      );

      const updatedImages = isSelected
        ? currentAdditionalImages.filter((img) => img._id !== image._id) // Deselect if already selected
        : [...currentAdditionalImages, image]; // Select if not already selected

      // Return updated state
      return { ...prev, additionalImages: updatedImages };
    });
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
          {Images?.map((image) => (
            <div key={image.imageName} className="relative">
              <img
                onClick={() => toggleAdditionalImage(image)}
                className={`w-full h-[20vh] rounded-lg cursor-pointer p-1 ${
                  Product?.additionalImages?.some(
                    (img) => img._id === image._id
                  )
                    ? "border-4 border-primary"
                    : ""
                }`}
                //! change
                src={`${image.direction}`}
                // src={`http://localhost:5000/${image.direction}`}
                alt={image.imageName}
              />
              <button
                type="button"
                title="add Primary"
                onClick={() => togglePrimaryImage(image)}
                className={`absolute top-1 right-1  rounded-full `}
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M15 5.28571L16.8 7L21 3"
                    stroke={
                      Product?.primaryImage?._id === image._id
                        ? "#137E00"
                        : "#555555"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddImageModallProduct;
