const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const AdminControllers = require("../controllers/admin");

router.post("/signup", AdminControllers.user_signup);

router.post("/login", AdminControllers.user_login);

router.delete("/:adminId", checkAuth, AdminControllers.user_delete);

module.exports = router;
