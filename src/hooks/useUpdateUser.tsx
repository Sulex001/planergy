import { useAuthContext } from "@/hooks/UseAuthContext"
import type { User } from "@/contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom";

interface SignUpUpdate {
    fullName: string;
    email: string
    username: string
    role:  string,
    companyName: string,
    phoneNumber: string,
}

interface SignUpResponse {
  user: User
  authIsReady: boolean
}

const API_URL = import.meta.env.VITE_API_URL


const useUpdateUser = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext()

  const mutation = useMutation<SignUpResponse, Error, SignUpUpdate>({
    mutationFn: async (data: SignUpUpdate) => {
      // get token from local storage;
      const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : '';
      console.log(token);
      const response = await axios.patch(`${API_URL}/api/user/update_profile`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Bearer token to the headers
        },
      }) as { data: SignUpResponse }
      return response.data
    },
    onSuccess: (data: SignUpResponse) => {
      console.log("Sign-up successful:", data)
      localStorage.setItem("user", JSON.stringify(data.user))
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

  const updateUser = (data: SignUpUpdate) => {
    mutation.mutate(data)
  }
  
  return {
    updateUser,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  
  }
}

export default useUpdateUser;

