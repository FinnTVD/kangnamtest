import { formatDateTime, handleCheckLangCode } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function NewsItem({ newsOtherItem, lang, index }) {
    const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' })
    const languageCode = handleCheckLangCode(lang)

    const translation = newsOtherItem?.translations?.find((itm) => itm.languageCode === languageCode)
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
    if(categories){       
        category = categories.data.find((item) => item.id === newsOtherItem.postType.id)
        if(category.translations.length>0){
            categoryTranslation = category.translations?.find((itm) => itm.languageCode===languageCode).name
        }
        else{
            categoryTranslation = category.title
        }
    }

    return (
        <Link href={lang === 'vi' ? `/news/${translation?.slug}` : `/${lang}/news/${translation?.slug}`}>
            <div data-aos='fade' data-aos-delay={`${(index%3)*300}`} className='group cursor-pointer w-full h-full bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[5.3vw] max-md:py-mb10 shadow-input max-md:shadow-newsDetailMb'>
                {/* <div className="flex h-[11vw] items-center"> */}
                <div className='w-full h-[16.1875vw] relative rounded-lg overflow-hidden max-md:h-[56vw] max-lg:h-[40vw]'>
                    <Image
                        src={newsOtherItem?.image ? newsOtherItem?.image : '/images/featuredImg.jpg'}
                        fill
                        alt={translation?.title || 'thumbnail news'}
                        className='group-hover:scale-110 transition duration-300 absolute top-0 left-0 w-full h-full object-cover overflow-hidden'
                    />
                </div>
                <span className='bg-nau-nhat inline-block title12-400-150 mt-[1vw] py-[0.3125vw] px-[1.125vw] bg-opacity-20 rounded-[100px] text-nau-nhat max-md:pr-[2.6vw] max-md:title-mb10-400-150 max-md:mt-[3.4vw] max-md:py-[1.1vw] max-md:px-[3.7vw] max-md:rounded-[3.3px] max-lg:title-tl12'>
                    {categoryTranslation}
                </span>
                <div className='w-full mt-[0.2625vw]] flex flex-col max-md:mt-[0.8vw]'>
                    <h2 className='mt-[0.25vw] text-den-2 title20-700-150 group-hover:text-[#D6A279] transition duration-300 max-md:title-mb16-700-135 max-lg:title-tl20'>
                        {translation?.title}
                    </h2>
                    <span className='text-den-2 title14-400-160 mt-[0.5vw] line-clamp-2 max-md:mt-[0.8vw] max-md:title-mb12-400-150 max-lg:title-tl14'>
                        {translation?.descSeo}
                    </span>
                </div>
                {/* </div> */}
                <div className='flex mt-[0.5vw] max-md:mt-[1.7vw]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='21'
                        height='21'
                        viewBox='0 0 21 21'
                        fill='none'
                        className='w-[1.3125vw] h-auto max-md:w-[4.5vw] max-lg:w-[2vw]'
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
                    <span className='text-[#656263] title14-400-150 ml-[0.375vw] opacity-70 max-md:title-mb12-400-150 max-md:ml-[1.3vw] max-lg:title-tl14'>
                        {formatDateTime(newsOtherItem?.createdAt)}
                    </span>
                </div>
            </div>
        </Link>
    )
}
