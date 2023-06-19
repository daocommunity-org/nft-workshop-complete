import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import { BlockchainConfig } from "../context/AppConfig";
import { useNavigate } from "react-router-dom";

export const UploadNFT = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [dragLoad, setDragLoad] = useState(false);

  const navigate = useNavigate();

  const { uploadToIPFS, createNFT, currentAccount, connectWallet } =
    useContext(BlockchainConfig);

  const onDrop = useCallback(async (acceptedFile) => {
    console.log(acceptedFile[0].type);
    if (
      acceptedFile[0].type === "image/jpeg" ||
      acceptedFile[0].type === "image/png"
    ) {
      setDragLoad(true);
      const url = await uploadToIPFS(acceptedFile[0]);
      console.log({ url });
      setDragLoad(false);
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
    });
    setUploadLoading(false);
  };

  const fileStyle = useMemo(
    () => `bg-black flex flex-col items-center w-fit m-auto px-2 py-4 border-dashed rounded-lg border cursor-pointer 
        ${isDragActive && "border-file-active border-double"} 
        ${isDragAccept && "border-file-accept border-red-300"}
        ${isDragReject && "border-file-reject"}
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div className="mininav flex justify-between">
        <button
          onClick={() => connectWallet()}
          className="text-white mx-3 mt-2 p-2 rounded-md border-2 hover:bg-white hover:text-black transition-all ease-in-out"
        >
          {currentAccount ? "Connected" : "Connect to Web3"}
        </button>
        <button
          disabled={!currentAccount}
          onClick={() => navigate("/market")}
          className="text-white mx-3 mt-2 p-2 rounded-md border-2 hover:bg-white hover:text-black transition-all ease-in-out"
        >
          Go to Market
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-white text-6xl font-extrabold shadow-md shadow-red-400 px-2 py-1">
          CREATE YOUR NFT!
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white font-semibold text-xl animate-bounce">
            Upload files
          </p>
          <div className="mt-12 mb-10">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="text-white font-semibold text-sm">
                  {dragLoad
                    ? "Uploading to IPFS.."
                    : "Drag or Upload the NFT Image (jpeg/png)"}
                </p>
              </div>
            </div>
            {fileUrl && (
              <div className="my-4">
                <img src={fileUrl} alt="asset_file" className="w-52 m-auto" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            title="Name"
            placeholder="NFT Name"
            className="px-4 py-2 rounded-lg"
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <input
            type="textarea"
            placeholder="Description of your NFT"
            className="px-4 py-2 rounded-lg"
            onChange={(e) =>
              setFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Enter Price"
            className="px-4 py-2 rounded-lg"
            onChange={(e) =>
              setFormInput({ ...formInput, price: e.target.value })
            }
          />
        </div>
        <div className="mt-7 w-full flex justify-center mb-10">
          {uploadLoading ? (
            <div className="text-white">Loading.....</div>
          ) : formInput.name && formInput.description && formInput.price ? (
            <button
              btnName="Create NFT"
              className="rounded-xl bg-white p-3 "
              onClick={handleCreation}
            >
              Create NFT
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
