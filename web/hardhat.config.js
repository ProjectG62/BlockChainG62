require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY= "54d0eefe352ed6b23ff78ccbbd54deaf2bc9f2772ea8e840f257d862923e0fd2";
const RPC_URL="https://polygon-mumbai.g.alchemy.com/v2/tLq8XLigUM_0b1zokcCpakKmMfjuvCil"
module.exports = {
  defaultNetwork:"MATIC_MUMBAI",
  networks:{
    hardhat:{
      chainId:80001
    },
  MATIC_MUMBAI:{
    url:"https://polygon-mumbai.g.alchemy.com/v2/7ok0ERmj9jzuRO0Sv3B8xJLOo_oeAPIA",
    accounts:[`0x${PRIVATE_KEY}`]
  }
},
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  
      hardhat:{
        chainId:80001
      },
    MATIC_MUMBAI:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/7ok0ERmj9jzuRO0Sv3B8xJLOo_oeAPIA",
      accounts:[`0x${PRIVATE_KEY}`]
    },
    

  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
