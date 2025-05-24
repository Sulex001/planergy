import NavBar from '@/components/utilComponents/MainNav_bar';
import { Sidebar } from '@/components/utilComponents/SideBar';
import { useAuthContext } from '@/hooks/UseAuthContext';

const Dashboard = () => {
    const { state } = useAuthContext()
    const user = state.userDetails.user?.user;
    const username = user?.username || '';
    const fullName = user?.fullName
    
    return (
        <div className="w-full flex space-x-4">
            <Sidebar/>
            <div className="w-full">
                <NavBar 
                    userName={username}
                    welcomeMessage="Welcome to your dashboard"
                    taskCount = {0}
                    showSearch = {true}
                    showSchedule = {false}
                    avatarSrc={fullName?.charAt(0).toUpperCase()}
                />
            </div>
        </div>
    );
}

export default Dashboard;
