import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

const Button: FC<ButtonProps> = ({className, children, ...props}) => {
    return (
        <button
            className="mt-10 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
