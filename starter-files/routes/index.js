const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController.js");
const userController = require("../controllers/userController.js");
const { catchErrors } = require("../handlers/errorHandlers.js");
const storeMiddlewares = require("../middlewares/store.middlewares");

router.get("/", storeController.getStores);

router.get("/stores", catchErrors(storeController.getStores));

router.get("/add", storeController.addStore);

router.post(
    "/add",
    storeMiddlewares.upload(),
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore)
);

router.post(
    "/add/:id",
    storeMiddlewares.upload(),
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore)
);

router.get("/stores/:id/edit", catchErrors(storeController.editStore));

router.get("/stores/:slug", catchErrors(storeController.getStoreBySlug));

router.get("/tags", catchErrors(storeController.getStoresByTag));
router.get("/tags/:tags", catchErrors(storeController.getStoresByTag));

router.get("/login", userController.loginForm);
router.get(
    "/register",
    userController.validateRegister,
    userController.registerForm
);
module.exports = router;