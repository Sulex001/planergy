import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Plus,  } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AssigneeProps = {
    assign: string,
    setAssign: (value: string) => void;
}
const Assignee = ({assign, setAssign} : AssigneeProps) => {

return (
    <div>
         <label htmlFor="priority">Assignee to:</label>
            <div className="flex gap-2">
              <Select value={assign} onValueChange={(value)=> setAssign(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="bob">Bob Johnson</SelectItem>
                  </SelectContent>
                </Select>
               <Button variant="outline" size="icon" onClick={()=>{}}>
                    <Plus className="h-4 w-4" />
               </Button>
            </div>
    </div>
)
}

export default Assignee;



