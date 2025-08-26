import React, { useState } from "react";
import { GameData } from "../../../../../types";
import BtnTow from "../../../../utils/BtnTow";
interface AddGameTitleTabProps {
  GameData: GameData;
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}
const AddGameTitleTab: React.FC<AddGameTitleTabProps> = ({
  GameData,
  setGameData,
}) => {
  const [platform, setPlatform] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(false);
  const handleAddInfo = () => {
    const newInfo = {
      platform,
      capacity,
      price: Number(price),
      qty: Number(quantity),
      inStock,
    };
    setGameData((prevData) => ({
      ...prevData,
      info: [...prevData.info, newInfo],
    }));
    setPlatform("");
    setCapacity("");
    setPrice(0);
    setQuantity(0);
    setInStock(false);
  };
  // * REMOVE
  const handleRemove = (indexToRemove: number) => {
    setGameData((prevData) => ({
      ...prevData,
      info: prevData.info.filter((_, index) => index !== indexToRemove),
    }));
  };
  return (
    <>
      <div className="">
        <label className="font-bold text-2xl flex items-center my-5">
          اسم بازی
        </label>
        <input
          onChange={(e) =>
            setGameData((prev) => ({ ...prev, title: e.target.value }))
          }
          name="title"
          value={GameData.title}
          className="px-5 py-1 rounded-lg border-primary border-2 ml-5"
          title="title"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <div className="">
          <label className="font-bold  flex items-center my-3">
            انتخاب پلتفرم
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-5 py-2 rounded-lg border-primary border-2"
            title="یک کزینه را انتخاب "
          >
            <option value=""> یک کزینه را انتخاب کنید</option>
            <option value="ps5">ps5</option>
            <option value="ps4">ps4</option>
          </select>
        </div>
        <div className="">
          <label className="font-bold  flex items-center my-3">
            انتخاب ظرفیت
          </label>

          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="px-5 py-2 rounded-lg border-primary border-2"
            title="یک کزینه را انتخاب "
          >
            <option value=""> یک کزینه را انتخاب کنید</option>
            <option value="ظرفیت یک">ظرفیت یک</option>
            <option value="ظرفیت دو">ظرفیت دو</option>
            <option value="ظرفیت سه">ظرفیت سه</option>
          </select>
        </div>
        <div className="">
          <label className="font-bold  flex items-center my-3">
            انتخاب قیمت
          </label>

          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            name="price"
            className="px-5 py-2 rounded-lg border-primary border-2 no-arrows"
            type="number"
            title="price"
          />
        </div>

        <div className="">
          <label className="font-bold  flex items-center my-3">تعداد</label>

          <input
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            name="quantity"
            className="px-5 py-2 rounded-lg border-primary border-2 no-arrows"
            type="number"
            title="quantity"
          />
        </div>
        <div className="flex items-center ">
          <div className="">
            <label className="font-bold  flex items-center my-3">
              موجود در انبار
            </label>
            <div className="flex items-center">
              <select
                value={inStock ? "true" : "false"}
                onChange={(e) => setInStock(e.target.value === "true")} // Convert the string to a boolean
                className="px-5 py-2 rounded-lg border-primary border-2 ml-5"
                title="وضعیت موجودی"
              >
                <option value=""> یک کزینه را انتخاب کنید</option>
                <option value="true"> موجود</option>
                <option value="false"> نا موجود </option>
              </select>

              <BtnTow
                ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 "
                ButtonText=  {<svg
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
              </svg>}
                onClick={handleAddInfo}
              />
            </div>
          </div>
        </div>
      </div>
      {GameData.info.length > 0 && (
        <div className="">
          <table className="min-w-full  text-sm font-light text-surface my-10">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className="px-6 py-4 text-start">
                  پلتفورم
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  ظرفیت
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  قیمت
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  تعداد
                </th>
                <th scope="col" className="px-6 py-4 text-start">
                  تعداد در انبار
                </th>
              </tr>
            </thead>
            <tbody>
              {GameData.info &&
                GameData.info.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 text-start "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {data.platform}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {data.capacity}
                    </td>{" "}
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {data.price}
                    </td>{" "}
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {data.qty}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {data.inStock ? "موجود" : "ناموجود"}
                    </td>{" "}
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-end">
                      <BtnTow
                        ButtonColor="bg-red-500 hover:from-red-500 hover:to-red-400 hover:ring-red-400 "
                        ButtonText={  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M20.5 6H3.49988" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M9.5 11L10 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M14.5 11L14 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>}
                        onClick={() => handleRemove(index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddGameTitleTab;
