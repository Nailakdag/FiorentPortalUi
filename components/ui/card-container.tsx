import React, { ReactNode } from "react";

interface CardContainerProps {
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
    | "indigo";
  icon?: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
  className = "",
  headerAction = null,
  noPadding = false,
  colorScheme = "blue",
  icon = null,
}) => {
  // Renk şemaları
  const colorSchemes = {
    blue: {
      icon: "bg-blue-500",
      iconHover: "hover:bg-blue-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-blue-100",
      iconShadow: "shadow-blue-200",
    },
    orange: {
      icon: "bg-orange-500",
      iconHover: "hover:bg-orange-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-orange-100",
      iconShadow: "shadow-orange-200",
    },
    yellow: {
      icon: "bg-yellow-500",
      iconHover: "hover:bg-yellow-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-yellow-100",
      iconShadow: "shadow-yellow-200",
    },
    red: {
      icon: "bg-red-500",
      iconHover: "hover:bg-red-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-red-100",
      iconShadow: "shadow-red-200",
    },
    green: {
      icon: "bg-green-500",
      iconHover: "hover:bg-green-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-green-100",
      iconShadow: "shadow-green-200",
    },
    purple: {
      icon: "bg-purple-500",
      iconHover: "hover:bg-purple-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-purple-100",
      iconShadow: "shadow-purple-200",
    },
    indigo: {
      icon: "bg-indigo-500",
      iconHover: "hover:bg-indigo-600",
      text: "text-gray-800",
      border: "border-gray-200",
      bg: "bg-white",
      divider: "border-indigo-100",
      iconShadow: "shadow-indigo-200",
    },
  };

  const colors = colorSchemes[colorScheme];

  return (
    <div
      className={`
    ${colors.bg} 
    shadow-md 
    hover:shadow-lg 
    border border-gray-100 
    transition-all 
    duration-300 
    ${className}
  `}
    >
      {/* Card Header */}
      {title && (
        <>
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
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
            {headerAction && (
              <div className="flex items-center">{headerAction}</div>
            )}
          </div>

          {/* Başlık altı çizgi */}
          <div className={`border-b `}></div>
        </>
      )}

      {/* Card Content */}
      <div
        className={`
        ${noPadding ? "" : "p-6"} 
        ${title && !noPadding ? "pt-4" : ""}
      `}
      >
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
