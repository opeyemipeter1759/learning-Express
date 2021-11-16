const mongoose = require("mongoose");

exports.loginForm = (req, res) => {
    res.render("login", { title: "Login" });
};

exports.registerForm = (req, res) => {
    res.render("register", { title: "Register Your Account" });
};
exports.validateRegister = (req, res, next) => {
    req.sanitizeBody("name");
    req.checkBody("name", "You must supply a name").notEmpty();
    req.checkBody("email", "That Email is not Valid").isEmail();
    req.sanitizeBody("email").normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
    });
    req.checkBody("password", "Password Cannot be Blank").notEmpty();
    req
        .checkBody("password-confirm", "Confirm Password  Cannot be Blank !")
        .notEmpty();
    req
        .checkBody("password-confirm", "Oops! you Passwords do not match")
        .equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash(
            "errors",
            errors.map((err) => err.msg)
        );
        res.render("register", {
            title: "Register",
            body: req.body,
            flash: req.flash(),
        });
    }
};