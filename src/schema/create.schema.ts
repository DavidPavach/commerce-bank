import { z } from 'zod';

export const createSchema = z.object({
    email: z.string({
        required_error: "Email is Required"
    }).email('Invalid email address'),
    password: z.string({
        required_error: "Password is Required"
    }).min(8, 'Password too short - should be 8 Chars minimum'),
    fullName: z.string({
        required_error: "Full Name is Required"
    }).min(4, 'Full Name too short - should be 4 Chars minimum'),
});


export type CreateInput = z.infer<typeof createSchema>