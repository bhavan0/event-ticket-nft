const contract = require('truffle-contract');
const Web3 = require('web3');

const event_artifact = require('../event-contract/build/contracts/EventNFT.json');
var EventNFT = contract(event_artifact);


module.exports = {

  getTicketInfo: function(callback) {
    var self = this;
    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.getTicketInfo({from: self.web3.eth.coinbase});
    }).then(function(res) {
        callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTotalTickets: function(callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.totalTickets({from: self.web3.eth.coinbase});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTicketsLeft: function(callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.ticketsLeft({from: self.web3.eth.coinbase});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getTicketCost: function(callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.ticketCost({from: self.web3.eth.coinbase});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getEventName: function(callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.name({from: self.web3.eth.coinbase});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getEventSymbol: function(callback) {
    var self = this;

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.symbol({from: self.web3.eth.coinbase});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  buyTicket: function(account, callback) {
    var self = this;

    // this.initWeb3();

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      console.log(account);
      return meta.buyTicket({ value: self.web3.utils.toWei("10", "ether"), from: account});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  balanceOf: function(account, callback) {
    var self = this;

    // this.initWeb3();

    EventNFT.setProvider(self.web3.currentProvider);

    var meta;
    EventNFT.deployed().then(function(instance) {
      meta = instance;
      return meta.balanceOf(account, { from: account});
    }).then(function(res) {
      callback(res);
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }

}