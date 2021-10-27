// exports.myMiddleware = (req, res, next) => {
//     req.name = 'yes',
//         next()}
const mongoose = require('mongoose');
const Store = mongoose.model("Store")
exports.homePage = (req, res) => {
    // console.log(req.name);
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editstore', { title: 'Add Store' })
}

exports.createStore = async(req, res) => {
    const store = await (new Store(req.body).save())
    req.flash('success', `Store ${store.name} Created, 
    Care to Leave a Review?`)
    res.redirect(`/store/${store.slug}`)
}

exports.getStores = async(req, res) => {
    //query the database for a list if all the stores and extract the data from them.
    const stores = await Store.find();
    res.render('stores', {
        title: 'stores',
        stores
    })
}


exports.editStore = async(req, res) => {
    // 1. Find the store given the ID
    const store = await Store.findOne({ _id: req.params.id });
    // 2. confirm they are the owner of the store
    // TODO
    // 3. Render out the edit form so the user can update their store
    res.render('editstore', { title: `Edit ${store.name}`, store });
};