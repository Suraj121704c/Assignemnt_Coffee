const express = require("express");
const { ProductModel } = require("../models/Product.model");

const ProductRouter = express.Router();


ProductRouter.post("/create", async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json({ msg: "Product successfully created..." });
  } catch (err) {
    res.status(400).json({ err: "Something went wrong..." });
  }
});



// Add end year filter in the dashboard
// Add topics filters in the dashboard
// Add sector filter in the dashboard
// Add region filter in the dashboard
// Add PEST filter in the dashboard
// Add Source filter in the dashboard
// Add SWOT filter in the dashboard


ProductRouter.get("/", async (req, res) => {
  const filter = {};
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: "i" };
  }
  if (req.query.topic) {
    filter.topic = { $in: req.query.topic };
  }
  if (req.query.sector ) {
    filter.sector  = { $in: req.query.sector  };
  }
  if (req.query.region) {
    filter.region = { $in: req.query.region };
  }
  if (req.query.pestle) {
    filter.pestle = { $in: req.query.pestle };
  }
  if (req.query.source) {
    filter.source = { $in: req.query.source };
  }
  if (req.query.country) {
    filter.country = { $in: req.query.country };
  }
  if (req.query.insight) {
    filter.insight = { $in: req.query.insight };
  }
  
  if (req.query.s) {
      if (req.query.s === "asc") {
        product = await ProductModel.find(filter).sort({ start_year: 1 });
      } else if (req.query.s === "desc") {
        product = await ProductModel.find(filter).sort({ start_year: -1 });
      } else if (req.query.s === "") {
        product = await ProductModel.find(filter);
      }
      res.send(product);
      return ;
  }

  if (req.query.i) {
    if (req.query.i === "asc") {
      product = await ProductModel.find(filter).sort({ intensity: 1 });
    } else if (req.query.i === "desc") {
      product = await ProductModel.find(filter).sort({ intensity: -1 });
    } else if (req.query.i === "") {
      product = await ProductModel.find(filter);
    }
    res.send(product);
    return ;
}
    
  if (req.query.l) {
    if (req.query.l === "asc") {
      product = await ProductModel.find(filter).sort({ likelihood: 1 });
    } else if (req.query.l === "desc") {
      product = await ProductModel.find(filter).sort({ likelihood: -1 });
    } else if (req.query.l === "") {
      product = await ProductModel.find(filter);
    }
    res.send(product);
    return ;
}

if (req.query.r) {
  if (req.query.r === "asc") {
    product = await ProductModel.find(filter).sort({ relevance: 1 });
  } else if (req.query.r === "desc") {
    product = await ProductModel.find(filter).sort({ relevance: -1 });
  } else if (req.query.r === "") {
    product = await ProductModel.find(filter);
  }
  res.send(product);
  return ;
}


  if(req.query.p) {
    if (req.query.p === "asc") {
      product = await ProductModel.find(filter).sort({ end_year: 1 });
    } else if (req.query.p === "desc") {
      product = await ProductModel.find(filter).sort({ end_year: -1 });
    } else if (req.query.p === "") {
      product = await ProductModel.find(filter);
    }
    res.send(product);
    return ;
  }

  const pageNumber = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 20;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const count = await ProductModel.countDocuments(filter);
    const product = await ProductModel.find(filter).skip(skip).limit(pageSize);

    res.send({
      totalCount: count,
      pageSize,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      product,
    });
  } catch (err) {
    res.send("Something went wrong...");
  }
});



ProductRouter.get("/:id", async (req, res) => {
  const productID = req.params.id;
  const product = await ProductModel.find({ _id: productID });
  res.send(product);
});


ProductRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const productID = req.params.id;
  await ProductModel.findByIdAndUpdate({ _id: productID }, payload);
  res
    .status(200)
    .json({ msg: `Product with id ${productID} has been updated` });
});

ProductRouter.delete("/delete/:id", async (req, res) => {
  const productID = req.params.id;
  await ProductModel.findByIdAndDelete({ _id: productID });
  res.status(200).json({ msg: `Device with id ${productID} has been deleted` });
});



module.exports = {
  ProductRouter,
};
