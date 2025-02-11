import { useState } from 'react'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2 } from 'lucide-react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Nav2 from '@/components/utilComponents/Nav_2'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
//schemas
import { companySchema,CompanySchema } from "@/libs/validation/schema";
//hooks
import { useNavigate } from 'react-router-dom';

import { useFormNavigation } from '@/hooks/useFormNavigation';



enum CurrentPage {
  COMPANY = "company_selection",
}

const Company = () => {
    const [completed, setCompleted] = useState(false);
    const {getNextPage} = useFormNavigation()
    const [currentPage, setCurrentPage] = useState(CurrentPage.COMPANY);
    const storedData = JSON.parse(sessionStorage.getItem("company_selection") || "{}");
    const { register, handleSubmit, formState: { errors } } = useForm<CompanySchema>({
      resolver: zodResolver(companySchema),
      defaultValues: { 
      company : storedData.company || "",
    },
    })
    const navigate = useNavigate();
    


    const onSubmit: SubmitHandler<CompanySchema> =  (data) => {
        console.log(data);
        if (data) {
          
          // setCompleted(true);
          getNextPage(currentPage as string, setCurrentPage as React.Dispatch<React.SetStateAction<string>>, data as CompanySchema);
          }
     }
     
     
     return (
       <div>
       <div>
         <Nav2
         completed={completed}
         setCompleted={setCompleted}
         name="Company"
         />
         <Button  variant="outline" size="sm" className='mt-10 ml-14'onClick={()=>{navigate('/role_selection')}}>
           <img src="/assets/icons/go_back.svg" alt=""  className='mr-2'/>
           Back
         </Button>
         <div className='w-full mt-20'>
               <div className="mx-auto max-w-2xl w-[420px] ">
                   <div className=" flex items-center justify-center ">
                       <Building2 className='w-24 h-24 shadow text-white rounded-full p-6 bg-gray-500 object-contain '/>
                   </div>
               <CardHeader className='text-center'>
                   <CardTitle className="text-xl">Company/Team Information</CardTitle>
                   <CardDescription className='text-gray-600'>
                     Provide the name of your company or team to proceed.
                   </CardDescription>
               </CardHeader>
               <form onSubmit={handleSubmit(onSubmit)}>
               <CardContent>
                   <div className="grid gap-4">
                   <div className="grid gap-2">
                       <Label htmlFor="company">Company/Team Name</Label>
                       <Input
                       className="hover:border-blue-600"
                       id="company"
                       type="text"
                       {...register("company")}
                       placeholder="Company/Team name"
                       required
                       />
                   </div>
                   {errors.company && <p className='text-sm text-red-500'>{errors.company.message}</p>}
                   <Button type="submit" className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                       Continue
                   </Button>
                   </div>
               </CardContent>
               </form>
               </div>
   
           </div>
       </div>
       </div>
     )
   
}

export default Company;
