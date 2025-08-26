const mongoose = require('mongoose');
const Gamedata = require("./GameData.json"); // استفاده از require به جای import

// اتصال به MongoDB Atlas با دیتابیس shop
mongoose.connect('mongodb+srv://ramtinzand6:z4hfD25hb9z2TGox@cluster0.sdow2.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// مدل برای ذخیره داده‌ها
const ItemSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true }
    }
  ]
});

// تبدیل داده‌ها به فرمت دلخواه
const result = Object.keys(Gamedata).map(platform => ({
  platform,
  items: Gamedata[platform].map((name, index) => ({
    name
  }))
}));

// ذخیره داده‌ها در یک متغیر `data`
const dataArray = result;

console.log(dataArray);

const GameList = mongoose.model('GameList', ItemSchema);

// ذخیره داده‌ها در MongoDB
const saveData = async () => {
  try {
    for (let i = 0; i < dataArray.length; i++) {
      const item = new GameList(dataArray[i]);
      await item.save();
    }
    console.log('Data saved successfully');
    mongoose.disconnect();
  } catch (err) {
    console.log('Error saving data:', err);
  }
};

saveData();
