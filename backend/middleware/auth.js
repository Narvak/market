const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    // Bearer <token>
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Envoyer le token" });
    }

    // decodedToken c'est le payload
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);

    // userData c'est le payload
    // if (payload.role == "admin") {
    //   req.payload = payload;
    //   next();
    // } else {
    //   res
    //     .status(401)
    //     .json({ message: "l'API est accessible seulement au admin du site" });
    // }
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};
