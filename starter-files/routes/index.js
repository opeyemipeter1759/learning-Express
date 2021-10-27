const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { catchErrors } = require('../handlers/errorHandlers.js');


router.get("/stores", storeController.getStores);
router.get('/', storeController.getStores);
router.get('/add', storeController.addStore);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
module.exports = router;