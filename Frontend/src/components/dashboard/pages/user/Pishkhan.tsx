import React, { useEffect, useState } from "react";
import { getUserInfoService } from "../../../../services/ApiServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../../../types";
import BtnTow from "../../../utils/BtnTow";
import { Helmet } from "react-helmet";
import { googleLogout } from "@react-oauth/google";

const Pishkhan: React.FC = () => {
  const { userId } = useParams();
  const [User, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (userId) {
          const { data } = await getUserInfoService(userId);
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);
  const IconData = [
    {
      id: 1,
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="9" r="3" stroke="#1C274C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
          <path
            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      text1: "پشتیبانی فنی",
      text2: "تماس با ما",
    },
    {
      id: 2,
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="9" r="3" stroke="#1C274C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
          <path
            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      text1: "پشتیبانی فنی",
      text2: "تماس با ما",
    },
    {
      id: 3,
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="9" r="3" stroke="#1C274C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
          <path
            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      text1: "پشتیبانی فنی",
      text2: "تماس با ما",
    },
    {
      id: 4,
      icon: (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="9" r="3" stroke="#1C274C" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
          <path
            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      text1: "پشتیبانی فنی",
      text2: "تماس با ما",
    },
  ];
  const navigate = useNavigate();
  const handleLogOut = () => {
    googleLogout();
    localStorage.removeItem("User");
    localStorage.removeItem("shopping-card");
    setUser(null);
    navigate("/", { replace: true });
  };
  return (
    <div className="w-full md:container md:mx-auto mx-2 my-10">
      <Helmet>
        <title>User Dashboard</title>
        <meta name="description" content="user Main Info" />
      </Helmet>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 ">
        <div className="col-span-2 shadowhand p-5 rounded-b-3xl">
          {/* TOP */}
          <div className="flex items-center">
            <img
              className="rounded-full w-20 h-20"
              src={User?.profile}
              alt=""
            />
            <div className="flex flex-col mr-5">
              <p>{User?.email}</p>
              <p>{User?.firstName}</p>
            </div>
          </div>
          {/* BOTTOM*/}
          <div className="flex items-center justify-between mt-10 border-t-2 pt-5">
            {IconData.map((data) => (
              <div key={data.id} className="flex flex-col items-center">
                {data.icon}
                <p>{data.text1}</p>
                <p>{data.text2}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 shadowhand rounded-b-3xl p-5">
          <div className="flex items-center justify-between">
            <h5 className="font-tanha font-bold">ویرایش اطلاعات </h5>
            <Link to={`/dashboard/editeUserInfo/${userId}`}>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 21H4C4 17.134 7.13401 14 11 14C11.1681 14 11.3348 14.0059 11.5 14.0176M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="">
            <ul>
              <li className="border-b-2 py-3">ایمیل:{User?.email}</li>
              <li className="border-b-2 py-3">نام:{User?.firstName}</li>
              <li className=" py-3">نام خانوادگی:{User?.lastName}</li>
              <li>
                <BtnTow
                  ButtonColor="bg-blue-500 hover:from-blue-500 hover:to-blue-400 hover:ring-blue-400"
                  ButtonText={"خروج از حساب"}
                  onClick={() => handleLogOut()}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pishkhan;
