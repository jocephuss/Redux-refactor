const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://josiahrowland:dIllsi@h00@cluster0.0us2u.mongodb.net/"
);

module.exports = mongoose.connection;
