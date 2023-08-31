const { Router } = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controller/auth.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const currentUser = require("../middlewares/currentUser.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const fileUpload = require("../middlewares/fileupload.middleware");
const { changeBalance, find, create } = require("../controller/user.controller");

const router = new Router();

router.post("/user/payment", isAuth, currentUser, changeBalance);
router.get("/users", isAuth, currentUser, isAdmin, find);
router.post("/user/create", isAuth, currentUser, isAdmin, create);

module.exports = router;
