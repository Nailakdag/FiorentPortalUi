"use client";
import { ReactNode, createContext, useContext } from "react";

export type ComplaintLookupsContextProps = Record<string, never>;

const ComplaintLookupsContext =
  createContext<ComplaintLookupsContextProps | null>(null);

type ComplaintLookupsProviderProps = {
  children: ReactNode;
  value: ComplaintLookupsContextProps;
};

export const ComplaintLookupsProvider = ({
  children,
  value,
}: ComplaintLookupsProviderProps) => {
  return (
    <ComplaintLookupsContext.Provider value={value}>
      {children}
    </ComplaintLookupsContext.Provider>
  );
};

export function useWorkOrderLookupsContext() {
  return useContext(ComplaintLookupsContext) as ComplaintLookupsContextProps;
}
