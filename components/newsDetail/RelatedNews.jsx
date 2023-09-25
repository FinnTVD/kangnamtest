'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import NewsItem from '../news/NewsItem'
import Button from '../general/Button'
import { useMediaQuery } from 'react-responsive'
import { Autoplay } from 'swiper/modules'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const listNews = new Array(3).fill(0)
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function RelatedNews({ t, lang, post }) {
    const isTablet = useMediaQuery({ query: '(max-width: 1023px)' })
    const {
        data: newsArr,
        error: errornewsArr,
        isLoading: isLoadingNewsArr,
    } = useSWR(process.env.NEXT_PUBLIC_API + `/post?page=1&take=7&postTypeIds[]=${post?.postType?.id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    const relatedNews = newsArr?.data
        ?.filter((item) => item.postType.id === post.postType.id && item.id !== post.id)
        .slice(0, 6)

    return (
        <section className='px-120 mt-[3.75vw] max-md:mt-[13.3vw] max-lg:px-0 max-md:mb-[16vw] max-lg:mb-[8vw]'>
            <div className='flex justify-between items-end px-mb10 max-lg:px-120'>
                <div>
                    <span className='sub-title max-md:title-mb10-700-150 max-md:tracking-[0.5px] max-lg:title-tl12'>
                        {t.newsDetailRelated.subtitle}
                    </span>
                    <h2 className='title56 text-den mt-[0.62vw] max-md:normal-case max-md:mt-[1vw] max-md:title-mb25-700-130 max-md:tracking-[-0.75px] max-lg:title-tl38'>
                        {t.newsDetailRelated.title}
                    </h2>
                </div>
                {!isTablet && (
                    <Button
                        stroke='white'
                        href={'/news'}
                        className='bg-[#D6A279] text-white border-none'
                    >
                        {t.newsDetailRelated.button}
                    </Button>
                )}
            </div>
            {isLoadingNewsArr && (
                <div className='pt-[1.875vw] pb-[6.25vw] max-md:pl-[2.6vw] max-md:py-[4.3vw] max-lg:pl-[7.5vw] flex gap-x-[1.5vw] max-md:gap-x-[4.27vw]'>
                    {listNews?.map((item, index) => (
                        <div
                            key={index}
                            className='flex-1 bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[5.3vw] max-md:py-mb10 shadow-input max-md:shadow-newsDetailMb'
                        >
                            <div className='w-full h-[16.1875vw] rounded-lg max-md:h-[56vw] max-lg:h-[40vw]'>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                ></Skeleton>
                            </div>
                            <div className='w-[4.4375vw] h-[1.75vw] max-md:mt-[1vw] max-md:w-[15.2vw] max-md:h-[6.1vw]'></div>
                            <div className='w-full mt-[0.2625vw] flex flex-col max-md:mt-[0.8vw]'>
                                <Skeleton
                                    width={'100%'}
                                    count={2}
                                ></Skeleton>
                                <div className='mt-[0.8vw]'>
                                    <Skeleton
                                        width={'100%'}
                                        count={2}
                                    ></Skeleton>
                                </div>
                            </div>
                            <div className='w-[8.625vw] h-[1.3125vw] mt-[0.5vw] max-md:mt-[1.7vw] max-md:w-[29.8vw] max-md:h-[4.5vw]'>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                ></Skeleton>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {relatedNews && (
                <Swiper
                    loop={true}
                    // autoplay={{
                    //     delay: 5000,
                    //     disableOnInteraction: false,
                    // }}
                    breakpoints={{
                        240: {
                            slidesPerView: 1.2,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    }}
                    speed={600}
                    modules={[Autoplay]}
                    className='pt-[1.875vw] pb-[6.25vw] max-md:pl-[2.6vw] max-md:py-[4.3vw] max-lg:pl-[3.2vw]'
                >
                    {relatedNews?.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className='h-auto'
                        >
                            <NewsItem
                                newsOtherItem={item}
                                lang={lang}
                            ></NewsItem>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            {isTablet && (
                <Button
                    stroke='white'
                    href={lang === 'vn' ? '/news' : `/${lang}/news`}
                    span='max-md:text-14mb font-normal tracking-[-0.28px] max-lg:title-tl16'
                    icon='w-auto max-md:h-[4.5vw] max-lg:h-[2vw]'
                    className=' bg-logo !w-[91.6vw] justify-center text-white border-none max-md:gap-x-[3.2vw] max-md:py-[4.26vw] mt-0 mb-0 ml-auto mr-auto'
                >
                    {t.newsDetailRelated.button}
                </Button>
            )}
        </section>
    )
}
