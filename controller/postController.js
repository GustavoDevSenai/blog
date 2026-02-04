const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

exports.criarPost = async (req,res)=>{
    const {titulo, conteudo, usuarioId} = req.body

    const post = await prisma.post.create({data:{titulo,conteudo,usuarioId}})

    res.status(201).json(post)
}

exports.listarPosts = async (req, res)=>{
    const posts = await prisma.post.findMany()
    res.json(posts)
}