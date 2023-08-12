const router = require("express").Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/user/signup", userController.signup);
router.post("/user/signin", userController.signin);
router.post("/user/get", userController.get);
router.patch("/user/update", userController.update);
router.get("/user/getLeaderboard", userController.getLeaderboard);

module.exports = router;
