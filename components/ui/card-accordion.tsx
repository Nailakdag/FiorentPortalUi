import React, { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionCardContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
  colorScheme?:
    | "blue"
    | "orange"
    | "yellow"
    | "red"
    | "green"
    | "purple"
    | "gray"
    | "indigo";
  icon?: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  noBorder?: boolean;
}

const AccordionCardContainer: React.FC<AccordionCardContainerProps> = ({
  title,
  children,
  className = "",
  headerAction = null,
  noPadding = false,
  colorScheme = "blue",
  icon = null,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  noBorder,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggleAccordion = () => {
    const newState = !isOpen;
    if (!isControlled) {
      setInternalOpen(newState);
    }
    onToggle?.(newState);
  };

  const colorSchemes = {
    gray: {
      icon: "bg-customGray",
      iconHover: "hover:bg-customGray",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-blue-200",
    },
    blue: {
      icon: "bg-blue-500",
      iconHover: "hover:bg-blue-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-blue-200",
    },
    orange: {
      icon: "bg-orange-500",
      iconHover: "hover:bg-orange-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-orange-200",
    },
    yellow: {
      icon: "bg-yellow-500",
      iconHover: "hover:bg-yellow-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-yellow-200",
    },
    red: {
      icon: "bg-red-500",
      iconHover: "hover:bg-red-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-red-200",
    },
    green: {
      icon: "bg-green-500",
      iconHover: "hover:bg-green-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-green-200",
    },
    purple: {
      icon: "bg-purple-500",
      iconHover: "hover:bg-purple-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-purple-200",
    },
    indigo: {
      icon: "bg-indigo-500",
      iconHover: "hover:bg-indigo-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      iconShadow: "shadow-indigo-200",
    },
  };

  const colors = colorSchemes[colorScheme];

  return (
    <div
      className={`
        ${colors.bg}
        rounded-xl
        shadow-md
        border
        ${colors.border}
        transition-all
        duration-300
        hover:shadow-lg
        ${className}
      `}
    >
      {title && (
        <button
          type="button"
          onClick={toggleAccordion}
          className={`
            w-full
            flex
            items-center
            justify-between
            px-6 pt-5 pb-5
            transition-colors
            duration-200
            focus:outline-none
          `}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <div
                className={`
                  w-7
                  h-7
                  p-1.5
                  ${colors.icon}
                  ${colors.iconHover}
                  rounded-lg
                  flex 
                  items-center 
                  justify-center 
                  text-white 
                  transition-all 
                  duration-200
                  shadow-md
                  ${colors.iconShadow}
                  hover:shadow-lg
                `}
              >
                {icon}
              </div>
            )}
            <h2
              className={`text-xl font-semibold ${colors.text} tracking-tight`}
            >
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {headerAction && (
              <div onClick={(e) => e.stopPropagation()}>{headerAction}</div>
            )}
            <div
              className={`
                rounded-md
                ${colors.icon}
                ${colors.iconHover}
                text-white
                transition-al
                p-1
                bg-customGray
                duration-200
                hover:bg-customGray
                shadow-sm
              `}
            >
              {isOpen ? (
                <ChevronUp className="w-5 h-5 bg-customGray" />
              ) : (
                <ChevronDown className="w-5 h-5 bg-customGray" />
              )}
            </div>
          </div>
        </button>
      )}

      {/* Divider */}
      {title && noBorder !== true && (
        <div className={`border-b ${colors.border}`} />
      )}

      {/* Accordion Content */}
      {isOpen && (
        <div
          className={`
            transition-all
            duration-300
            ease-in-out
          `}
        >
          <div
            className={`
              ${noPadding ? "" : "p-6"} 
              ${title && !noPadding ? "pt-4" : ""}
            `}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionCardContainer;
