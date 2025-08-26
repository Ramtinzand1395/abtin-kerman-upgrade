import React, { useState } from "react";
import { GameData } from "../../../../../types";
interface EditeCapacityTabProps {
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}
const EditeCapacityTab: React.FC<EditeCapacityTabProps> = ({
  GameData,
  setGameData,
}) => {
  const [platform, setPlatform] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(false);
  // Handles the addition of a new entry to the info array
  const handleAddInfo = () => {
    const newInfo = {
      platform,
      capacity,
      price: Number(price), // Ensure price is a number
      qty: Number(quantity), // Ensure quantity is a number
      inStock,
    };

    // Update the GameData state by adding newInfo to the info array
    setGameData((prevData) => ({
      ...prevData,
      info: [...prevData.info, newInfo],
    }));
  };
  const handleRemoveInfo = (indexToRemove: number) => {
    setGameData((prevData) => ({
      ...prevData,
      info: prevData.info.filter((_, index) => index !== indexToRemove),
    }));
  };
  return (
    <div>
      <div className="flex items-center">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className=" py-2 rounded-lg border-primary border-2 ml-5"
          title="یک کزینه را انتخاب "
        >
          <option value=""> یک کزینه را انتخاب کنید</option>
          <option value="ps5">ps5</option>
          <option value="ps4">ps4</option>
        </select>

        <select
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="ml-5 py-2 rounded-lg border-primary border-2"
          title="یک کزینه را انتخاب "
        >
          <option value=""> یک کزینه را انتخاب کنید</option>
          <option value="ظرفیت یک">ظرفیت یک</option>
          <option value="ظرفیت دو">ظرفیت دو</option>
          <option value="ظرفیت سه">ظرفیت سه</option>
        </select>
        <input
          value={price}
          title="price"
          onChange={(e) => setPrice(Number(e.target.value))}
          name="price"
          className="ml-5 w-32  py-2 rounded-lg border-primary border-2 no-arrows"
          type="number"
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          name="quantity"
          className="ml-5 px-2 w-10 py-2 rounded-lg border-primary border-2 no-arrows"
          type="number"
          title="quantity"
        />
        <select
          value={inStock ? "true" : "false"}
          onChange={(e) => setInStock(e.target.value === "true")}
          className=" py-2 rounded-lg border-primary border-2 ml-5"
          title="وضعیت موجودی"
        >
          <option value=""> یک کزینه را انتخاب کنید</option>
          <option value={"true"}> موجود</option>
          <option value={"false"}> نا موجود </option>
        </select>
        <button
          onClick={handleAddInfo}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          افزودن
        </button>
      </div>
      <div className="my-5">
        {GameData.info.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-around border-2 py-2"
          >
            <p>{data.platform}</p>
            <p>{data.capacity}</p>
            <p>{data.price}</p>
            <p>{data.inStock ? "موجود" : "ناموجود"}</p>
            <p>{data.inStock ? "موجود" : "ناموجود"}</p>
            <p>{data.qty}</p>
            <button
              onClick={() => handleRemoveInfo(index)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditeCapacityTab;
