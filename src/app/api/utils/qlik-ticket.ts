import fs from "fs";
import https from "https";
import axios from "axios";

const generateTicket = async (DIRECTORY: string, USERNAME: string) => {

    const URL = `https://qea-dev.insightdelivered.com:24243/qps/ticket/ticket?xrfkey=somerandomstring`;
    const httpsAgent = new https.Agent({
        ca: fs.readFileSync(process.cwd() + "/public/cert/root.pem"),
        key: fs.readFileSync(process.cwd() + "/public/cert/client_key.pem"),
        cert: fs.readFileSync(process.cwd() + "/public/cert/client.pem"),
        rejectUnauthorized: false
    })
    const options = {
        url: URL,
        method: "POST",
        httpsAgent: httpsAgent,
        headers: {
            "content-type": "application/json",
            "X-Qlik-xrfkey": "somerandomstring",
            "X-Qlik-user": `UserDirectory=${DIRECTORY};UserId=${USERNAME}`,
        },
        data: {
            UserDirectory: DIRECTORY,
            UserId: USERNAME,
            Attributes: [],
            TargetId: "",
        },
    }
console.log(options);

    return await axios(options).then((_res) => _res.data).catch((err) => {
        console.log(err);

        return null
    })
}
export default generateTicket;