const express = require("express");
const Customer = require("../models/Customer");
const Order = require("../models/CustomerOrder");
const router = express.Router();
const moment = require("moment-jalaali");
// ? @ROUTES GET API/abtin/customer
// ? @desc get all orders (ADMIN ONLY)
// ? @access private/Admin

router.get("/", async (req, res) => {
  const { mobile } = req.query;
  try {
    const customer = await Customer.findOne({ mobile });
    if (!customer) {
      return res.status(404).json({ message: "خریدار پیدا نشد." });
    } else {
      return res
        .status(200)
        .json({ message: "خریدار پیدا شد.", Data: customer });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES GET API/abtin/customer
// ? @desc post add customer
// ? @access private/Admin

router.post("/", async (req, res) => {
  let { name, mobile, lastName, sex, birthday, description } = req.body;
  try {
    let customer = await Customer.findOne({ mobile });
    if (customer) return res.status(202).json({ message: "خریدار پیدا شد." });
    if (!name || name.trim() === "") {
      name = "کاربر بی نام";
    }
    customer = new Customer({
      name,
      mobile,
      lastName,
      sex,
      birthday,
      description,
    });
    await customer.save();
    res.status(201).json({ message: "خریدار اضافه شد.", Data: customer });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES PUT API/abtin/customer
// ? @desc put update customer
// ? @access private/Admin

router.put("/:userId", async (req, res) => {
  const { name, mobile, lastName, sex, orderId, birthday, description } =
    req.body.customer;
  const { userId } = req.params;
  try {
    let customer = await Customer.findById(userId);
    if (!customer) return res.status(404).json({ message: "کاربر پیدا نشد." });

    customer.name = name;
    customer.mobile = mobile;
    customer.lastName = lastName;
    customer.sex = sex;
    customer.description = description;
    customer.birthday = birthday;

    await customer.save();

    const populatedOrder = await Order.findById(orderId).populate(
      "customer",
      "name mobile lastName"
    );

    res.status(200).json({
      message: "خریدار ویرایش شد.",
      Data: populatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطای سرور");
  }
});

module.exports = router;
