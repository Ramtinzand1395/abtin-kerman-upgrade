import React from "react";
import LoginBtn from "../utils/LoginBtn";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginService } from "../../services/ApiServices";
import { toast } from "react-toastify";

interface LoginModallProps {
  setOpenModall: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
const LoginModall: React.FC<LoginModallProps> = ({
  setOpenModall,
  setUser,
}) => {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const CheckUser = async (credential: string) => {
    try {
      const decodedToken = jwtDecode(credential) as {
        email: string;
        picture: string;
      };
      const { data, status } = await LoginService({
        email: decodedToken.email,
        profile: decodedToken.picture,
      });
      if (status === 201 || status === 200) {
        toast.success(data.message);
      }
      localStorage.setItem("User", data.token);
      setUser(data.token);
    } catch (err) {
      console.log(err);
    }finally{
      setOpenModall(false)
    }
  };
  return (
    <>
      <div
        onClick={() => setOpenModall(false)}
        className="bg-gray-700 bg-opacity-60 z-20 w-full h-full fixed top-0 left-0 flex items-center justify-center"
      >
        <div
          className={` p-10 rounded-t-2xl bg-primary `}
          onClick={handleModalClick}
        >
         
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
              fill="#fff"
            />
          </svg>
          <div className="flex items-center justify-center flex-col ">
            <p className="text-white text-base text-center md:text-xl">
              برای ورود/ثبت نام شماره موبایل خود را وارد نمایید :
            </p>
            <div className=" flex items-center">
              <LoginBtn  />
              <input
                type="number"
                className="my-5 mr-5 rounded-lg px-10 py-3 no-arrows"
                placeholder="09131432045"
                title="login"
              />
            </div>
            <div className="">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credential = credentialResponse.credential;
                  if (credential) {
                    CheckUser(credential);
                  } else {
                    console.log("Credential is undefined");
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModall;
