import { useContext, useEffect } from "react";
import { Card } from "@/components/ui/card";
import QlikContext from "@/context/qlik/create";
import { useParams } from "next/navigation";

const CurrentSelection = () => {
  const qlik = useContext(QlikContext);
  const { appId } = useParams();
  const { app } = qlik?.currApps?.find((ap) => ap.id === appId) || {};
  useEffect(() => {
    app?.getObject("CurrentSelections", "CurrentSelections");
  }, []);
  return (
    <Card
      id="CurrentSelections"
      className="h-[40px] bg-slate-200 flex flex-col justify-center"
    ></Card>
  );
};

export default CurrentSelection;
