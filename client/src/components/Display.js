import { useState } from "react";
import "./Display.css"

const Display = ({contract, account})=>{
    const [data, setData] = useState("")

    const getdata = async () =>{
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        try{
            if (Otheraddress){
                dataArray = await contract.display(Otheraddress);
            } else {
                dataArray = await contract.display(account);
            }
        } catch(e) {
            alert("You Do not haveaccess to this user's Images")
        }
        const isEmpty = Object.keys(dataArray).length === 0;
        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            const images = str_array.map((item,i) => {
                return(
                    <a href={item} key={i} target="_blank">
                        <img 
                        key={i} 
                        src={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`}
                        alt="new"
                        className="image-list"></img>
                    </a>
                )
            })
            setData(images)
        } else {
            alert("No Image to display")
        }
        // document.querySelector(".address").value = ""
    };
    return (<>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter User Address" className="address"></input>
        <button className="center button" onClick={getdata}>Submit</button>
    </>);
}

export default Display;