import axios from "axios"
import { toast } from 'react-toastify'





const useQuery = () => {
  

  const getDocs = async (baseUrl: string) => {
    try {
      const response = await axios.get(`${baseUrl}`)
      return response.data
    } catch (error) {
    console.log(error);
    toast.error("unable to retrieve data from server")
    }
  }


  const getDoc = async (id: number, baseUrl :string) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`)
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