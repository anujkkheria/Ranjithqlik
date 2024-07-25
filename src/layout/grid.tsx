import { FC, useContext, useEffect, useRef, useState } from "react";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import { FaRegFilePdf, FaRegFileExcel } from "react-icons/fa";
import gridStyle from "@/lib/gridStyle";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import QlikContext from "@/context/qlik/create";
import { exportExcel, exportPdf } from "@/lib/download";
import Loading from "./loading";

const GridItem: FC<{ obj: any; data: any }> = ({ obj, data }) => {
  const { name } = obj;
  const qlik = useContext(QlikContext);
  const { app } = qlik?.currApps[0];
  const [objectName, setName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const [viz, setViz] = useState<any>(null);
  const ref = useRef(null);
  const style = gridStyle(obj, data, isFullScreen);

  useEffect(() => {
    app.visualization.get(name).then((vis: any) => {
      vis.show(ref?.current);
      setViz(vis);
      const { footnote, subtitle, title, showTitles } = vis.model.layout;
      vis.rendered.promise.then(() => {
        setLoading(!1);
      });
      setName(showTitles ? title || subtitle || footnote : !1);
    });
    return () => {
      viz?.close();
    };
  }, []);

  useEffect(() => {
    qlik?.qlik.resize(name);
  }, [isFullScreen]);

  return (
    // @ts-ignore
    <Card style={style} className="p-0.5 group flex flex-col relative">
      {objectName && (
        <div className="flex px-2 flex-[25px] justify-between items-center flex-shrink-0 flex-grow-0">
          <Label className="block text-ellipsis whitespace-nowrap overflow-hidden">
            {objectName}
          </Label>
          <div className="justify-end gap-2 group-hover:flex hidden">
            <button
              className="h-6 w-6 rounded-full flex justify-center items-center hover:bg-slate-400 hover:text-primary-foreground"
              onClick={() => exportExcel(viz, objectName)}
            >
              <FaRegFileExcel />
            </button>
            <button
              className="h-6 w-6 rounded-full flex justify-center items-center hover:bg-slate-400 hover:text-primary-foreground"
              onClick={() => exportPdf(viz, objectName)}
            >
              <FaRegFilePdf />
            </button>
            <button
              className="h-6 w-6 rounded-full flex justify-center items-center hover:bg-slate-400 hover:text-primary-foreground"
              onClick={() => setFullScreen(!isFullScreen)}
            >
              {isFullScreen ? <LuMinimize2 /> : <LuMaximize2 />}
            </button>
          </div>
        </div>
      )}
      <div ref={ref} className="h-full flex-1" />
      {/* {isLoading && (
        <div className="absolute top-0 left-0 h-full w-full z-10 flex justify-center items-center">
          <Loading />
        </div>
      )} */}
    </Card>
  );
};

export default GridItem;
