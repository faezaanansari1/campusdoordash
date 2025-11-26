// Only allow users with a specific role, e.g. "retriever" or "admin"
export const requirePerm = (perm) => {
  return (req, res, next) => {
    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check permissions
    if (req.user.permission !== perm) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next(); 
  };
};

export default requirePerm;
