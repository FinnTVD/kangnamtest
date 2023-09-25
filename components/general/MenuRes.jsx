'use client'
import SelectSearch from './SelectSearch'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import BoxLanguage from './language/BoxLanguage'
import useSWR from 'swr'
import { handleCheckLangCode } from '@/utils'
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const listNavRes = [
    {
        id: 1,
        title: 'Trang chủ',
        href: '/',
    },
    {
        id: 2,
        title: 'Dự án',
        href: '/danh-sach-du-an',
    },
    {
        id: 3,
        title: 'Bán lại',
        href: '/danh-sach-du-an',
    },
]
const listNavRes2 = [
    {
        id: 1,
        title: 'Về chúng tôi',
        href: '/about-us',
    },
    {
        id: 2,
        title: 'Tin tức',
        href: '/news',
    },
    {
        id: 3,
        title: 'Liên hệ',
        href: '/lien-he',
    },
]
export default function MenuRes({ lang, t, setIsOpen, isOpen }) {
    const [valueSearch, setValueSearch] = useState('Thành phố Hà Nội')
    const languageCode = handleCheckLangCode(lang)
    const {
        data: agreementData,
        error: errorNews,
        isLoading: isLoading,
    } = useSWR(
        process.env.NEXT_PUBLIC_API + `/post?page=1&take=12&postTypeIds[]=95438eda-0e44-439c-96fd-343301f8b3f0`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )
    let agreementDataTranslation = []
    if (agreementData) {
        agreementData.data.forEach((item) => {
            item.translations.forEach((itm) => {
                if (itm.languageCode === languageCode)
                    agreementDataTranslation.push({ title: itm.title, slug: itm.slug })
            })
        })
    }

    return (
        <div
            className={`${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-30'
            } transition-all duration-300 fixed top-0 left-0 w-full h-screen bg-logo`}
        >
            <div className='flex justify-between p-[2.67vw] items-center border-b border-solid border-white01'>
                <Link
                    href={`/${lang !== 'vi' ? lang : ''}`}
                    className='relative w-[8.267vw] h-[11.467vw] block'
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        className='object-contain brightness-0 invert'
                        src='/images/logo-no-bg.svg'
                        alt='logo'
                        sizes='3.52vw'
                        fill
                        priority
                    />
                </Link>
                <div className='w-[68.26vw] py-[2.65vw] px-[5vw] bg-white02 rounded-[6.25vw] flex justify-between items-center border border-solid border-white03 backdrop-blur-[11px]'>
                    <div className='flex items-center w-full'>
                        <SelectSearch
                            type='white'
                            menu={true}
                            lang={lang}
                        />
                        <div className='border-l border-solid border-logo opacity-40 h-[1.0625vw] mx-[0.63vw] max-md:opacity-10 max-md:border-white max-md:h-[2.67vw] max-md:mx-[3.2vw]'></div>
                        <div className='flex-1 flex items-center gap-x-[0.5vw]'>
                            <label htmlFor='search'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='17'
                                    viewBox='0 0 16 17'
                                    fill='none'
                                    className='w-[1vw] h-[1vw] max-md:w-[4vw] max-md:h-[4vw] max-lg:w-[2.5vw] max-lg:h-[2.5vw]'
                                >
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M7.19929 2.72722C6.58212 2.72003 5.96965 2.83469 5.39737 3.06456C4.82509 3.29442 4.30438 3.63492 3.8654 4.06632C3.42642 4.49773 3.0779 5.01146 2.84003 5.57776C2.60217 6.14405 2.47969 6.75165 2.47969 7.36536C2.47969 7.97906 2.60217 8.58666 2.84003 9.15296C3.0779 9.71925 3.42642 10.233 3.8654 10.6644C4.30438 11.0958 4.82509 11.4363 5.39737 11.6662C5.96965 11.896 6.58212 12.0107 7.19929 12.0035C8.42696 11.9892 9.59947 11.4942 10.4625 10.626C11.3256 9.75771 11.8096 8.58614 11.8096 7.36536C11.8096 6.14457 11.3256 4.973 10.4625 4.10474C9.59947 3.23647 8.42696 2.74152 7.19929 2.72722ZM1.57497 7.36631C1.56703 6.62685 1.70666 5.89316 1.98577 5.20771C2.26487 4.52226 2.67792 3.89864 3.201 3.37295C3.72409 2.84726 4.34682 2.42994 5.03318 2.14512C5.71953 1.8603 6.45588 1.71365 7.19961 1.71365C7.94333 1.71365 8.67968 1.8603 9.36603 2.14512C10.0524 2.42994 10.6751 2.84726 11.1982 3.37295C11.7213 3.89864 12.1343 4.52226 12.4134 5.20771C12.6926 5.89316 12.8322 6.62685 12.8242 7.36631C12.8084 8.83925 12.2089 10.2465 11.1558 11.2825C10.1027 12.3186 8.68104 12.8997 7.19961 12.8997C5.71817 12.8997 4.29654 12.3186 3.24343 11.2825C2.19032 10.2465 1.59077 8.83925 1.57497 7.36631Z'
                                        fill='white'
                                    />
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M10.7105 10.4576L14.3041 14.0212L13.6263 14.6977L10.0327 11.1334L10.7105 10.4576Z'
                                        fill='white'
                                    />
                                </svg>
                            </label>
                            <input
                                className='bg-transparent outline-none text-den max-lg:text-white title16-400-130 max-md:title-mb12-400-130 max-lg:title-tl12'
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
                    onClick={() => setIsOpen(false)}
                    className='cursor-pointer'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='white'
                        className='w-[5.73vw] h-[5.73vw]'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </div>
            </div>
            <ul className='max-md:px-mb10 flex flex-col mt-[8vw] mb-[13.33vw] text-white max-lg:px-[3.2vw]'>
                {t?.menuNav?.nav1.map((e, index) => (
                    <li
                        onClick={() => setIsOpen(false)}
                        className='w-full py-[2.67vw] max-md:title-mb20-400-120 border-b borders-solid border-white01 last:border-none max-lg:title-tl20'
                        key={index}
                    >
                        <Link href={e.href}>{e.title}</Link>
                    </li>
                ))}
            </ul>
            <div className='max-md:px-mb10 mt-[13.33vw] flex justify-between items-end max-lg:px-[3.2vw]'>
                <ul className='flex flex-col text-white gap-y-[1.07vw] w-full max-lg:w-auto'>
                    {t?.menuNav?.nav2.map((e, index) => (
                        <li
                            onClick={() => setIsOpen(false)}
                            className='max-md:title-mb14-400-171 opacity-80 max-lg:title-tl14'
                            key={index}
                        >
                            <Link href={e.href}>{e.title}</Link>
                        </li>
                    ))}
                    {agreementDataTranslation?.map((e, index) => (
                        <li
                            className='max-md:title-mb14-400-171 opacity-80 max-lg:title-tl14'
                            key={index}
                        >
                            {e.title}
                        </li>
                    ))}
                </ul>
                <BoxLanguage
                    lang={lang}
                    t={t}
                    type={'mb'}
                />
            </div>
            <div className='px-mb10 my-[4.27vw]'>
                <div className='border border-t border-white01'></div>
            </div>
            <span className='block text-white max-md:px-mb10 max-md:title-mb12-400-200 opacity-50 max-lg:title-tl12 max-lg:px-[3.2vw]'>
                Email:
            </span>
            <span className='block text-white max-md:px-mb10 max-md:title-mb13-400-184 opacity-95 max-md:-mt-[1.6vw] max-lg:title-tl13 max-lg:px-[3.2vw] max-lg:mt-0'>
                kangnam@gmail.com.vn
            </span>
            <span className='block text-white max-md:px-mb10 max-md:title-mb12-400-200 opacity-50 mt-[2.13vw] max-lg:title-tl12 max-lg:px-[3.2vw]'>
                Địa chỉ:
            </span>
            <address className='block text-white max-md:px-mb10 max-md:title-mb13-400-130 opacity-95 not-italic max-lg:title-tl13 max-lg:px-[3.2vw]'>
                Villa E11, The Manor, kdt mới Mỹ Đình - Mễ Trì, Nam Từ Liêm, Hà Nội.
            </address>
            <span className='block text-white max-md:px-mb10 max-md:title-mb12-400-200 opacity-50 mt-[2.13vw] max-lg:title-tl12 max-lg:px-[3.2vw]'>
                Hotline:
            </span>
            <span className='block text-white max-md:px-mb10 max-md:title-mb13-600-150 max-lg:title-tl13 max-lg:px-[3.2vw]'>
                (+84) 254 3526981
            </span>
            <div className='max-md:px-mb10 mt-[4.27vw] max-lg:px-[3.2vw]'>
                <Link
                    href={`${lang !== 'vi' ? '/' + lang + '/deposit' : '/deposit'}`}
                    className='bg-nu h-fit w-full text-center block rounded-[6.25vw] py-[3.82vw] text-white max-md:title-mb13-600-150 max-lg:title-tl13'
                >
                    {t?.Navbar?.button}
                </Link>
            </div>
        </div>
    )
}
