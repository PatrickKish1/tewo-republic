import React, { createContext, useState, useContext, useEffect } from 'react';
import Web3 from 'web3'; // Changed to default import if necessary
import { ZKsyncPlugin } from 'web3-plugin-zksync'; // Ensure this is correct
import { CONTRACT_ADDRESS, abi } from '../constant'; // Ensure the path and file exist
import { Models, ORAPlugin, Chain } from '@ora-io/web3-plugin-ora';

// Initialize Web3 instance
const web3 = new Web3();
web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

const WalletContext = createContext(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [gigsHubContract, setGigsHubContract] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
 
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const generateText = async (prompt) => {
    const web3Instance = new Web3("https://1rpc.io/sepolia");
    web3Instance.registerPlugin(new ORAPlugin(Chain.SEPOLIA));

    const estimatedFee = await web3Instance.ora.estimateFee(Models.LLAMA2);
    const tx = await web3Instance.ora.calculateAIResult("0xA1a9E8c73Ecf86AE7F4858D5Cb72E689cDc9eb3e", Models.LLAMA2, prompt, estimatedFee.toString());
    console.log("Estimated fee: ", estimatedFee);
    console.log("Transaction details: ", tx);

    setTimeout(async () => {
      const result = await web3Instance.ora.getAIResult(Models.LLAMA2, prompt);
      console.log("Inference result: ", result);
    }, 30000);
  };

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsWalletConnected(true);
        const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
        setGigsHubContract(contract);
        console.log(account, gigsHubContract);
      } catch (error) {
        console.log('Error connecting wallet. Please try again.');
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const createGig = async (img, description, kpis, bounty) => {
    if (gigsHubContract && account) {
      console.log(gigsHubContract);
      console.log(img, description, kpis, bounty);
      try {
        await gigsHubContract.methods
          .createGig(img, description, kpis)
          .send({ from: account, value: web3.utils.toWei(bounty, 'ether') });
        console.log('Gig created successfully');
      } catch (error) {
        console.error('Error creating gig:', error);
      }
    }
  };

  const getAllGigs = async () => {
    if (gigsHubContract) {
      try {
        const gigs = await gigsHubContract.methods.getAllGigs().call();
        console.log('All gigs:', gigs);
        return gigs;
      } catch (error) {
        console.error('Error fetching gigs:', error);
      }
    }
  };

  const getGigById = async (gigId) => {
    if (gigsHubContract) {
      try {
        const gig = await gigsHubContract.methods.getGigById(gigId).call();
        console.log('Gig details:', gig);
        return gig;
      } catch (error) {
        console.error('Error fetching gig:', error);
      }
    }
  };

  const applyJob = async (gigId, coverLetter) => {
    if (gigsHubContract && account) {
      try {
        await gigsHubContract.methods.applyJob(gigId, coverLetter).send({ from: account });
        console.log('Application submitted successfully');
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    }
  };

  const selectWorker = async (gigId, appId) => {
    if (gigsHubContract && account) {
      try {
        await gigsHubContract.methods.selectWorker(gigId, appId).send({ from: account });
        console.log('Worker selected successfully');
      } catch (error) {
        console.error('Error selecting worker:', error);
      }
    }
  };

  const payout = async (gigId) => {
    if (gigsHubContract && account) {
      try {
        await gigsHubContract.methods.payout(gigId).send({ from: account });
        console.log('Payout successful');
      } catch (error) {
        console.error('Error processing payout:', error);
      }
    }
  };

  const withdraw = async () => {
    if (gigsHubContract && account) {
      try {
        await gigsHubContract.methods.withdraw().send({ from: account });
        console.log('Funds withdrawn successfully');
      } catch (error) {
        console.error('Error withdrawing funds:', error);
      }
    }
  };

  const getUsersGig = async () => {
    if (gigsHubContract) {
      try {
        const gigs = await gigsHubContract.methods.getUsersGig().call({ from: account });
        console.log('User gigs:', gigs);
        return gigs;
      } catch (error) {
        console.error('Error fetching user gigs:', error);
      }
    }
  };

  const getUserApplications = async () => {
    if (gigsHubContract) {
      try {
        const applications = await gigsHubContract.methods.getUserAppl().call({ from: account });
        console.log('User applications:', applications);
        return applications;
      } catch (error) {
        console.error('Error fetching user applications:', error);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        isWalletConnected,
        web3,
        gigsHubContract,
        connectWallet,
        createGig,
        getAllGigs,
        getGigById,
        applyJob,
        selectWorker,
        payout,
        withdraw,
        getUsersGig,
        getUserApplications,
        generateText
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
