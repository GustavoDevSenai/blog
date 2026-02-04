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
    const usuario = await prisma.usuario.findFirst({where: {email,senha}})

    if(!usuario){
        return res.status(401).json({mensagem: "Login invalido!"})
    }
    res.json({usuarioId: usuario.id})
}