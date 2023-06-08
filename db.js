const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://suraj121704c:singh123@cluster0.ndbapyz.mongodb.net/Coffe_code?retryWrites=true&w=majority");

module.exports = { connection };
