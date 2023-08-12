const router = require("express").Router();
const expenseController = require("../controllers/expense");

router.post("/expense/create", expenseController.create);
router.get("/expense", expenseController.get);
router.post("/expense/delete", expenseController.delete);

module.exports = router;
