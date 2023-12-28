import { useState } from "react";
import axios from "axios";
import "./FileUpload.css"

const FileUpload = ({ contract, account, provider })=>{
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Seleceted");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `dd0274168c4b3fb7a71d`,
                      pinata_secret_api_key: `a6b68716faf9ad8d59989cc3acd5cdcb86dfbf7bf8f09cb1859f6fe6794eaaca`,
                      "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                contract.add(account, ImgHash);
                alert("Imahe has been Uploaded");
                setFileName("No Image Seleceted")
                setFile(null);
            }catch(e){
                alert("Unable to upload Image to Pinata")
            }
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0])
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload File</button>
        </form>
    </div>
}

export default FileUpload;