const router = require("express").Router();
const { createAdminAccount, loginAdminAccount } = require("../controllers/AdminController");

router.post("/create-admin-account", createAdminAccount);
router.post("/login-admin-account", loginAdminAccount);

module.exports = router;
