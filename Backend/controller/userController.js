const Blog = require("../models/Blog");
const Categorey = require("../models/Categorey");
const Comment = require("../models/Comment");
const Games = require("../models/Games");
const Order = require("../models/Order");
const Products = require("../models/Products");
const User = require("../models/User");
const { sendSms } = require("../utils/Send-Msg");
const jwt = require("jsonwebtoken");
const ZarinpalCheckout = require("zarinpal-checkout");

exports.handleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const payload = {
        userId: user._id.toString(),
        role: String(user.role), // اطمینان از اینکه رشته است
      };
      // User exists, generate token and log them in
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "40h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            user: {
              _id: user._id,
              email: user.email,
              role: user.role,
            },
            message: "خوش آمدید",
            token,
          });
        }
      );
    } else {
      // User doesn't exist, create and log them in
      user = await User.create(req.body);

      const payload = {
        userId: user._id.toString(),
        role: user.role,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "40h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            user: {
              _id: user._id,
              email: user.email,
              role: user.role,
            },
            message: "کاربر جدید اضافه شد.",
            token,
          });
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

exports.handleUserInfo = async (req, res, next) => {
  try {
    const { userId, userInfo } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "کاربر پیدا نشد." });
    } else {
      user.firstName = userInfo.firstName;
      user.lastName = userInfo.lastName;
      user.phone = userInfo.phone;
      user.address = {
        plaque: userInfo.address.plaque,
        unit: userInfo.address.unit,
        postalCode: userInfo.address.postalCode,
        address: userInfo.address.address,
        city: userInfo.address.city,
        provider: userInfo.address.provider,
      };
      await user.save();
      res.status(201).json({ message: "اطلاعات با موفقیت ذخیره شد.", user });
    }
  } catch (err) {
    next(err);
  }
};
// *UPDATEUSER
exports.handleUpdateUserInfo = async (req, res, next) => {
  try {
    const { userId, userInfo } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "کاربر پیدا نشد." });
    } else {
      user.firstName = userInfo.firstName;
      user.lastName = userInfo.lastName;
      user.phone = userInfo.phone;
      user.address = {
        plaque: userInfo.address.plaque,
        unit: userInfo.address.unit,
        postalCode: userInfo.address.postalCode,
        address: userInfo.address.address,
        city: userInfo.address.city,
        provider: userInfo.address.provider,
      };
      await user.save();
      res.status(201).json({ message: "اطلاعات با موفقیت ذخیره شد.", user });
    }
  } catch (err) {
    next(err);
  }
};
exports.handleGetUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "کاربر پیدا نشد" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    next(err);
  }
};
// ?USER ORDERS
exports.GetUserOrders = async (req, res) => {
  const { pageNumber = 1, sortOrder = "newestFirst" } = req.query;
  const { userId } = req.params;
  const limit = 5;
  const page = parseInt(pageNumber, 5);

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }
  const skip = (page - 1) * limit;

  const sortOption =
    sortOrder === "newestFirst" ? { createdAt: -1 } : { createdAt: 1 };

  try {
    const totalOrders = await Order.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalOrders / limit);
    const userOrders = await Order.find({ user: userId })
      .limit(limit)
      .skip(skip)
      .sort(sortOption)
      .lean();
    for (const order of userOrders) {
      for (const item of order.items) {
        const id = item.id;
        if (item.itemType === "Games") {
          const populatedGame = await Games.findById({ _id: id }).lean();
          if (populatedGame) {
            item.populatedData = populatedGame;
          }
        } else if (item.itemType === "Products") {
          const populatedProduct = await Products.findById({ _id: id }).lean();
          if (populatedProduct) {
            item.populatedData = populatedProduct;
          }
        }
      }
    }

    res.status(200).json({ userOrders, totalPages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" }); // Sending an error response if an error occurs
  }
};
exports.handleSms = async (req, res, next) => {
  try {
    const response = sendSms();
    console.log(response);
    res.status(201).send("ok");
  } catch (err) {
    next(err);
  }
};
// ? COMMENTS
exports.handleAddComments = async (req, res, next) => {
  try {
    const createdComment = await Comment.create(req.body);
    res.status(201).json({
      message: "نظر شما بعد از تایید ادمین اضافه میشود.",
      data: createdComment,
    });
  } catch (err) {
    next(err);
  }
};
// ? PRODUCTS PAGE DATA
exports.handleFilterProducts = async (req, res, next) => {
  const { slug1, slug2 } = req.params;
  const { pageNumber = 1, sortOrder = "lowToHigh" } = req.query;
  const limit = 10;
  const filter = slug2 && slug2 !== "undefined" ? { slug2 } : { slug1 };
  try {
    const skip = (parseInt(pageNumber, 10) - 1) * limit;
    const sortOption = sortOrder === "lowToHigh" ? { price: 1 } : { price: -1 };
    const filteredProducts = await Products.find(filter)
      .populate("primaryImage")
      .populate("tags")
      .limit(limit) // Limit the number of products
      .skip(skip)
      .sort(sortOption); // Skip products based on pagination

    const productsWithRatings = filteredProducts.map((game) => {
      const ratings = game.comments
        .filter((comment) => typeof comment.rating === "number") // Ensure `rating` is a number
        .map((comment) => comment.rating);

      const totalRatings = ratings.length;
      const averageRating =
        totalRatings > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings
          : 0;

      return {
        ...game._doc, // Spread the game document fields
        averageRating,
      };
    });

    res.status(200).json({
      filteredProducts: productsWithRatings,
    });
  } catch (err) {
    next(err);
  }
};
// ? ACCOUNTGAME PAGE DATA
exports.handleFilterGames = async (req, res, next) => {
  const { category } = req.params;
  const { pageNumber = 1, sortOrder = "lowToHigh" } = req.query;
  const limit = 10;
  try {
    const foundCategory = await Categorey.findOne({ categoryName: category });

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const skip = (parseInt(pageNumber, 10) - 1) * limit;
    const sortOption = sortOrder === "lowToHigh" ? { price: 1 } : { price: -1 };
    const filteredProducts = await Games.find({
      categories: foundCategory._id,
    })
      .populate("primaryImage")
      .populate("additionalImages")
      .populate("tags")
      .populate("comments")
      .limit(limit) // Limit the number of products
      .skip(skip)
      .sort(sortOption); // Skip products based on pagination

    const gamesWithRatings = filteredProducts.map((game) => {
      const ratings = game.comments
        .filter((comment) => typeof comment.rating === "number") // Ensure `rating` is a number
        .map((comment) => comment.rating);

      const totalRatings = ratings.length;
      const averageRating =
        totalRatings > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings
          : 0;

      return {
        ...game._doc, // Spread the game document fields
        averageRating,
      };
    });

    res.status(200).json({
      filteredProducts: gamesWithRatings,
    });
  } catch (err) {
    next(err);
  }
};
// ?GET BLOG
exports.getBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).populate("primaryImage");
    res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" }); // Sending an error response if an error occurs
  }
};
// ? searchRes
exports.searchRes = async (req, res) => {
  const { title } = req.body;
  const searchTitle = title.trim().toLowerCase();
  console.log(searchTitle);
  try {
    const products = await Products.find({
      title: { $regex: searchTitle, $options: "i" },
    })
      .select("_id title primaryImage")
      .populate("primaryImage");

    const games = await Games.find({
      title: { $regex: searchTitle, $options: "i" },
    }).select("_id title primaryImage");
    // Adding a link to each product and game
    const productsWithLinks = products.map((product) => ({
      _id: product._id,
      title: product.title,
      primaryImage: product.primaryImage, // Assuming primaryImage is an object with a URL field
      link: `/product/${product._id}`, // Constructing the link for products
    }));

    const gamesWithLinks = games.map((game) => ({
      _id: game._id,
      title: game.title,
      primaryImage: game.primaryImage, // Assuming primaryImage is an object with a URL field
      link: `/accountgame/${game._id}`, // Constructing the link for games
    }));

    // Combine both products and games into one array
    const combinedResults = [...productsWithLinks, ...gamesWithLinks];

    res.status(200).json({ results: combinedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// ? ADD TO FAVORITES
//  * add
exports.addFavorites = async (req, res) => {
  const { userId, itemId, itemType } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "باید وارد حساب کاربری بشوید." });
    }

    // Check if item is already in favorites
    const isFavorite = user.favorites.some(
      (fav) => fav.itemId.toString() === itemId && fav.itemType === itemType
    );

    if (isFavorite) {
      // Remove the item from favorites
      user.favorites = user.favorites.filter(
        (fav) =>
          !(fav.itemId.toString() === itemId && fav.itemType === itemType)
      );

      res.status(200).json({
        favorites: user.favorites,
        message: "آیتم از لیست علاقه مندی ها حذف شد.",
      });
    } else {
      // Add the item to favorites
      user.favorites.push({ itemId, itemType });
      res.status(200).json({
        favorites: user.favorites,
        message: "با موفقیت به لیست مورد علاقه شما اضافه شد.",
      });
    }

    // Save the updated user object
    await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// * GET favorite
exports.getFavorite = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" }); // Sending an error response if an error occurs
  }
};
// * GET favorites

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    // Change `const` to `let` to allow reassignment
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const favoritesWithDetails = await Promise.all(
      user.favorites.map(async (favorite) => {
        // Conditionally populate based on itemType
        if (favorite.itemType === "Product") {
          favorite.itemId = await Products.findById(favorite.itemId).populate(
            "primaryImage"
          ); // Populate with Product model
        } else if (favorite.itemType === "Games") {
          favorite.itemId = await Games.findById(favorite.itemId).populate(
            "primaryImage"
          ); // Populate with Game model
        }
        return favorite;
      })
    );

    res.status(200).json({ favorites: favoritesWithDetails });
  } catch (err) {
    console.error("Error populating favorites:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// * remove favorite
exports.removeFavorite = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteExists = user.favorites.some(
      (favorite) => favorite._id.toString() === itemId
    );

    if (!favoriteExists) {
      return res.status(404).json({ error: "Item not found in favorites" });
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite._id.toString() !== itemId
    );

    await user.save();
    res.status(200).json({
      favorites: user.favorites,
      message: "با موفقیت حذف شد.",
    });
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// *zarin
const zarinpal = ZarinpalCheckout.create(
  "06da4771-454f-4dd8-8b03-6f6145d95ed0",
  false
); // true for sandbox mode

exports.zarinPay = async (req, res) => {
  const { amount, description, callbackUrl } = req.body;
  console.log(req.body);
  try {
    const response = await zarinpal.PaymentRequest({
      Amount: amount, // Fixed syntax error (removed extra single quote)
      CallbackURL: "https://kermanatari.ir/payment-callback", // Replace with your actual callback URL
      Description: description, // Transaction description
    });

    if (response.status === 100) {
      res.status(200).json({ url: response.url });
    } else {
      res
        .status(400)
        .json({ error: "Error creating payment request", details: response });
    }
  } catch (err) {
    console.error("Error during payment request:", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

exports.zarinCheck = async (req, res) => {
  const { Authority, Status, orderId } = req.query;

  try {
    console.log("Payment verification initiated");
    console.log("Query params:", req.query);

    // Check payment status from query params
    if (Status !== "OK") {
      return res.status(400).json({
        message: "Payment was not successful or canceled by the user.",
      });
    }

    // Find the order in the database
    const order = await Order.findById(orderId);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    console.log(orderId);
    console.log(order.payment.ammount, "order.payment.ammount");
    // Verify the payment with ZarinPal
    const response = await zarinpal.PaymentVerification({
      Amount: order.payment.ammount, // Ensure this matches the payment amount
      Authority, // Authority code from the query string
    });

    console.log("Payment verification response:", response);

    // Update order payment details based on ZarinPal response
    if (response.status === 101) {
      // Payment successful
      order.payment = {
        status: response.status,
        message: response.message,
        cardHash: response.cardHash,
        cardPan: response.cardPan,
        refId: response.refId,
        feeType: response.feeType,
        fee: response.fee,
      };
      await order.save();

      return res.status(200).json({
        message: "Payment successful!",
        refId: response.refId,
        orderId: order._id,
      });
    } else {
      // Payment failed or not verified
      order.payment = {
        ...order.payment,
        status: response.status,
        message: "Payment failed or not verified",
      };
      await order.save();

      return res.status(400).json({
        message: "Payment failed or not verified.",
        status: response.status,
      });
    }
  } catch (err) {
    console.error("Error during payment verification:", err);

    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
