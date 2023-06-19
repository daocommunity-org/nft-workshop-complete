import { useState } from "react";
import { shortenAddress } from "./utils";

const NFTCard = ({ nft, onProfilePage, purchased }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-neutral-900 hover:bg-black flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3  rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
      <p className="text-white text-2xl font-bold minlg:text-xl mb-4">
        {nft.name}
      </p>
      <div className="minlg:h-300 rounded-2xl overflow-hidden ">
        <img src={nft.image} />
      </div>
      <div className="mt-3 flex flex-col">
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="text-white font-semibold text-xs minlg:text-lg">
            {nft.price} <span className="font-normal">MATIC</span>
          </p>
          <p className="text-white font-semibold text-xs minlg:text-lg">
            {nft.description}
          </p>
          {!purchased && (
            <p className="font-poppins  text-white font-semibold text-xs minlg:text-lg">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          )}
          {purchased && (
            <p className="font-poppins bg-green-600 p-2 rounded-lg  text-white font-semibold text-xs minlg:text-lg">
              Owned
            </p>
          )}
        </div>
        <div className="mt-1 minlg:mt-3 flexBetween flex-row" />
      </div>
      <div className="flex flex-row sm:flex-col mt-10"></div>
    </div>
  );
};

export default NFTCard;
