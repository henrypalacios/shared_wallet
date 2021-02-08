const Migrations = artifacts.require("Migrations");
const Allowance = artifacts.require("Allowance");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Allowance);
};
