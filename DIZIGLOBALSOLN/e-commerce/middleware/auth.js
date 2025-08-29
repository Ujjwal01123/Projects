const jwt = require("jsonwebtoken");

const excludedPaths = [
  { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
  { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
  "/api/v1/users/login",
  "/api/v1/users/register",
];

// Function to check if token should be revoked
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    // Block if user is not admin
    return done(null, true); // revoked
  }
  done(); // allowed
}

function authJwt(req, res, next) {
  const isExcluded = excludedPaths.some((path) => {
    if (typeof path === "string") return req.path === path;
    if (path.url && path.methods) {
      return path.url.test(req.path) && path.methods.includes(req.method);
    }
    return false;
  });

  if (isExcluded) return next();

  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const bearerToken = token.split(" ")[1];
    const secret = process.env.SECRET_KEY;

    const decoded = jwt.verify(bearerToken, secret);

    //  Run isRevoked check
    isRevoked(req, decoded, (err, revoked) => {
      if (revoked) {
        return res
          .status(403)
          .json({ message: "Token revoked. Admin access only." });
      }

      // Attach both userId and isAdmin to request
      req.user = {
        id: decoded.userId,
        isAdmin: decoded.isAdmin,
      };

      next();
    });
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = { authJwt };
