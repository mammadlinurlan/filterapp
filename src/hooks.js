import { createContext, useContext } from "react";

export const PhoneContext = createContext([]);
export const usePhoneContext = () => useContext(PhoneContext);