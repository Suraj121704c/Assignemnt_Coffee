const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: Array,
  published: Array,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
  user: String,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
