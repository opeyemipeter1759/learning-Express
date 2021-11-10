const mongoose = require("mongoose");

exports.loginForm = (req, res) => {
    res.render("login", { title: "Login" });
};

exports.registerForm = (req, res) => {
    res.render("register", { title: "Register Your Account" });
};
exports.validateRegister = (rer, res, next) => {
    req.sanitizeBody("name");
    req.checkBody("name", "You must supply a name").notEmpty();
    req.checkBody("email", "That Email is not Valid").isEmail();
    req.sanitizeBody("email").normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
};