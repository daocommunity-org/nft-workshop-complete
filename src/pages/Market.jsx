import React, { useState, useEffect, useContext } from "react";
import { BlockchainConfig } from "../context/AppConfig";
import NFTCard from "./components/NFTCard";

export const Market = () => {
  const [nfts, setNfts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [OriginalNFTs, setOriginalNFTs] = useState([]);
  const { fetchNFTs } = useContext(BlockchainConfig);

  useEffect(() => {
    fetchNFTs(setLoading).then((items) => {
      setNfts(items);
      setLoading(false);
      setOriginalNFTs(items);
      console.log(OriginalNFTs);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div id="marketid" className="w-full minmd:w-4/5">
          <div className="mt-4">
            {!Loading && nfts.length === 0 ? (
              <div className="flexCenter sm:p-4 p-16 ">
                <h1 className="text-white text-6xl font-extrabold shadow-md shadow-red-400 px-2 py-1 rounded-xl">
                  No NFTs Listed for Sale
                </h1>
              </div>
            ) : (
              <h2 className="text-white text-6xl font-extrabold shadow-md shadow-red-400 px-2 py-1 rounded-xl">
                NFTs listed for sale
              </h2>
            )}

            <div className="mt-3 w-full grid grid-cols-4 gap-4 justify-center md:justify-center">
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
