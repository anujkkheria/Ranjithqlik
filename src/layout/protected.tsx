"use client";
import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import Loading from "./loading";

const Protected: FC<{ children: ReactNode }> = ({ children }) => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Protected;
