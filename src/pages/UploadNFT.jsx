import React, { useState, useMemo, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { BlockchainConfig } from "../context/AppConfig";

import { MenuItem, Select } from "@mui/material";



export const UploadNFT = () => {
  const [fileUrl, setFileUrl] = useState("");



  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const { uploadToIPFS, createNFT } = useContext(BlockchainConfig);

  const [uploadLoading, setUploadLoading] = useState(false);
  const onDrop = useCallback(async (acceptedFile) => {
    console.log(acceptedFile[0].type);
    if (
      acceptedFile[0].type === "image/jpeg" ||
      acceptedFile[0].type === "image/png"
    ) {
      const url = await uploadToIPFS(acceptedFile[0]);
      console.log({ url });
      setFileUrl(url.replace("ipfs://", "https://ipfs.io/ipfs/"));
    } else {
      alert("only image file");
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 50000000,
  });
  const handleCreation = async () => {
    setUploadLoading(true);

    const urlReturned = await createNFT(formInput, fileUrl);
 
    setFormInput({
      price: "",
      name: "",
      description: "",
      mood1: "",
      mood2: "",
      mood3: "",
    })
 

   setUploadLoading(false);
  };

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed 
        ${isDragActive && "border-file-active"} 
        ${isDragAccept && "border-file-accept"}
        ${isDragReject && "border-file-reject"}
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
      <div className="bg-black">
        
      <br/><br/><br/>
      <div className="flex flex-row justify-center">
      <div className="flex justify-center sm:px-4 p-12">
        {/* <div className='bg-red'>Hi</div> */}
        <div className="w-3/5 md:w-full">
          <h1 className="font-poppins  dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-extrabold ml-4 sm:mb-4">
            Create New NFT
          </h1>
          {/* <audio controls>
      <source   src = "https://ipfs.io/ipfs/bafybeid5gljppqk6ti3eb2x7mbvgjghafe4xyugabapb7yyiis2bnhnkzq/y2mate.com%20-%20Sickick%20Infected%20Ringtone%20%20New%20Ringtone%202022%20%20Attitude%20BGM%20Ringtone%20%20Ringtones%20Addict%20.mp3"  type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio> */}
          <div className="mt-16">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
              Upload files
            </p>
            <div className="mt-4">
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                <div className="flexCenter flex-col text-center">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                    Image files
                  </p>
                  <div className="my-12 w-full flex justify-center"></div>
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                    Drag and Drop File
                  </p>
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mt-2">
                    or Browse media on your device
                  </p>
                </div>
              </div>
              {fileUrl && (
                <aside>
                  <div>
                    <img src={fileUrl} alt="asset_file" />
                  </div>
                </aside>
              )}
            </div>
          </div>
          
          <input
            type="text"
            title="Name"
            placeholder="NFT Name"
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <input
            type="textarea"
          
            placeholder="Description of your NFT"
            onChange={(e) =>
              setFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            type="number"
         
            placeholder="Enter Price"
            onChange={(e) =>
              setFormInput({ ...formInput, price: e.target.value })
            }
          />
          <br/><br/>
   
   
  </div>
          <div className="mt-7 w-full flex justify-center">
            {uploadLoading ? (
              <div>Loading..</div>
            ) : (formInput.name && formInput.description  &&formInput.price   )? (
              <button
                btnName="Create NFT"
                className="rounded-xl bg-black"
                onClick={handleCreation}
              >
                Create NFT
              </button> ):(  <button
                btnName="Create NFT"
                className="rounded-xl bg-black text-3xl text-white font-bold p-3 cursor-not-allowed"
                
              >
                Create NFT
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      

  );
};


