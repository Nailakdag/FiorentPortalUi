import { cn } from "@/lib/utils";
// import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
  containerClassName?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: "default" | "login";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      label,
      type,
      required,
      disabled,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPasswordType = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        {label && (
          <label
            className={cn(
              "block text-sm font-medium text-gray-700",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          step="any"
          type={showPassword && isPasswordType ? "text" : type}
          className={cn(
            variant === "login"
              ? "block h-14 w-full rounded-md border border-gray-300 bg-white py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              : "block h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            disabled && "opacity-50",
            className,
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeClosedIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };
