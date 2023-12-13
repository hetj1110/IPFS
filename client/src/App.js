import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import { useState,useEffect } from "react"
import {ethers} from "ethers"
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import Display from "./components/Display";

import './App.css';

function App() {
  debugger
  const [account, setAccount] = useState("");
  debugger
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("changeChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];

        setAccount(address);

        const contractAddress = "{{Your smart contract deploy key}}";

        const contract = new ethers.Contract(contractAddress, Upload.abi, provider.getSigner());

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
  
    provider && loadProvider();
  }, [provider]);
  

  return <div className="App">
    <h1 style={{color: "white"}}>Decentlized File System - GDrive 3.0</h1>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>

    <p style={{color: "white"}}> Account: { account ? account:"Please connect Metamask"} </p>

    <FileUpload account={account} provider={provider} contract={contract}></FileUpload>

  </div>;
}

export default App;
