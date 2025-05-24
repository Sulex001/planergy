import Nav3 from "@/components/utilComponents/Nav_3";
import { Sidebar } from "@/components/utilComponents/SideBar";
import { useAuthContext } from "@/hooks/UseAuthContext";
const Documents = () => {
    const {state} = useAuthContext();
    const user = state.userDetails.user?.user;
    const username = user?.username || '';
    const fullName = user?.fullName
    return (
        <div className="w-full flex space-x-4">
                <Sidebar/>
            <div className="w-full">
                <Nav3
                    pageTitle="Documents"
                    description="You have 2 meetings and 3 Tasks to complete"
                    showSearch={false}
                    showSchedule={true}
                    avatarSrc={fullName?.charAt(0).toUpperCase()}
                    userName={username }
                /> 
            <div className='flex items-center justify-between border-b'>
              
                <div className='flex items-center justify-between'>
                
                </div>                
            </div>  
            </div>
    
        </div>
        );
}

export default Documents;
