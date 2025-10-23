const express = require("express");
const Customer = require("../models/Customer");
const Order = require("../models/CustomerOrder");

const { auth, issuperAdmin } = require("../middlewares/auth");

const moment = require("moment-jalaali");
moment.loadPersian({ usePersianDigits: false });

const router = express.Router();

// ?send sms

const https = require("https");

const senSMS = ({ bodyId, to, args }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      bodyId,
      to,
      args,
    });
    const options = {
      hostname: "console.melipayamak.com",
      port: 443,
      path: "/api/send/shared/cba17fa6705a4348b2e2d10279cf3fb9",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": Buffer.byteLength(data, "utf8"),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: responseData,
        });
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

// ! @ROUTES GET API/abtin/order NOFILTER
// ? @desc get all orders (ADMIN ONLY)
// ? @access private/Admin

router.get("/all-orders", auth, issuperAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const orders = await Order.find()

      .populate("customer", "name mobile lastName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments();

    return res.status(200).json({
      message: "سفارش پیدا شد.",
      Data: orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES GET API/abtin/order/all-orders
// ? @desc search all orders (ADMIN ONLY)
// ? @access private/Admin

router.get("/all-orders/search", async (req, res) => {
  let { startDate, endDate, mobile, lastName } = req.query;
  const query = {};

  function toEnglishNumber(str) {
    if (!str) return str;
    const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(/[۰-۹]/g, (d) => en[fa.indexOf(d)]);
  }

  try {
    // فیلتر بر اساس تاریخ شمسی رشته‌ای
    startDate = toEnglishNumber(startDate);
    endDate = toEnglishNumber(endDate);

    if (startDate || endDate) {
      query.persianDate = {};
      if (startDate) query.persianDate.$gte = `${startDate} 00:00`;
      if (endDate) query.persianDate.$lte = `${endDate} 23:59`;
    }

    // فیلتر مشتری
    const customerFilter = {};
    if (mobile) customerFilter.mobile = { $regex: mobile, $options: "i" };
    if (lastName) customerFilter.lastName = { $regex: lastName, $options: "i" };

    let customerIds = [];
    if (Object.keys(customerFilter).length > 0) {
      const customers = await Customer.find(customerFilter).select("_id");
      customerIds = customers.map((c) => c._id);
      query.customer = { $in: customerIds };
    }

    const orders = await Order.find(query)
      .populate("customer", "name mobile lastName")
      .sort({ persianDate: -1 });

    res.status(200).json({
      message: "سفارش‌ها پیدا شدند.",
      Data: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطای سرور");
  }
});

// ? @ROUTES GET API/abtin/order
// ? @desc get all orders (ADMIN ONLY)
// ? @access private/Admin

router.get("/", async (req, res) => {
  const { filter } = req.query;
  try {
    let query = { deliveryStatus: { $ne: "تحویل به مشتری" } };
    if (filter && filter !== "all") {
      query.deliveryStatus = { $ne: "تحویل به مشتری", $eq: filter };
    }
    const order = await Order.find(query)
      .populate("customer", "name mobile lastName")
      .sort({ createdAt: 1 });
    if (!order) {
      return res.status(400).json({ message: "سفارشی پیدا نشد." });
    } else {
      return res.status(200).json({ message: "سفارش پیدا شد.", Data: order });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// ? @ROUTES GET API/abtin/order
// ? @desc get user  orders (ADMIN ONLY)
// ? @access private/Admin

router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ _id: orderId }).populate(
      "customer",
      "name mobile lastName sex birthday description"
    );
    if (!order) {
      return res.status(400).json({ message: "سفارشی پیدا نشد." });
    } else {
      return res.status(200).json({ message: "سفارش پیدا شد.", Data: order });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES GET API/abtin/order
// ? @desc update user  (ADMIN ONLY)
// ? @access private/Admin
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { list, price, consoleType, description } = req.body;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(400).json({ message: "سفارشی پیدا نشد." });
    }

    order.list = list;
    order.price = price;
    order.consoleType = consoleType;
    order.description = description;
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(
      "customer",
      "name mobile lastName  birthday description"
    );

    res.status(200).json({ message: "سفارش ویرایش شد.", Data: populatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});
// !NEW
router.put("/nosms/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ _id: orderId }).populate("customer");
    if (!order) {
      return res.status(400).json({ message: "سفارشی پیدا نشد." });
    }

    let deliveryDate = null;

    order.deliveryStatus = "تحویل به مشتری";

    deliveryDate = moment().format("jYYYY/jMM/jDD HH:mm");
    order.deliveryDate = deliveryDate;

    await order.save();

    return res
      .status(200)
      .json({ message: "سفارش بدون پیام تغییر کرد.", Data: order });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
router.delete("/deleteOrder/:orderId", async (req, res) => {
  const { orderId } = req.params;
   try {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "سفارشی پیدا نشد." });
    }

    return res
      .status(200)
      .json({ message: "سفارش با موفقیت حذف شد.", Data: order });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطای سرور");
  }
});

// ? @ROUTES GET API/abtin/order
// ? @desc change status
// ? @access private/Admin
router.put("/changestatus/:orderId", async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;
  let smsResponse = null;

  const getPersianConsoleName = (consoleType) => {
    if (consoleType === "ps4" || consoleType === "copy") return "پلی استیشن ۴";
    if (consoleType === "ps5") return "پلی استیشن ۵";
    if (consoleType === "xbox") return "ایکس باکس";
    return consoleType;
  };

  const toPersianDigits = (str) => {
    return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  try {
    const order = await Order.findOne({ _id: orderId }).populate("customer");
    if (!order) {
      return res.status(400).json({ message: "سفارشی پیدا نشد." });
    }

    const persianConsole = getPersianConsoleName(order.consoleType);
    // const persianDate = toPersianDigits(order.persianDate);
    let deliveryDate = null;

    order.deliveryStatus = status;

    if (status === "تحویل به مشتری") {
      deliveryDate = moment().format("jYYYY/jMM/jDD HH:mm");
      order.deliveryDate = deliveryDate;
    }

    await order.save();

    if (status === "آماده") {
      smsResponse = await senSMS({
        bodyId: 332452,
        to: order.customer.mobile,
        args: [
          order.customer.sex === "مرد" ? "جناب آقای" : "سرکار خانم",
          order.customer.lastName,
          toPersianDigits(order.deliveryCode),
        ],
      });
    } else if (status === "تحویل به مشتری") {
      smsResponse = await senSMS({
        bodyId: 323178,
        to: order.customer.mobile,
        args: [
          order.customer.sex === "مرد" ? "جناب آقای" : "سرکار خانم",
          order.customer.lastName,
          persianConsole,
          toPersianDigits(deliveryDate),
        ],
      });
    }

    return res
      .status(200)
      .json({ message: "سفارش تغییر کرد.", Data: order, sms: smsResponse });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES GET API/abtin/customer
// ? @desc post add customer
// ? @access private/Admin

router.post("/", async (req, res) => {
  const { list, price, consoleType, description } = req.body.Order;
  const toPersianDigits = (str) => {
    return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const getPersianConsoleName = (consoleType) => {
    if (consoleType === "ps4") return "پلی استیشن ۴";
    if (consoleType === "copy") return "پلی استیشن ۴";
    if (consoleType === "ps5") return "پلی استیشن ۵";
    if (consoleType === "xbox") return "ایکس باکس";

    return consoleType; // اگر نوع دیگری بود، همان را برمی‌گرداند
  };
  try {
    const order = await Order.create({
      list,
      price,
      consoleType,
      description,
      customer: req.body.customer,
    });
    const populatedOrder = await Order.findById(order._id).populate("customer");
    const customer = await Customer.findById(populatedOrder.customer._id);
    const [datePart, timePart] = populatedOrder.persianDate.split(" ");

    const persianDate = toPersianDigits(datePart);
    const persianTime = toPersianDigits(timePart);
    const persianConsole = getPersianConsoleName(order.consoleType);
    // Send SMS and await response
    const smsResponse = await senSMS({
      bodyId: 323165,
      to: customer.mobile,
      args: [
        customer.sex === "مرد" ? "جناب آقای" : "سرکار خانم",
        customer.lastName,
        persianConsole,
        persianDate,
        persianTime,
      ],
    });
    res.status(201).json({
      message: "سفارش جدید اضافه شد.",
      Data: populatedOrder,
      sms: smsResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
