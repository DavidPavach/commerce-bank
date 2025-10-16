import { toast } from "react-fox-toast";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from "react-router-dom";

//Schemas, Stores and Hooks
import { passwordResetSchema, PasswordResetInput } from "@/schema/passwordReset.schema";
import { useUserEmailStore } from '@/stores/useEmailStore';
import { usePasswordResetVerification } from "@/services/mutations.service";

//Components
import ZodInput from "@/components/ZodInput";
import ErrorText from "@/components/ErrorText";
import Button from '@/components/Button';

const SendEmail = () => {

    // States and Stores
    const { setEmail } = useUserEmailStore();
    const [searchParams, setSearchParams] = useSearchParams();

    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordResetInput>({
        resolver: zodResolver(passwordResetSchema),
        reValidateMode: "onBlur"
    });

    const passwordReset = usePasswordResetVerification()

    // Form submission handler
    const onSubmit: SubmitHandler<PasswordResetInput> = (data) => {

        const message = "We've sent an OTP to the email address you provided. If the email is registered with us, you should receive it shortly";
        passwordReset.mutate(data, {
            onSuccess: () => {
                toast.success(message);
                setEmail(data.email);
                searchParams.set("page", "verify");
                setSearchParams(searchParams);
                reset();
            },
            onError: () => {
                toast.success(message);
                reset();
            },
        });
    };


    const disableButton = passwordReset.isPending || !!errors.email
    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <form className="flex flex-col gap-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <ZodInput type="email" placeholder="Johndoe@mail.com" label="Email" name="email" register={register} required />
                    {errors.email && <ErrorText message={errors.email.message} />}
                </div>
                <Button text="Send OTP" loadingText='Sending OTP...' variant='primary' size='lg' disabled={disableButton} loading={passwordReset.isPending} />
            </form>
        </motion.div>
    );
}

export default SendEmail;