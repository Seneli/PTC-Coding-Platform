const router = require("express").Router();
const {
  signUp,
  logIn,
  logOut,
  loggedIn,
  requestPasswordReset,
  resetPassword,
  getUsers,
} = require("../controllers/userController");

router.post("/sign-up", signUp);
router.post("/login", logIn);
router.post("/pw-request", requestPasswordReset);
router.post("/pw-reset", resetPassword);

router.get("/log-out", logOut);
router.get("/loggedIn", loggedIn);
router.get("/allusers", getUsers);

module.exports = router;
