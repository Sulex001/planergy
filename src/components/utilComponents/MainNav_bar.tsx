import { Bell, Calendar, LayoutDashboard, Mail, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavBarProps {
  userName: string 
  welcomeMessage: string
  taskCount?: number
  showSearch?: boolean
  showSchedule?: boolean
  showCreateRequest?: boolean
  avatarSrc?: string
}

export default function NavBar({ userName, welcomeMessage, taskCount, showSearch = true, showSchedule = false, avatarSrc}: 
  NavBarProps) {
    return (
    <nav className="flex items-center justify-between p-4 bg-background border-b ">
      <div className="flex items-center space-x-4">
      <LayoutDashboard className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/>
        <div>
          <h1 className="text-normal font-semibold">{welcomeMessage}, {userName}</h1>
          {taskCount !== undefined && (
            <p className="text-xs text-muted-foreground">
              You have {taskCount} tasks to complete
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 w-[300px]"
            />
          </div>
        )}
        {showSchedule && (
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
        )}
        {/* {showCreateRequest && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Request
          </Button>
        )} */}
        <Button variant="ghost" size="icon">
          <Mail className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src={avatarSrc} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}