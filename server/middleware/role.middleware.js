export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user comes from protect middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) not allowed to access this resource`,
      });
    }

    next();
  };
};
