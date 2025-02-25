# Blockbio-Hive 🐦 Hive Chain Info for Your Twitter Bio

## Inspiration
This project was forked from https://github.com/russeree/blockbio and adapted for the Hive blockchain.

## What this repo is
This is a loose NodeJS Script to update your twitter bio 'description' with 
the latest Hive block height, Hive supply and HBD supply. Alternatively, it can use USD/Hive pair price priced from CoinGecko. This script is meant to be run in the form of

`path/to/node app.js`

To customize this script to fit your needs edit the class constructor argument for `BlockBio` to fit your profile 'bio' please remember the 160 char limit on your bio.

There also needs to be a `.env` file inyour project directory of the format ...

```
TWITTER_API_KEY="api_key"
TWITTER_API_KEY_SECRET="api_key_secret"
TWITTER_ACCESS_TOKEN="access_token"
TWITTER_ACCESS_TOKEN_SECRET="access_token_secret"
HIVE_API_NODE=""
```

This project is a non-production release designed to just be a **proof of concept**. 

## What this repo is not
This is not a ready-made application, steps must be taken to obtain a compatible API key with read/write permissions to your twitter profile.

## How to get your Twitter API keys (v1.1) required
To do this you will need to sign up for the Twitter API v2.0 which is free and automatic. Do this at the [Twitter Developer Portal](https://developer.twitter.com/ "Twitter Developer Portal"). After registering create a 'standalone app'. You now need to obtain elevated access to the Twitter API v.1.1 to be able to change your profile desctipion (bio) after that apply for elevated access. The aproval proccess involves an email and aproval in around 48 hours. Next setup Oauth 1.0 Access and enabled read/write.

After you set up the app make sure you change User authentication settings for the app to "Read and write". Detailed instruction for this step can be found here: https://stackoverflow.com/a/70958807. After setting "read and write" regenerate the Consumer keys. After supplying CONSUMER keys (TWITTER_API_KEY and TWITTER_API_KEY_SECRET) in your .env file, use the getAuthTokens.js script to complete the 3-legged OAuth flow. Save the resulting tokens in .env for TWITTER_ACCESS_TOKEN and TWITTER_ACCESS_TOKEN_SECRET.
