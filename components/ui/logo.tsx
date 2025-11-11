import React from "react";

export const Logo = ({
  className = "h-[60px] w-auto",
}: {
  className?: string;
}) => (
  <img src="/images/deniz-filo.png" alt="Fiorent Logo" className={className} />
);
