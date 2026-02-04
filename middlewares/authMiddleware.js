const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({ mensagem: "Token não enviado" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.usuarioId = decode.id
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido" })
    }

}