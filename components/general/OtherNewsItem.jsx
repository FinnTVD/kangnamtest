import Image from 'next/image'
import Link from 'next/link'
import { formatDateTime, handleCheckLangCode } from '@/utils'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function OtherNewsItem({ newsOtherItem, lang, index }) {
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
            <div data-aos='fade' data-aos-delay={index<=1 ? `${(index+1)*300}` : `${((index+1)%3)*300}`} className='group cursor-pointer w-full h-full bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[2.6vw] shadow-input max-md:shadow-newsDetailMb'>
                <div className='flex h-[11vw] items-center max-md:h-[30.1vw] max-lg:h-[20vw]'>
                    <div className='w-[45%] h-full relative rounded-lg overflow-hidden max-md:rounded-[6.5px]'>
                        <Image
                            src={newsOtherItem?.image ? newsOtherItem?.image : '/images/featuredImg.jpg'}
                            fill
                            sizes='12.5vw'
                            alt={translation?.title || 'thumbnail news'}
                            className='group-hover:scale-110 transition duration-300 absolute top-0 left-0 w-full h-full object-cover overflow-hidden'
                        />
                    </div>
                    <div className='w-[50%] ml-[5%] flex flex-col'>
                        <h2 className='text-den-2 title20-700-150 group-hover:text-[#D6A279] transition duration-300 line-clamp-2 max-md:title-mb14-700-125 max-lg:title-tl20'>
                            {translation?.title}
                        </h2>
                        <span className='text-den-2 title14-400-160 mt-[0.5vw] line-clamp-3 max-md:title-mb12-400-160 max-lg:title-tl14'>
                            {translation?.descSeo}
                        </span>
                    </div>
                </div>
                <div className='flex justify-between mt-[1.125vw] max-md:mt-[2.1vw]'>
                    <div className='bg-nau-nhat title12-400-150 py-[0.3125vw] px-[1.125vw] bg-opacity-20 rounded-[100px] text-nau-nhat max-md:title-mb10-400-150 max-md:py-[1.1vw] max-md:px-[3.73vw] max-lg:title-tl12'>
                        {categoryTranslation}
                    </div>
                    <div className='flex items-center'>
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
            </div>
        </Link>
    )
}
