"use client";
import _ from "lodash";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Grid from "@/layout/grid";
import QlikContext from "@/context/qlik/create";
import CurrentSelection from "@/layout/currentSelection";

const Sheet = () => {
  const [sheet, setSheet] = useState<any>(null);
  const qlik = useContext(QlikContext);
  const { appId, sheetId } = useParams();
  useEffect(() => {
    if (qlik && qlik.currApps.length) {
      const { sheet } = qlik.currApps.find((app) => app?.id === appId) || {};
      if (sheet && sheet?.length > 0) {
        const _sheet = sheet.find((s: any) => s?.id === sheetId);
        setSheet(_sheet);
      }
    }
  }, [qlik?.currApps]);

  return (
    <div className=" w-[calc(100%_-_16px)] h-[calc(100%_-_16px)] m-[8px] flex-col flex gap-2">
      <CurrentSelection />
      <div className="relative  w-full h-[calc(100%_-_40px)]">
        {_.map(sheet?.obj, (obj) => (
          <Grid obj={obj} data={sheet?.qData} />
        ))}
      </div>
    </div>
  );
};

export default Sheet;
