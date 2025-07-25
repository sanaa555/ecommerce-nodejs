const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection error", err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
