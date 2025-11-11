"use client";

import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { Input } from "./input";
import * as React from "react";

interface BaseInputProps {
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  type?: string;
  variant?: "default" | "login";
  [key: string]: any;
}

interface ControlledInputProps<T extends FieldValues>
  extends Omit<BaseInputProps, "onChange" | "value" | "onBlur"> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  label,
  labelClassName,
  isDisabled,
  isReadOnly,
  required,
  maxLength,
  type,
  variant = "default",
  ...props
}: ControlledInputProps<T>) {
  return (
    <Controller<T>
      control={control}
      name={name as Path<T>}
      rules={rules as RegisterOptions<T>}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <div>
            {label && (
              <div className="flex">
                <label
                  htmlFor={name}
                  className={
                    labelClassName ||
                    "line-clamp-1 text-sm font-medium leading-6 text-gray-900"
                  }
                >
                  {label}
                </label>
                {required && (
                  <span className="text-red-600 text-base font-bold ml-1">
                    *
                  </span>
                )}
              </div>
            )}
            <Input
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={isDisabled}
              readOnly={isReadOnly}
              required={required}
              maxLength={maxLength}
              type={type}
              variant={variant}
              className={
                error?.message ? "ring-red-500 focus:ring-red-500" : ""
              }
              {...props}
            />
            {error?.message && (
              <p className="px-1 mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
