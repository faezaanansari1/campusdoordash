import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User : /api/user/register
export const register = async (req, res)=>{
    try {
        const{name, email, password, permission} = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message:'Missing Details'});
        }

        if (password.length < 8) {
           return res.json({ success: false, message: "Password too short" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.json({success: false, message:'User Already Exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email, 
            password:hashedPassword,
            permission: permission && ["customer", "retriever", "admin"].includes(permission) ? permission : "customer",
        });

        const token = jwt.sign({id: user._id,permission: user.permission},process.env.JWT_SECRET,{expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success: true, user: { _id: user._id, email: user.email, name: user.name, permission: user.permission},});
    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }

}

// Login User : /api/user/login
export const login = async (req, res)=>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.json({success: false, message:'Email and password are required'})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message:'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message:'Invalid email or password'})
        }

        const token = jwt.sign({id: user._id, permission: user.permission}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success: true, user: {_id: user._id, email: user.email, name: user.name, permission: user.permission}});
    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Check Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try{
        const token = req.cookies?.token;
        if (!token) return res.json({ success: false, message: "Unauthorized" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("_id email name permission");
        if (!user) return res.json({ success: false, message: "Unauthorized" });

        return res.json({ success: true, user });

    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Logout User : /api/user/logout
export const logout = async (req, res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict",   
        });
        return res.json({success: true, message: "Logged Out"})
    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}