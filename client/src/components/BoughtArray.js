import React, { useEffect, useState } from "react";
import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";

const BoughtArray = () => {
  const [boughtList, setboughtList] = useState([]);
  const { contract } = useContract(
    "0xECc91bBec0c259ed3F4B6F84914274a363da7ffe"
  );
  const a = useAddress();
  const { data, isLoading } = useContractRead(contract, "getBoughtProperties", [
    a,
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      const updatedboughtList = data.reduce((accumulator, currentItem) => {
        const parsedValue = parseInt(currentItem._hex, 16);
        if (!accumulator.includes(parsedValue)) {
          return [...accumulator, parsedValue];
        }
        return accumulator;
      }, []);
      setboughtList(updatedboughtList);
    }
  }, [isLoading, data]);

  console.log(boughtList, "boughtList");

  return { boughtList, setboughtList };
};

export default BoughtArray;
