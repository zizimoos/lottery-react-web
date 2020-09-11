import React, { Component } from "react";
import Web3 from "web3";
import logo from "./logo.svg";
import "./App.css";

let lotteryAddress = "0xB05cBCd2c5414ed69da4e9cE45eF3118f7194992";
let lotteryABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "BET",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "DRAW",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "FAIL",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "REFUND",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "answer",
        type: "bytes1",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
    ],
    name: "WIN",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "answerForTest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getSomeValue",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPot",
    outputs: [
      {
        internalType: "uint256",
        name: "pot",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
    ],
    name: "betAndDistribute",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
    ],
    name: "bet",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "distrubute",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "answer",
        type: "bytes32",
      },
    ],
    name: "setAnswerForTest",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
      {
        internalType: "bytes32",
        name: "answer",
        type: "bytes32",
      },
    ],
    name: "isMatch",
    outputs: [
      {
        internalType: "enum Lottery.BettingResult",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getBetInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "answerBlockNumber",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        internalType: "bytes1",
        name: "challenges",
        type: "bytes1",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
class App extends Component {
  async componentDidMount() {
    await this.initWeb3();
  }

  initWeb3 = async () => {
    if (window.ethereum) {
      console.log("recent mode");
      this.web3 = new Web3(window.ethereum);
      try {
        //request account access if needed
        await window.ethereum.enable();
        window.web3.eth.sendTransaction({});
      } catch (error) {
        console.log(`user denied account access error: ${error}`);
      }
    } else if (window.web3) {
      console.log("legacy mode");
      this.web3 = new Web3(Web3.currentProvider);
      this.web3.eth.sendTransaction({});
    } else {
      console.log(
        "non-Ethereum browser detected. you should consider trying Metamask!"
      );
    }
    // console.log(this.web3);
    let accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];
    console.log(accounts);

    this.lotteryContract = new this.web3.eth.Contract(
      lotteryABI,
      lotteryAddress
    );

    console.log(this.lotteryContract);

    let pot = await this.lotteryContract.methods.getPot().call();
    console.log("pot", pot);

    let owner = await this.lotteryContract.methods.owner().call();
    console.log("owner", owner);
  };

  bet = async () => {
    //nonce
    let nonce = await this.web3.eth.getTransactionCount(this.account);
    this.lotteryContract.methods.betAndDistribute("0xcd").send({
      from: this.account,
      value: 5000000000000000,
      gas: 300000,
      nonce: nonce,
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
