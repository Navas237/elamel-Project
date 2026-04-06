
import { useContext } from "react"
import { supbasecontext } from "./SupbaseContext"

export const useOffer = () => {
    const { offersList } = useContext(supbasecontext)
    // console.log(offersList)
    return { offersList }
}
