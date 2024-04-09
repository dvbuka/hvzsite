const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    role: { type: String, require: true },
    name: { type: String, require: true },
    tagged: { type: Boolean, default: false },
    exposed: { type: Boolean, default: false },
    numtags: { type: Number, default: 0 },
    mod: { type: Boolean, default: false },
    lifetime: { type: Number, default: 0 },
    achievements: { type: Array, default: {} },

});

const model = mongoose.model("ProfileModes", profileSchema);

module.exports = model;