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