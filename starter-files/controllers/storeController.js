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
    const store = new Store(req.body)
    await store.save()
    res.redirect('/')
    res.json(req.body)
}