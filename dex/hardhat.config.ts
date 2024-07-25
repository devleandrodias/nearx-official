import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: String(process.env.INFURA_POLYGON),
      },
    },
  },
};

export default config;
