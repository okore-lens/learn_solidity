const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //constructor of web3
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = "Hi There!!!";

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // tells web3 the type of interface to expect
    .deploy({
      //tells web3 what we want to deploy
      data: bytecode,
      arguments: [INITIAL_STRING], // an array that passes arguments to the constructor function arguments of the contract
    })
    .send({ from: accounts[0], gas: "1000000" }); // instructs web3 to send a transation to create the contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    await inbox.methods
      .setMessage("World Is Shutting Down!!!")
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "World Is Shutting Down!!!");
  });
});

// /* Mocha Test */

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
