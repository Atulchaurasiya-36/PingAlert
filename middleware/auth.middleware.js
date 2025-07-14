import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Access denied. No token found in cookie"
      });
    }
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = { id: decoded.userId }; 
    next(); 
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default auth;
