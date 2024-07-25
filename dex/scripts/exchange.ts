import hre from "hardhat";
import { ethers } from "ethers";
import routerArtifact from "@uniswap/v2-periphery/build/UniswapV2Router02.json";

import usdtArtifact from "../artifacts/contracts/DREX.sol/DREX.json";
import wethArtifact from "../artifacts/contracts/ERC20.sol/REAL.json";

const CONTRACT_ADDRESS = {
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  WETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

interface IGetContractInstance {
  address: any;
  artifact: any;
  signer: any;
}

interface ILogBalance {
  signer: any;
  provider: any;
  contracts: {
    usdt: ethers.Contract;
    weth: ethers.Contract;
  };
}

interface ISwap {
  signer: any;
  amountIn: any;
  provider: any;
  contracts: {
    usdt: ethers.Contract;
    weth: ethers.Contract;
    router: ethers.Contract;
  };
}

async function getSigner() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Signer", signer);
  return signer;
}

function getContactInstance(input: IGetContractInstance) {
  const { address, artifact, signer } = input;
  const contract = new ethers.Contract(address, artifact, signer);
  return contract;
}

async function logBalance({ contracts, provider, signer }: ILogBalance) {
  const { usdt, weth } = contracts;

  const ethBalances = await provider.getBalances(signer.address);

  const usdtBalance = await usdt.balanceOf(signer.address);
  const wethBalance = await weth.balanceOf(signer.address);

  console.log("--------------------------------");
  console.log("ETH balance: ", ethers.formatEther(ethBalances));
  console.log("USDT balance: ", ethers.formatEther(usdtBalance));
  console.log("WETH balance: ", ethers.formatEther(wethBalance));
  console.log("--------------------------------");
}

async function swap({ contracts, provider, signer, amountIn }: ISwap) {
  const { usdt, weth, router } = contracts;
  const nonce = await provider.getTransactionCount(signer.address, "pending");

  await signer.sendTransaction({
    to: CONTRACT_ADDRESS.WETH,
    value: ethers.parseEther("5"),
    nonce,
  });

  await logBalance({ contracts, provider, signer });

  const tx1 = await usdt.approve(CONTRACT_ADDRESS.ROUTER, amountIn);

  await tx1.wait();

  const tx2 = await router.swapExactTokensForTokens(
    amountIn,
    0,
    [CONTRACT_ADDRESS.USDT, CONTRACT_ADDRESS.WETH],
    signer.address,
    Date.now() + 1000 * 60 * 10,
    { gasLimit: 1000000 }
  );

  await tx2.wait();

  await logBalance({ contracts, provider, signer });
}

async function main() {
  const signer = await getSigner();
  const provider = hre.ethers.provider;

  const contracts = {
    router: getContactInstance({
      address: CONTRACT_ADDRESS.ROUTER,
      artifact: routerArtifact,
      signer,
    }),
    usdt: getContactInstance({
      address: CONTRACT_ADDRESS.USDT,
      artifact: usdtArtifact,
      signer,
    }),
    weth: getContactInstance({
      address: CONTRACT_ADDRESS.WETH,
      artifact: wethArtifact,
      signer,
    }),
  };

  const amountIn = ethers.parseEther("1");
  await swap({ contracts, provider, signer, amountIn });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
