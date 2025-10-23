const express = require("express");
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");
// const { Server } = require("socket.io");
const connectDB = require("./config/db");

// const cookieSession = require("cookie-session");
// const passport = require("passport");
// const passportSetup = require("./passport");
console.log("first")
const app = express();

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/adminRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/game-list", require("./routes/gameListRoutes"));
app.use("/api/printer", require("./routes/printerRoutes"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server Running On Port ${port}`)
);
