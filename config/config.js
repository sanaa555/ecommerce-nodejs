
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/yourdb",
  port: process.env.PORT || 5000,
};
