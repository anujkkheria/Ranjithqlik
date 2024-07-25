"use client";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const CustomSessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CustomSessionProvider;
