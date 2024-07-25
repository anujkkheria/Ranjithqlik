import { useEffect, useState } from "react"
import Qlik from "qlik"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

const useQlik = () => {
    const [qlik, setQlik] = useState<Qlik>()
    const { data } = useSession()
    let _qlik: any
    console.log(data, _qlik);
    
    if (!_qlik && data)
        _qlik = new Qlik({
            host: "qea-dev.insightdelivered.com",
            port: 2443,
            prefix: "/ticket/",
            isSecure: true,
            // @ts-expect-error
            ticket: `qlikTicket=${data?.Ticket}`,
            // ticket: `qlikTicket=${data?.Ticket}`,
            webIntegrationId: undefined
        });
    useEffect(() => {
        if (_qlik)
            _qlik.callRequire().then(async () => {
                await _qlik.setQlik()
                // await _qlik.setAuthUser()
                await _qlik.getDocs()
                setQlik(_qlik)
            }).catch((e: any) => {
                console.log(e)
                
                return redirect("/auth/signin")
            })
    }, [_qlik])
    return qlik
}

export default useQlik
