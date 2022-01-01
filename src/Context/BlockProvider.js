import React, { createContext } from "react";
import useBlock from "../Hooks/useBlock";

export const BlockContext = createContext();

const BlockProvider = ({ children }) => {
  const allData = useBlock();
  return (
    <BlockContext.Provider value={allData}>{children}</BlockContext.Provider>
  );
};

export default BlockProvider;
