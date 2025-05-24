import {useState, } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  FolderClosed,
  Users,
  Link,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router-dom"
import { useAuthContext } from '@/hooks/UseAuthContext';
// import UseSignOut from '../../hooks/useSignOut';




const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Projects", icon: FolderClosed },
  { name: "Tasks", icon: ClipboardList },
  { name: "Teams", icon: Users },
  { name: "Calender", icon: Calendar },
  { name: "Documents", icon: FileText },
  { name: "Integrations", icon: Link },

]

// const favItems = [
//   { name: "Loom Mobile App", color: "bg-purple-500" },
//   { name: "Monday Redesign", color: "bg-red-500" },
//   { name: "Udemy Courses", color: "bg-pink-500" },
// ]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  // const [isActive, setIsActive] = useState("Dashboard");
  const {state} = useAuthContext();
//   const {logOut, error, isPending}= UseSignOut();

const user = state.userDetails.user?.user;
const {username,companyName, email, fullName,  } = user || {};
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

const handleLogout = () => {
//   logOut();
}


  return (
    <div className={cn(
      "flex flex-col bg-white border-r h-screen relative transition-all duration-600",
      isCollapsed ? "w-16" : "w-64" 
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/public/assets/icons/logo.svg" alt="logo" />
            </div>
            <div>
                <h1 className="text-sm font-medium">Planergy</h1>
                <p className="text-xs text-gray-700">{companyName}</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto">
           <img src="/public/assets/icons/logo.svg" alt="logo" /> 
          </div>
        )}
        {!isCollapsed && (
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          <p className={cn(
            "px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider",
            isCollapsed && "sr-only"
          )}>
            Main
          </p>
          {navItems.map((item) => {
              const Icon = item.icon
              const isActive = window.location.pathname === `/${item.name.toLowerCase()}`
            return (
                    <NavLink
                      key={item.name}
                      to={`/${item.name.toLowerCase()}`}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        "transition-all duration-200 ease-in-out",
                        isCollapsed ? "justify-center px-2" : "w-full",
                        isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isCollapsed ? "mr-0" : "mr-2",
                          "transition-all duration-200",
                           isActive ? "text-blue-700" : "text-gray-600"
                        )}
                      />
                      {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                  )
        })}
          {/* <p className={cn(
            "mt-6 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider",
            isCollapsed && "sr-only"
          )}>
            Favs
          </p>
          {favItems.map((item, index) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <span className={`mr-2 h-2 w-2 rounded-full ${item.color}`} />
              {!isCollapsed && (
                <>
                  {item.name}
                  <span className="ml-auto text-xs text-gray-400">#{index + 1}</span>
                </>
              )}
            </Button>
          ))} */}
        </nav>
      </ScrollArea>
      <div className={cn(
        "p-4 border-t",
        isCollapsed && "flex flex-col items-center"
      )}>
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isCollapsed && "justify-center px-2"
        )}>
          <Settings className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && "Settings"}
        </Button>
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isCollapsed && "justify-center px-2"
        )}>
          <HelpCircle className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && "Support"}
        </Button>
        <Button  onClick={()=> handleLogout()} variant="ghost" className={cn(
          "w-full justify-start",
          isCollapsed && "justify-center px-2"
        )}>
        <LogOut className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && "Log out"}
        </Button>
      </div>
      <div className={cn(
        "p-4 border-t flex items-center",
        isCollapsed && "justify-center"
      )}>
        {!isCollapsed && (
          <>
            <Avatar>
              <AvatarImage src={fullName?.charAt(0).toUpperCase()} alt="photoImage" />
              <AvatarFallback>{username ? username[0] : '?'}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{fullName}</p>
              <p className="text-xs  text-gray-500">{email}</p>
            </div>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto absolute -right-4 top-12 bg-blue-100 rounded-full ", isCollapsed && "ml-0 -right-6")}
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-blue-700" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-blue-700 " />
          )}
        </Button>
      </div>
    </div>
  )
}
  