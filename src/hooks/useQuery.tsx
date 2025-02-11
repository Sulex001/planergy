import axios from "axios"
import { toast } from 'react-toastify'





const useQuery = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  

//   const handleError = (error: unknown) => {
//     if (isAxiosError(error)) {
//       const axiosError = error as AxiosError<{ message?: string }>
//       toast.error(axiosError.response?.data?.message || "An error occurred")
//     } else if (error instanceof Error) {
//       toast.error(error.message)
//     } else {
//       toast.error('An unexpected error occurred')
//     }
//   }

  const getDocs = async (baseString: string) => {
    try {
      const response = await axios.get(`${baseUrl}/${baseString}`)
      return response.data
    } catch (error) {
    console.log(error);
    toast.error("unable to retrieve data from server")
    }
  }

  const getDoc = async (id: number, baseString: string) => {
    try {
      const response = await axios.get(`${baseUrl}/${baseString}/${id}`)
      return response.data
    } catch (error){ 
        console.log(error)
        toast.error("unable to retrieve data from server for " + id)
    }
  }

  return {
    getDocs,
    getDoc,
  }
}

export default useQuery 