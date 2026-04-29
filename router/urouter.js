const express = require('express');
const { register, login, logout } = require('../controller/userController');

const uroute = express.Router();

uroute.get("/login", (req, resp) => {
    const success = req.query.success || null;
    resp.render("login", { error: null, success }); 
});

uroute.get("/register", (req, resp) => {
    resp.render("register", { error: null });
});

uroute.post("/register", register);
uroute.post("/login", login);
uroute.get("/logout", logout);

module.exports = uroute;