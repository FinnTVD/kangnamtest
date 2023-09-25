'use client'
import Image from 'next/image'
import BoxCurrency from './BoxCurrency'
import SocialMedia from './SocialMedia'
import { useEffect, useState } from 'react'
import useClickOutSide from '@/hooks/useClickOutSide'
import useStore from '@/app/[lang]/(store)/store'
export default function FeatureHome({ dataInfo }) {
    const isFeatureHome = useStore((state) => state.isFeatureHome)
    const [isShow, setIsShow] = useState(null)
    const [sideRef, isOutSide] = useClickOutSide()

    useEffect(() => {
        isOutSide && setIsShow(false)
    }, [isOutSide])

    const handleCurrently = () => {
        setIsShow(!isShow)
    }

    return (
        <ul
            id='listFeature'
            className='fixed right-[3.94vw] bottom-[5.86vw] z-[9999] gap-y-[1.88vw] flex flex-col transition-all duration-500 ease-linear select-none max-md:hidden'
        >
            <li
                className={`${
                    isFeatureHome ? 'active1' : ''
                } item-social transition-all duration-200 ease-linear group relative w-[4.5vw] h-[4.5vw] cursor-pointer shadow-feature flex justify-center items-center bg-white rounded-full before:content-normal before:w-[10.64vw] before:h-[25vw] before:bg-transparent hover:before:block before:hidden before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:-translate-x-[58%]`}
            >
                <Image
                    src='/images/social.svg'
                    alt='social'
                    width={36}
                    height={36}
                    className='object-contain w-[2.04vw] h-[2.04vw] group-hover:scale-125 transition-all duration-200 ease-linear'
                />
                <SocialMedia dataInfo={dataInfo} />
            </li>
            <li
                className={`${
                    isFeatureHome ? 'active2' : ''
                } item-social transition-all duration-200 ease-linear relative w-[4.5vw] h-[4.5vw] shadow-feature bg-white rounded-full group`}
                ref={sideRef}
            >
                <div
                    onClick={handleCurrently}
                    className='relative flex items-center justify-center w-full h-full rounded-full cursor-pointer '
                >
                    <Image
                        src='/images/tiente.svg'
                        alt='tiente'
                        width={36}
                        height={36}
                        className='object-contain w-[2.04vw] h-[2.04vw] group-hover:scale-125 transition-all duration-200 ease-linear'
                    />
                </div>
                <BoxCurrency className={!isShow || isOutSide ? 'hidden' : ''} />
            </li>
            <li
                className={`${
                    isFeatureHome ? 'active3' : ''
                } target:item-social transition-all duration-200 ease-linear w-[4.5vw] h-[4.5vw] cursor-pointer shadow-feature flex justify-center items-center bg-white rounded-full group`}
            >
                <Image
                    src='/images/call.svg'
                    alt='call'
                    width={36}
                    height={36}
                    className='object-contain w-[2.04vw] h-[2.04vw] group-hover:scale-125 transition-all duration-200 ease-linear'
                />
            </li>
        </ul>
    )
}
