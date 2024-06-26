/* Configuration */
const express = require("express");
const router = express.Router();
const profile = require("../models/profileSchema");
const config = require("../models/configSchema");
require('dotenv').config()

/* Set up Discord bot for role changes */
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const guildIDs = {
    zombieRole: "968258177013542993",
    zombieChannel: "1222456449763115008",
    humanRole: "968420862900441108",
    humanChannel: "1222456229239062528"
}

let guild = null;
let updateChannel = null
client.once('ready', () => {
    client.login(process.env.DISCORD_TOKEN);
    console.log('HvZBot is ready!')
    guild = client.guilds.cache.get("959184478918565989");
    updateChannel = guild.channels.cache.get("1095518748775039026");
});

client.login(process.env.DISCORD_TOKEN);

async function updateRole(role, playerID) {
    console.log("Update:", role, playerID)
    try {
        let playerAcct = await guild.members.fetch(playerID);

        /* guild.channels.resolve(guildIDs.zombieChannel).permissionOverwrites.create(playerAcct, {
            VIEW_CHANNEL: false});
           guild.channels.resolve(guildIDs.zombieChannel).permissionOverwrites.create(playerAcct, {
            VIEW_CHANNEL: false}); */ // for OZs only

        if (role == "Human") {
            playerAcct.roles.add(guildIDs.humanRole);
            playerAcct.roles.remove(guildIDs.zombieRole);
        } else if (role == "Zombie") {
            playerAcct.roles.add(guildIDs.zombieRole);
            playerAcct.roles.remove(guildIDs.humanRole);
        } else if (role == "Unregistered") {
            playerAcct.roles.remove(guildIDs.humanRole);
            playerAcct.roles.remove(guildIDs.zombieRole);
        }
    } catch {
        console.log("Discord role change did not work.")
    }
}

function sendUpdate(text) {
    updateChannel.send(text);
}

/* Trade code */
async function tradeCode(authCode, redirect_tail) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', authCode);
    let redirect_uri = process.env.REDIRECT_URI + redirect_tail
    console.log(redirect_uri)
    params.append('redirect_uri', redirect_uri);
    params.append('scope', 'identify');
    let site = await fetch("https://discord.com/api/oauth2/token", {
        'method': 'POST',
        'body': params,
        'headers':
            { 'Content-type': 'application/x-www-form-urlencoded' },
    })
    let response = await site.json();
    console.log("auth code response: ", response)
    return response;
}

router.route('/tradecode').post(async (req, res) => {
    console.log("origin auth code:", req.body.authCode)
    let response = await tradeCode(req.body.authCode, req.body.redirect_tail)
    res.append("access_token", response["access_token"]);
    res.append("expires_in", response["expires_in"]);
    res.append("refresh_token", response["refresh_token"]);
    res.end("Success!");
});


/* Trade token for user info + refresh */
router.route('/identifyuser').post(async (req, res) => {
    console.log("token", req.body.access_token)

    // GET ID
    let site = await fetch("https://discord.com/api/v9/users/@me", {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${req.body.access_token}` }
    });
    let response = await site.json();
    console.log("response", response)

    res.append("username", response.username);
    res.append("avatar", response.avatar);
    res.append("id", response.id);

    // Refresh tokens
    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', req.body.refresh_token);

    site = await fetch("https://discord.com/api/oauth2/token", {
        'method': 'POST',
        'body': params,
        'headers':
            { 'Content-type': 'application/x-www-form-urlencoded' },
    })

    response = await site.json();
    res.append("access_token", response["access_token"]);
    res.append("expires_in", response["expires_in"]);
    res.append("refresh_token", response["refresh_token"]);
    console.log("response 2", response)
    res.end("Success!");
});

/* Trade and identify */
router.route('/tradecodeidentify').post(async (req, res) => {
    console.log("origin auth code:", req.body.authCode)
    let traded_code = await tradeCode(req.body.authCode, req.body.redirect_tail)

    let refresh_token = traded_code["refresh_token"]

    // GET ID
    let site = await fetch("https://discord.com/api/v9/users/@me", {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${traded_code["access_token"]}` }
    });
    response = await site.json();
    console.log("response", response)



    // REFRESH
    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);

    let new_site = await fetch("https://discord.com/api/oauth2/token", {
        'method': 'POST',
        'body': params,
        'headers':
            { 'Content-type': 'application/x-www-form-urlencoded' },
    })

    let new_response = await new_site.json();
    console.log("response 2", new_response)

    res.set("accesstoken", new_response["access_token"])
    res.set("expiresin", new_response["expires_in"])
    res.set("refreshtoken", new_response["refresh_token"])
    res.set("username", response.username);
    res.set("avatar", response.avatar);
    res.set("id", response.id);
    res.end("Success!")
})

