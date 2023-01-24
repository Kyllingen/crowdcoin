const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// read sol file source
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

// compile both contracts and save to build directory
const output = JSON.parse(
    solc.compile(JSON.stringify(input))).contracts["Campaign.sol"];
fs.ensureDirSync(buildPath);


for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

