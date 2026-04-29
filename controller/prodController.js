const prodModel = require("../model/prodModel");

const getProducts = async (req, resp) => {
    try {
        const products = await prodModel.find().populate("staffName", "username");
        resp.render("index", { products, user: req.session.userData });
    } catch (error) {
        console.log(error);
        resp.status(500).render("404");  // ← was just console.log, browser hung forever
    }
};

const addProduct = async (req, resp) => {
    try {
        const { pname, pimg, price, category, quantity } = req.body;

        if (!pname || pname.trim().length < 3) {
            return resp.render("add", { error: "Product name must be at least 3 characters" });
        }
        if (!pimg || !pimg.startsWith("http")) {
            return resp.render("add", { error: "Please enter a valid image URL (must start with http)" });
        }
        if (!price || Number(price) < 100) {
            return resp.render("add", { error: "Price must be at least ₹100" });
        }
        if (!quantity || Number(quantity) < 5 || Number(quantity) > 100) {
            return resp.render("add", { error: "Quantity must be between 5 and 100" });
        }

        await prodModel.create({
            pname: pname.trim(),
            pimg,
            price: Number(price),
            category,
            quantity: Number(quantity),
            staffName: req.session.userData.id
        });

        resp.redirect("/");
    } catch (error) {
        console.log(error);
        resp.render("add", { error: "Failed to add product, try again" });
    }
};

const fetchByProdcutId = async (req, resp) => {
    try {
        const product = await prodModel.findById(req.params.id);
        if (!product) {
            return resp.status(404).render("404"); 
        }
        resp.render("edit", { product, error: null });
    } catch (error) {
        console.log(error);
        resp.status(500).render("404");
    }
};

const updateProduct = async (req, resp) => {
    try {
        const { pname, pimg, price, category, quantity } = req.body;  

        if (!pname || pname.trim().length < 3) {
            const product = await prodModel.findById(req.params.id);
            return resp.render("edit", { product, error: "Product name must be at least 3 characters" });
        }
        if (!price || Number(price) < 100) {
            const product = await prodModel.findById(req.params.id);
            return resp.render("edit", { product, error: "Price must be at least ₹100" });
        }
        if (!quantity || Number(quantity) < 5 || Number(quantity) > 100) {
            const product = await prodModel.findById(req.params.id);
            return resp.render("edit", { product, error: "Quantity must be between 5 and 100" });
        }

        await prodModel.findByIdAndUpdate(req.params.id, {
            pname: pname.trim(),
            pimg,
            price: Number(price),
            category,
            quantity: Number(quantity)
        });

        resp.redirect("/");
    } catch (error) {
        console.log(error);
        resp.status(500).render("404");
    }
};

const deleteProduct = async (req, resp) => {
    try {
        await prodModel.findByIdAndDelete(req.params.id);
        resp.redirect("/");
    } catch (error) {
        console.log(error);
        resp.status(500).render("404");
    }
};

module.exports = { getProducts, addProduct, fetchByProdcutId, updateProduct, deleteProduct };