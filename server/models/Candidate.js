const User = require("./User");
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define("candidates", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "users",
        key: "username",
      },
    },
    election_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "elections",
        key: "election_id",
      },
    },
    vote_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Candidate;
};
