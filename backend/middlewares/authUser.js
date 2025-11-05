import jwt from "jsonwebtoken";

const authUser = async (req, res, next)=>{
    // Read token from cookie
    const {token} = req.cookies;
    if(!token){
        return res.json({success: false, message: "Not Authorized"})
    }

    try{
        // Verify and decode JWT
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.user = { id: tokenDecode.id, permission: tokenDecode.permission };
        }else{
            return res.status(401).json({success: false, message: "Not Authorized"})
        }
        next();

    } catch(error){
        res.status(401).json({success: false, message: error.message})
    }
}

export default authUser;
