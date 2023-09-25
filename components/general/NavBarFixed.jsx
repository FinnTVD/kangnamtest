'use client'
import Image from 'next/image'
import Link from 'next/link'
import BoxLanguage from './language/BoxLanguage'
import { useEffect, useRef, useState } from 'react'
import SelectSearch from './SelectSearch'
import useSWR from 'swr'
import { listIdNav } from '@/utils'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function NavBarFixed({ isHome, lang, t, isMobile }) {
    const [valueSearch, setValueSearch] = useState('Thành phố Hà Nội')
    const [prevScrollY, setPrevScrollY] = useState(0)
    const navRef = useRef()
    const [listNav, setListNav] = useState([])
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API}/property-category`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    useEffect(() => {
        if (!data) return
        let a = data?.data?.filter((e) => listIdNav?.find((i) => i === e?.id))
        let b = []
        a.forEach((e, index) => {
            b.push({
                id: index + 1,
                title: e?.translations?.find((e) =>
                    e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                )?.name,
                href: e?.translations?.find((e) =>
                    e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                )?.alias,
            })
        })
        setListNav([...b, ...t?.Navbar?.listNav])
    }, [lang, data])

    useEffect(() => {
        if (typeof window === 'undefined') return
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollY])

    const handleScroll = () => {
        if (typeof window === 'undefined' || !navRef?.current) return
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (window.innerWidth >= 1024) {
            if (scrollTop >= 500) {
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
    if (!listNav?.length) return

    return (
        <div
            id='nav'
            ref={navRef}
            className={`${
                isHome ? 'px-120' : 'px-[3.75vw]'
            } fixed top-0 left-0 -translate-y-[110%] h-fit border-b border-solid border-white04 bg-white transition-all duration-500 w-screen z-[99999999] max-md:hidden`}
            style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
        >
            <div className={`${isHome ? 'gap-x-[3.12vw]' : 'gap-x-[1.5vw]'} flex items-center justify-end w-full`}>
                <div
                    id='logo-banner-active'
                    className='justify-start flex-1 py-[0.5vw]'
                >
                    <Link
                        href={`/${lang !== 'vi' ? lang : ''}`}
                        className='relative w-[3.5vw] h-[4.75vw] block'
                    >
                        <Image
                            className='object-contain'
                            src='/images/logo-no-bg.svg'
                            alt='logo'
                            sizes='3.5vw'
                            fill
                        />
                    </Link>
                </div>

                {!isHome && (
                    <div className='w-[23.125vw] py-[0.87vw] px-[1.75vw] bg-white02 rounded-[10vw] flex justify-between items-center shadow-input border border-solid border-logo backdrop-blur-[11px] mr-[0.5vw]'>
                        <div className='flex items-center w-full'>
                            <SelectSearch lang={lang} />
                            <div className='border-l border-solid border-logo opacity-40 h-[1.0625vw] mx-[0.63vw]'></div>
                            <div className='flex-1 flex items-center gap-x-[0.5vw]'>
                                <label htmlFor='search'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='17'
                                        viewBox='0 0 16 17'
                                        fill='none'
                                        className='w-[1vw] h-[1vw]'
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
                                    className='bg-transparent outline-none text-den title16-400-130'
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
                )}
                {!isMobile ? (
                    <div className='flex gap-x-[3.13vw] items-center'>
                        <ul className='flex'>
                            {listNav?.length > 0 &&
                                listNav?.map((e, index) => (
                                    <li
                                        key={index}
                                        className={`relative select-none group`}
                                    >
                                        {e?.branch ? (
                                            <>
                                                <div className='px-[0.94vw] py-[1vw] flex cursor-pointer items-center gap-x-[0.5vw]'>
                                                    <span className='whitespace-nowrap title16-600-130 inline-block text-den'>
                                                        {e?.title}
                                                    </span>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        strokeWidth='3'
                                                        stroke='#444'
                                                        className='w-[1.2vw] h-[1.2vw]'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                                        />
                                                    </svg>
                                                </div>
                                                <div
                                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                                    className='absolute bottom-0 translate-y-full right-0 rounded-[0.625vw] group-hover:block hidden bg-white w-fit  after:block after:h-[1.2vw] after:w-[12vw] after:absolute after:top-0 after:-translate-y-[95%] after:right-0 after:bg-transparent pt-[1vw] pb-[0.5vw]'
                                                >
                                                    <span className='title16-600-130 text-den px-[1vw] pb-[0.75vw] block'>
                                                        {e?.title}
                                                    </span>
                                                    <ul className='w-full'>
                                                        {e?.branch?.map((item) => (
                                                            <li
                                                                key={item?.id}
                                                                className='px-[1vw] py-[0.5vw] hover:bg-[#f3f4f7]'
                                                            >
                                                                <Link
                                                                    className='whitespace-nowrap title16-400-130 text-den block w-full h-full'
                                                                    href={`${
                                                                        lang !== 'vi'
                                                                            ? '/' + lang + item?.href
                                                                            : item?.href
                                                                    }`}
                                                                >
                                                                    {item?.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (
                                            <Link
                                                scroll={false}
                                                className='px-[0.94vw] py-[1vw] block title16-600-130 text-den whitespace-nowrap'
                                                href={`${lang !== 'vi' ? '/' + lang + e.href : e.href}`}
                                            >
                                                {e.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                        </ul>
                        <div className='flex gap-x-[1.25vw] items-center'>
                            <Link
                                href={`${lang !== 'vi' ? '/' + lang + '/deposit' : '/deposit'}`}
                                className='bg-gradient-prominent shadow-prominent h-fit w-fit rounded-[10vw] py-[1vw] px-[2vw] text-d-9-d-9-d-9 title16-700-150 whitespace-nowrap'
                            >
                                Kí gửi nhà đất
                            </Link>
                            <BoxLanguage
                                type={'ds'}
                                lang={lang}
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => setIsOpen(true)}
                        className='relative w-fit'
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
                )}
                {/* <div className='flex gap-x-[1.5vw] items-center'>
                    <Link
                        href={`${lang !== 'vi' ? '/' + lang + '/deposit' : '/deposit'}`}
                        className='bg-gradient-prominent shadow-prominent h-fit w-fit rounded-[6.25vw] py-[1vw] px-[2vw] text-d-9-d-9-d-9 title16-700-150'
                    >
                        Kí gửi nhà đất
                    </Link>
                    <BoxLanguage
                        lang={lang}
                        type='ds'
                    />
                </div> */}
            </div>
        </div>
    )
}
