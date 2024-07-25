"use client";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import QlikContext from "@/context/qlik/create";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const [apps, setApps] = useState<any[]>([]);
  const { docList } = useContext(QlikContext) || {};
  const session = useSession();
  const {data} = session;
console.log(data, session);

  useEffect(() => {
    if (docList?.length) {
      setApps(
        _.filter(docList, (app: any) =>
          // @ts-ignore
          _.find(data?.applications, (a) => a === app?.qDocId)
        )
      );
    }
  }, [docList, data]);

  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-wrap gap-4 p-4 text-primary ">
        {_.map(apps, (doc: any) => (
          <Link href={`/app/${doc.qDocId}`} key={doc.qDocId}>
            <Card className="h-[180px] hover:bg-slate-200 flex flex-col border-0 shadow-md justify-between w-[170px]">
              <CardContent className="p-0">
                <Image
                  src={"/connect.png"}
                  alt="logo"
                  width={250}
                  height={50}
                />
              </CardContent>
              <CardFooter>
                <Label title={doc.qDocName} className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                  {doc?.qMeta?.published ? `${doc?.qMeta?.stream?.name}/` : ''}
                  {doc.qDocName}
                </Label>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
