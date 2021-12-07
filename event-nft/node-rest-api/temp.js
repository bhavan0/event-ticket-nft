const contract2 = require('truffle-contract');
const event_artifact = require('../event-contract/build/contracts/EventNFT.json');
var EventNFT = contract2(event_artifact);
var temp = require('web3-utils');
const contract = require("../event-contract/build/contracts/EventNFT.json");

module.exports = {

  getTicketInfo: function (callback) {
    var self = this;
    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.getTicketInfo({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTotalTickets: function (callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.totalTickets({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTicketsLeft: function (callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.ticketsLeft({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTicketCost: function (callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.ticketCost({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getEventName: function (callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.name({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getEventSymbol: function (callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.symbol({ from: self.web3.eth.coinbase });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  buyTicket: function (account, callback) {
    var self = this;

    // this.initWeb3();

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      console.log(account);
      return meta.buyTicket({ value: temp.toWei("1", "ether"), from: account });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  balanceOf: function (account, callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.balanceOf(account, { from: account });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  connectWallet: async function () {
    var self = this;

    if (self.web3.ethereum) { //check if Metamask is installed
      try {
        const address = await self.web3.ethereum.enable(); //connect Metamask
        const obj = {
          connectedStatus: true,
          status: "",
          address: address
        }
        return obj;

      } catch (error) {
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right."
        }
      }

    } else {
      return {
        connectedStatus: false,
        status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
      }
    }
  },

  payRandom: async function (account, callback) {
    var self = this;

    // const temp = await this.connectWallet();

    const contractAddress = '0xa5062Cf6Bb65a41e036414141346a6De0d2F9f56';

    const contract = new self.web3.eth.Contract(contract.abi, contractAddress);

    // console.log(helloWorldContract);
    // console.log(account);
    // console.log(self.web3.eth.accounts);

    // EventNFT.setProvider(self.web3.currentProvider);

    // var meta;

    // var temp = await helloWorldContract.methods.payOther({ value: 1000000000000000000, from: account });

    web3js.eth.getTransactionCount(account).then(function (v) {
      console.log("Count: " + v);
      count = v;
      var amount = web3js.utils.toHex(1e16);
      //creating raw tranaction
      var rawTransaction = {
        "from": account, "gasPrice": web3js.utils.toHex(20 * 1e9), "gasLimit": web3js.utils.toHex(210000),
        "to": contractAddress, "value": "0x0",
        "data": contract.methods.transfer(toAddress, amount).encodeABI(), "nonce": web3js.utils.toHex(count)
      }
      console.log(rawTransaction);
      //creating tranaction via ethereumjs-tx
      var transaction = new Tx(rawTransaction);
      //signing transaction with private key
      transaction.sign(privateKey);
      //sending transacton via web3js module
      web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
        .on('transactionHash', console.log);

      contract.methods.payOther().call({ value: 1000000000000000000, from: account })
        .then(function (balance) {
          console.log(balance);
          callback(balance);
        });
    });

    // helloWorldContract.methods.payOther().send({ value: 1000000000000000000, from: account }, function (err, res) {
    //   if (err) {
    //     console.log("error", err);
    //     callback('fail')
    //   }
    //   console.log('pass', res);
    //   callback(res);
    // })

    // console.log(temp);

    // callback(temp);

    // EventNFT.deployed().then(function (instance) {
    //   meta = instance;
    //   console.log('Inside');
    //   console.log(account);
    //   console.log(instance);
    //   return meta.payOther({ value: 1000000000000000000, from: account });
    // }).then(function (res) {
    //   callback(res);
    // }).catch(function (e) {
    //   console.log(e);
    //   callback("ERROR 404");
    // });
  },

  mint: function (account, callback) {
    var self = this;
    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.MintNew({ from: account });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  balanceOf2: function (account, callback) {
    var self = this;
    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function (instance) {
      meta = instance;
      return meta.balanceOf(account, { from: account });
    }).then(function (res) {
      callback(res);
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  }

}