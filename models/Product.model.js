const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  end_year,
  intensity,
  sector,
  topic,
  insight,
  url,
  region,
  start_year,
  impact,
  added,
  published,
  country,
  relevance,
  pestle,
  source,
  title,
  likelihood,
  user,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
