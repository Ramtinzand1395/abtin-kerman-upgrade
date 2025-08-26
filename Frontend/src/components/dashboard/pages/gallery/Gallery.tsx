import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  GetImageService,
  UploadImageService,
} from "../../../../services/ApiServices";
import { ImageType } from "../../../../types";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from "react-image-crop";
import axios from "axios";

const Gallery: React.FC = () => {
  const [CropedImage, setCropedImage] = useState<File | null>(null);
  const [Images, setImages] = useState<ImageType[] | null>(null);
  const [LoadinImage, setLoadinImage] = useState(false);
  const [ImgSrc, setImgSrc] = useState("");
  const [errors, setErrors] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const aspecthand = 1;
  const MinWidth = 300;
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null); // To store the original file

  const handleAddToGallery = async () => {
    if (!CropedImage) {
      toast.error("No image selected. Please choose an image to upload.");
      return;
    }
    
    setLoadinImage(true);
    
    try {
      const formData = new FormData();
      formData.append("image", CropedImage);
      const { data, status } = await UploadImageService(formData);
      
      if (status === 201) {
        toast.success(data.message);
      } else if (status === 400) {
        // Handle client-side validation errors
        toast.error(data.error);
      } else {
        // Handle unexpected server errors
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (err) {
      // Type guard to check if err is an AxiosError
      if (axios.isAxiosError(err)) {
        // The request was made and the server responded with a status code
        const errorMessage = err.response?.data?.error || "An unexpected error occurred.";
        toast.error(errorMessage);
      } else if (err instanceof Error) {
        // If it's a generic Error instance (not an AxiosError)
        toast.error("Error uploading image: " + err.message);
      } else {
        // Handle unexpected error types
        toast.error("An unknown error occurred.");
      }
    }finally {
      setLoadinImage(false);
    }
  };
  

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] ?? null;
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
      setErrors("");
      setOriginalFile(file); // Store the original file for name and type
    });
    reader.readAsDataURL(file);
  };

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      { unit: "px", width: 500 },
      aspecthand,
      width,
      height
    );
    setCrop(centerCrop(crop, width, height));
  };

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const generateCroppedImage = () => {
    if (
      !completedCrop ||
      !imgRef.current ||
      !previewCanvasRef.current ||
      !originalFile
    )
      return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      // Create the cropped image using the original file's name and type
      canvas.toBlob((blob) => {
        if (blob) {
          const fileName = originalFile.name; // Use original file's name
          const fileType = originalFile.type; // Use original file's type
          setCropedImage(new File([blob], fileName, { type: fileType }));
        }
      }, originalFile.type); // Use original file's type
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await GetImageService();
        setImages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, [LoadinImage]);

  return (
    <div className="w-full md:container md:mx-auto mx-2 my-10">
      <h2>اضافه کردن عکس جدید</h2>
      <input type="file" name="image" title="image" onChange={onSelectFile} />
      <button className="border-2" onClick={handleAddToGallery}>
        Add To Gallery
      </button>
      <div className="grid grid-cols-5 gap-5">
        {Images?.map((url) => (
          <img key={url._id} src={`${url.direction}`} alt="" />
        ))}
      </div>
      {errors && <p>{errors}</p>}
      {ImgSrc && (
        <>
          <ReactCrop
            crop={crop}
            minWidth={MinWidth}
            aspect={aspecthand}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
          >
            <img src={ImgSrc} alt="upload" onLoad={onImgLoad} ref={imgRef} />
          </ReactCrop>
          <button onClick={generateCroppedImage}>Crop Image</button>
          <canvas ref={previewCanvasRef} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
};

export default Gallery;
