const path = require("path");
const fs = require("fs");
const solc = require("solc"); // solidity compiler

// __dirname sets you to the current working directory
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[":Inbox"]; //exporting contracts property
