let HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = "basket pyramid stage miracle peace midnight online crawl moon stamp great scrub"


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Set to match Ganache
      network_id: "*" // Match any network id
    },
      aaa: {
          provider: function() {
              return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/0e6f003173534b56bc7eb7ad7155dcfd")
          },
          network_id: 1,
          gas: 5012388,
          gasPrice: 30000000000
      },
      bbb: {
          provider: function() {
              return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/0e6f003173534b56bc7eb7ad7155dcfd")
          },
          network_id: 1,
          gas: 5012388,
          gasPrice: 30000000000
      },
  }
};
