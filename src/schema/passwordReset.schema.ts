import { z } from 'zod';

export const passwordResetSchema = z.object({
    email: z.string({
        required_error: "Email is Required"
    }).email('Invalid email address')
});


export type PasswordResetInput = z.infer<typeof passwordResetSchema>