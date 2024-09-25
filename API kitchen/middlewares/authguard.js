const jwt = require('jsonwebtoken')

const authguard = (req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, "cryptKey");
        const decodedToken = jwt.decode(token)
        req.userid = decodedToken.userid
        next()
    } catch (error) {
        res.json({message: "mauvais token"})
    }
}

module.exports = authguard