import React, { createContext, useState, useContext, useEffect } from "react";
import Web3 from "web3";
import { types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet, utils} from "web3-plugin-zksync";
import { CONTRACT_ADDRESS, abi, priceFeedABI } from "../constant";
import { Models, ORAPlugin, Chain } from "@ora-io/web3-plugin-ora";
import { ChainlinkPlugin } from "@chainsafe/web3-plugin-chainlink";
import { EnsPlugin } from "@namespace-ens/web3-plugin-ens";

const web3 = new Web3();
const chainlinkPlugin = new ChainlinkPlugin(
  "https://eth-sepolia.g.alchemy.com/v2/-1HcxcXHs_85UOch3fQuC3yUtDUl7OcU"
);
web3.registerPlugin(chainlinkPlugin);
web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));
const zksync = web3.ZKsync;

const priceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
// const priceFeed = new web3.eth.Contract(priceFeedABI, priceFeedAddress);

const WalletContext = createContext(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [tewoContract, setTewoContract] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contract = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
      setTewoContract(contract);
    } else {
      console.log("MetaMask is not installed");
    }
  }, []);

  const generatePic = async (from, PROMPT) => {
    const web3 = new Web3("https://1rpc.io/sepolia");
    web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));
    const estimatedFee = await web3.ora.estimateFee(Models.LLAMA2);
    await web3.ora.estimateFee(Models.STABLE_DIFFUSION);
    await web3.ora.calculateAIResult(
      from,
      Models.STABLE_DIFFUSION,
      PROMPT,
      estimatedFee
    );
    await web3.ora.getAIResult(Models.STABLE_DIFFUSION, PROMPT);
    console.log("Estimated fee: ", estimatedFee);

    setTimeout(async () => {
      const result = await web3.ora.getAIResult(Models.LLAMA2, prompt);
      console.log("Inference result: ", result);
      return result;
    }, 30000);
  };

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsWalletConnected(true);
        const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
        setTewoContract(contract);
      } catch (error) {
        console.log("Error connecting wallet. Please try again.");
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const connectENS = async (name) => {
    if (web3) {
      try {
        const address = await resolveENS(name);
        setEnsName(name)
        setAccount(address);
        setIsWalletConnected(true);
        const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
        setTewoContract(contract);
      } catch (error) {
        console.log("Error connecting wallet. Please try again.");
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.log(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const registerFarmer = async () => {
    if (tewoContract && account) {
      try {
        await tewoContract.methods.registerFarmer().send({ from: account });
        console.log("Farmer registered successfully");
      } catch (error) {
        console.error("Error registering farmer:", error);
      }
    }
  };

  const listProduce = async (produceInput) => {
    if (tewoContract && account) {
      try {
        await tewoContract.methods
          .listProduce(produceInput)
          .send({ from: account });
        console.log("Produce listed successfully");
      } catch (error) {
        console.error("Error listing produce:", error);
      }
    }
  };

  const requestPurchase = async (produceId, quantity, value) => {
    if (tewoContract && account) {
      try {
        await tewoContract.methods
          .requestPurchase(produceId, quantity)
          .send({ from: account, value });
        console.log("Purchase request made successfully");
      } catch (error) {
        console.error("Error requesting purchase:", error);
      }
    }
  };
  const getAllProduce = async () => {
    if (tewoContract && account) {
      try {
        const produceList = await tewoContract.methods.getAllProduce().call();
        console.log("All Produce:", produceList);
        return produceList;
      } catch (error) {
        console.error("Error fetching all produce:", error);
      }
    }
  };
  const getProduceById = async (produceId) => {
    if (tewoContract && account) {
      try {
        const produce = await tewoContract.methods.getProduceById(produceId).call();
        console.log(`Produce with ID ${produceId}:`, produce);
        return produce;
      } catch (error) {
        console.error(`Error fetching produce with ID ${produceId}:`, error);
      }
    }
  };
  

  const confirmDelivery = async (requestId) => {
    if (tewoContract && account) {
      try {
        await tewoContract.methods
          .confirmDelivery(requestId)
          .send({ from: account });
        console.log("Delivery confirmed successfully");
      } catch (error) {
        console.error("Error confirming delivery:", error);
      }
    }
  };

  const payFarmer = async (requestId) => {
    if (tewoContract && account) {
      try {
        await tewoContract.methods.payFarmer(requestId).send({ from: account });
        console.log("Farmer paid successfully");
      } catch (error) {
        console.error("Error paying farmer:", error);
      }
    }
  };

  const getETHinNaira = async () => {
    const price = (await web3.chainlink.getPrice(priceFeedAddress)).toString();
    return Number(price) / 1500;
  };

  const resolveENS = async (name) => {
    const web3 = new Web3(window.ethereum);
    web3.registerPlugin(new EnsPlugin(Chain.SEPOLIA));
    const resolvedName = web3.ens.getAddress(name);
    return resolvedName;
  };

  const getPaymasterAddress = async () =>{
    const paymaster = await zksync.rpc.getTestnetPaymasterAddress()
    return paymaster;
  }

  

  async function claimTokens(wallet, zksync, userAddress, amount) {
    const amountToTransfer = utils.parseEther(amount); 
    const usdcAddress = "0xA1a9E8c73Ecf86AE7F4858D5Cb72E689cDc9eb3e"
    
    try {
     
      const transfer = await wallet.transfer({
        to: userAddress,
        amount: amountToTransfer,
        token: usdcAddress,
      });
  
      // Estimate gas fee
      const gasLimit = await transfer.estimateGas();
      const gasPrice = await wallet.provider.getGasPrice();
      const fee = gasLimit.mul(gasPrice);
  
      
      const balance = await wallet.getBalance(usdcAddress);
      if (balance.lt(amountToTransfer.add(fee))) {
        throw new Error("Insufficient balance to cover transfer and fee");
      }
  
    
      const paymasterParams = utils.getPaymasterParams(wallet.provider.chainId, {
        type: 'General',
        innerInput: new Uint8Array(),
      });
  
      // Send the transaction with paymaster
      const tx = await wallet.sendTransaction({
        ...transfer,
        maxFeePerGas: gasPrice,
        maxPriorityFeePerGas: gasPrice,
        gasLimit,
        paymasterParams,
      });
  
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction successful:", receipt.transactionHash);
      console.log(`Transferred ${utils.formatEther(amountToTransfer)} ETH to ${userAddress}`);
    } catch (error) {
      console.error("Error claiming tokens:", error);
    }
  }

  async function userBonus(amount) {
   
    if (typeof window.ethereum !== 'undefined') {
      try {
      
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
     
        const web3 = new Web3(window.ethereum);
        
      
        web3.registerPlugin(
          new ZKsyncPlugin(
            Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
          ),
        );
        
        const zksync = web3.ZKsync;
  
       
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
  
      
        const wallet = new zksync.Wallet(currentAccount);
  
        console.log("Wallet address:", await wallet.getAddress());
  
        // Call the claimTokens function
        await claimTokens(wallet, zksync, currentAccount, amount);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }
  return (
    <WalletContext.Provider
      value={{
        account,
        isWalletConnected,
        web3,
        tewoContract,
        generatePic,
        connectWallet,
        registerFarmer,
        listProduce,
        requestPurchase,
        confirmDelivery,
        payFarmer,
        getETHinNaira,
        connectENS,
        userBonus,
        getAllProduce,
        getProduceById,
        ensName
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
