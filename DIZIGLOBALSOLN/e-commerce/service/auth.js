const jwt = require("jsonwebtoken");
const secretKey = "$123$Ujjwal@";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) {
    console.error("Error: Token is missing.");
    return null;
  }

  try {
    const decodedUser = jwt.verify(token, secretKey);
    return decodedUser;
  } catch (error) {
    console.error(`JWT Error: ${error.message}`);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
