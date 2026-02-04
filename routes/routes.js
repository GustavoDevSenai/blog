const express = require("express")
const router = express.Router()

const authController = require("../controller/authController")
const postController = require("../controller/postController")
const authMiddleware = require("../middlewares/authMiddleware")

//Usuario
router.post("/usuarios",authController.criarUsuario)
router.post("/login",authController.login)

//Posts
router.post("/posts", authMiddleware, postController.criarPost)
router.get("/posts", postController.listarPosts)

module.exports = router