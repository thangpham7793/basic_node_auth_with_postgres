const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");

router.get("/signup", authControllers.signupGETHandler);
router.post("/signup", authControllers.signupPOSTHandler);
router.get("/login", authControllers.loginGETHandler);
router.post("/login", authControllers.loginPOSTHandler);
router.get("/select", authControllers.selectAllHandler);
// router.get("/signup", () => {});

module.exports = router;
