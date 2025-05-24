import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Upload } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectFormValueSchema, ProjectFormValueSchema } from "@/libs/validation/schema"
import { useAuthContext } from "@/hooks/UseAuthContext"



type CreateTaskDialogProps  = {
    open : boolean
    setOpen: (open: boolean) => void; // Explicitly define the type for setOpen
}
// type AssigneesProps = {
//    assignee: [{id:string, name: string}]; // or the appropriate type
// }

export default function CreateTaskDialog({open, setOpen}: CreateTaskDialogProps) {
  const {register, control, handleSubmit, formState: { errors }} = useForm<ProjectFormValueSchema>({
    resolver: zodResolver(projectFormValueSchema)
  })
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [files, setFiles] = useState<FileList | null>(null)
  const [assign, setAssign] = useState<string>("");
  // const [assignees, setAssignees]= useState([]);
const { state } = useAuthContext();
const user = state.userDetails.user?.user;
const companyId = user?.companyId || '';
const token = state.userDetails.user?.token;
console.log(companyId)
const getUserUrl = import.meta.env.GET_USERS_URL;
  
useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUserUrl}/${companyId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAssign(data);
        console.log(assign)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

}, [getUserUrl, companyId, token, assign])
  
const onSubmit = (data: ProjectFormValueSchema) => {
    // Handle form submission
    setOpen(false)
    console.log(data, startDate , endDate, files, assign)
}

const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
}
  

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
}

  // const handleAssignees = () => {
   
  //   setAssignees([assign])
 
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px] bg-white">
        <DialogHeader>
          <DialogTitle>Create new Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Project Name</Label>
            <Input 
            id="project-name" 
            {...register("projectName")} />
            {errors.projectName && <p className=" text-red-500 text-sm">{errors.projectName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
            id="description" 
            className="min-h-[100px]" 
            {...register("projectDescription")}
            />
            {errors.projectDescription && <p>{errors.projectDescription.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start date</Label>
              <Popover >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className="bg-white border-solid border-2 border-white"
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className="bg-white border-solid border-2 border-white"
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
                <label htmlFor="priority">Priority</label>
                <Controller
                    name="priority"
                    control={control}
                    defaultValue="medium" // Set the default value
                    render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
            </div>
          </div>
          <div className="space-y-2 bg-white">
           
          </div>
          <div className="space-y-2">
            <Label>Attachment</Label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop files to attach or{" "}
                  <span className="text-primary hover:underline">browse</span>
                </p>
              </label>
              {files && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {Array.from(files).map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-32 bg-blue-700 text-white">
              Create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}