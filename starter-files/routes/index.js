const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { catchErrors } = require('../handlers/errorHandlers.js');


router.get('/', storeController.getStores);
router.get("/stores", catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
// router.get('/add/:id', catchErrors(storeController.updateStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
module.exports = router;