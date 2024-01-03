const express = require("express");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const election = require("./routes/election");
const cors = require("cors");

const app = express();
// const host = "10.241.13.65";
const host = "localhost";
const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/admin", admin);
app.use("/api/election", election);

app.listen(port, host, () => {
  console.log(`App is running at port https://${host}/${port}`);
});
