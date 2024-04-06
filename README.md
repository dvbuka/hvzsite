# Davis HvZ Website

Run: `node server.js`

The frontend is written in React, with MongoDB Atlas as the database, and backend with express and some axios. Discord is used for OAuth2 as this serves as a companion to the HVZBot Discord bot.

`server.js` starts the express server, which serves the React files.

TODO:
- store token and refresh token in memory
    - expires would be helpful too
    - maybe store entire access token?

- add profiles

- sync roles with bot!