module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define("results", {
    election_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "elections",
        key: "election_id",
      },
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "users",
        key: "username",
      },
    },
    standing: { type: DataTypes.INTEGER, allowNull: false },

    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Result;
};

// DROP TABLE IF EXISTS results;
// CREATE TABLE results(
// username VARCHAR(255),
// election_id INT,
// standing INT,
// PRIMARY KEY(username,election_id),
// FOREIGN KEY(election_id,username) REFERENCES candidates(election_id,username)
// );
