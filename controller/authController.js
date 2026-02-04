const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()

exports.criarUsuario = async (req,res) =>{

    const {email,senha} = req.body

    //criptografando a senha do usuario
    const hashSenha = await bcrypt.hash(senha,8)
    //Aplicacao do prisma
    const usuario = await prisma.usuario.create({data: {email,senha:hashSenha}})
    res.status(201).json({id: usuario.id, email: usuario.email})
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