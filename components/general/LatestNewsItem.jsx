import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { formatDateTime, handleCheckLangCode } from '@/utils'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
// href={e?.propertyCategory?.alias + '/' + e?.translation?.slug}
// lang==='vn' ? `/news/${translation?.slug}` : `/${lang}/news/${translation?.slug}`
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function LatestNewsItem({ newsItem, t, lang }) {
    const languageCode = handleCheckLangCode(lang)

    const translation = newsItem?.translations?.find((itm) => itm.languageCode === languageCode)
    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
    } = useSWR(process.env.NEXT_PUBLIC_API + `/post-type`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    let category
    let categoryTranslation
    if (categories && newsItem) {
        category = categories?.data?.find((item) => item?.id === newsItem?.postType?.id)
        if (category?.translations?.length > 0) {
            categoryTranslation = category?.translations?.find((itm) => itm?.languageCode === languageCode)?.name
        } else {
            categoryTranslation = category.title
        }
    }

    return (
        <Link href={lang === 'vi' ? `/news/${translation?.slug}` : `/${lang}/news/${translation?.slug}`}>
            <div
                data-aos='fade'
                className='group cursor-pointer w-full h-full bg-center bg-no-repeat bg-cover rounded-2xl shadow backdrop-blur-[39.77px] flex overflow-hidden max-md:rounded-[10px] relative'
            >
                <Image
                    className='group-hover:scale-110 transition duration-300 absolute top-0 left-0 w-full h-full object-cover'
                    src={newsItem?.image ? newsItem?.image : '/images/featuredImg.jpg'}
                    alt={translation?.title || 'thumbnail news'}
                    sizes='60vw'
                    fill
                />
                <div
                    className='w-[36.875vw] pt-[2.3125vw] pl-[1.875vw] pb-[2.125vw] pr-[3.3125vw] mt-auto ml-[2vw] mb-[2vw] rounded-2xl border border-white border-opacity-80 backdrop-blur-[11px] max-md:w-[75.4vw] max-md:p-[4.26vw] max-md:ml-[4.2vw] max-md:mb-[4.2vw] max-md:rounded-[8px] max-lg:w-[80%]'
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.90) 34.38%, rgba(255, 255, 255, 0.85) 100%)',
                    }}
                >
                    <div className='flex'>
                        <div className='bg-nau-nhat title12-400-150 py-[0.3125vw] px-[1.125vw] bg-opacity-20 rounded-[100px] text-nau-nhat max-md:text-[2.1vw] max-md:py-[1.1vw] max-md:px-[2.4vw] max-lg:title-tl12'>
                            {categoryTranslation}
                        </div>
                        <div className='ml-[1.125vw] flex items-center max-md:ml-[2.6vw]'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='21'
                                height='21'
                                viewBox='0 0 21 21'
                                fill='none'
                                className='w-[1.3125vw] h-auto max-md:w-[2.6vw] max-lg:w-[2vw]'
                            >
                                <g opacity='0.7'>
                                    <path
                                        d='M7.00098 1.75V4.375'
                                        stroke='#656263'
                                        strokeMiterlimit='10'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M13.999 1.75V4.375'
                                        stroke='#656263'
                                        strokeMiterlimit='10'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M3.06348 7.95508H17.9385'
                                        stroke='#656263'
                                        strokeMiterlimit='10'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M18.375 7.4375V14.875C18.375 17.5 17.0625 19.25 14 19.25H7C3.9375 19.25 2.625 17.5 2.625 14.875V7.4375C2.625 4.8125 3.9375 3.0625 7 3.0625H14C17.0625 3.0625 18.375 4.8125 18.375 7.4375Z'
                                        stroke='#656263'
                                        strokeMiterlimit='10'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M13.7315 11.9863H13.7394'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M13.7315 14.6113H13.7394'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.4952 11.9863H10.5031'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M10.4952 14.6113H10.5031'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M7.25691 11.9863H7.26477'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M7.25691 14.6113H7.26477'
                                        stroke='#656263'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </g>
                            </svg>
                            <span className='text-[#656263] title14-400-150 ml-[0.375vw] opacity-70 max-md:title-mb10-400-150 max-md:ml-[0.8vw] max-lg:title-tl14'>
                                {formatDateTime(newsItem?.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div className='mt-[0.625vw] max-md:mt-[0.5vw]'>
                        <div className='w-full flex flex-col'>
                            <h2 className='text-den-2 title20-700-150 group-hover:text-[#D6A279] transition duration-300 line-clamp-2 max-md:title-mb14-700-150 max-lg:title-tl20'>
                                {translation?.title}
                            </h2>
                            <span className='text-den-2 title16-400-150 mt-[0.75vw] line-clamp-2 max-md:title-mb12-400-150 max-md:mt-[0.5vw] max-lg:title-tl16'>
                                {translation?.descSeo}
                            </span>
                        </div>
                    </div>
                    <Button
                        className='mt-[1.375vw] gap-x-[0.75vw] border-opacity-50 max-md:!gap-x-[1.3vw] max-md:!py-[1.6vw] max-md:!px-[4.2vw]'
                        span='opacity-70 max-md:text-10mb max-lg:title-tl16'
                        icon='w-[1.25vw] max-md:w-[3vw] max-lg:w-[2vw]'
                        href={null}
                    >
                        {t?.newsLatestButton?.title}
                    </Button>
                </div>
            </div>
        </Link>
    )
}
