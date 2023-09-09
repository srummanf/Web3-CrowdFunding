import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';


import { CrowdFundingAddress, CrowdFundingABI } from './contants';


const fetchContract = (signerOrProvider) => {
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);
}

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";

    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(currentAccount, title, description, ethers.utils.parseUnits(amount, 18), new Date(deadline).getTime());
            await transaction.wait();
            console.log("Transaction Mined", transaction);
        } catch (e) {
            console.log("Transaction failed", e);
        }
    };

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parseCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pID: i
        }));

        return parseCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === "0x5FbDB2315678afecb367f032d93F642f64180aa3");

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner, title: campaign.title, description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pID: i,
        }));

        return userData;
    }


    const donate = async (pID, amount) => {
        const web3Modal = new web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pID, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pID) => {
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const donations = await contract.getDonations(pID);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                amount: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    }

    // Check if wallet connected
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Make sure you have metamask!");
                return setOpenError(true), setError("Make sure you have metamask!");
            }
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                const account = accounts[0];
                setCurrentAccount(account);
            } else {
                console.log("No account found");
            }
        }
        catch (e) {
            console.log("Something wrong while connecting the wallet ", e);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // Connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Make sure you have metamask!");
                return setOpenError(true), setError("Make sure you have metamask!");
            }
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(account[0]);
        } catch (e) {
            console.log("Something wrong while connecting the wallet ", e);
        }
    };


    return (
        <CrowdFundingContext.Provider value={{
            titleData, currentAccount, createCampaign, getCampaign, getUserCampaigns, donate, getDonations, connectWallet
        }}>
            {children}
        </CrowdFundingContext.Provider>
    )

}