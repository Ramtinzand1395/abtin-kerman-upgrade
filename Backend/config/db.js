const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, 
      serverSelectionTimeoutMS: 30000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

// db.js
// const mongoose = require('mongoose');

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
// const MAX_RETRIES = 5; // تعداد دفعات تلاش دوباره
// let retries = 0;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected successfully');
//   } catch (error) {
//     retries += 1;
//     console.error(`❌ MongoDB connection error: ${error.message}`);
//     if (retries <= MAX_RETRIES) {
//       console.log(`🔄 Retrying to connect... (${retries}/${MAX_RETRIES})`);
//       setTimeout(connectDB, 5000); // ۵ ثانیه بعد دوباره تلاش می‌کنه
//     } else {
//       console.error('❌ Could not connect to MongoDB after multiple attempts.');
//       process.exit(1); // پروسس رو می‌بنده
//     }
//   }
// };

// module.exports = connectDB;
