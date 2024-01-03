module.exports = (sequilize, DataTypes) => {
  const Election = sequilize.define("elections", {
    election_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    election_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edate: {
      type: DataTypes.DATE,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
    },
  });
  return Election;
};
