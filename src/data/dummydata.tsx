import { RoleSchema } from '@/libs/validation/schema';
 export type NavItem = {
    id: number,
    name: string,
    path: string
 }
 
 export const navItem = [{
    id: 1,
    name: 'Personal',
    path: '/personal_information'
}, 
{
    id: 2,
    name: 'Role',
    path: '/role_selection'
},
{
    id: 3,
    name: 'Company',
    path: '/company_selection'
},
{
    id: 4,
    name: 'Summary',
    path: '/summary'
},
]

export type Roles = {
    id: RoleSchema['selectedRole'],
    name: string,
    description: string,
    icon: string
   }
 export const roles: Roles[]= [
    {
    id: "employee",
    name: "Employee",
    description: "Join as an Employee to access Planergy",
    icon: "/assets/icons/employee.svg"
  },
    {
      id: "employer",
      name: "Employer",
      description: "Join as an Employer to access Planergy.",
      icon : "/assets/icons/employer.svg"
    }]