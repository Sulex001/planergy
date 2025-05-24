import TeamSubHeader from "@/components/features/team/TeamSubHeader";
import Nav3 from "@/components/utilComponents/Nav_3";
import { Sidebar } from "@/components/utilComponents/SideBar";
import { useAuthContext } from '@/hooks/UseAuthContext';

const Teams = () => {
    const {state} = useAuthContext();
    const user = state.userDetails.user?.user;
    const username = user?.username || '';
    const fullName = user?.fullName
    

return (
    <div className="w-full flex space-x-4 mr-4">
            <Sidebar/>
            
        <div className="w-full">
            <Nav3
                pageTitle="Teams"
                description="Manage and collaborate within your organization teams"
                showSearch={false}
                showSchedule={true}
                avatarSrc={fullName?.charAt(0).toUpperCase()}
                userName={username }
            /> 
             <TeamSubHeader
                pageTitle= "Members"
                description= "Display all the team members and essential details"
                showExport = {true}
                showNewTeam = {true}
             />
        </div>
    </div>
    );
}

export default Teams;
