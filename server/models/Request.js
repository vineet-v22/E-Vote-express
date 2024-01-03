module.exports = (sequilize, DataTypes) => {
  const Request = sequilize.define("requests", {
    req_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "users",
        key: "username",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Request;
};
