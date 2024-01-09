import React, { useState, useEffect } from 'react';
import './WishList.css';
import profileData from '../profile.json';
import data from '../data.json';

const WishList = () => {
  const [address, setAddress] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);

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

  useEffect(() => {
    // Search for the profile based on the lowercase Metamask account ID
    if (address) {
      const lowercasedAddress = address.toLowerCase();
      const profile = profileData.find((pro) => pro.id.toLowerCase() === lowercasedAddress);
      setSelectedObject(profile);
    }
  }, [address]);

  if (!selectedObject) {
    return <div>ID not found.</div>;
  }

  const propertyObject = selectedObject?.wishlist?.map((wishlistId) =>
    data.find((dat) => dat._id.$oid === wishlistId)
  );

  return (
    <div className="properties-container">
      {propertyObject &&
        propertyObject.map((property) => (
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
        ))}
    </div>
  );
};

export default WishList;