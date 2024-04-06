const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    parameter: { type: String, require: true }
});

const model = mongoose.model("configs", configSchema);

module.exports = model;