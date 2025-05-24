import { z } from 'zod';

// ... existing code ...
export const signUpSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address provided" })
    .regex(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Invalid email address format provided",
    }),
    username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    // .regex(/^[a-zA-Z0-9_]+$/, {
    //   message: "Invalid Username format provided. Only letters, apostrophes, and spaces are allowed.",
    // })
    ,
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
// ... existing code ...


export const personalInformationSchemas = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long." })
    // .regex(/^[A-Za-z' ]+$/, {
    //   message: "Invalid Full Name format provided. Only letters, apostrophes, and spaces are allowed.",
    // }),
  ,
  phoneNumber: z.
  string().
  min(10, { message: "Phone number must be at least 10 digits" })
  .max(15, { message: "Phone number must not exceed 15 digits" })
  .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format" })
});
export type PersonalInformationSchemas  = z.infer<typeof personalInformationSchemas>;

export const roleSchema = z.object({
  selectedRole: z.enum(['employee', 'employer'], {
    required_error: "You must select a role",
  }),
});
export type RoleSchema = z.infer<typeof roleSchema>;


export const companySchema = z.object({
  company: z
    .string()
    .min(3, { message: "Company name must be at least 2 characters long." })
    // .regex(/^[A-Za-z0-9&.,' ]+$/, {
    //   message: "Invalid company name format provided. Only letters, numbers, and special characters (&, ., ', ,) are allowed.",
    // })
});
export type CompanySchema = z.infer<typeof companySchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address provided" })
    .regex(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Invalid email address format provided",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
export type LoginSchema = z.infer<typeof loginSchema>;


const PriorityEnum = z.enum(['low', 'medium', 'high']);

export type ProjectFormValueSchema = z.infer<typeof projectFormValueSchema>

export const projectFormValueSchema = z.object({
  projectName: z.string().min(1, "Project name is required"), // Project name
  projectDescription: z.string().min(1, "Project description is required"), // Project description
  projectStartDate: z.date(), // Project start date
  projectEndDate: z.date().refine((date) => date > new Date(), {
      message: "End date must be in the future",
  }), // Project end date must be in the future
  priority: PriorityEnum, // Project priority
  assignedTo:  z.string(), // User assigned to the project
  // fileUpload: z.instanceof(File).nullable(), // File upload (nullable)
  
});