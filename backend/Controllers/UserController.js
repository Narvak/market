const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // validator
    // const {
    //   body: { email, password, nom, prenom },
    // } = req;

    const { nom, prenom, email, password } = req.body;

    // validation

    let user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "l'adrese email existe deja" });
    }

    user = new User(req.body);
    await user.save();
    // user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "le user n'existe pas" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
    res.json({ token });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
