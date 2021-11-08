const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");
const storeService = require("../Services/store.service");

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith("image/");
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: `That filetype is not allowed!` }, false);
        }
    },
};

exports.homePage = (req, res) => {
    // console.log(req.name);
    res.render("index");
};

exports.addStore = (req, res) => {
    res.render("editstore", { title: "Add Store" });
};

// exports.upload = multer(multerOptions).single("photo");

exports.resize = async(req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extention = req.file.mimetype.split("/")[1];
    req.body.photo = `${uuid.v4()}.${extention}`;
    next();
};
exports.createStore = async(req, res) => {
    const store = await storeService.createStore(req.body, req.file.buffer);
    req.flash(
        "success",
        `Store ${store.name} Created, 
    Care to Leave a Review?`
    );
    res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async(req, res) => {
    //query the database for a list if all the stores and extract the data from them.
    const stores = await Store.find();
    res.render("stores", {
        title: "stores",
        stores,
    });
};

exports.editStore = async(req, res) => {
    // 1. Find the store given the ID
    const store = await Store.findOne({ _id: req.params.id });
    // 2. confirm they are the owner of the store
    // TODO
    // 3. Render out the edit form so the user can update their store
    res.render("editstore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async(req, res) => {
    req.body.location.type = "Point";

    // find and update the store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true,
    }).exec();
    req.flash(
        "success",
        `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`
    );
    res.redirect(`/stores/${store._id}/edit`);
    // Redriect them the store and tell them it worked
};

exports.getStoreBySlug = async(req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug });
    if (!store) return next();
    res.render('store', {
        store,
        title: store.name
    });
};