import React, { useEffect } from "react";
import { Order } from "../../../../types";
interface OrderTabProps {
  data: Order | null;
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
}
const OrderTab: React.FC<OrderTabProps> = ({ data, setOpenModall }) => {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the modal is closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const totalPrice = data?.items?.reduce((acc, item) => {
    const price =
      item?.SelectedPlatform !== null
        ? Number(item?.SelectedPlatform?.price)
        : Number(item?.populatedData?.price);
    return acc + item.ItemQty * price;
  }, 0);

  return (
    <div
      onClick={() => setOpenModall(false)}
      className="bg-gray-700 bg-opacity-60 z-10 w-full h-full fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        className={`md:w-[50vw] w-[80vw] h-[70vh] overflow-y-auto rounded-2xl bg-white px-10`}
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between static top-0">
          <p className="flex items-center">لیست سفارش</p>
          <svg
            className="cursor-pointer m-4 "
            onClick={() => setOpenModall(false)}
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
        </div>
        <table className="min-w-full text-left text-sm font-light text-surface">
          <thead className="border-b border-neutral-200 font-medium">
            <tr>
              <th scope="col" className="px-6 py-4 text-start">
                نام محصول
              </th>
              <th scope="col" className="px-6 py-4 text-start">
                تعداد
              </th>
              <th scope="col" className="px-6 py-4 text-start">
                قیمت
              </th>
              <th scope="col" className="px-6 py-4 text-start">
                جمع سفارش
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item) => {
              const price =
                item?.SelectedPlatform !== null
                  ? item?.SelectedPlatform?.price
                  : item?.populatedData?.price;

              return (
                <tr
                  key={item._id}
                  className="border-b text-start border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-bold">
                    {item?.populatedData?.title}
                    {item?.SelectedPlatform !== null && (
                      <div className="flex items-center">
                        {item?.SelectedPlatform?.platform}{" "}
                        {item?.SelectedPlatform?.capacity}
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.ItemQty}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{price}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.ItemQty * Number(price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <p className=" font-semibold">جمع کل: {totalPrice} تومان</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTab;
