import axios, { AxiosResponse } from "axios";
import {
  CommentStrProps,
  Customer,
  customerOrder,
  GameData,
  newGameList,
  Product,
  User,
  Weblog,
} from "../types";
interface LoginData {
  email: string;
  profile: string;
}
interface LoginResponse {
  message: string;
  token: string;
  status: number;
}
// ?dsdd
// type SelectedPlatform = {
//   platform: string;
//   capacity: string;
//   price: number;
// };
// type data = {
//   title: string;
//   image: ImageType;
//   price: number;
//   features: Feature[];
//   tags: Tag[];
// };
// type cardItemType = {
//   id: string;
//   ItemQty: number;
//   SelectedPlatform: null | SelectedPlatform;
//   data: data;
// };

// type AddOrderData = {
//   CardItems: cardItemType[];
//   userId: string;
// };

type changeStatus = {
  orderId: string;
  statuss: string;
};
type UserInfoProps = {
  userInfo: User;
  userId: string;
};
const SERVER_URL = "http://localhost:5000/api";
// const SERVER_URL = "https://abtin-kerman-backend-new.vercel.app/api";
// const SERVER_URL = "https://api.kermanatari.ir/api";
// const SERVER_URL = "https://abtincrossapp.vercel.app/api";


const token = localStorage.getItem("User");

// @desc  create OR add User
// @route PUT http://localhost:5000/api/login
export const LoginService = ({
  email,
  profile,
}: LoginData): Promise<AxiosResponse<LoginResponse>> => {
  const url = `${SERVER_URL}/login`;
  return axios.post(url, { email, profile });
};

// @desc  create OR add User
// @route PUT http://localhost:5000/api/login
export const SmsService = () => {
  const url = `${SERVER_URL}/loginSms`;
  return axios.get(url);
};
// !UploadServices
// @desc  create OR add User
// @route PUT http://localhost:5000/api/login
export const UploadImageService = (formData: FormData) => {
  const url = `${SERVER_URL}/upload-image`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(url, formData, config);
};

