const express = require("express");
const router = express.Router();
const GameList = require("../models/GameList");

// * game list
// ? @ROUTES GET API/abtin/order/gameList
// ? @desc get all gamelists (ADMIN ONLY)
// ? @access private/Admin

router.get("/get-all-list/:consoleType", async (req, res) => {
  const { consoleType } = req.params;

  try {
    const gameList = await GameList.find({ platform: consoleType });

    return res.status(200).json({
      gameList: gameList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// !filtred
// ? @ROUTES GET API/abtin/order/gameList
// ? @desc get all gamelists (ADMIN ONLY)
// ? @access private/Admin

router.get("/get-list", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const gameList = await GameList.find();

    const ps4 = gameList.find((g) => g.platform === "ps4");
    const ps5 = gameList.find((g) => g.platform === "ps5");
    const copy = gameList.find((g) => g.platform === "copy");
    const xbox = gameList.find((g) => g.platform === "xbox");

    const paginate = (items) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      return items.slice(start, end);
    };

    return res.status(200).json({
      message: "لیست بازی‌ها جداگانه بازیابی شد.",
      ps4: {
        platform: "ps4",
        totalItems: ps4?.items?.length || 0,
        items: paginate(ps4?.items || []),
      },
      ps5: {
        platform: "ps5",
        totalItems: ps5?.items?.length || 0,
        items: paginate(ps5?.items || []),
      },
      copy: {
        platform: "کپی خور",
        totalItems: copy?.items?.length || 0,
        items: paginate(copy?.items || []),
      },
      xbox: {
        platform: "xbox",
        totalItems: xbox?.items?.length || 0,
        items: paginate(xbox?.items || []),
      },
      page,
      limit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// ? @ROUTES post API/abtin/order/gameList
// ? @desc add to gamelists (ADMIN ONLY)
// ? @access private/Admin

router.post("/add-game", async (req, res) => {
  const newGame = req.body;
  try {
    const gameList = await GameList.findOne({ platform: newGame.platform });

    if (!gameList) {
      return res
        .status(404)
        .json({ message: "لیست بازی با این پلتفرم پیدا نشد." });
    }

    if (newGame.name) {
      const addedGame = { name: newGame.name };
      gameList.items.push({ name: newGame.name });
      await gameList.save();
      return res
        .status(200)
        .json({ message: "بازی اضافه شد.", data: addedGame });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("خطای سرور");
  }
});

// ? @ROUTES put API/abtin/order/gameList
// ? @desc get update gamelists (ADMIN ONLY)
// ? @access private/Admin
router.put("/update-list", async (req, res) => {
  const { platform, _id, name } = req.body;
  try {
    const gameList = await GameList.findOne({ platform });

    if (!gameList) {
      return res
        .status(404)
        .json({ message: "لیست بازی با این پلتفرم پیدا نشد." });
    }
    const item = gameList.items.find((i) => i._id.toString() === _id);

    if (!item) {
      return res.status(404).json({ message: "آیتم مورد نظر پیدا نشد." });
    }

    // ویرایش مقدار name
    item.name = name;

    await gameList.save();

    return res.status(200).json({
      message: "آیتم با موفقیت آپدیت شد.",
      data: {
        _id: item._id,
        name: item.name,
        platform: gameList.platform,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطای سرور");
  }
});

// ? @ROUTES delete API/abtin/order/gameList
// ? @desc get delete gamelists (ADMIN ONLY)
// ? @access private/Admin
router.delete("/delete-list/:gamelistId/:platform", async (req, res) => {
  const { gamelistId, platform } = req.params;
  try {
    const gameList = await GameList.findOne({ platform });

    if (!gameList) {
      return res
        .status(404)
        .json({ message: "لیست بازی با این پلتفرم پیدا نشد." });
    }

    const item = gameList.items.find((i) => i._id.toString() === gamelistId);

    if (!item) {
      return res.status(404).json({ message: "آیتم مورد نظر پیدا نشد." });
    }

    // Remove the item from the items array
    gameList.items.pull({ _id: gamelistId });

    await gameList.save();

    return res.status(200).json({
      message: "آیتم با موفقیت حذف شد.",
      data: {
        _id: item._id,
        name: item.name,
        platform: gameList.platform,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
