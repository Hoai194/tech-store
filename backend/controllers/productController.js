import productModel from "../models/productModel.js";


// add product
export const addProduct = async (req, res) => {
  try {

    const { name, description, price, category, subCategory, models, bestSeller } = req.body;

    const image1 = req.files.image1 ? req.files.image1[0].filename : "";
    const image2 = req.files.image2 ? req.files.image2[0].filename : "";
    const image3 = req.files.image3 ? req.files.image3[0].filename : "";
    const image4 = req.files.image4 ? req.files.image4[0].filename : "";

    const images = [image1, image2, image3, image4].filter(item => item !== "");

    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      models: JSON.parse(models), 
      bestSeller,
      image: images,
      date: Date.now()
    };

    const product = new productModel(productData);

    await product.save();

    res.json({
      success: true,
      message: "Product Added"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};



// remove product
export const removeProduct = async (req, res) => {
  try {

    await productModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Product Removed"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};



// single product
export const singleProduct = async (req, res) => {
  try {

    const product = await productModel.findById(req.body.id);

    res.json({
      success: true,
      product
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};



// list products
export const listProduct = async (req, res) => {
  try {

    const products = await productModel.find({});

    res.json({
      success: true,
      products
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }
};
