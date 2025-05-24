import { ArrowUpRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface TeamSubHeaderProps {
    pageTitle: string
    description: string
    showExport?: boolean
    showNewTeam?: boolean
  }
  
  const TeamSubHeader = ({
    pageTitle,
    description,
    showExport,
    showNewTeam,
   
  
}: TeamSubHeaderProps)  => {
    return (
        <section className="flex items-center justify-between p-4 bg-background border-b ">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-medium">{pageTitle}</h1>
                <p className="text-xs text-muted-foreground text-gray-700">
                  {description}
                </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showExport && (
              <Button variant="secondary" className="hover:bg-gray-200 hover:border-none border-2 border-gray-100 font-normal">
                <ArrowUpRight className="h-5 w-5" />
                Export
              </Button>
            )}
            {showNewTeam && (
              <Button className="hover:bg-gray-100 hover:text-black bg-blue-700 text-white">
                <Plus className="h-5 w-5" />
                New Team
              </Button>
            )}
          
          </div>
        </section>
      )
}

export default TeamSubHeader;
