'use client'
import Image from 'next/image'
import Link from 'next/link'
import MenuRes from './MenuRes'
import { useState } from 'react'

export default function NavBarRes({ lang, t, isHome }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav
            className={`${
                isHome ? '' : 'border-b border-solid border-white02'
            } absolute top-0 left-0 z-[9999] w-full lg:hidden`}
        >
            <div className='pb-[0.53vw] pt-[2.13vw] flex justify-between pl-[7.2vw] pr-[2.8vw] items-center'>
                <Link
                    href={`/${lang !== 'vi' ? lang : ''}`}
                    className='relative w-[10.67vw] h-[14.13vw] block'
                >
                    <Image
                        className='object-contain brightness-0 invert'
                        src='/images/logo-no-bg.svg'
                        alt='logo'
                        priority
                        sizes='3.52vw'
                        fill
                    />
                </Link>
                <div
                    onClick={() => setIsOpen(true)}
                    className='relative'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='white'
                        className='max-md:w-[10.33vw] max-md:h-[8.6vw] max-lg:w-[5.2vw] max-lg:auto'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </div>
            </div>
            <MenuRes
                lang={lang}
                t={t}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </nav>
    )
}
