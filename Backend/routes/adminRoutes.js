const { Router } = require("express");

const adminController = require("../controller/adminController");
const uploadController = require("../controller/uploadController");
const { issuperAdmin, auth } = require("../middlewares/auth");

const router = new Router();
// ?UPLOAD IMAGE
router.post("/upload-image",auth, issuperAdmin, adminController.UploadImage);
router.get("/get-image", adminController.getImages);
// ?GAME
router.post("/add-game",auth, issuperAdmin, adminController.AddGame);
router.get("/get-game", adminController.GetGames);
router.get("/get-singleGame/:id", adminController.GetGame);
router.put("/update-game",auth, issuperAdmin, adminController.UpdateGame);
router.delete("/delete-game",auth, issuperAdmin, adminController.deleteGame);
// ? PRODUCT
router.post("/add-product", issuperAdmin, adminController.AddProduct);
router.get("/get-products", adminController.GetProducts);
router.get("/get-product/:id", adminController.Getproduct);
router.delete("/delete-product", issuperAdmin, adminController.deleteProduct);
router.put("/update-product", issuperAdmin, adminController.Updateproduct);

// ? TAGS
router.post("/add-tag", issuperAdmin, adminController.AddTag);
router.get("/get-tag", adminController.GetTags);
router.delete("/del-tag", issuperAdmin, adminController.DelTag);

// ? Categories
router.post("/add-Categories", issuperAdmin, adminController.AddCategory);
router.get("/get-Categories", adminController.GetCategoreis);
router.delete("/del-cat", issuperAdmin, adminController.DelCategory);
// ?Comments
router.get("/get-comments", adminController.handleGetComments);
router.delete(
  "/delete-comment/:commentId",
  issuperAdmin,
  adminController.handleDeleteComment
);
router.post(
  "/confirm-comment/:commentId",
  issuperAdmin,
  adminController.handleConfirmComment
);
// ? WEBLOG
router.post("/upload", uploadController.UploadWeblogImage);
router.post("/create-blog", issuperAdmin, adminController.createBlog);
router.get("/get-blogs", adminController.Blogs);
// ? ADD ORDER
router.post("/add-order", adminController.AddOrder);
router.get("/get-orders", issuperAdmin, adminController.GetOrders);
router.post("/change-status", issuperAdmin, adminController.Changestatus);
// ? Users
router.get("/get-users", issuperAdmin, adminController.GetUsers);

module.exports = router;
