# Stats Bot

> **NOTE**:
>
> - This is an open-source project that is very much in development. Feel free to fork/PR this repo!
> - Join the Statistics Discord server [here](https://discord.gg/ACFvvdg). If you're looking for the statistics resource repository, it can be found [here](https://github.com/ghostiek/StatsResources.io).

### Table of Contents

- [Summary](#summary)
- [Getting Started](#getting-started)
- ...(Soon™)

## Summary

Info and assistance bot for the Statistics Discord server.

This project is released under the MIT license.

## Getting Started

As we do not currently host this bot publicly, if you want to bring this bot on board your server, you will need to run and maintain your own bot. There are a few things that you need to do to achieve this:

- Go [here](https://discordapp.com/developers/applications) and setup a bot (login may be required to the Discord app service, so double check the URL for security reasons).
- Once you've created a bot application, make sure and generate a bot token; it'll be needed momentarily.
- Use [this](https://discordapi.com/permissions.html) to generate a link to invite your bot to your Discord server. You can give your bot whatever permissions you trust. As you will be running this bot on your own hardware, Administrator permissions are acceptable. However, if others will have access to this bots runtime, strongly consider if you want to do this. Additionally, you will need to have permission to add a bot-user to the server, or request the admin of the server to do it for you.
- You will need [NodeJS](https://nodejs.org/en/download/package-manager/) installed locally to host the bot, so get that figured out (we recommend using NVM).

Once these preconditions are met, begin by getting a copy of the code-base from the repo ([.zip file](./archive/master.zip), [releases](./releases) or [fork this repo](./fork)).

Once you have a copy of the repository stored locally (and unarchived if necessary), open the folder it is in and create a new folder called `/auth/` and a new file inside that folder called `config.json`. Paste the following JSON into it

```
{
  "token": "123zxcv456asdf789qwer.aBot.token",
  "ownerID": [123456789, 987654321],
  "prefix": "!sb"
}
```

> `token` is your bot you acquired earlier via the Discord website.
>
> `ownerID` is an array of valid ownerIDs for the bot on your server. These IDs are [Discord user IDs](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).
>
> `prefix` is the prefix you want to use to ask StatsBot to do something (e.g. !sb ping).

From here, this doc will be broken into two segments. One for those looking to simply run their own instance of the bot, and one for those looking to contribute to development.

From here, we need to install the bot software dependencies which we can do using:

- If using NPM

```
npm install --production
```

- If using Yarn

```
yarn install --production
```

> **NOTE**: If wanting to help with development/work on your own variant, drop the `--production` bit to also download dev-dependencies for the bot, as they contain Nodemon, ESLint and Prettier. This will help maintain style with the rest of the repo.

Assuming that you've updated your `config.json` file correctly, you should now be able to simply run:

```
node bot.js
```

And _voilà_!
