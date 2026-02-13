const express = require('express');
const { getProducts, addProduct, fetchByProdcutId, updateProduct, deleteProduct } = require('../controller/prodController');
const { isAuth, isAdmin } = require('../middleware/auth');

const proute = express.Router();

proute.get("/",getProducts);
proute.get("/add",isAuth,(req,resp)=>{
    resp.render("add");
})
proute.post("/add",isAuth,addProduct);

proute.get("/edit/:id",isAuth, isAdmin, fetchByProdcutId);
proute.patch("/edit/:id",isAuth, isAdmin, updateProduct);

proute.delete("/delete/:id",isAuth, isAdmin, deleteProduct);

module.exports = proute;