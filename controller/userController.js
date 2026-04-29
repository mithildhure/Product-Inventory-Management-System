const bcryptjs = require('bcryptjs');
const userModel = require("../model/userModel");

const register = async (req, resp) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || username.trim().length < 5) {
            return resp.render("register", { error: "Username must be at least 5 characters" });
        }
        if (username.trim().length > 15) {
            return resp.render("register", { error: "Username must be at most 15 characters" });
        }
        if (!email || !email.includes("@")) {
            return resp.render("register", { error: "Please enter a valid email" });
        }
        if (!password || password.trim().length < 3) {
            return resp.render("register", { error: "Password must be at least 3 characters" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username: username.trim() }, { email: email.trim() }]
        });

        if (existingUser) {
            if (existingUser.email === email.trim()) {
                return resp.render("register", { error: "Email Already Exists" });
            }
            if (existingUser.username === username.trim().toLowerCase()) {
                return resp.render("register", { error: "Username Already Taken" });
            }
        }

        const hashp = await bcryptjs.hash(password, 10);
        await userModel.create({
            username: username.trim(),
            email: email.trim(),
            password: hashp,
            role  
        });

        resp.redirect("/login?success=Account+Created+Successfully!");
    } catch (error) {
        console.log(error);
        resp.render("register", { error: "Something went wrong, please try again" });
    }
};

const login = async (req, resp) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return resp.render("login", { error: "Please fill in all fields" });
        }

        const user = await userModel.findOne({ username: username.trim().toLowerCase() });

        if (!user) {
            return resp.render("login", { error: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return resp.render("login", { error: "Invalid username or password" }); 
        }

        req.session.userData = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        resp.redirect("/");
    } catch (error) {
        console.log(error);
        resp.render("login", { error: "Login failed, please try again" });
    }
};

const logout = (req, resp) => {
    req.session.destroy(() => {
        resp.redirect("/login");
    });
};

module.exports = { login, register, logout };