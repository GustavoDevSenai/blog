const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

exports.criarPost = async (req, res) => {
  const { titulo, conteudo } = req.body
  const usuarioId = req.usuarioId // vem do JWT

  const post = await prisma.post.create({
    data: {
      titulo,
      conteudo,
      usuarioId
    }
  })

  res.status(201).json(post)
}

exports.listarPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        usuario: {
          select: { email: true }
        }
      }
    })

    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao listar posts" })
  }
}