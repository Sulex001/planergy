import { Bell, Calendar, Calendar1, ClipboardList, FileText, FolderClosed, Link, Mail, Search, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavBarProps {
    pageTitle: string
    description: string
    showSearch?: boolean
    showSchedule?: boolean
    avatarSrc?: string
    userName: string
  }
  
  const Nav3 = ({
    pageTitle,
    description,
    showSearch = true,
    showSchedule = false,
    avatarSrc,
    userName,
}: NavBarProps)  => {
    return (
        <nav className="flex items-center justify-between p-4 bg-background border-b ">
          <div className="flex items-center space-x-4">
          <>
          
          {pageTitle == "Projects" ? <FolderClosed className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          {pageTitle == "Tasks" ? <ClipboardList className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          {pageTitle == "Teams" ? <User className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          {pageTitle == "Calender" ? <Calendar1 className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          {pageTitle == "Document" ? <FileText className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          {pageTitle == "Integrations" ? <Link className='w-8 h-8 border-solid border border-slate-300 text-slate-950 rounded-full p-2 object-center '/> : ''}
          </>
            <div>
              <h1 className="text-lg font-medium">{pageTitle}</h1>
                <p className="text-xs text-muted-foreground text-gray-700">
                  {description}
                </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-8 w-[300px]"
                />
              </div>
            )}
            {showSchedule && (
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Calendar className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
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

export default Nav3;
