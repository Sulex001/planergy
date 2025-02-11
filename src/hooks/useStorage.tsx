import axios from "axios"
import { useAuthContext } from "./UseAuthContext";
import { useState } from "react";


 const useStorage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL
  const user = state.userDetails.user
  

    const updateAvatar = async (avatar: File) => {
      const formData = new FormData();
      formData.append("file", avatar);
      setIsLoading(true);
      try {
          const response = await axios.post(`http://${API_URL}/api/uploads/upload`, formData, {
              headers: {'authorization': `Bearer ${user?.token}`},
          });
          console.log(response)
          postMessage("File uploaded successfully");
      } catch (error) {
          postMessage("File upload failed");
          console.log(error)
          setError("Upload failed");
      }

         }
  return {updateAvatar, isLoading, error}
}  

export default useStorage;