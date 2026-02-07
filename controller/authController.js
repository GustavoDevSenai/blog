const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()

exports.criarUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
    // 1️⃣ verificar se já existe usuário com esse email
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" })
    }

    // 2️⃣ criptografar senha
    const hashSenha = await bcrypt.hash(senha, 8)

    // 3️⃣ criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        email,
        senha: hashSenha
      }
    })

    // 4️⃣ resposta segura (não retorna senha)
    return res.status(201).json({
      id: usuario.id,
      email: usuario.email
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: "Erro ao criar usuário" })
  }
}


exports.login = async (req,res)=>{
    const {email,senha} = req.body


    const usuario = await prisma.usuario.findUnique({
        where:{email}
    })

    if(!usuario){
        return res.status(401).json({mensagem: "Email ou senha invalido"})
    }

    //comparação das senhas
    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if(!senhaValida){
        return res.status(401).json({mensagem: "Senha invalida!"})
    }

    //Gerar Token
    const token = jwt.sign(
        {id: usuario.id},
        process.env.JWT_SECRET,
        {expiresIn:"30m"}

    )

    res.json({token})
}