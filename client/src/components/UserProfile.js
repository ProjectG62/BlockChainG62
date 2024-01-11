import React from "react";
import { useParams } from "react-router-dom";
import UserSideBar from "./UserSideBar";
import WishList from "./WishList";
import SoldProperty from './SoldProperty';
import './UserProfile.css'
import BoughtProperty from "./BoughtProperty";
import Update from "./Update";

const UserProfile = () => {
    const {activepage} = useParams()    
    return (
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
        
    );
  };
export default UserProfile;