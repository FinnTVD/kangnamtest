'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import MenuRes from './MenuRes'
import SelectSearch from './SelectSearch'

export default function NavBarFixedRes({ isHome = true, lang, t }) {
    const [valueSearch, setValueSearch] = useState('Thành phố Hà Nội')
    const [isOpen, setIsOpen] = useState(false)
    const [prevScrollY, setPrevScrollY] = useState(0)
    const navRef = useRef()
    useEffect(() => {
        if (typeof window === 'undefined') return
        document.addEventListener('scroll', handleScroll)
        // window.scrollTo(0, 0);
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollY])

    const handleScroll = () => {
        if (typeof window === 'undefined' || !navRef?.current) return
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (window.innerWidth < 768) {
            if (scrollTop >= 200) {
                if (scrollTop > prevScrollY) {
                    //Cuộn xuống
                    navRef?.current?.classList?.remove('active')
                } else if (scrollTop < prevScrollY) {
                    //Cuộn lên
                    navRef?.current?.classList?.add('active')
                }
            } else {
                navRef?.current?.classList?.remove('active')
            }
        }
        setPrevScrollY(scrollTop)
    }

    return (
        <div
            id='nav'
            ref={navRef}
            className={`pl-[4vw] pr-[2.5vw] fixed top-0 left-0 -translate-y-[110%] h-fit border-b border-solid border-white04 bg-white transition-all duration-500 w-screen z-[99999999] md:hidden`}
            style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
        >
            <div className='flex justify-between items-center my-[2.67vw]'>
                <Link
                    href={`/${lang !== 'vi' ? lang : ''}`}
                    className='relative w-[8.267vw] h-[11.467vw] block'
                >
                    <Image
                        className='object-contain'
                        src='/images/logo-no-bg.svg'
                        alt='logo'
                        sizes='3.52vw'
                        fill
                    />
                </Link>
                <div className='w-[68.267vw] py-[3.06vw] px-[5.07vw] rounded-[10vw] flex justify-between items-center shadow-input border border-solid border-logo'>
                    <div className='flex items-center w-full'>
                        <SelectSearch
                            lang={lang}
                            menu={true}
                        />
                        <div className='border-l border-solid border-logo opacity-50 h-[2.67vw] mx-[3.2vw]'></div>
                        <div className='flex-1 flex items-center gap-x-[0.5vw]'>
                            <label htmlFor='search'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='17'
                                    viewBox='0 0 16 17'
                                    fill='none'
                                    className='w-[1vw] h-[1vw] max-md:w-[4.2vw] max-md:h-[4.2vw] max-lg:w-[1.8vw] max-lg:h-[1.8vw]'
                                >
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M7.19929 2.72722C6.58212 2.72003 5.96965 2.83469 5.39737 3.06456C4.82509 3.29442 4.30438 3.63492 3.8654 4.06632C3.42642 4.49773 3.0779 5.01146 2.84003 5.57776C2.60217 6.14405 2.47969 6.75165 2.47969 7.36536C2.47969 7.97906 2.60217 8.58666 2.84003 9.15296C3.0779 9.71925 3.42642 10.233 3.8654 10.6644C4.30438 11.0958 4.82509 11.4363 5.39737 11.6662C5.96965 11.896 6.58212 12.0107 7.19929 12.0035C8.42696 11.9892 9.59947 11.4942 10.4625 10.626C11.3256 9.75771 11.8096 8.58614 11.8096 7.36536C11.8096 6.14457 11.3256 4.973 10.4625 4.10474C9.59947 3.23647 8.42696 2.74152 7.19929 2.72722ZM1.57497 7.36631C1.56703 6.62685 1.70666 5.89316 1.98577 5.20771C2.26487 4.52226 2.67792 3.89864 3.201 3.37295C3.72409 2.84726 4.34682 2.42994 5.03318 2.14512C5.71953 1.8603 6.45588 1.71365 7.19961 1.71365C7.94333 1.71365 8.67968 1.8603 9.36603 2.14512C10.0524 2.42994 10.6751 2.84726 11.1982 3.37295C11.7213 3.89864 12.1343 4.52226 12.4134 5.20771C12.6926 5.89316 12.8322 6.62685 12.8242 7.36631C12.8084 8.83925 12.2089 10.2465 11.1558 11.2825C10.1027 12.3186 8.68104 12.8997 7.19961 12.8997C5.71817 12.8997 4.29654 12.3186 3.24343 11.2825C2.19032 10.2465 1.59077 8.83925 1.57497 7.36631Z'
                                        fill='#D6A279'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M10.7105 10.4576L14.3041 14.0212L13.6263 14.6977L10.0327 11.1334L10.7105 10.4576Z'
                                        fill='#D6A279'
                                    />
                                </svg>
                            </label>
                            <input
                                className='bg-transparent outline-none text-den title-mb12-400-130 w-[29vw]'
                                type='text'
                                name='search'
                                id='search'
                                autoComplete='false'
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e?.target?.value)}
                            />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setIsOpen(true)}
                    className='relative w-fit cursor-pointer'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#D6A279'
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
        </div>
    )
}
