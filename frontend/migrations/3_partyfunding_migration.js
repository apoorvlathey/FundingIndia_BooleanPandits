var PartyFunding = artifacts.require("./PartyFunding.sol");

module.exports = function(deployer) {
  deployer.deploy(PartyFunding);
};
