const jwt = require("jsonwebtoken");
const JWT_SECRET = "SaintMsgInsan";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token!" });
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Please authenticate using a valid token!" });
    }
  }
};
module.exports = fetchUser;
