const express = require("express");
const router = express.Router();
const profile = require("../models/profileSchema");

router.route("/leaderboard").get((req, res) => {
    profile.aggregate([{ $match: { role: "Zombie", exposed: true } }, { $sort: { numtags: -1 }}]).then(players => res.json(players))
});

router.route("/players").get((req, res) => {
    profile.find({$or:[{"role":"Zombie"} , {"role":"Human"}, {"role": "Registered"}]}, {"name":1,"_id":1}).then(players => res.json(players))});

/*router.route("/totals").get(async (req, res) => {
    let ret = {registered: 0, zombies: 0, humans: 0};

    for await (const player of profile.find()) {
        if (player.role == 'Zombie') {
            ret.zombies++;
        }
        if (player.role == 'Human') {
            ret.humans++;
        }
        if (player.role == 'Registered') {
            ret.registered++;
        }
    }
    return res.json(ret);
})*/

router.route("/totzombies").get((req, res) => {
    profile.find({"role":"Zombie"}, {"exposed":1, "_id":0}).then(players => res.json(players))});

router.route("/tothumans").get((req, res) => {
        profile.find({"role":"Humans"}, {"exposed":1, "_id":0}).then(players => res.json(players))});

 router.route("/tag").post(async (req, res) => {
    console.log(req.body.humanId, req.body.zombieId);
    await profile.updateOne({ _id: req.body.humanId }, { $set: { role: "Zombie", tagged: true, exposed: true } });

    console.log(req.body.zombieId);


    if(req.body.zombieId != "-1" && req.body.zombieId != "0") {
        let tagger = await profile.findOne({ _id: req.body.zombieId});
    if (tagger.role == "Zombie") {
        await profile.updateOne({ _id: tagger._id }, { $set: { numtags: (tagger.numtags + 1) } });
        }
    }
});


/*
router.route("/register").get(async (req, res) => {
    let newPlayer = await profileModel.create({
        role: "Registered",
        name: args.join(" ")
    });
});
*/


module.exports = router;