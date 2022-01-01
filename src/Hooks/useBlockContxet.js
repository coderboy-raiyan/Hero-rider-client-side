import { useContext } from "react";
import { BlockContext } from "./../Context/BlockProvider";

const useBlockContext = () => {
  return useContext(BlockContext);
};

export default useBlockContext;
