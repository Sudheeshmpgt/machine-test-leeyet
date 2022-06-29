const ProductModel = require("../model/productSchema");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const files = req.files
    let imgArray, img;
    if (req.files) {
      imgArray = files.map((file) => {
        img = fs.readFileSync(file.path);
        return (encode_image = img.toString("base64"));
      });
    }

    const {price, discount, shippingCharge} = req.body
    const discountAmount = (price * discount/100)   
    const total = price - discountAmount
    const amount = parseInt(total) + parseInt(shippingCharge)
    
    const product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      shippingCharge: req.body.shippingCharge,
      productImg: imgArray,
      total: amount
    });
    const newProduct = await product.save();
    res
      .status(200)
      .send({ message: "Producted added successfully", product: newProduct });
  } catch (error) {
    res.status(500).send(error)
  }
};

const getProduct = async(req,res)=>{
    try {
        const product = await ProductModel.find({})
        if(product.length === 0){
            res.send({message:'products not found'})
        }else{
            res.send({message:'ok', product:product})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const editProduct = async(req,res) =>{
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
          product.name = req.body.name || product.name;
          product.description = req.body.phone || product.description;
          product.price = req.body.email || product.price;
          product.discount = req.body.about || product.discount;
          product.shippingCharge = req.body.experience || product.shippingCharge;
          product.productImg = req.files ? req.files[0].path : "" || product.productImg;

          const updatedProduct = await product.save();
          res.send({ message: "User Updated Successfully", product: updatedProduct });
        } else {
          res.send({ message: "Request failed" });
        }
      } catch (error) {
        res.status(500).send({ message: "Bad request", err: error });
      }
}



module.exports = { createProduct, editProduct, getProduct };
