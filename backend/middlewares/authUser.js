import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Load full user doc from DB
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;   // now req.user has .cart, .save(), etc.
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }
};

export default authUser;
