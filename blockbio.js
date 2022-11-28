import dotenv from 'dotenv';
import {TwitterApi} from 'twitter-api-v2';
import esMain from 'es-main';
//import CoinGecko from 'coingecko-api';
import { Client, DatabaseAPI } from '@hiveio/dhive';

dotenv.config();

class BlockBio{
    constructor(bioText = ''){
        this.bioText = bioText;
        const twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_KEY_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        this.client = twitterClient.readWrite;
        //this.coinGeckoClient = new CoinGecko();

        const hiveClient = new Client([process.env.HIVE_API_NODE]);
        this.database = new DatabaseAPI(hiveClient);
    }
    async setPriceBio(){
        let geckoData = await this.coinGeckoClient.exchanges.fetchTickers('binance', {
            coin_ids: ['hive']
        });
        for(let ticker of geckoData.data.tickers){
            if(ticker.target == 'USD'){
                let current = new Date();
                let cTimeStamp = `${current.toLocaleDateString()} ${current.toLocaleTimeString()}`;
                let priceText = parseInt(ticker.last).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                console.log(`Updated bio price with a value of $${priceText}`)
                await this.client.v1.updateAccountProfile({description: `${this.bioText} HIVE/USD $${priceText} - ${cTimeStamp} PST`});
            }
        }
    }
    /**
     * Updates a twitter bio by appending chain props
     */
    async setNodeBio(){
        
        const chainInfo = await this.database.getDynamicGlobalProperties()
        //console.log(chainInfo)
        const blockHeight = chainInfo.head_block_number.toLocaleString()
        const hiveSupply = parseFloat(chainInfo.current_supply.split(' ')[0]).toLocaleString()
        const hbdSupply = parseFloat(chainInfo.current_hbd_supply.split(' ')[0]).toLocaleString()
        const bioText = `${this.bioText} ♦️⛓ real-time stats - block height: ${blockHeight} | $HIVE supply: ${hiveSupply} | $HBD supply: ${hbdSupply}`
        
        console.log(`Updating Twitter description with: ${bioText}`)
        try {
            await this.client.v1.updateAccountProfile({description: bioText});
        } catch (e) {
            console.log(e)
        }
    }
}

(async()=>{
    if(esMain(import.meta)){
        console.log(`Running BlockBio as 'main()' - Enjoy`)
        let blockBio = new BlockBio('#Hive');
        setInterval(async () => {
            try{
                await blockBio.setNodeBio();
            }
            catch (e) {
                console.log(`Failed to write Twitter profile description with error: ${e}`);
            }
        }, 10000)
    }
})();
