import React from 'react'
import profile from '../profile.json'
import data from '../data.json'
import idPassed from './FetchId'


const SoldProperty = () => {
  const selectedObject = profile.find(pro => pro.id === idPassed)
  const propertyObject=[]
  for(let i=0; i<selectedObject.soldproperty.length;i++)
  {
   
    propertyObject.push(data.find(dat => dat._id.$oid === selectedObject.soldproperty[i]))
    
    
    
  }
  console.log(propertyObject)
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

export default SoldProperty