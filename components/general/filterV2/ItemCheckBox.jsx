'use client'

import useStore from '@/app/[lang]/(store)/store'
import { useEffect, useState } from 'react'

export default function ItemCheckBox({ index, e, handleCheckbox, isOutSide }) {
    const propertyAreaType = useStore((state) => state.propertyAreaType)
    const propertyType = useStore((state) => state.propertyType)
    const propertyCategory = useStore((state) => state.propertyCategory)
    const [isCheck, setIsCheck] = useState(false)

    useEffect(() => {
        if (index === 1) {
            if (propertyAreaType?.length) {
                setIsCheck(propertyAreaType?.includes(e?.id))
            } else {
                setIsCheck(false)
            }
        }
        if (index === 0) {
            if (propertyType?.length) {
                setIsCheck(propertyType?.includes(e?.id))
            } else {
                setIsCheck(false)
            }
        }
        if (index === 2) {
            if (propertyCategory?.length) {
                setIsCheck(propertyCategory?.includes(e?.id))
            } else {
                setIsCheck(false)
            }
        }
    }, [isOutSide, propertyAreaType, propertyType, propertyCategory])

    return (
        <div className='w-fit flex items-center gap-x-[0.75vw] max-md:gap-x-[3.2vw]'>
            <input
                type='checkbox'
                name={`filter${index}${e?.name}`}
                id={`filter${index}${e?.name}`}
                className='w-[1.5vw] h-[1.5vw] max-md:w-[6.4vw] max-md:h-[6.4vw] outline-none border border-solid border-den02 cursor-pointer'
                onChange={(event) => {
                    setIsCheck(!isCheck)
                    handleCheckbox(event, e?.id)
                }}
                checked={isCheck}
            />
            <label
                className='title14-400-150 text-den cursor-pointer title-mb14-400-150 w-[5.5625vw] max-md:w-[23.74vw] max-md:whitespace-normal'
                htmlFor={`filter${index}${e?.name}`}
            >
                {e?.name}
            </label>
        </div>
    )
}
