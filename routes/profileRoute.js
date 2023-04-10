const express = require("express");
const router = express.Router();
const profile = require("../models/profileSchema");

module.exports = router;

router.route("/leaderboard").get((req, res) => {
    profile.find().then(players => res.json(players))
});

router.route("/numregistered").get((req, res) => {
    profile.find().then(res.length)
});