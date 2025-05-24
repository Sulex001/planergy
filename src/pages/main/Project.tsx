import { Sidebar } from "@/components/utilComponents/SideBar";
import CreateTaskDialog from '@/components/forms/ProjectInputFormModal';
import {useState} from "react"
import { useAuthContext } from '@/hooks/UseAuthContext';
import Nav3 from '@/components/utilComponents/Nav_3'
import TaskStatus from '@/components/utilComponents/TaskStatus';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, SlidersHorizontal} from 'lucide-react'
import { Plus } from 'lucide-react';
 

const Project = () => {
    const [open, setOpen] = useState(false)             
    const {state} = useAuthContext();
    const user = state.userDetails.user?.user;
    const username = user?.username || '';
    const fullName = user?.fullName
    
    return (
        <div className="w-full flex space-x-4">
            <Sidebar/>
        <div className="w-full">
        <Nav3
            pageTitle="Projects"
            description="Manage projects and collaborate on projects within your organization teams"
            showSearch={false}
            showSchedule={true}
            avatarSrc={fullName?.charAt(0).toUpperCase()}
            userName={username}
        /> 
        <div className='flex items-center justify-between border-b'>
        <TaskStatus
            TotalCount= {2}
            InProgressCount= {1}
            PendingCount={1}
            Completed= {1}
            Deleted= {2}
        />
        <div className='flex items-center justify-between'>
            <div>
                <Button onClick={()=>{setOpen(true)}} variant="outline" className="flex items-center gap-2 bg-blue-700 text-white">
                    <Plus className="h-2 w-2" />
                    <span className="text-xs">New Project</span>
                </Button>
                { open && <CreateTaskDialog open={open} setOpen ={setOpen}/> }
            </div>
                <div className="flex items-center gap-2 max-w-3xl mx-auto p-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            className="pl-9 pr-16 h-10"
                        />
                    </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>Filter</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            <span>Sort by</span>
                        </Button>
                </div>
        </div>                
        </div>  
    </div>
        </div>
    );
}
export default Project;