// @desc  create OR add User
// @route PUT http://localhost:5000/api/login
export const GetImageService = () => {
  const url = `${SERVER_URL}/get-image`;
  return axios.get(url);
};
// ? GAME  Services
//* @desc  create game
//* @route POST http://localhost:5000/api/login
export const addGameService = (data: GameData) => {
  const url = `${SERVER_URL}/add-game`;

  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//* @desc  get game
//* @route GET http://localhost:5000/api/login
export const getGameService = (pageNumber: number, sortOrder: string) => {
  const url = `${SERVER_URL}/get-game?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};
//? @desc  get game
//? @route GET http://localhost:5000/api/login
export const getGameSingleService = (gameId: string) => {
  const url = `${SERVER_URL}/get-singleGame/${gameId}`;
  return axios.get(url);
};
//? @desc  update game
//? @route PUT http://localhost:5000/api/update-game
export const updateGameService = (data: GameData) => {
  const url = `${SERVER_URL}/update-game`;
  return axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
//? @desc  delete game
//? @route DELETE http://localhost:5000/api/update-game
export const deleteGameService = (id: string) => {
  const url = `${SERVER_URL}/delete-game`;
  return axios.delete(url, {
    data: { gameId: id },

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// !TAGS  Services
//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const addTagService = (data: string) => {
  const url = `${SERVER_URL}/add-tag`;
  return axios.post(
    url,
    { tagName: data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const getTagService = () => {
  const url = `${SERVER_URL}/get-tag`;
  return axios.get(url);
};
//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const delTagService = (id: string) => {
  const url = `${SERVER_URL}/del-tag`;
  return axios.delete(url, {
    data: { tagId: id },

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// !Categories  Services
//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const addCategoriesService = (data: string) => {
  const url = `${SERVER_URL}/add-Categories`;
  return axios.post(
    url,
    { categoryName: data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const getCategoriesService = () => {
  const url = `${SERVER_URL}/get-Categories`;
  return axios.get(url);
};
//? @desc  create OR add User
//? @route PUT http://localhost:5000/api/login
export const delCatService = (id: string) => {
  const url = `${SERVER_URL}/del-cat`;
  return axios.delete(url, {
    data: { catId: id },

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// ? PRODUCT  Services
//* @desc  create PRODUCT
//* @route POST http://localhost:5000/api/add-product
export const addProductService = (data: Product) => {
  const url = `${SERVER_URL}/add-product`;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

//* @desc  get products
//* @route GET http://localhost:5000/api/get-products
export const getProductsService = (pageNumber: number, sortOrder: string) => {
  const url = `${SERVER_URL}/get-products?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};
//* @desc  get product
//* @route GET http://localhost:5000/api/login
export const getProductService = (productId: string) => {
  const url = `${SERVER_URL}/get-product/${productId}`;
  return axios.get(url);
};
// //* @desc  update game
// //* @route PUT http://localhost:5000/api/update-game
export const updateProductService = (data: Product) => {
  const url = `${SERVER_URL}/update-product`;
  return axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// //? @desc  delete game
// //? @route DELETE http://localhost:5000/api/update-game
export const deleteProductService = (id: string) => {
  const url = `${SERVER_URL}/delete-product`;
  console.log(id);
  return axios.delete(url, {
    data: { productId: id },

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

//* @desc  add comment
//* @route post http://localhost:5000/api/update-game
export const addCommentService = (data: CommentStrProps) => {
  const url = `${SERVER_URL}/add-comment`;
  return axios.post(url, data);
};
//* @desc  delete game
//* @route DELETE http://localhost:5000/api/update-game
export const getCommentsService = () => {
  const url = `${SERVER_URL}/get-comments`;
  return axios.get(url);
};

//* @desc  delete comment
//* @route DELETE http://localhost:5000/api/delete-comment
export const deleteCommentService = (commentId: string) => {
  const url = `${SERVER_URL}/delete-comment/${commentId}`;
  return axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const confirmCommentService = (commentId: string) => {
  const url = `${SERVER_URL}/confirm-comment/${commentId}`;
  console.log(token, "tok");
  return axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};
// ?BLOG
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const createBlogService = (WeblogData: Weblog) => {
  const url = `${SERVER_URL}/create-blog`;
  return axios.post(url, WeblogData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getBlogsService = (pageNumber: number, sortOrder: string) => {
  const url = `${SERVER_URL}/get-blogs?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};
// *blog
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getBlogService = (blogId: string | undefined) => {
  const url = `${SERVER_URL}/get-blog/${blogId}`;
  return axios.get(url);
};
// sssssss
// ? FILTER PRODUCTS
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getFiltredProductsService = (
  slug1: string,
  slug2: string,
  pageNumber: number,
  sortOrder: string
) => {
  console.log(slug1, slug2, "category");
  const url = `${SERVER_URL}/get-filtred-products/${slug1}/${slug2}?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};
// !FILTRED GAMES
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getFiltredAccountGamesService = (
  category: string,
  pageNumber: number,
  sortOrder: string
) => {
  const url = `${SERVER_URL}/get-filtred-games/${category}?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};

// ? USERINFO
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const addUserInfoService = (data: UserInfoProps) => {
  const url = `${SERVER_URL}/add-user-info`;
  return axios.post(url, data);
};
// ?UPDATEuSER
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const updateUserInfoService = (data: UserInfoProps) => {
  const url = `${SERVER_URL}/update-user-info`;
  return axios.put(url, data);
};
// ? GET USER ORDERS
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getUserOrdersService = (
  userId: string,
  pageNumber: number,
  sortOrder: string
) => {
  const url = `${SERVER_URL}/get-user-orders/${userId}?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url);
};
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getUserInfoService = (userId: string) => {
  const url = `${SERVER_URL}/get-user-info/${userId}`;
  return axios.get(url);
};
// !ADD ORDER
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
// export const addOrderService = (data: { data: AddOrderData }) => {
//   const url = `${SERVER_URL}/add-order`;
//   return axios.post(url, data.data);
// };

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getOrdersService = (pageNumber: number, sortOrder: string) => {
  const url = `${SERVER_URL}/get-orders?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const changeStatusService = (data: changeStatus) => {
  const url = `${SERVER_URL}/change-status`;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// * Users
// ? GET USERS
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getUsersService = (pageNumber: number, sortOrder: string) => {
  const url = `${SERVER_URL}/get-users?pageNumber=${pageNumber}&sortOrder=${sortOrder}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
// ? SEARCH
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getSearchresService = (title: string) => {
  const url = `${SERVER_URL}/search-res`;
  return axios.post(url, { title });
};

// ? FAVORITES
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const addUserFavoritesService = (
  userId: string,
  itemId: string,
  itemType: string
) => {
  const url = `${SERVER_URL}/user-favorites`;
  return axios.post(url, { userId, itemId, itemType });
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getUserFavoritesService = (userId: string) => {
  const url = `${SERVER_URL}/get-user-favorites/${userId}`;
  return axios.get(url);
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getUserFavoriteService = (userId: string) => {
  const url = `${SERVER_URL}/get-user-favorite/${userId}`;
  return axios.get(url);
};

//* @desc  REMOVE FAVORITES
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const remUserFavoriteService = (userId: string, itemId: string) => {
  const url = `${SERVER_URL}/remove-user-favorite`;
  return axios.post(url, { userId, itemId });
};
// * zarin
//* @desc  REMOVE FAVORITES
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const zarinpalService = (
  amount: number,
  description: string,
  callbackUrl: string
) => {
  const url = `${SERVER_URL}/payment`;
  return axios.post(url, { amount, description, callbackUrl });
};
//? @desc  zarinCheck
//? @route POST http://localhost:5000/api/confirm-comment/:commentId
export const zarinpalCheckService = (
  authority: string,
  status: string,
  orderId: string
) => {
  const url = `${SERVER_URL}/payment-callback`;
  return axios.get(url, {
    params: { Authority: authority, Status: status, orderId },
  });
};
//? consoleData

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getAllCustomersOrders = (filter: string) => {
  const url = `${SERVER_URL}/order?filter=${filter}`;
  return axios.get(url);
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const addCustomerOrder = (
  Order: customerOrder,
  customerData: Customer
) => {
  const url = `${SERVER_URL}/order`;
  return axios.post(url, {
    Order,
    customer: customerData._id,
  });
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const addCustomer = (customerData: Customer) => {
  const url = `${SERVER_URL}/customer`;
  return axios.post(url, customerData);
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const searchCustomer = (mobile: string) => {
  const url = `${SERVER_URL}/customer?mobile=${mobile}`;
  return axios.get(url);
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getCustomersOrders = (orderId: string | null) => {
  const url = `${SERVER_URL}/order/${orderId}`;
  return axios.get(url);
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const changeOrderStatus = (
  orderId: string | null,
  newStatus: string
) => {
  const url = `${SERVER_URL}/order/changestatus/${orderId}`;
  return axios.put(url, {
    status: newStatus,
  });
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const updateCustomerInfo = (
  userId: string,
  customer: Customer,
  orderId: string | null
) => {
  const url = `${SERVER_URL}/customer/${userId}`;
  return axios.put(url, { customer, orderId });
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const updateOrderInfo = (orderId: string, userOrder: customerOrder) => {
  console.log(orderId)
  const url = `${SERVER_URL}/order/${orderId}`;
  return axios.put(url, userOrder);
};
// !NEW
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const updateOrdernOsMS = (orderId: string, userOrder: customerOrder) => {
  const url = `${SERVER_URL}/order/nosms/${orderId}`;
  return axios.put(url, userOrder);
};
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const deleteOrder = (orderId: string ) => {
  const url = `${SERVER_URL}/order/deleteOrder/${orderId}`;
  return axios.delete(url);
};
// !
//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const getAllOrders = ({
  // filter,
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const token2 = localStorage.getItem("User");
  const url = `${SERVER_URL}/order/all-orders`;
  return axios.get(url, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token2}`,
    },
  });
};

//* @desc  confirm comment
//* @route POST http://localhost:5000/api/confirm-comment/:commentId
export const searchAllOrders = ({
  startDate,
  endDate,
  mobile,
  lastName,
}: {
  startDate: string;
  endDate: string;
  mobile: string;
  lastName: string;
}) => {
  const url = `${SERVER_URL}/order/all-orders/search`;
  return axios.get(url, {
    params: {
      startDate,
      endDate,
      mobile,
      lastName,
    },
  });
};

// *GAME LIST
export const getAllGameList = (consoleType: string) => {
  const url = `${SERVER_URL}/game-list/get-all-list/${consoleType}`;
  return axios.get(url);
};
export const getGameList = (page: number) => {
  const url = `${SERVER_URL}/game-list/get-list?page=${page}&limit=10`;
  return axios.get(url);
};
export const addGameList = (newGame: newGameList) => {
  const url = `${SERVER_URL}/game-list/add-game`;
  return axios.post(url, newGame);
};
export const updateGameList = (newGame: {
  _id: string;
  name: string;
  platform?: string; // platform is optional
}) => {
  const url = `${SERVER_URL}/game-list/update-list?gameId=${newGame._id}`;
  return axios.put(url, newGame);
};

export const deleteGameList = (gamelistId: string, platform: string) => {
  const url = `${SERVER_URL}/game-list/delete-list/${gamelistId}/${platform}`;
  return axios.delete(url);
};

export const print = (formData: FormData) => {
  const url = `${SERVER_URL}/printer/print`;

  return axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
