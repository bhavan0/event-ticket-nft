var EventNFT = artifacts.require("EventNFT");


module.exports = function(deployer) {
  // deployer.deploy(EventNFT, 400, 1, "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/0", "UB Hackathon", "UBH");
  deployer.deploy(EventNFT);
};


