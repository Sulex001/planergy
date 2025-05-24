import { useNavigate } from 'react-router-dom';

export const useFormNavigation = () => {
  const navigate = useNavigate();
const handleSavedData = (key: string, data: unknown ) => {
  sessionStorage.setItem(key, JSON.stringify(data));
}
      const getNextPage = (currentPage: string, setCurrentPage: React.Dispatch<React.SetStateAction<string>>, data: unknown  ) => {
        handleSavedData(currentPage,data);  
        switch (currentPage) {
          case "get_started":
                navigate('/personal_information');
                setCurrentPage("personal_information");
                break; 
            case "personal_Information":
                navigate('/role_selection');
                setCurrentPage("role_selection");
                break;
            case "role_selection":
                navigate('/company_selection');
                setCurrentPage("company_selection");
                break;
            case "company_selection":
              navigate('/summary');
                setCurrentPage("summary");
                break; 
            default:
                console.warn(`Unexpected page: ${currentPage}`);
                break;
        }
    };
    
return {getNextPage}

}