import { supbasecontext } from "../../../../context/SupbaseContext"
import { useContext, useEffect } from "react"


export const useCatgory = () => {
    const { catergoryList, getCatergory } = useContext(supbasecontext)
    useEffect(() => {
        getCatergory()
    }, [])
    return { catergoryList }
}