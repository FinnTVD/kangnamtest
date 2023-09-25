'use client'
import { useEffect, useRef, useState } from 'react'

export default function useResizeArea() {
    const [heightDefault, setHeightDefault] = useState(null)
    const [heightArea, setHeightArea] = useState(false)
    const areaRef = useRef()

    useEffect(() => {
        areaRef?.current && setHeightDefault(areaRef?.current?.clientHeight)
    }, [])

    const handleResizeHeight = (e) => {
        areaRef?.current?.clientHeight < e?.target?.scrollHeight && setHeightArea(e?.target?.scrollHeight)
        if (!e?.target?.value) {
            setHeightArea(heightDefault)
        }
    }
    return [areaRef, heightArea, handleResizeHeight]
}
