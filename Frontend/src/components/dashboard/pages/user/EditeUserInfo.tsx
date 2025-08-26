import React, { useEffect, useState } from "react";
import {
  getUserInfoService,
  updateUserInfoService,
} from "../../../../services/ApiServices";
import { useParams } from "react-router-dom";
import { User } from "../../../../types";
import BtnTow from "../../../utils/BtnTow";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const EditUserInfo = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isAdmin: "",
    profile: "",
    address: {
      address: "",
      plaque: "",
      unit: "",
      postalCode: "",
      city: "",
      provider: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        if (userId) {
          const { data } = await getUserInfoService(userId);
          setUser({
            ...data.user,
            address: {
              address: data.user.address?.address || "",
              plaque: data.user.address?.plaque || "",
              unit: data.user.address?.unit || "",
              postalCode: data.user.address?.postalCode || "",
              city: data.user.address?.city || "",
              provider: data.user.address?.provider || "",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  const handleEditeUser = async () => {
    try {
      if (userId) {
        const { data } = await updateUserInfoService({
          userInfo: user,
          userId,
        });
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Failed to update user info.");
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name.includes("address.") ? "address" : name]: name.includes("address.")
        ? { ...prev.address, [name.split(".")[1]]: value }
        : value,
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-10 p-4 bg-gray-100 shadow-lg rounded-lg">
         <Helmet>
      <title> Edite Info</title>
      <meta name="description" content="Edite user Information" />
      </Helmet>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        ویرایش اطلاعات کاربری
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          title="First Name"
          value={user.firstName || ""}
          onChange={handleChange}
          name="firstName"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="نام"
        />
        <input
          title="Last Name"
          value={user.lastName || ""}
          onChange={handleChange}
          name="lastName"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="نام خانوادگی"
        />
        <textarea
          title="Address"
          value={user.address?.address || ""}
          onChange={handleChange}
          name="address.address"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none resize-none md:col-span-2"
          placeholder="آدرس"
          rows={2}
        />
        <input
          title="City"
          value={user.address?.city || ""}
          onChange={handleChange}
          name="address.city"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="شهر"
        />
        <input
          title="Plaque"
          value={user.address?.plaque || ""}
          onChange={handleChange}
          name="address.plaque"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="پلاک"
        />
        <input
          title="Postal Code"
          value={user.address?.postalCode || ""}
          onChange={handleChange}
          name="address.postalCode"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="کد پستی"
        />
        <input
          title="Provider"
          value={user.address?.provider || ""}
          onChange={handleChange}
          name="address.provider"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="استان"
        />
        <input
          title="Unit"
          value={user.address?.unit || ""}
          onChange={handleChange}
          name="address.unit"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type="text"
          placeholder="واحد"
        />
        <input
          title="Phone"
          value={user.phone || ""}
          onChange={handleChange}
          name="phone"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none no-arrows"
          type="number"
          placeholder="شماره تماس"
        />
      </div>
      <div className="flex justify-end mt-6">
        <BtnTow
          ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400"
          ButtonText={"اعمال تغییرات"}
          onClick={handleEditeUser}
        />
      </div>
    </div>
  );
};

export default EditUserInfo;
