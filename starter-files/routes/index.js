const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { catchErrors } = require('../handlers/errorHandlers.js');
const storeMiddlewares = require("../middlewares/store.middlewares");

router.get('/', storeController.getStores);
router.get("/stores", catchErrors(storeController.getStores));
router.get('/add',
    storeController.addStore);
router.post('/add',
    storeMiddlewares.upload(),
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));
router.post('/add/:id',
    storeMiddlewares.upload(), catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/stores/:slug',
    catchErrors(storeController.getStoreBySlug))
module.exports = router;