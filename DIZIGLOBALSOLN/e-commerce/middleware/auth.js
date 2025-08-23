const jwt = require("jsonwebtoken");

const excludedPaths = [
  { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
  { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
  "/api/v1/users/login",
  "/api/v1/users/register",
];

function authJwt(req, res, next) {
  // Check if request matches any excluded path
  const isExcluded = excludedPaths.some((path) => {
    if (typeof path === "string") {
      return req.path === path;
    }
    if (path.url && path.methods) {
      return path.url.test(req.path) && path.methods.includes(req.method);
    }
    return false;
  });

  if (isExcluded) {
    return next();
  }

  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const secret = process.env.SECRET_KEY;

    const decoded = jwt.verify(bearerToken, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = { authJwt };
