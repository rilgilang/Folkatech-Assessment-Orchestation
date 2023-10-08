module.exports = checkBearer = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization == "") {
    res.status(401).json({ message: "authorization headers not valid" });
  }

  const token = JSON.parse(
    Buffer.from(req.headers.authorization.split(".")[1], "base64").toString()
  );

  req.user = token.user;

  next();
};
