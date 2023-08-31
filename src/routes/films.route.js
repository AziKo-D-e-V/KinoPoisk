const {Router} = require("express");
const { register, login, changePassword } = require("../controller/auth.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const { create, findOne, find } = require("../controller/film.controller");
const currentUser = require("../middlewares/currentUser.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const fileUpload = require("../middlewares/fileupload.middleware");

const router = new Router()
router.get('/film', find)

router.get('/film/:id', findOne)

router.post('/film',isAuth, currentUser, isAdmin, fileUpload, create)

module.exports = router;