/* */
async function authUser(req, res) {
    // GET ID
    let site = await fetch("https://discord.com/api/v9/users/@me", {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${req.body.access_token}` }
    });

    let response = await site.json();

    const params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', req.body.refresh_token);

    site = await fetch("https://discord.com/api/oauth2/token", {
        'method': 'POST',
        'body': params,
        'headers':
            { 'Content-type': 'application/x-www-form-urlencoded' },
    })

    let refresh_response = await site.json();
    res.append("accesstoken", refresh_response["access_token"]);
    res.append("expiresin", refresh_response["expires_in"]);
    res.append("refreshtoken", refresh_response["refresh_token"]);

    return response;
}

/* Cached values */
let player_stats = { leaderboard: {}, players: {}, users: {}, totzombies: {}, tothumans: {}, }

update_stores()

async function update_stores() {
    profile.aggregate([{ $match: { role: "Zombie", exposed: true } }, { $sort: { numtags: -1 } }]).then(ret => player_stats.leaderboard = ret)
    profile.find({ $or: [{ "role": "Zombie" }, { "role": "Human" }, { "role": "Registered" }] }, { "name": 1, "_id": 0, "userID": 1 }).then(ret => player_stats.players = ret)
    profile.find({}, { "name": 1, "_id": 0 }).then(ret => player_stats.users = ret)
    profile.find({ "role": "Zombie" }, { "numtags": 1, "_id": 0 }).then(ret => player_stats.totzombies = ret)
    profile.find({ "role": "Human" }, { "numtags": 1, "_id": 0 }).then(ret => player_stats.tothumans = ret)
}

router.route("/leaderboard").get((_, res) => {
    //if (player_stats.leaderboard != null)
    //    res.json(player_stats.leaderboard)
    //else {
        profile.aggregate([{ $match: { role: "Zombie", exposed: true } }, { $sort: { numtags: -1 } }]).then(ret => res.json(ret))
    //}
});

router.route("/players").get((_, res) => {
    //if (player_stats.players != null)
    //    res.json(player_stats.players)
    //else {
        profile.find({ $or: [{ "role": "Zombie" }, { "role": "Human" }, { "role": "Registered" }] }, { "name": 1, "_id": 0, "userID": 1 }).then(ret => res.json(ret))
    //}
});

router.route("/users").get((_, res) => {
    //if (player_stats.users != null)
    //    res.json(player_stats.users)
    //else {
        profile.find({}, { "name": 1, "_id": 0 }).then(ret => res.json(ret))
    //}
});

router.route("/totzombies").get((_, res) => {
    //if (player_stats.totzombies != null)
    //    res.json(player_stats.totzombies)
    //else {
        profile.find({ "role": "Zombie" }, { "numtags": 1, "_id": 0 }).then(ret => res.json(ret))
    //}

});

router.route("/tothumans").get((_, res) => {
    //if (player_stats.tothumans != null)
    //    res.json(player_stats.tothumans)
    //else {
        profile.find({ "role": "Human" }, { "numtags": 1, "_id": 0 }).then(ret => res.json(ret))
    //}
});

/* Report page */
router.route("/tag").post(async (req, res) => {
    try {
        let response = await authUser(req, res);

        if (response == null || response.id == null || response.id == undefined) {
            res.end("Failed to authenticate!");
            return;
        }

        let reporter = await profile.findOne({ userID: response.id })

        /* Check if the user is authorized to make this tag (mod or zombie). */
        if (reporter == null || !(reporter.mod || reporter.name == req.body.zombieId || reporter.role != "Zombie")) {
            res.end("Unauthorized!");
            return; // Do not update
        }

        /* Make the human zombie */
        let human = await profile.findOne({ name: req.body.humanId })

        if (human == null) {
            res.end("Couldn't indentify human!");
            return;
        }

        await profile.updateOne({ name: req.body.humanId }, { $set: { role: "Zombie", tagged: true, exposed: true } });
        await updateRole("Zombie", human.userID)

        /* Update zombie tags */
        if (req.body.zombieId != null) {
            let tagger = await profile.findOne({ name: req.body.zombieId });
            if (tagger != null && tagger.role == "Zombie") {
                await profile.updateOne({ name: tagger.name }, { $set: { numtags: (tagger.numtags + 1) } });
            }
        }

        sendUpdate(req.body.humanId + ` was turned into a Zombie${req.body.zombieId == null ? "!" : ` by ${req.body.zombieId}.`}`)

        // Update stores
        update_stores()
        
        res.end("Submit worked!");
    }
    catch {
        res.end("Submit did not work. Please reauthenticate!");
    }
});

router.route("/update").post(async (req, res) => {
    try {
        let response = await authUser(req, res);

        if (response == null || response.id == null || response.id == undefined) {
            res.end("Failed to authenticate!");
            return;
        }

        let reporter = await profile.findOne({ userID: response.id })

        if (!reporter.mod) {
            res.end("Unauthorized!");
            return;
        }

        let player = await profile.findOne({ name: req.body.player })
        if (player == null) {
            res.end("Failed to identify player!");
            return;
        }

        /* Update role */
        if (req.body.newRole != null) {
            await profile.updateOne({ name: req.body.player }, { $set: { role: req.body.newRole } });
            //updateRole(role.body.newRole, player.userID)
        }

        /* Update name */
        if (req.body.newName != null) {
            await profile.updateOne({ name: req.body.player }, { $set: { name: req.body.newName } });
        }

        /* Update tags */
        if (req.body.newTags != null) {
            await profile.updateOne({ name: req.body.player }, { $set: { numtags: req.body.newTags } });
        }

        if (req.body.newLifetags != null) {
            await profile.updateOne({ name: req.body.player }, { $set: { lifetime: req.body.newLifetags } });
        }

        // Update stores
        update_stores()

        res.end("Submit worked!");
    }
    catch {
        res.end("Submit did not work. Please reauthenticate!");
    }
});

/* User update themselves */
router.route("/userupdate").post(async (req, res) => {
    try {
        let response = await authUser(req, res);

        if (response == null || response.id == null || response.id == undefined) {
            res.end("Failed to authenticate!");
            return;
        }

        let reporter = await profile.findOne({ userID: response.id })

        /* Check if the user is authorized to make this tag (mod or zombie). */
        if (reporter == null) {
            res.end("Unauthorized!");
            return; // Do not update
        }

        /* Update name if need */
        if (req.body.newName != null) {
            let f = await profile.findOne({ name: req.body.newName })

            if (f != null) {
                res.end("Name already in use.");
                return;
            }
            await profile.updateOne({ userID: response.id }, { $set: { name: req.body.newName } });
        }

        if (req.body.registerMe != null) {
            if (reporter.role == "Unregistered") {
                await profile.updateOne({ userID: response.id }, { $set: { role: "Registered" } });
                //updateRole("Human", response.id)
            }
        }

        if (req.body.newAvatar != null) {

        }

        // Update stores
        update_stores()

        res.end("Submit worked!");
    }
    catch {
        res.end("Submit did not work. Please reauthenticate!");
    }
});

router.route("/player/:id").get((req, res) => {
    profile.findOne({ userID: req.params.id }).then(p => res.json(p))
});

module.exports = router;
