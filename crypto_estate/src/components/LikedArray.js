import React, { useEffect, useState } from "react";
import { useAddress, useContractRead, useContract } from "@thirdweb-dev/react";

const LikedArray = () => {
  const [likeList, setLikeList] = useState([]);
  const { contract } = useContract(
    "0x93E8DD8a558ea662791751FAAE4354EDb5399A91"
  );
  const a = useAddress();
  const { data, isLoading } = useContractRead(contract, "getLikedProperties", [
    a,
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      const updatedLikeList = data.reduce((accumulator, currentItem) => {
        const parsedValue = parseInt(currentItem._hex, 16);
        if (!accumulator.includes(parsedValue) && parsedValue !== 9999999) {
          return [...accumulator, parsedValue];
        }
        return accumulator;
      }, []);
      setLikeList(updatedLikeList);
    }
  }, [isLoading, data]);

  console.log(likeList, "jjj");

  return { likeList, setLikeList };
};

export default LikedArray;
