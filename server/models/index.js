const Seqeulize = require("sequelize");
const { DataTypes } = Seqeulize.Sequelize;
const sequelize = new Seqeulize("evoteexpress", "root", "Z0eak#z0w52.", {
  dialect: "mysql",
  logging: false,
  host: "localhost",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const db = { Seqeulize, sequelize };
db.User = require("./User")(sequelize, DataTypes);
db.Election = require("./Election")(sequelize, DataTypes);
db.Candidate = require("./Candidate")(sequelize, DataTypes);
db.Vote = require("./Vote")(sequelize, DataTypes);
db.Result = require("./Result")(sequelize, DataTypes);
db.PendingUser = require("./PendingUser")(sequelize, DataTypes);
db.Request = require("./Request")(sequelize, DataTypes);

sequelize
  .authenticate()
  .then((result) => {
    console.log("Database has been connected successfully!");
  })
  .catch((err) => {
    console.log("Some error has occured!", err);
  });

db.sequelize
  .sync({ force: false })
  .then((result) => {})
  .catch((err) => {
    console.log("Some error has occured", err);
  });
module.exports = db;
