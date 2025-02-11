import { useAuthContext } from "@/hooks/UseAuthContext"
import type { User } from "@/contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  authIsReady: boolean
  token: string
}

const API_URL = import.meta.env.VITE_API_URL


const useLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      // sending the sign up data to the server
     
      const response = await axios.post(`${API_URL}/api/user/login`, data)
      return response.data
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch({ type: "SIGN_IN", payload: data })
      if(data){
        console.log("data", data)
        navigate("/dashboard");
      }
    },
    onError: (error: Error) => {
      console.error("Sign-up error:", error.message)
      return { error: error.message }
    }
  })
  
  const login = (data: LoginData) => {
    mutation.mutate(data)
  }
  
  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  
  }
}

export default useLogin

