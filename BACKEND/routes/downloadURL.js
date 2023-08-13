const router = require("express").Router();
const downloadURLController = require("../controllers/downloadURL");
const authorization = require("../middlewares/auth");

router.get("/downloadURL", authorization, downloadURLController.getAll);

module.exports = router;
