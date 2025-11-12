import bcrypt from "bcryptjs";
import User from "../models/Users.js";

export const getMe = async (req, res) => {
    const me = await User.findById(req.user._id)
    .select("_id name email permission phoneNumber createdAt updatedAt");
    return res.json(me);
};

// PATCH /api/me  
export const updateMe = async (req, res) => {
    const allowed = ["name", "phoneNumber"]; 
    const update = {};

    for (const k of allowed) {
        if (req.body[k] != null){
            update[k] = String(req.body[k]).trim();
        } 
    }

    // basic phone normalization
    if (update.phoneNumber) {
        const raw = update.phoneNumber.replace(/\s|[-().]/g, "");
        if (!/^\+?[1-9]\d{6,14}$/.test(raw)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }
        update.phoneNumber = raw;
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            update,
            { 
                new: true, 
                runValidators: true, 
                context: "query" 
            }).select("_id name email permission phoneNumber");
        return res.json(user);
    } catch (e) {
        // handle duplicate key (e.g., email taken)
        if (e?.code === 11000) {
            return res.status(409).json({ message: "Value already in use" });
        }

        return res.status(500).json({ message: e.message });
    }
};

// PATCH /api/me/password  (requires current password)
export const changeMyPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "currentPassword and newPassword are required" });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    const user = await User.findById(req.user._id).select("+password");
    const ok = await bcrypt.compare(currentPassword, user.password); 
    if (!ok){
        return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.json({ ok: true });
};
