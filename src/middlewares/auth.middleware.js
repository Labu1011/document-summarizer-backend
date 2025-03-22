export const isAuthenticated = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized: Please log in" });
};
