// import React from "react";
// import WishList from "./WishList";
// import SoldProperty from "./SoldProperty";
// import BoughtProperty from "./BoughtProperty";


// const FetchId = () => {
//     const  idPassed = "0x0d8354473582e24a71f61f4D9bFda41ca1f94b1e"
//   return (
//     <div>
//         <WishList idToPrint = {idPassed}/>
//         <SoldProperty idToPrint = {idPassed}/>
//         <BoughtProperty idToPrint = {idPassed}/>
//     </div>
//   )
// }

// export default FetchId
// const idPassed = "0x0d8354473582e24a71f61f4D9bFda41ca1f94b1e"
// export default idPassed;
// walletUtils.js
import axios from 'axios';
const connectWallet = async () => {
  let walletAddress = "";

  if (
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined"
  ) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      walletAddress = accounts[0];
      console.log(walletAddress);
      await axios.post('http://localhost:5000/api/storeWalletAddress', {
          walletAddress: accounts[0],
        });
    } catch (err) {
      console.error(err.message);
    }
  } else {
    console.log("Please install Metamask");
  }

  return walletAddress;
};

export default connectWallet;