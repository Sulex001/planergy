import type React from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditableFieldProps {
  icon: React.ReactNode
  label: string | undefined
  value: string
  onEdit: () => void
}

const EditableField: React.FC<EditableFieldProps> = ({ icon, label, value, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-blue-100"
      >
        <Pencil className="h-4 w-4 " />
        <span className="sr-only">Edit {label}</span>
      </Button>
    </div>
  )
}

export default EditableField

