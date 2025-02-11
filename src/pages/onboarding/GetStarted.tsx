import SignUpForm from "@/components/features/auth/signUp/SignUpForms"
import SignUpHeader from "@/components/features/auth/signUp/SignUpHeader"
import Nav from "@/components/utilComponents/Nav"
import { CircleUserRound } from "lucide-react"
import type React from "react"


const GetStarted: React.FC = () => {
  return (
    <div className="max-w-full">
      <Nav/>
      <div className="w-full mt-20">
        <div className="mx-auto max-w-2xl w-[420px]">
          <div className="flex items-center justify-center">
           <CircleUserRound className="w-24 h-24 shadow text-white rounded-full p-6 bg-gray-500 object-contain "/>
          </div>
          <SignUpHeader title="Join Planergy Team" description="Get started by signing Up" googleButton={true} text={true}/>
          <SignUpForm/>
        </div>
      </div>
    </div>
  )
}

export default GetStarted