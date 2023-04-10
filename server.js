const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

require('dotenv').config()

// connect to mongoose
mongoose.connect(process.env.MONGODB_SRV)

app.use("/api" , require("./routes/profileRoute.js"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
  });

app.listen(process.env.PORT || 3001, function() {
    console.log("express server is running on port 3001");
})