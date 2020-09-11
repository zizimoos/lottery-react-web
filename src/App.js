import React, { Component } from "react";
import Web3 from "web3";
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
  constructor(props) {
    super(props);
    this.state = {
      betRecords: [],
      winRecords: [],
      failRecords: [],
      pot: "0",
      challenges: ["A", "B"],
      finalRecords: [
        {
          bettor: "0xabcd....",
          index: "0",
          challenges: "ab",
          answer: "ab",
          targetBlockNumber: "10",
          pot: "0",
        },
      ],
    };
  }
  async componentDidMount() {
    await this.initWeb3();
    await this.pollData();
  }

  pollData = async () => {
    await this.getPot();
    // await this.getBetEvents();
  };
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

    // let pot = await this.lotteryContract.methods.getPot().call();
    // console.log("pot", pot);

    let owner = await this.lotteryContract.methods.owner().call();
    console.log("owner", owner);
  };

  getPot = async () => {
    let pot = await this.lotteryContract.methods.getPot().call();
    let potString = this.web3.utils.fromWei(pot.toString(), "ether");
    console.log(potString);
    this.setState({ pot: potString });
  };
  getBetEvents = async () => {
    const records = [];
    let events = await this.lotteryContract.getPastEvents("BET", {
      fromBlock: 0,
      toBlock: "latest",
    });

    for (let i = 0; i < events.length; i += 1) {
      const record = {};
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.bettor =
        events[i].returnValues.bettor.slice(0, 4) +
        "..." +
        events[i].returnValues.bettor.slice(40, 42);
      record.betBlockNumber = events[i].blockNumber;
      record.targetBlockNumber = events[
        i
      ].returnValues.answerBlockNumber.toString();
      record.challenges = events[i].returnValues.challenges;
      record.win = "Not Revealed";
      record.answer = "0x00";
      records.unshift(record);
    }

    this.setState({ betRecords: records });
  };

  bet = async () => {
    //nonce
    let challenges =
      "0x" +
      this.state.challenges[0].toLowerCase() +
      this.state.challenges[1].toLowerCase();
    let nonce = await this.web3.eth.getTransactionCount(this.account);
    this.lotteryContract.methods
      .betAndDistribute(challenges)
      .send({
        from: this.account,
        value: 5000000000000000,
        gas: 300000,
        nonce: nonce,
      })
      .on("transactionHash", (hash) => {
        console.log(hash);
      });
  };

  // pot money
  // bet 글자 선택 UI(버튼형식)
  // Bet button

  // History table
  // index address challenge answer pot status answerBlockNumber
  onClickCard = (_Character) => {
    this.setState({
      challenges: [this.state.challenges[1], _Character],
    });
  };
  getCard = (_Character, _cardStyle) => {
    return (
      <button
        className={_cardStyle}
        onClick={() => {
          this.onClickCard(_Character);
        }}
      >
        <div className="card-body text-center">
          <p className="card-text"></p>
          <p className="card-text text-center">{_Character}</p>
          <p className="card-text"></p>
        </div>
      </button>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1>Current Pot: {this.state.pot}</h1>
            <p>Bet hash Lottery</p>
            <p>Lottery tutorial</p>
            <p>Your Bet</p>
            <p>
              {this.state.challenges[0]}
              {this.state.challenges[1]}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="card-group">
            {this.getCard("A", "card bg-primary")}
            {this.getCard("B", "card bg-warning")}
            {this.getCard("C", "card bg-danger")}
            {this.getCard("D", "card bg-success")}
          </div>
        </div>
        <br></br>
        <div className="container">
          <button className="brn btn-danger btn-lg" onClick={this.bet}>
            {" "}
            BET !{" "}
          </button>
        </div>
        <br></br>
        <div className="container">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Index</th>
                <th>Address</th>
                <th>Challenge</th>
                <th>Answer</th>
                <th>Pot</th>
                <th>Status</th>
                <th>AnswerBlockNumber</th>
              </tr>
            </thead>
            <tbody>
              {this.state.finalRecords.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{record.pot}</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
