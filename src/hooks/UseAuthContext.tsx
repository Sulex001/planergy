import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context; // context contains both state and dispatch
};