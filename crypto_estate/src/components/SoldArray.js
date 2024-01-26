import React, { useEffect, useState } from "react";
import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";

const SoldArray = () => {
  const [soldList, setSoldList] = useState([]);
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );
  const a = useAddress();
  const { data, isLoading } = useContractRead(contract, "getSoldProperties", [
    a,
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      const updatedSoldList = data.reduce((accumulator, currentItem) => {
        const parsedValue = parseInt(currentItem._hex, 16);
        if (!accumulator.includes(parsedValue)) {
          return [...accumulator, parsedValue];
        }
        return accumulator;
      }, []);
      setSoldList(updatedSoldList);
    }
  }, [isLoading, data]);

  console.log(soldList, "soldList");

  return { soldList, setSoldList };
};

export default SoldArray;
