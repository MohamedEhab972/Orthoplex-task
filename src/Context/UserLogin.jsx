import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let UserLogin = createContext();

export default function UserLoginProvider(props) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  return (
    <UserLogin.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserLogin.Provider>
  );
}
