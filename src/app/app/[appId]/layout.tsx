import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  import NavPanel from "@/layout/sidePanel";
import { FC, ReactNode } from "react";
  
  const App:FC<{children:ReactNode}> = ({children}) => {
    return (
      <div className="h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="shadow-2xl min-w-[50px]"
            maxSize={25}
            defaultSize={15}
          >
            <NavPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
           {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  };
  
  export default App;
  