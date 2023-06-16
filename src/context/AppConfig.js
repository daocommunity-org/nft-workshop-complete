import React, { useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import * as eth from "ethers";
import axios from "axios";
import { NFTStorage, Blob } from "nft.storage";
import { Contract } from "ethers";
import abi from './utils'


export const BlockchainConfig = React.createContext();

export const BlockchainProvider = ({ children }) => {
  const contr_addr =process.env.REACT_APP_CONTRACT;
  const NFT_STORAGE_TOKEN = process.env.REACT_APP_PUBLIC_NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const provider = new eth.JsonRpcProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract =  new Contract(contr_addr, abi, signer);

  const nftCurrency = "MATIC";
  const [currentAccount, setCurrentAccount] = useState("");
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const metadata = await client.store({
        name: "ABC",
        description: "ABC",
        image: file,
      });

      return metadata.data.image.href;
    } catch (error) {
      console.log("Error uploading to file");
    }
  };

  const createNFT = async (formInput, fileUrl) => {
    const { name, description, price } = formInput;
    if (!name || !description || !fileUrl || !price) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    let url = "";
    try {
      const metadata = new Blob([data]);
      const cid = await client.storeBlob(metadata);
      url = "https://ipfs.io/ipfs/" + cid;
      console.log(url);
      await createSale(url, price);
      // await uploadArtOffChain(url,mood1,mood2,mood3)
    } catch (error) {
      console.log("Error uploading to create nft", error);
    }
    return fileUrl;
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new eth.providers.Web3Provider(connection);
    const signer = await provider.getSigner();

    const price = eth.utils.parseUnits(formInputPrice, "ether");
    // const contract = fetchContract(signer);
    const listingPrice = 0.00025;
    console.log("hee", listingPrice);
    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: eth.parse,
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });
    await transaction.wait();
    console.log(transaction);
  };

  const fetchNFTs = async (setLoading) => {
    setLoading(true);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = eth.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );

        image.replace("https:ipfs.io", "https://infura-ipfs.io");
        console.log(image);

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);
  return (
    <BlockchainConfig.Provider value={{}}>{children}</BlockchainConfig.Provider>
  );
};
