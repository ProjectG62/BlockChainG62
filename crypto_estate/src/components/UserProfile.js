import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserSideBar from "./UserSideBar";
import WishList from "./WishList";
import SoldProperty from './SoldProperty';
import './UserProfile.css'
import BoughtProperty from "./BoughtProperty";
import Update from "./Update";

const UserProfile = () => {
    const {activepage} = useParams()  
    const [address, setAddress] = useState('');  
    useEffect(() => {
      const fetchWalletAddress = async () => {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAddress(accounts[0]);
        } catch (error) {
          console.error('Error connecting to wallet:', error.message);
        }
      };
  
      fetchWalletAddress();
    }, []);
    return (
      <div style={{backgroundColor:"rgb(246, 244, 244)",paddingBottom:"8%"}}>
        <div className="header">
                    <div className="profile-info">
                        <span className="user-name">Username</span>
                        <div className="icon-address">
                        <img src={"https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"} alt="Profile Icon" className="profile-icon" />
                        <span className="user-address">{address.substring(0,6 )}...{address.substring(38)}</span>
                        </div>
                    </div>
                </div>
        <div className="userprofile">  
          {/* UserProfile , showing {activepage} */}
          <div className = 'userprofilein'>      
          <div className="left">
            <UserSideBar activepage={activepage}/>
          </div>
          <div className="right">
            {activepage === 'wishlist' && <WishList/>}
            {activepage === 'soldproperty' && <SoldProperty/>}  
            {activepage === 'boughtproperty' && <BoughtProperty/>}
            {activepage === 'update' && <Update/>}
          </div>
        </div>

        </div>
        </div>
        
    );
  };
export default UserProfile;