const router = require("express").Router();
const expenseController = require("../controllers/expense");
const authorization = require("../middlewares/auth");

router.post("/expense/create", expenseController.create);
router.get("/expense", expenseController.get);
router.post("/expense/delete", expenseController.delete);
router.get("/expense/download", authorization, expenseController.download);

module.exports = router;
