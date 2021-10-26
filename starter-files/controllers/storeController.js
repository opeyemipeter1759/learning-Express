// exports.myMiddleware = (req, res, next) => {
//     req.name = 'yes',
//         next()}

exports.homePage = (req, res) => {
    // console.log(req.name);
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editstore', { title: 'Add Store' })
}

exports.createStore = (req, res) => {
    res.json(req.body)
}