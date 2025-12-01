import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";
import User from "../models/Users.js";

export const createRestaurant = async (req, res) => {
  const r = await Restaurant.create(req.body);
  return res.status(201).json(r);
};

export const updateRestaurant = async (req, res) => {
  const r = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!r){
    return res.status(404).json({ message: "Not found" });
  } 

  return res.json(r);
};

export const deleteRestaurant = async (req, res) => {
  await MenuItem.deleteMany({ restaurant: req.params.id });
  await Restaurant.findByIdAndDelete(req.params.id);
  return res.status(204).end();
};

export const createMenuItem = async (req, res) => {
  const m = await MenuItem.create(req.body);
  return res.status(201).json(m);
};

export const updateMenuItem = async (req, res) => {
  const m = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!m){
    return res.status(404).json({ message: "Not found" });
  }

  return res.json(m);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  return res.status(204).end();
};

export const listUsers = async (_req, res) => {
  const users = await User.find({}, "name email permission phoneNumber createdAt").lean();
  return res.json(users);
};

export const setUserRole = async (req, res) => {
  const { permission } = req.body;
  if (!["user","retriever","admin"].includes(permission)){
    return res.status(400).json({ message: "Invalid permission" });
  }

  const u = await User.findByIdAndUpdate(req.params.id, { permission }, { new: true }).select("name email permission phoneNumber");
  if (!u){
    return res.status(404).json({ message: "Not found" });
  }
  return res.json(u);
};

export const removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(204).end();
};

