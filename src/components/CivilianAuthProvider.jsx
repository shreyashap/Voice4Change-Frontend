import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CivilianAuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    if (user && user?.user.user_type !== "CIVILIAN") {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default CivilianAuthProvider;
