import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import { SignUpSchema } from "@/libs/validation/schema"
import { UseFormRegister } from "react-hook-form";



interface PasswordInputProps {
  id: string
  label: string
  register: UseFormRegister<SignUpSchema>
  error?: string
  placeholder?: string
 
}


const PasswordInput: React.FC<PasswordInputProps> = ({ id, label, register, error, placeholder = ".........." }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(id as "email" | "username" | "password" | "confirmPassword")}
          required
          className="pl-10 pr-10"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="w-5 h-5 text-gray-400" />
        </span>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default PasswordInput

