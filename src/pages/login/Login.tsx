import React from "react";
// import from shadcn ui
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, LoginSchema } from '@/libs/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import useLogin from "@/hooks/useLogin";



const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginSchema>(
        { resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
         } // Pass the validation schema
        
    );
    const { login, isLoading,error, isSuccess, isError } = useLogin();

    const onSubmit = (data: LoginSchema) => {
        login(data)
    }

    return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[860px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
        <CardHeader className="space-y-1 pb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
        <p className="text-sm text-muted-foreground text-center">Enter your details to login.</p>
      </CardHeader>
      <Button variant="outline" className="w-full">
                <img src="/assets/icons/google_icon.svg" alt="" className='pr-2' />
                Login with Google
      </Button>
      <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">-----------------Or continue with-----------------</span>
          </div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</Label>
              </div>
              <Input id="password" type="password" 
              {...register("password")}
              required />
            </div>
            
        <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="keep-logged-in" />
                    <label htmlFor="keep-logged-in" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Keep me logged in
                    </label>
                </div>
                <Button variant="link" className="text-sm">
                    Forgot password?
                </Button>
        </div>
                {error && <p className="text-sm text-red-600">{error.message}</p> || null}
                {!isLoading && <Button type="submit" className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                    Login
                </Button>}
                {isSuccess && <p className="text-sm text-green-500">Sign up successful!</p>} {/* Success message */}
               {isError && (
                  <p className="text-sm text-red-500">
                  Oops! Something went wrong during the login process. Please check your network connection and ensure that your email and username are correct.
                </p>
                )}
          </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/get_started" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-blue-700 lg:block lg:justify-center items-center min-h-screen w-full h-full p-12">
        <div className="relative w-fit h-fit mt-24">
            <img
            loading="lazy"
            src="/assets/icons/secure_login.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-fit w-fit object-cover p-4 my-auto"
            />
        </div>
        
      </div>
    </div>
    )
}
export default Login;