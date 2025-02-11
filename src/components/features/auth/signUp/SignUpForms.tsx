import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpSchema } from "@/libs/validation/schema"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import PasswordInput from "./PasswordInputs"
import useSignUp from "@/hooks/useSignUp"
import { useFormNavigation } from "@/hooks/useFormNavigation"
import { useState } from "react"


enum CurrentPage {
  GET_STARTED = "get_started",
}


const SignUpForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(CurrentPage.GET_STARTED)
  const { getNextPage } = useFormNavigation()
  const storedData = JSON.parse(sessionStorage.getItem("get_started") || "{}")
  const { signUp,isLoading, isSuccess, isError} = useSignUp()
  const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm<SignUpSchema> ({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          email: storedData.email || "",
          username: storedData.username || "",
        },
  })

  const onSubmit = (data: SignUpSchema) => {
    if(data.password === data.confirmPassword) {
   const userData = {
    email: data.email,
    password: data.password,
    username: data.username,
   }
   signUp(userData)
   
   const getStarted = {
    email: data.email,
    username: data.username, 
   }
   getNextPage(
    currentPage,
    setCurrentPage as React.Dispatch<React.SetStateAction<string>>,
    getStarted as SignUpSchema);
    }else
    {
      throw new Error("Passwords do not match")
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="What's your email?" required />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className="hover:border-blue-600"
              id="username"
              type="text"
              {...register("username")}
              placeholder="What's your username?"
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>
          <PasswordInput
            id="password"
            label="Create a Password*"
            register={register}
            error={errors.password?.message}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password*"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="text-[hsl(var(--primary))]" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          {errors && <p className="text-red-500">{typeof errors === "string" ? errors : (errors as Error).message}</p>}
           {isLoading && <p className="text-sm text-blue-500">Signing up, please wait...</p>} {/* Loading message */}
          {isSuccess && <p className="text-sm text-green-500">Sign up successful!</p>} {/* Success message */}
          {isError && (
            <p className="text-sm text-red-500">
              Oops! Something went wrong during the sign-up process. Please check your network connection and ensure that your email and username are not already in use.
            </p>
          )}
          {!isSubmitting && (
            <Button type="submit" className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
              Get Started
            </Button>
          )}
          {isSubmitting && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 animate-spin w-full" />
              Please wait
            </Button>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </form>
  )
}

export default SignUpForm

