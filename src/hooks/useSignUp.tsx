 import { useAuthContext } from "@/hooks/UseAuthContext"
import type { User } from "@/contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom";

interface SignUpData {
  email: string
  password: string
  username: string
}

interface SignUpResponse {
  user: User
  authIsReady: boolean
  token: string
}

const API_URL = import.meta.env.VITE_API_URL;

const useSignUp = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext()

  const mutation = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      // sending the sign up data to the server
     
      const response = await axios.post(`${API_URL}/api/user/signup`, data)
      return response.data
    },
    onSuccess: (data: SignUpResponse) => {
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch({ type: "SIGN_IN", payload: data })
      if(data){
        console.log("data", data)
        navigate("/personal_information");
      }
    },
    onError: (error: Error) => {
      console.error("Sign-up error:", error.message)
      return { error: error.message }
    }

  })
  
  
  const signUp = (data: SignUpData) => {
    mutation.mutate(data)
  }
  
  return {
    signUp,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  
  }
}

export default useSignUp

