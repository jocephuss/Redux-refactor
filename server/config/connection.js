const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(mongoose.connect(process.env.MONGODB_URI, {}));

module.exports = mongoose.connection;
