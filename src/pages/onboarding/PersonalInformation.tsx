import type React from "react"
import { useState } from "react"
import Nav2 from "@/components/utilComponents/Nav_2"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PersonalInformationSchemas, personalInformationSchemas } from "@/libs/validation/schema"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useStorage from "@/hooks/useStorage"
import { useFormNavigation } from "@/hooks/useFormNavigation"
import FileInput from "@/components/features/auth/signUp/FileInput"
import { UserCredentials } from "@/contexts/AuthContext"
import { CircleUser } from 'lucide-react';


enum CurrentPage {
  PERSONAL_INFORMATION = "personal_Information",
}

const PersonalInformation: React.FC = () => {
  const [completed, setCompleted] = useState(false)
  const [currentPage, setCurrentPage] = useState(CurrentPage.PERSONAL_INFORMATION)
  const { getNextPage } = useFormNavigation()
  const [image, setImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const { updateAvatar} = useStorage()

  const storedData = JSON.parse(sessionStorage.getItem("personal_Information") || "{}")
  
  const { register, handleSubmit, formState: { errors }, } = useForm<PersonalInformationSchemas>({
          resolver: zodResolver(personalInformationSchemas),
          defaultValues: {
            fullName: storedData.fullName || "",
            phoneNumber: storedData.phoneNumber || "",
          },
  })

  const onSubmit: SubmitHandler<PersonalInformationSchemas> = (data) => {
    if (data) {
      console.log(data);  
      getNextPage(
        currentPage,
        setCurrentPage as React.Dispatch<React.SetStateAction<string>>,
        data as UserCredentials);
      
    }
    if (image) {
      updateAvatar(image)
    } else {
      setImageError("Please select an image or select another image")
    }
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null)
    setImage(null)
    const file = event.target.files?.[0]
    const validationType = ["image/png", "image/jpeg", "image/jpg"]

    if (!file) {
      setImageError("Please select a file")
      return
    }
    if (!file.type.includes("image")) {
      setImageError("Selected file must be an image")
      return
    }
    if (!validationType.includes(file.type)) {
      setImageError("Selected file must be a PNG or JPEG image")
      return
    }
    if (file.size > 500000) {
      setImageError(
        "Image file size must be less than 200kb, kindly upload a smaller image or compress the size of the image",
      )
      return
    }

    setImageError(null)
    setImage(file)
  }

  return (
    <div>
      <Nav2 completed={completed} setCompleted={setCompleted} name="Personal" />
      <div className="w-full mt-20">
        <div className="mx-auto max-w-2xl w-[420px]">
          <div className="flex items-center justify-center">
          <CircleUser className='w-24 h-24 shadow text-white rounded-full p-6 bg-gray-500 object-contain '/>
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription className="text-gray-600">Provide essential information to proceed.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    className="hover:border-blue-600"
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    placeholder="What's your full name?"
                    required
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    className="hover:border-blue-600"
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="What's your phone number?"
                    required
                  />
                  {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
                </div>
                <FileInput onChange={handleFileChange} error={imageError} image={image} />
                <Button type="submit" className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                  Continue
                </Button>
              </div>
            </CardContent>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformation

