import { createContext, useState, useContext, useEffect } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    async function checkRegistration() {
      const response = await fetch("http://localhost:3001/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);
        setIsRegistered(true);
        setUser(data.user);
      } else {
        console.log("no");
      }
    }

    checkRegistration();
  }, []);

  return (
    <RegistrationContext.Provider
      value={{ isRegistered, setIsRegistered, user }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
