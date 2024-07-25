"use client";
import _ from "lodash";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QlikContext from "@/context/qlik/create";
import { useSession } from "next-auth/react";

const NavPanel = () => {
  const [sheet, setSheet] = useState<any[]>([]);
  const { appId, sheetId } = useParams();
  const qlik = useContext(QlikContext);
  const { data } = useSession();

  useEffect(() => {
    if (qlik && qlik.currApps.length) {
      const { sheet } = qlik.currApps.find((app) => app?.id === appId) || {};
      const _sheets = _.filter(sheet, (sh) =>
        // @ts-expect-error
        _.find(data?.sheets, (s) => s === sh.id)
      );
      setSheet(_sheets);
    }
  }, [qlik?.currApps]);

  return (
    <div className="flex h-full gap-2 flex-col p-2">
      {_.map(sheet, (page) => (
        <Link
          key={page.id}
          title={page.name}
          href={`/app/${appId}/page/${page?.id}`}
        >
          <div
            className={`h-full w-full flex rounded-md items-center gap-2 font-medium p-2 ${
              page.id === sheetId ? "bg-gray-400" : "hover:bg-slate-400"
            } `}
          >
            <div className="flex justify-center items-center w-[35px] h-full">
              <MdDashboard />
            </div>
            <div className="w-[calc(100%_-_35px)] text-ellipsis block whitespace-nowrap overflow-hidden">
              {page.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavPanel;
