import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Used to remove fluff from a phone number
const normalizePhone = (raw = "") => raw.replace(/\D/g, "");

// Register User : /api/user/register
export const register = async (req, res)=>{
    try {
        const{name, email, password, permission, phoneNumber} = req.body;

        if(!name || !email || !password || !permission || !phoneNumber){
            return res.status(400).json({success: false, message:'Missing Details'});
        }

        // Password length must be greater than 8
        // if (password.length < 8) {
        //    return res.status(400).json({ success: false, message: "Password too short" });
        // }

        // Normalize email
        const normEmail = email.trim().toLowerCase();
        if (!normEmail.endsWith("@umbc.edu")) {
            return res.status(400).json({ success: false, message: "Email must be a UMBC email address" });
        }

        // Check if user exists
        const existingUser = await User.findOne({email: normEmail});
        if(existingUser)
            return res.status(409).json({success: false, message:'User Already Exists'});

        let cleanedPhone = null;
        const raw = normalizePhone(phoneNumber);   

        // Require exactly 10 digits
        if (!/^\d{10}$/.test(raw)) {
            return res.status(400).json({success: false, message: "Phone number must be a 10-digit number" });
        }
        cleanedPhone = raw;

        const existingPhoneUser = await User.findOne({ phoneNumber: cleanedPhone });
        if (existingPhoneUser) {
            return res.status(409).json({success: false, message: "Phone number already in use"});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name, 
            email, 
            password:hashedPassword,
            permission: permission && ["user", "retriever", "admin"].includes(permission) ? permission : "user",
            phoneNumber: cleanedPhone,
        });

        // Issue JWT
        const token = jwt.sign({id: user._id,permission: user.permission},process.env.JWT_SECRET,{expiresIn: "7d"});

        // Set auth Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({success: true, user: { _id: user._id, email: user.email, name: user.name, permission: user.permission},});
    } catch (error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }

}

// Login User : /api/user/login
export const login = async (req, res)=>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message:'Email and password are required'})
        }

        // Normalize email
        const normEmail = email.trim().toLowerCase();
        
        // Find user
        const user = await User.findOne({email: normEmail});
        if(!user){
            return res.status(400).json({success: false, message:'Invalid email or password'})
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({success: false, message:'Invalid email or password'})
        }

        // Issue JWT
        const token = jwt.sign({id: user._id, permission: user.permission}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, user: {_id: user._id, email: user.email, name: user.name, permission: user.permission}});
    } catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Check Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try{
        const token = req.cookies?.token;
        if (!token) return res.json({ success: false, message: "Unauthorized" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("_id email name phoneNumber permission");
        if (!user) return res.json({ success: false, message: "Unauthorized" });

        return res.json({ success: true, user });

    } catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Logout User : /api/user/logout
export const logout = async (req, res)=>{
    try{
        // Clear the auth cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none": "strict",   
        });
        return res.json({success: true, message: "Logged Out"})
    } catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}