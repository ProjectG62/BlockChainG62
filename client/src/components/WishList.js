import React from 'react'
import './WishList.css'
import profile from '../profile.json'
import data from '../data.json'
import idPassed from './FetchId'
import connectWallet from './FetchId'
import { useState,useEffect } from 'react'


const WishList = () => {
  // const [address, setAddress] = useState('');

  // useEffect(() => {
  //   const fetchWalletAddress = async () => {
  //     try {
  //       const walletAddress = await connectWallet();
  //       setAddress(walletAddress); 
  //     } catch (error) {
  //       console.error("Error connecting to wallet:", error.message);
  //     }
  //   };

  //   fetchWalletAddress();
  // }, []);
  // console.log("rirr",address)
  const p = "0x0d8354473582e24a71f61f4D9bFda41ca1f94b1e";
  
  const selectedObject = profile.find(pro => pro.id === p);

  

 
  const propertyObject=[]
  for(let i=0; i<selectedObject.wishlist.length;i++)
  {
   
    propertyObject.push(data.find(dat => dat._id.$oid === selectedObject.wishlist[i]))
    
    
    
  }
  return(
    <div className="properties-container">
      {
      propertyObject && propertyObject.map(property => {
        return(
          <div key={property._id} className="property-item property-card">
            <img src={property.image} alt={property.name} className="img" />
            <div className="attributes">
              <div className="propTitle">{property.title}</div>
              <div className="price">{property.price} MATIC</div>
              <div className="address">
                {property.address}, {property.city}, {property.country}
              </div>

            </div>
            </div>
        )

      }
        )
      }


    </div>

  )
 
 
}

export default WishList