import web3 from './web3';
import CampaignFactory from './build/campaignFactory.json'

// create new campaign factory on the address we stored in ADDRESS 
// and export to be available for any other files that need the campaign factory instance
const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '<YOUR_ACCOUNT_ADDRESS>'
);

export default instance;