import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
  image: File | null
}

const FileInput: React.FC<FileInputProps> = ({ onChange, error, image }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="profilePicture">Upload your profile picture</Label>
      <Input
        className="hover:border-blue-600"
        id="profilePicture"
        type="file"
        onChange={onChange}
        placeholder="Upload your profile picture?"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {image && (
        <div className="flex items-center justify-center">
          <img
            src={URL.createObjectURL(image) || "/placeholder.svg"}
            alt="profilePicture"
            className="w-24 h-24 rounded-full p-6 bg-gray-200 text-gray-200"
          />
        </div>
      )}
    </div>
  )
}

export default FileInput

