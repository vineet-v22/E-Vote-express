const db = require("../models");
const { User, PendingUser, Request } = db;

const fetchAllUser = async (req, res) => {
  try {
    let users = await User.findAll();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(200).json({ error: "No users are there in database." });
    }
  } catch (error) {
    res.status(400).json({ error: "Some error occured." });
  }
};
// ########################################################################
const fetchPendingUser = async (req, res) => {
  try {
    let users = await PendingUser.findAll();
    if (users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(200).json({ error: "No pending registrations are there." });
    }
  } catch (error) {
    res.status(400).json({ error: "Some error occured." });
  }
};

const adminResponse = async (req, res) => {
  try {
    const { username, resp } = req.body;

    const user = await PendingUser.findOne({
      where: {
        username: username,
      },
    });

    if (resp == 1) {
      const newUser = await User.create(user.dataValues);
    }
    await PendingUser.destroy({
      where: {
        username: username,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Some error occured." });
  }
};

const fetchAllRequest = async (req, res) => {
  try {
    const requests = await Request.findAll();
    if (!requests) {
      return res.status(200).json({ error: "There are no pending requests." });
    }
    return res.status(200).json({ requests });
  } catch (error) {
    res.status(400).json({ error: "Some error occured." });
  }
};
// ################################################################
const deleteRequest = async (req, res) => {
  try {
    const { req_id } = req.body;
    const response = await Request.destroy({
      where: {
        req_id: req_id,
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Some error occured." });
  }
};

module.exports = {
  fetchAllUser,
  fetchPendingUser,
  adminResponse,
  fetchAllRequest,
  deleteRequest,
};
