'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BoxLanguage from './language/BoxLanguage'
import { useMediaQuery } from 'react-responsive'
import MenuRes from './MenuRes'
import SearchGlobal from '../home/SearchGlobal'
import useSWR from 'swr'
import { listIdNav, handleCheckLangCode } from '@/utils'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const objClass = {
    classContainer:
        'w-[23.125vw] py-[0.87vw] px-[1.75vw] max-md:w-[68.267vw] max-md:py-[3.06vw] max-md:px-[5.07vw] bg-white rounded-[10vw] flex justify-between items-center shadow-input border border-solid border-logo',
    classLine:
        'border-l border-solid border-den opacity-40 h-[1.0625vw] mx-[0.63vw] max-md:h-[2.67vw] max-md:mx-[3.2vw]',
    classForm: 'flex-1 flex items-center gap-x-[0.5vw] relative',
    isIcon: false,
    iconSmall: true,
    classInput: 'outline-none text-den title16-400-130 mr-[1.5vw] max-md:mr-0 title-mb12-400-130 max-md:w-[29vw]',
    classList:
        'w-[36vw] absolute bottom-[-0.5vw] left-0 translate-y-full z-[1000] bg-white text-black px-[1.5vw] py-[1vw] rounded-[0.5vw] shadow-input',
}

export default function NavBarV2({ lang, t }) {
    const [valueSearch, setValueSearch] = useState('Thành phố Hà Nội')
    const isTablet = useMediaQuery({
        query: '(max-width: 1023px)',
    })
    const languageCode = handleCheckLangCode(lang)
    const {
        data: agreementData,
        error: errorNews,
        isLoading: isLoadingNews,
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
    const [isOpen, setIsOpen] = useState(false)
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
    if (!listNav?.length) return

    return (
        <nav className='relative z-[9999] border-b border-solid px-[3.75vw] h-fit border-white04 max-md:pl-[4vw] max-md:pr-[2.5vw]'>
            <div className='flex items-center justify-between w-full gap-x-[2.5vw] max-md:my-[2.67vw]'>
                <div className='flex gap-x-[1.92vw] items-center'>
                    <Link
                        href={`/${lang !== 'vi' ? lang : ''}`}
                        className='relative w-[3.52vw] h-[4.5vw] block my-[0.62vw] max-md:w-[8.267vw] max-md:h-[11.467vw] max-lg:w-[6vw] max-lg:h-[8vw]'
                    >
                        <Image
                            className='object-cover max-lg:object-contain'
                            src='/images/logo-no-bg.svg'
                            alt='logo'
                            sizes='3.52vw'
                            priority
                            fill
                        />
                    </Link>
                </div>

                <SearchGlobal
                    lang={lang}
                    classContainer={objClass.classContainer}
                    classLine={objClass.classLine}
                    classForm={objClass.classForm}
                    isIcon={objClass.isIcon}
                    iconSmall={objClass.iconSmall}
                    classInput={objClass.classInput}
                    isHome={false}
                    classList={objClass.classList}
                />
                {!isTablet ? (
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
                                                    <span className='inline-block whitespace-nowrap title16-600-130 text-den'>
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
                                                                    className='block w-full h-full whitespace-nowrap title16-400-130 text-den'
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
                                                        {agreementDataTranslation.map((item) => (
                                                            <li
                                                                key={item?.id}
                                                                className='px-[1vw] py-[0.5vw] hover:bg-[#f3f4f7]'
                                                            >
                                                                <Link
                                                                    className='block w-full h-full whitespace-nowrap title16-400-130 text-den'
                                                                    href={`${
                                                                        lang !== 'vi'
                                                                            ? '/' + lang + item?.slug
                                                                            : item?.slug
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
