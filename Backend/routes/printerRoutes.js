const express = require("express");
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: "/tmp" });
const router = express.Router();

router.post("/print", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Content = fileBuffer.toString("base64");

    const response = await axios.post(
      "https://api.printnode.com/printjobs",
      {
        printerId: 74523622,
        title: "Test PDF Print",
        contentType: "pdf_base64",
        content: base64Content,
      },
      {
        auth: {
          username: process.env.API_KEY,
          password: "",
        },
      }
    );

    // حذف فایل پس از ارسال موفق
    fs.unlink(filePath, (err) => {
      if (err) console.error("خطا در حذف فایل:", err.message);
    });

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("Print Error:", err.message);

    // حذف فایل در صورت بروز خطا هم
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) console.error("خطا در حذف فایل پس از خطا:", unlinkErr.message);
    });

    res.status(500).json({
      error: "خطا در ارسال فایل PDF",
      details: err.message,
    });
  }
});

module.exports = router;

// const express = require("express");
// const axios = require("axios");
// const multer = require("multer");

// const router = express.Router();

// // فقط حافظه (RAM) استفاده می‌کنیم
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("file");

// router.post("/print", upload, async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "هیچ فایلی آپلود نشده است" });
//   }

//   try {
//     // فایل در RAM هست، نیازی به readFileSync نیست
//     const base64Content = req.file.buffer.toString("base64");

//     const response = await axios.post(
//       "https://api.printnode.com/printjobs",
//       {
//         printerId: 74523622,
//         title: "Test PDF Print",
//         contentType: "pdf_base64",
//         content: base64Content,
//       },
//       {
//         auth: {
//           username: process.env.API_KEY,
//           password: "",
//         },
//       }
//     );

//     res.json({ success: true, data: response.data });
//   } catch (err) {
//     console.error("Print Error:", err.message);
//     res.status(500).json({
//       error: "خطا در ارسال فایل PDF",
//       details: err.message,
//     });
//   }
// });

// module.exports = router;
