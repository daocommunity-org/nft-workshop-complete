import { useState } from "react";
import { shortenAddress } from "./utils";

const NFTCard = ({ nft, onProfilePage, purchased }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" bg-neutral-900 hover:bg-black  flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3  rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
      <p className="font-poppins  text-white text-2xl  font-bold  minlg:text-xl">
        {nft.name}
      </p>
      <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
        <br />
        <br />

        {/* <source   src = "https://ipfs.io/ipfs/bafybeid5gljppqk6ti3eb2x7mbvgjghafe4xyugabapb7yyiis2bnhnkzq/y2mate.com%20-%20Sickick%20Infected%20Ringtone%20%20New%20Ringtone%202022%20%20Attitude%20BGM%20Ringtone%20%20Ringtones%20Addict%20.mp3"  type="audio/mpeg" /> */}
        <img src={nft.image} />
      </div>
      <div className="mt-3 flex flex-col">
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins  text-white font-semibold text-xs minlg:text-lg">
            {nft.price} <span className="font-normal">MATIC</span>
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
