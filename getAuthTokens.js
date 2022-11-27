import dotenv from 'dotenv';
import {TwitterApi} from 'twitter-api-v2';
import prompt from 'prompt';

dotenv.config();

let twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
twitterClient = twitterClient.readWrite;

const authLink = await twitterClient.generateAuthLink();

console.log('Go to the URL:')
console.log(authLink)

prompt.start()
const input = await prompt.get(['pin'])
console.log(input)

twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: authLink.oauth_token, // oauth token from previous step (link generation)
    accessSecret: authLink.oauth_token_secret, // oauth token secret from previous step (link generation)
    });
const readWriteClient = twitterClient.readWrite;

const { client: loggedClient, accessToken, accessSecret } = await readWriteClient.login(input.pin);

const user = await loggedClient.currentUser();
console.log('Logged in as:', user.name)

console.log('Save these tokens in .env:')
console.log('accessToken', accessToken, 'accessSecret', accessSecret)