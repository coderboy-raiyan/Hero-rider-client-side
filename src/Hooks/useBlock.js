import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useBlock = () => {
  const { signIn, user, setUser, setError } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch(`https://afternoon-coast-04252.herokuapp.com/find/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setChecked(data?.isBlocked);
      })
      .finally(() => {
        setChecked(false);
      });
  }, [user]);

  return {
    checked,
  };
};

export default useBlock;
