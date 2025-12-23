import {z} from "zod"

const registrationValidationSchema=z.object({
    username:z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: z.email({ message: "Please provide a Valid email" }),
    password: z.string().min(8,{ message: "Password must be at least 8 characters long" })
});

const loginValidationSchema=z.object({
    email: z.email({ message: "Please provide a Valid email" }),
    password: z.string().min(8,{ message: "Password must be at least 8 characters long" })
})

export {registrationValidationSchema, loginValidationSchema};