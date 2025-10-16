type InputType = 'text' | 'number' | 'email' | 'password' | 'radio' | 'date' | 'file' | 'tel';

type InputProps = {
    type: InputType;
    placeholder?: string;
    label?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    title?: string;
    widthClass?: string;
    required?: boolean;
    otherClass?: string;
    autoComplete?: string;
    min?: number;
    max?: number;
    inputMode?: "text" | "email" | "tel" | "search" | "url" | "none" | "numeric" | "decimal";
};

const Input = ({ type, placeholder, label, id, value, onChange, pattern, title,
    widthClass = 'w-full', otherClass, min, max, inputMode, required, autoComplete = 'off' }: InputProps) => {
    return (
        <main className="flex flex-col gap-y-1">
            {label && (
                <label className="font-medium text-neutral-700 cursor-pointer" htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input type={type} placeholder={placeholder} name={id}
                id={id} value={value} onChange={onChange} pattern={pattern}
                title={title} autoComplete={autoComplete} minLength={min} maxLength={max} inputMode={inputMode}
                className={`text-sm md:text-base xl:text-lg px-4 py-3 bg-inherit rounded-2xl duration-300 border focus:border-primary focus:caret-primary focus:outline-none  ${widthClass} ${otherClass} placeholder:text-xs md:placeholder:text-sm xl:placeholder:text-base`}
                required={required}
            />
        </main>
    );
};

export default Input;
