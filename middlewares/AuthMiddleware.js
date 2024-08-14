import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) res.status(403).send("Toekn is not valid");
    req.userId = payload.userId;
    next();
  });
};
