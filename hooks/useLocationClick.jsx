'use client'
import { useEffect, useState } from 'react'

export default function useLocationClick() {
    const [isCheck, setIsCheck] = useState(false)
    useEffect(() => {
        if (typeof window === 'undefined') return
        const handleClick = () => {
            setIsCheck(true)
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    return [isCheck, setIsCheck]
}
