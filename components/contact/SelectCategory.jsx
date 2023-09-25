'use client'

import useClickOutSide from '@/hooks/useClickOutSide'
import { useEffect, useRef, useState } from 'react'

const selectCategory = [
    {
        id: 1,
        title: 'Mua Nhà',
    },
    {
        id: 2,
        title: 'Bán Nhà',
    },
    {
        id: 3,
        title: 'Thuê Nhà',
    },
    {
        id: 4,
        title: 'Cho Thuê',
    },
]
export default function SelectCategory({ setValueCategory, valueCategory }) {
    const [isOpen, setIsOpen] = useState(false)
    const [sideRef, isOutSide] = useClickOutSide()

    useEffect(() => {
        isOutSide && setIsOpen(false)
    }, [isOutSide])

    const handleChangeCategory = (e) => {
        setValueCategory(e?.title)
    }

    return (
        <div className='relative flex-1'>
            <input
                type='text'
                className='hidden'
            />
            <div
                ref={sideRef}
                onClick={() => setIsOpen(!isOpen)}
                className='w-full text-den07 title16-600-150 py-[1vw] px-[2vw] flex-1 rounded-[10vw] outline-none shadow-input font-normal border border-solid border-den03 focus:border-[#d6a279] flex justify-between items-center cursor-pointer relative max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14'
            >
                {valueCategory ? valueCategory : 'Hạng mục *'}
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-[1vw] h-[1vw]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                </svg>
                <ul
                    style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    className={`${
                        !isOpen || isOutSide ? 'hidden' : ''
                    } absolute -bottom-[0.5vw] translate-y-full left-0 bg-white w-full rounded-xl py-[0.5vw] z-40`}
                >
                    {selectCategory &&
                        selectCategory?.map((e, index) => (
                            <li
                                className='px-[2vw] py-[0.5vw] hover:bg-[#f3f4f7] max-md:px-[6.4vw] max-md:py-[3vw] max-md:title-mb14-400-150 max-lg:title-tl14'
                                key={index}
                                onClick={() => handleChangeCategory(e)}
                            >
                                {e.title}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
