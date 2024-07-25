"use client";
import { FC, ReactNode } from "react";
import useQlik from "@/hooks/useQlik";
import QlikContext from "./create";
import Loading from "@/layout/loading";

const QlikProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const qlik = useQlik();

  return qlik ? (
    // @ts-ignore
    <QlikContext.Provider value={qlik}>{children}</QlikContext.Provider>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  );
};

export default QlikProvider;
