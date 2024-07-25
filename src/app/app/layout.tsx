"use client";
import QlikProvider from "@/context/qlik/provider";
import Header from "@/layout/header";
import { FC, ReactNode } from "react";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QlikProvider>
      <div className="flex-col h-screen min-h-screen min-w-screen overflow-auto flex flex-wrap text-primary bg-gray-200">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </QlikProvider>
  );
};

export default App;
