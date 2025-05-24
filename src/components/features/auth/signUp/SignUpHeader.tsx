import type React from "react"
import { Button } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


type SignUpHeaderProps = {
    title: string
    description: string
    googleButton?: boolean
    text?: boolean
}

const SignUpHeader: React.FC<SignUpHeaderProps> = ({title, description, googleButton, text}) => {
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
      <div className="mt-[20px]">
        {googleButton && <Button variant="outline" className="w-full">
          <img src="/assets/icons/google_icon.svg" alt="" className="pr-2" />
          Sign up with Google
        </Button>}
      </div>
      {text && <p className="text-sm text-gray-600">----- or sign up with Email ------</p>}
    </CardHeader>
  )
}

export default SignUpHeader
