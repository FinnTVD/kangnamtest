'use client'

import BoxShowMap from '@/components/general/BoxShowMap'
import { useState } from 'react'

const useToggleShowMap = () => {
    const [show, setShow] = useState(true)
    const handleToggleShowMap = () => {
        setShow(!show)
    }
    return [
        show,
        <BoxShowMap
            handleToggleShowMap={handleToggleShowMap}
            show={show}
        />,
    ]
}
export default useToggleShowMap
