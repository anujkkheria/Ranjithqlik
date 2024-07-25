"use client";
import QlikContext from "@/context/qlik/create";
import Loading from "@/layout/loading";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const App = () => {
  const { data } = useSession();
  const { appId } = useParams();
  const router = useRouter();
  const qlik = useContext(QlikContext);

  useEffect(() => {
    if (appId) {
      // @ts-expect-error
      qlik?.getApp(appId).then((app) => {
        const { sheet } = app?.find((app) => app?.id === appId) || {};
        const _sheets = _.find(sheet, (sh) =>
          // @ts-expect-error
          _.find(data?.sheets, (s) => s === sh.id)
        );
        if (_sheets) router.push(`/app/${appId}/page/${_sheets.id}`);
        else router.push(`/app/${appId}/page`);
      });
    }
  }, [appId]);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default App;
