import { useNavigate } from "react-router-dom";
import { useState,   } from "react"
import OnboardingSummary from "@/components/features/auth/signUp/OnboardingSummary"
import Nav2 from "@/components/utilComponents/Nav_2";
import { useAuthContext } from "@/hooks/UseAuthContext";
import useUpdateUser from "@/hooks/useUpdateUser";

const Summary = () => {
  const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const {state} = useAuthContext();
    const {updateUser, isLoading, isSuccess, isError} = useUpdateUser()




  const companyData = JSON.parse(sessionStorage.getItem("company_selection") || "{}");
  const personalData =  JSON.parse(sessionStorage.getItem("personal_Information") || "{}")
  const roleData = JSON.parse(sessionStorage.getItem("role_selection") || "{}");

    const userData = {
      fullName: personalData.fullName,
      email: state.userDetails.user?.user.email,
      username: state.userDetails.user?.user.displayName ,
      role: roleData.selectedRole === "employer" ? "admin" : "member",
      company: companyData.company,
      phoneNumber: personalData.phoneNumber,
      
      
    }
console.log(userData);

const handleBack = () => {
     
}
    
const handleComplete = async () => {
    const emptyValue: string[] = [];
    const fieldsToCheck = ["fullName", "username", "email", "phoneNumber", "company", "role"];
    fieldsToCheck.forEach((field) => {
        if (!userData[field as keyof typeof userData]) {
            emptyValue.push(field);
        }
    });

    if (emptyValue.length > 0) {
        alert(`Please fill in the following fields: ${emptyValue.join(", ")}`);
        return;
    }
    
     //  Handle completion logic here
      try {
       updateUser(userData)
       navigate("/dashboard")
      }catch(e) {
        console.log(e);
      }
      
    }
    
    const handleEdit = (field: string) => {
      // Handle edit logic here
      console.log(`Editing ${field}`)
    }
  
    return ( 
      <>
     <Nav2 
      completed={completed}
      setCompleted={setCompleted}
      name='Summary'
      />
            <OnboardingSummary 
                userData={{
                    fullName: userData.fullName,
                    username: userData.username,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    company: userData.company,
                }} 
                onBack={handleBack} 
                onComplete={handleComplete}
                onEdit={handleEdit} 
            />
            <div className="flex justify-center items-center">
           {isLoading && <p className="text-sm text-blue-500">Signing up, please wait...</p>} {/* Loading message */}
          {isSuccess && <p className="text-sm text-green-500">Sign up successful!</p>} {/* Success message */}
          {isError && (
            <p className="text-sm text-red-500">
              Oops! Something went wrong during the sign-up process. Please check your network connection and ensure that your email and username are not already in use.
            </p>
          )}
            </div>
      </>
            
    )
}

export default Summary;
