import React, { useState, useEffect, useContext } from "react";
import { BlockchainConfig } from "../context/AppConfig";
import NFTCard from "./components/NFTCard";

export const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [OriginalNFTs, setOriginalNFTs] = useState([]);
  const { fetchNFTs } = useContext(BlockchainConfig);

  useEffect(() => {
    fetchNFTs(setLoading).then((items) => {
      setNfts(items);

      setLoading(false);
      setOriginalNFTs(items);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#99FFE3]">
      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div id="marketid" className="w-full minmd:w-4/5">
          <div className="mt-4">
            {!Loading && nfts.length === 0 ? (
              <div className="flexCenter sm:p-4 p-16 ">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
                  No NFTs Listed for Sale
                </h1>
              </div>
            ) : (
              <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
                NFTs listed for sale
              </h2>
            )}

            <div className="mt-3 w-full flex flex-wrap justify-center md:justify-center">
              {!Loading &&
                nfts.map((nft) => (
                  <>
                    {" "}
                    <NFTCard key={nft.tokenId} nft={nft} />{" "}
                  </>
                ))}
              {Loading && <div>Loading...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

