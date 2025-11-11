import { cn } from "@/lib/utils";
//@ts-ignore
import numeral from "numeral";
import * as React from "react";
import { default as ReactCurrencyInput } from "react-currency-input-field";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
  label?: string;
  required?: boolean;
  maskOptions?: any;
  value?: string;
  defaultValue?: string;
  onChange?: any;
  disabled?: boolean;
  decimalsLimit?: number;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      labelClassName,
      label,
      type,
      required,
      maskOptions,
      value,
      defaultValue,
      onChange,
      disabled,
      min,
      max,
      decimalsLimit = 2,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <div className="flex">
          {label && (
            <label
              htmlFor="password"
              className={cn(
                "line-clamp-1 text-sm font-medium leading-6 text-gray-900",
                labelClassName,
              )}
            >
              {label}
            </label>
          )}
          {required ? <div className="text-red-600">*</div> : null}
        </div>
        <ReactCurrencyInput
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            disabled && "opacity-50",
            className,
          )}
          decimalsLimit={decimalsLimit}
          value={value}
          allowNegativeValue={false}
          onValueChange={(value: any, name: any, values: any) => {
            if (
              values.value.charAt(values.value.length - 1) === "," ||
              values.value.slice(-2) === ",0"
            ) {
              onChange?.(values?.value);
              return;
            }
            onChange?.(values?.float);
          }}
          onBlur={(event) => {
            if (event.target.value.slice(-2) === ",0") {
              onChange?.(
                numeral(
                  event.target.value
                    .substring(1, event.target.value.length - 2)
                    .replaceAll(".", ","),
                ).value(),
              );
            }
          }}
          intlConfig={{ locale: "tr-TR", currency: "TRY" }}
          disabled={disabled}
          min={min}
          max={max}
        />
      </>
    );
  },
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
