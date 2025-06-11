export const isSupplier = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "supplier") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Not a supplier." });
  }
};
