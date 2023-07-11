import { useEffect } from "react"
import { useState } from "react"

export const useDebounce = (value: any, delay: number) => {
    const [valueDebounce, setValueDebounce] = useState("")

    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value)
        }, delay)

        return () => {
            clearTimeout(handle)
        }
    }, [value, delay])

    return valueDebounce
}
