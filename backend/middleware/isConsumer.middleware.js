export const isConsumer = (req, res, next) => {
  try {
    // Assuming `req.user` is set by auth middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If role is not set or explicitly 'consumer'
    if (!req.user.role || req.user.role === 'consumer') {
      return next();
    }

    return res.status(403).json({ message: "Access denied: Consumers only" });
  } catch (error) {
    console.error("isConsumer Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


