db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET = "SaintMsgInsan";
const { User, PendingUser } = db;

const createUser = async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = errors.array();
    return res.status(400).json({ error: error[0].msg });
  }
  let user = await PendingUser.findOne({
    where: {
      [Op.or]: {
        username: req.body.username,
        email: req.body.email,
      },
    },
  });
  let user2 = await User.findOne({
    where: {
      [Op.or]: {
        username: req.body.username,
        email: req.body.email,
      },
    },
  });

  if (user || user2) {
    return res
      .status(400)
      .json({ error: "This username or email already exists!" });
  }
  const newUser = PendingUser.build(req.body);
  newUser.reg_date = new Date();

  if (!newUser.city) {
    newUser.city = "Indore";
  }
  if (!newUser.pin_code) {
    newUser.pin_code = 452020;
  }

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  try {
    await newUser.save();
    const data = { id: newUser.username };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.status(200).json({ authToken });
  } catch (error) {
    console.log("Some error has occured", error);
    return res.status(400).json({ error: "Some error has occured." });
  }
};

// ########################################################################

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials." });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials." });
    }

    const data = { user: { id: user.username } };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken, username: user.username, name: user.first_name });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error has occured");
  }
};
// ###################################################################
const getUser = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(200).json({ error: true });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  try {
    await User.update(req.body, {
      where: {
        username: req.body.username,
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createUser, login, getUser, updateUser };
