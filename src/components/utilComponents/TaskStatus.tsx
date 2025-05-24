import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface TaskStatusProps {
    TotalCount: number
    InProgressCount: number
    PendingCount: number
    Completed: number
    Deleted : number 

}


const TaskStatus = ({TotalCount, InProgressCount, PendingCount, Completed, Deleted}: TaskStatusProps)  => {
    
return (
    <div className="w-auto overflow-x-auto">
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="h-12 items-center justify-start w-full bg-white rounded-none p-0 mr-16">
        <TabsTrigger
          value="all"
          className={cn(
            "data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border-b-blue-700 relative h-full px-4  rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "flex items-center gap-2"
          )}
        >
          <span className="whitespace-nowrap text-slate-700 text-xs">All <span className="bg-green-700 p-1 ml-4 text-xs">{TotalCount}</span></span>
        </TabsTrigger>
        <TabsTrigger
          value="meetings"
          className={cn(
            "data-[state=active]:bg-primary/5 data-[state=active]:text-primary relative h-full px-4 data-[state=active]:border-b-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "flex items-center gap-2"
          )}
        >
          <span className="whitespace-nowrap text-slate-700 text-xs">In Progress <span className="bg-blue-600 p-1 ml-4">{InProgressCount}</span></span>
        </TabsTrigger>
        <TabsTrigger
          value="events"
          className={cn(
            "data-[state=active]:bg-primary/5 data-[state=active]:text-primary relative data-[state=active]:border-b-blue-700 h-full px-4  rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "flex items-center gap-2"
          )}
        >
          <span className="whitespace-nowrap text-slate-700 text-xs">Pending <span className="bg-yellow-400 p-1 ml-4">{PendingCount}</span></span>
        </TabsTrigger>
        <TabsTrigger
          value="conflicted"
          className={cn(
            "data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border-b-blue-700 relative h-full px-4   rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "flex items-center gap-2"
          )}
        >
          <span className="whitespace-nowrap text-slate-700 text-xs">Completed <span className="bg-lime-700 p-1 ml-4">{Completed}</span></span>
        </TabsTrigger>
        <TabsTrigger
          value="conflicted"
          className={cn(
            "data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border-b-blue-700 relative h-full px-4   rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "flex items-center gap-2"
          )}
        >
          <span className="whitespace-nowrap text-slate-700 text-xs">Deleted <span className="bg-red-700 p-1 ml-4">{Deleted}</span></span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
)
}

export default TaskStatus;