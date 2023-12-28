import { useEffect } from "react";
import "./Modal.css"

const Modal = ({setModalOpen, contract})=>{
    const sharring = async() => {        
        let address = null;
        if(document.querySelector(".address").value !== ""){
            address = document.querySelector(".address").value
        } else {
            address = document.querySelector("#selectNumber").value
        }
        try{
            await contract.allow(address.split(',')[0]);
            alert("Access will be given to "+address)
        } catch(e){
            alert("Request Rejected")
        }
    }
    
    const removeAccess = async() => {
        let address = null;
        if(document.querySelector(".address").value !== ""){
            address = document.querySelector(".address").value
        } else {
            address = document.querySelector("#selectNumber").value
        }
        
        try{
            await contract.disallow(address.split(',')[0]);
            alert( address + "'s access will be revoke")
        } catch(e) {
            alert("Request Rejected")
        }
    }

    useEffect(()=> {
        const accessList = async() => {
            const addressList = await contract.shareAccess()

            let selected = document.querySelector("#selectNumber");
            const options = addressList;
            for(let i=0; i<options.length; i++) {
                let opt = options[i];
                let ele = document.createElement("option");
                ele.textContent = opt;
                ele.value = opt
                selected.appendChild(ele);
            }
        };
        contract && accessList();
    },[])

    return <>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Share with</div>
                <div className="body">
                    <input type="text" className="address" placeholder="Enter User Address"></input>
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className="address">People With Access</option>
                    </select>
                </form>
                <div className="footer">
                    <button onClick={()=>{setModalOpen(false)}} id="calcelBtn">Cancel</button>
                    <button onClick={()=>sharring()}>Share</button>
                    <button onClick={()=>removeAccess()}>Remove User</button>
                </div>
            </div>
        </div>
    </>
}

export default Modal;