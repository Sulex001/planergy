import React from 'react'
import { useState } from 'react'
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import Nav2 from '@/components/utilComponents/Nav_2'

// import schemas from schema.ts
import {RoleSchema, roleSchema } from '@/libs/validation/schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roles } from '@/data/dummydata';
import { Users } from 'lucide-react';

// import hook

import { useFormNavigation } from '@/hooks/useFormNavigation';

import { useNavigate } from 'react-router-dom';

enum CurrentPage {
  ROLE_SELECTION = "role_selection",
}


  const RoleSelection: React.FC =()=> {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.ROLE_SELECTION);
  const [completed, setCompleted] = useState(false);
  const {getNextPage} = useFormNavigation();
  const storedData = JSON.parse(sessionStorage.getItem("role_selection") || "{}");
  const { control, handleSubmit,formState: { errors }} = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: { 
      selectedRole: storedData.selectedRole ? storedData.selectedRole as RoleSchema['selectedRole'] : "employee",
  },});
  
  const navigate = useNavigate();
  const onSubmit = (data: RoleSchema) => {
    if (data) {
    setCompleted(true);
    getNextPage(currentPage as string, setCurrentPage as React.Dispatch<React.SetStateAction<string>>, data as RoleSchema);
    }
  };
  
  
  return (
  <div>
    <div>
      <Nav2 
      completed={completed}
      setCompleted={setCompleted}
      name='Role'
      />
      <Button variant="outline" size="sm" className='mt-10 ml-14' onClick = {()=> {
        navigate("/personal_information");
      }} >
      <img src="/public/assets/icons/go_back.svg" alt=""  className='mr-2'/>
        Back
      </Button>
      <div className='w-full mt-20'>
            <div className="mx-auto max-w-2xl w-[420px] ">
                <div className=" flex items-center justify-center ">
                  <Users className='w-24 h-24 shadow text-white rounded-full p-6 bg-gray-500 object-contain'/>
                </div>
            <CardHeader className='text-center'>
                <CardTitle className="text-xl font-medium">Role Selection</CardTitle>
                <CardDescription className='text-gray-600'>
                  Choose your role within Planergy.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Controller
               name="selectedRole"
               control={control}
               render={({ field }) => (
                 <div className="space-y-6 pb-4 mb-4">
                   {roles.map((role) => (
                      <Card key={role.id} className="overflow-hidden hover:border-blue-500">
                        <Label
                          htmlFor={role.id}
                          className="flex cursor-pointer items-center p-4"
                        >
                          <img
                            src={role.icon}
                            alt={role.name}
                            className="mr-4 h-4 w-4 rounded-full object-cover"
                          />
                          <div className="flex-grow">
                            <CardTitle className="text-base font-normal">
                              I am an {role.name}
                            </CardTitle>
                            <CardDescription className="font-extralight">
                              {role.description}
                            </CardDescription>
                          </div>
                          <Checkbox className='text-blue-700'
                            id={role.id}
                            checked={field.value === role.id}
                            onCheckedChange={() => field.onChange(role.id)}
                          />
                        </Label>
                      </Card>
                    ))}
                 </div>
               )}
              />
                {errors.selectedRole && <p className='text-sm text-red-500 pb-4'>{errors.selectedRole.message}</p>}
                <Button type="submit" className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                    Continue
                </Button>
                </CardContent>
            </form>
            </div>
        </div>
    </div>
  </div>
  )}

export default RoleSelection