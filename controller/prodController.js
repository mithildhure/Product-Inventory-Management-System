const prodModel = require("../model/prodModel");

const getProducts = async (req,resp) => {
    try {
        const products = await prodModel.find().populate("staffName","username");
        resp.render("index",{products, user : req.session.userData});
    } catch (error) {
        console.log(error);
    }
}

// For Both Staff and Admin 
const addProduct = async (req,resp) => {
    try {
        const {pname, pimg, price, category, quantity} = req.body;
        await prodModel.create({pname, pimg, price, category, quantity, staffName: req.session.userData.id});
        resp.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

// For Admin Only
const fetchByProdcutId = async (req,resp) => {
    try {
        const product = await prodModel.findById(req.params.id);
        resp.render("edit",{product});
    } catch (error) {
        console.log(error);
    }
}

// Admin Only
const updateProduct = async (req,resp) => {
    try {
        await prodModel.findByIdAndUpdate(req.params.id, req.body);
        resp.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req,resp) => {
    try {
        await prodModel.findByIdAndDelete(req.params.id);
        resp.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getProducts,addProduct,fetchByProdcutId,updateProduct,deleteProduct}