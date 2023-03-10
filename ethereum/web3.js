import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}
else {
    // we are on server *OR* user is not running metamask
    const provider = new Web3.providers.HttpProvider("<YOUR_NODE_ADDRESS");
    web3 = new Web3(provider);
}

export default web3;