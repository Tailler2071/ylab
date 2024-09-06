import {DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    error?: FieldError;
}

const TextField: FC<TextFieldProps> = forwardRef(({label, error, className, ...props}, ref) => {
    return (
        <div className="relative">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
                <div className="mt-2">
                    <input
                        ref={ref}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                    ${error ? "ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} `}
                        {...props}
                    />
                </div>
            </label>

            {error && (
                <span className="absolute left-0 -bottom-5 text-sm text-red-500 font-medium">
                    {error.message}
                </span>
            )}
        </div>
    );
});

export default TextField;
