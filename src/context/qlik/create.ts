import Qlik from "qlik"
import { createContext } from "react"

const QlikContext = createContext<Qlik | undefined>(undefined)

export default QlikContext
