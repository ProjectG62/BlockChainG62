import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { all } from "axios";
import { useAddress } from "@thirdweb-dev/react";
import React, { useState, useEffect } from 'react';
import "./EventLedger.css";
import Loading from "./Loading";

const EventLedger = () =>{
const { contract } = useContract("0xECc91bBec0c259ed3F4B6F84914274a363da7ffe");
const { data: allEvents ,isLoading} = useContractEvents(contract)
// const { data: event,isLoading} = useContractEvents(contract, "PropertyListed")
const address = useAddress();
const [filteredEvents, setFilteredEvents] = useState([]);
useEffect(() => {
  if(isLoading){
    return;
  }

  const filteredEvents = allEvents.filter(event => event.data.owner === address ||
     event.data.user ===address || event.data.newowner ===address || event.data.oldnewowner === address);
  setFilteredEvents(filteredEvents);
    

}, [allEvents, address,isLoading]);

console.log(allEvents)


  return (
    <div className="table">
      {isLoading && <Loading></Loading>}
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th >Event Name</th>
            <th>Old Owner</th>
            <th>New Owner</th>
            <th>Price (Matic)</th>
            <th>Transaction Hash</th>
            <th>Block Number</th>
          </tr>
        </thead>
        <tbody>

          {filteredEvents.map((event, index) => {
            let oldowner;
            let newowner;
            let eventName = event.eventName;
            let price = 'NA';
            if(event.eventName==='PropertyListed'){
              oldowner = 'NA';
              newowner = 'NA';
              price = Number((event.data.price * 10 ** -18).toFixed(2));
              
            }else if(event.eventName === "PropertySold"){
              oldowner = event.data.oldowner;
              newowner = event.data.newowner;
              price = Number((event.data.price * 10 ** -18).toFixed(2));
              if(address === event.data.newowner){
                eventName = "PropertyBought";
              }else{
                eventName = "PropertySold";
              }
            }else{
              oldowner = 'NA';
              newowner = 'NA';
            }
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{eventName}</td>
              <td>{oldowner}</td>
              <td>{newowner}</td>
              <td>{price}</td>
              <td>{event.transaction.blockHash}</td>
              <td>{event.transaction.blockNumber}</td>

            </tr>
          );  
          })}
        </tbody>
      </table>
    </div>
  );


};
export default EventLedger;