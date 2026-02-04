const express = require("express")
const router = express.Router()

const authController = require("../controller/authController")
const postController = require("../controller/postController")

//Usuario
router.post("/usuarios",authController.criarUsuario)
router.post("/login",authController.login)

//Posts
router.post("/posts", postController.criarPost)
router.get("/posts", postController.listarPosts)

module.exports = router