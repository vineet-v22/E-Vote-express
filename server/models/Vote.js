module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("votes", {
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
    candidate_username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "candidates",
        key: "username",
      },
    },
  });
  return Vote;
};
