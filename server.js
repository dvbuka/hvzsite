const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

require('dotenv').config()

let dev = false;

// connect to mongoose
mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database!');
}).catch((err) => {
  console.log(err);
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/profileRoute.js"));
app.use("/auth", require("./routes/authRoute.js"));

if (!dev) {
  app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
  });
}

port = process.env.PORT || 3001
app.listen(port, function () {
  console.log("express server is running on port " + port);
})