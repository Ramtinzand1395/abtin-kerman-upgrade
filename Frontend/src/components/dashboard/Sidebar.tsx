import React, { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar: React.FC = () => {
  const userJson = localStorage.getItem("User");
  const decodedToken =
    userJson &&
    (jwtDecode(userJson) as {
      email: string;
      role: string;
      userId: string;
    });
  const User = decodedToken ? decodedToken : null;
  const sidebarItems = [
    {
      id: 1,
      label: "خانه",
      icon: (
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
            fill="#fff"
          />
        </svg>
      ),
      helperTxt: "بازگشت به صفحه نخست",
      path: "/",
    },
    // ? ADMIN
    ...(User?.role === "superAdmin"
      ? [
          {
            id: 2,
            label: "مدیریت محصولات",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M48 0H0V48H48V0Z" fill="white" fillOpacity="0.01" />
                <path
                  d="M44 14L24 4L4 14V34L24 44L44 34V14Z"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 14L24 24"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 44V24"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 14L24 24"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34 9L14 19"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "مدیریت محصولات ",
            path: `/dashboard/product-management/${User?.userId}`,
          },
          {
            id: 3,
            label: "سفارشات",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="4" width="14" height="17" rx="2" stroke="#fff" />
                <path d="M9 9H15" stroke="#fff" strokeLinecap="round" />
                <path d="M9 13H15" stroke="#fff" strokeLinecap="round" />
                <path d="M9 17H13" stroke="#fff" strokeLinecap="round" />
              </svg>
            ),
            helperTxt: "سفارشات",
            path: `/dashboard/orders/${User?.userId}`,
          },
          {
            id: 4,
            label: "کاربران",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 6.5C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5C10.8284 9.5 11.5 8.82843 11.5 8C11.5 7.17157 10.8284 6.5 10 6.5ZM7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8Z"
                  fill="#fff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 6.5C15.4477 6.5 15 6.94772 15 7.5C15 8.05228 15.4477 8.5 16 8.5C16.5523 8.5 17 8.05228 17 7.5C17 6.94772 16.5523 6.5 16 6.5ZM13.5 7.5C13.5 6.11929 14.6193 5 16 5C17.3807 5 18.5 6.11929 18.5 7.5C18.5 8.88071 17.3807 10 16 10C14.6193 10 13.5 8.88071 13.5 7.5Z"
                  fill="#fff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.6939 12.6375C11.8834 12.2297 10.9679 12 10 12C6.68629 12 4 14.6863 4 18V20H16V18C16 17.6596 15.9716 17.3255 15.9169 17H20V14.75C20 12.6235 18.1515 11 16 11C14.6441 11 13.422 11.6366 12.6939 12.6375ZM13.9407 13.4754C14.5786 14.0315 15.0981 14.7205 15.4558 15.5H18.5V14.75C18.5 13.5628 17.4384 12.5 16 12.5C15.1288 12.5 14.3841 12.8975 13.9407 13.4754ZM10 13.5C7.51472 13.5 5.5 15.5147 5.5 18V18.5H14.5V18C14.5 17.4727 14.4096 16.9681 14.2441 16.4999C13.9244 15.5953 13.3224 14.8219 12.5431 14.2869C11.8199 13.7905 10.945 13.5 10 13.5Z"
                  fill="#fff"
                />
              </svg>
            ),
            helperTxt: "کاربران",
            path: `/user-manneger/${User?.userId}`,
          },
          {
            id: 5,
            label: "گالری عکس",
            icon: (
              <svg
                fill="#fff"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5531248,16.4450044 C17.6286997,16.179405 17.9052761,16.0253597 18.1708755,16.1009346 C18.4364749,16.1765095 18.5905202,16.4530859 18.5149453,16.7186853 C18.2719275,17.5727439 17.5931039,18.2421122 16.71594,18.4614032 L8.58845447,20.4931921 C7.21457067,20.8106614 5.86688485,19.9801117 5.55483435,18.6278929 L3.45442103,9.52610182 C3.14793844,8.19801056 3.96175966,6.86917188 5.28405996,6.53859681 L7.17308561,6.06634039 C7.44098306,5.99936603 7.71245031,6.16224638 7.77942467,6.43014383 C7.84639904,6.69804129 7.68351869,6.96950853 7.41562123,7.03648289 L5.52659559,7.50873931 C4.7332154,7.70708435 4.24492267,8.50438756 4.42881223,9.30124232 L6.52922555,18.4030334 C6.71644059,19.2142985 7.52497921,19.7125835 8.35461578,19.5209579 L16.4734044,17.4912607 C17.0000615,17.3595964 17.407086,16.9582414 17.5531248,16.4450044 Z M20,13.2928932 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L9.5,4 C8.67157288,4 8,4.67157288 8,5.5 L8,11.2928932 L10.1464466,9.14644661 C10.3417088,8.95118446 10.6582912,8.95118446 10.8535534,9.14644661 L14.5637089,12.8566022 L17.2226499,11.0839749 C17.4209612,10.9517673 17.6850212,10.9779144 17.8535534,11.1464466 L20,13.2928932 L20,13.2928932 Z M19.9874925,14.6945992 L17.4362911,12.1433978 L14.7773501,13.9160251 C14.5790388,14.0482327 14.3149788,14.0220856 14.1464466,13.8535534 L10.5,10.2071068 L8,12.7071068 L8,14.5 C8,15.3284271 8.67157288,16 9.5,16 L18.5,16 C19.2624802,16 19.8920849,15.4310925 19.9874925,14.6945992 L19.9874925,14.6945992 Z M9.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,14.5 C21,15.8807119 19.8807119,17 18.5,17 L9.5,17 C8.11928813,17 7,15.8807119 7,14.5 L7,5.5 C7,4.11928813 8.11928813,3 9.5,3 Z M16,5 L18,5 C18.5522847,5 19,5.44771525 19,6 L19,8 C19,8.55228475 18.5522847,9 18,9 L16,9 C15.4477153,9 15,8.55228475 15,8 L15,6 C15,5.44771525 15.4477153,5 16,5 Z M16,6 L16,8 L18,8 L18,6 L16,6 Z" />
              </svg>
            ),
            helperTxt: "گالری عکس",
            path: `/dashboard/gallery/${User?.userId}`,
          },
          {
            id: 7,
            label: "دسته بندی و تگ ها",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "دسته بندی و تگ ها",
            path: `/dashboard/tags/${User?.userId}`,
          },

          {
            id: 9,
            label: "مدیرین نظرات",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="-0.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>comments</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Icon-Set"
                    transform="translate(-257.000000, -255.000000)"
                    fill="#fff"
                  >
                    <path
                      d="M259,266.5 C259,261.254 263.753,257 270,257 C274.973,257 280,261.254 280,266.5 C280,271.747 276.075,276 270,276 C269.107,276 267.244,275.898 266.413,275.725 L263,278 L263,274.456 C260.561,272.477 259,269.834 259,266.5 L259,266.5 Z M266.637,277.736 C267.414,277.863 269.181,278 270,278 C277.18,278 282,272.657 282,266.375 C282,260.093 275.977,255 270,255 C262.811,255 257,260.093 257,266.375 C257,270.015 258.387,273.104 261,275.329 L261,281 L266.637,277.736 L266.637,277.736 Z M283.949,264.139 C283.968,264.425 284,264.709 284,265 C284,265.636 283.938,266.259 283.849,266.874 C285.195,268.45 286,270.392 286,272.5 C286,275.834 284.008,278.761 281,280.456 L281,284 L277.587,281.725 C276.756,281.898 275.893,282 275,282 C272.41,282 271.034,281.222 269.154,279.929 C268.609,279.973 268.059,280 267.5,280 C267.102,280 266.712,279.972 266.32,279.949 C268.701,282.276 271.149,283.75 275,283.75 C275.819,283.75 276.618,283.676 277.395,283.549 L283,287 L283,281.329 C286.04,279.246 288,276.015 288,272.375 C288,269.131 286.439,266.211 283.949,264.139 L283.949,264.139 Z M275.5,268 C276.329,268 277,267.329 277,266.5 C277,265.672 276.329,265 275.5,265 C274.671,265 274,265.672 274,266.5 C274,267.329 274.671,268 275.5,268 L275.5,268 Z M263.5,268 C264.329,268 265,267.329 265,266.5 C265,265.672 264.329,265 263.5,265 C262.671,265 262,265.672 262,266.5 C262,267.329 262.671,268 263.5,268 L263.5,268 Z M269.5,268 C270.329,268 271,267.329 271,266.5 C271,265.672 270.329,265 269.5,265 C268.671,265 268,265.672 268,266.5 C268,267.329 268.671,268 269.5,268 L269.5,268 Z"
                      id="comments"
                    ></path>
                  </g>
                </g>
              </svg>
            ),
            helperTxt: "مدیرین نظرات",
            path: `/dashboard/comment-manegment/${User?.userId}`,
          },
          {
            id: 10,
            label: "مقالات",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="#fff"
                  d="M22 7.662l1-1V18h-7v4.745L11.255 18H1V2h16.763l-1 1H2v14h9.668L15 20.331V17h7zm1.657-5.192a.965.965 0 0 1 .03 1.385l-9.325 9.324-4.097 1.755a.371.371 0 0 1-.487-.487l1.755-4.097 9.31-9.309a.98.98 0 0 1 1.385 0zm-10.1 9.965l-1.28-1.28-.961 2.24zm7.243-7.11l-1.414-1.413-6.469 6.47 1.414 1.413zm1.865-2.445l-.804-.838a.42.42 0 0 0-.6-.006l-1.168 1.168 1.414 1.415 1.152-1.152a.42.42 0 0 0 .006-.587z"
                />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            ),
            helperTxt: "مقالات",
            path: `/dashboard/weblog/${User?.userId}`,
          },
          {
            id: 11,
            label: "ثبت سفارش بازی",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "ثبت سفارش بازی",
            path: `/dashboard/${User?.userId}`,
          },
        ]
      : User?.role === "user"
      ? [
          {
            id: 2,
            label: "اطلاعات حساب",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 21H4C4 17.134 7.13401 14 11 14C11.1681 14 11.3348 14.0059 11.5 14.0176M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "اطلاعات حساب",
            path: `/dashboard/userInfo/${User?.userId}`,
          },
          {
            id: 3,
            label: "ویرایش اطلاعات حساب",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "ویرایش اطلاعات حساب",
            path: `/dashboard/editeUserInfo/${User?.userId}`,
          },
          {
            id: 4,
            label: " سفارشات ",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <path
                  d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <path
                  d="M11 10.8L12.1429 12L15 9"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ),
            helperTxt: " سفارشات ",
            path: `/dashboard/userOrders/${User?.userId}`,
          },
          {
            id: 5,
            label: " لیست علاقه مندی ها ",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: " لیست علاقه مندی ها ",
            path: `/dashboard/userfavorites/${User?.userId}`,
          },
        ]
      : [
          {
            id: 11,
            label: "ثبت سفارش بازی",
            icon: (
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            helperTxt: "ثبت سفارش بازی",
            path: `/dashboard/${User?.userId}`,
          },
        ]),
  ];

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div
      className={`h-full min-h-screen bg-primary flex flex-col   transition-all pr-2 ease-in-out sticky top-0  duration-200 ${
        openSidebar ? "w-56 " : "w-16  items-center"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`cursor-pointer mb-2 toggle ${
            openSidebar ? "active" : ""
          }`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`${
            openSidebar ? "visible" : "hidden"
          } cursor-pointer mt-2 mr-2`}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 -0.5 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>

      <NavLink to={`/dashboard/userInfo/${User?.userId}`}>
        <div
          className={`flex items-center justify-center  flex-col md:flex-row md:justify-start my-2  pb-2 ${
            openSidebar ? "border-b-2 " : "border-b-0 "
          } `}
        >
          <svg
            className="w-8 h-8 mx-2"
            clipRule="evenodd"
            fill="#fff"
            fillRule="evenodd"
            imageRendering="optimizeQuality"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            id="fi_5653974"
          >
            <g id="Layer_x0020_1">
              <path
                d="m50 24.34c9.75 0 17.66 7.91 17.66 17.66 0 1.82-.27 3.57-.78 5.22 8.81 5.71 14.2 15.5 14.2 26.09 0 3.09-4.69 3.09-4.69 0 0-8.79-4.33-16.9-11.5-21.8-3.14 4.9-8.64 8.16-14.89 8.16s-11.75-3.26-14.89-8.16c-7.17 4.9-11.5 13.01-11.5 21.8 0 3.09-4.69 3.09-4.69 0 0-10.59 5.39-20.38 14.2-26.09-.51-1.65-.78-3.4-.78-5.22 0-9.75 7.91-17.66 17.66-17.66zm0-22.28c26.47 0 47.94 21.47 47.94 47.94s-21.47 47.94-47.94 47.94-47.94-21.47-47.94-47.94 21.47-47.94 47.94-47.94zm0 4.69c-23.88 0-43.25 19.37-43.25 43.25s19.37 43.25 43.25 43.25 43.25-19.37 43.25-43.25-19.37-43.25-43.25-43.25zm0 22.28c-7.16 0-12.97 5.81-12.97 12.97 0 7.17 5.81 12.97 12.97 12.97s12.97-5.8 12.97-12.97c0-7.16-5.81-12.97-12.97-12.97z"
                fillRule="nonzero"
              ></path>
            </g>
          </svg>
          {/* )} */}
          <div
            className={`${
              openSidebar ? "block" : "hidden"
            } flex flex-col text-white`}
          >
            <span className=" text-white">admin</span>
          </div>
        </div>
      </NavLink>

      {sidebarItems?.map((item) =>
        openSidebar ? (
          <button
            key={item.id}
            className={`my-2 p-2  flex text-sm transition-all text-white hover:bg-blue-500  ease-in-out duration-200 hover:font-bold  rounded-l-full  ${
              location.pathname === item.path
                ? "font-bold bg-blue-500"
                : "font-normal  "
            } `}
          >
            <NavLink className={`flex items-center `} to={item.path}>
              <div
                className={`hover:text-black ${
                  location.pathname === item.path
                    ? "text-blue-500"
                    : "text-white"
                }`}
              >
                {item.icon}
              </div>
              <p className="mr-2 font-tanha ">{item.label}</p>
              <div
                className={`bg-black w-auto rigth-5 rounded-lg py-1 px-3 absolute z-10 helper`}
              >
                <span className="text-xs text-white bg-secondery whitespace-nowrap">
                  {item.helperTxt}
                </span>
              </div>
            </NavLink>
          </button>
        ) : (
          <NavLink
            className={`icon  w-full  rounded-r-full my-2 flex items-center justify-center p-2 ${
              location.pathname === item.path
                ? "font-bold bg-blue-500"
                : "font-normal  text-white"
            } `}
            key={item.id}
            to={item.path}
          >
            <div>{item.icon}</div>
            <div
              className={`text-white bg-secondery text-bl right-5 rounded-lg py-1 px-3 absolute z-10 helper`}
            >
              <span className="text-xs ">{item.helperTxt}</span>
            </div>
          </NavLink>
        )
      )}
    </div>
  );
};

export default Sidebar;
