'use client'
import Button from '../general/Button'
import Image from 'next/image'
import LatestNewsItem from '../general/LatestNewsItem'
import OtherNewsItem from '../general/OtherNewsItem'
import { useMediaQuery } from 'react-responsive'
import useSWR from 'swr'
import Skeleton from 'react-loading-skeleton'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const arrItem = new Array(5).fill(0)
export default function LatestNews({ t, lang }) {
    const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1023px)' })
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_API + `/post?page=1&take=12`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    let dataCategorized
    if(data){
        dataCategorized = data.data.filter((item) => item.postType.id!=='95438eda-0e44-439c-96fd-343301f8b3f0').slice(0,6)
    }
    // const newsArrSlice = isMobile ? newsArr.slice(1, 3) : newsArr.slice(1, 6)

    return (
        <section className='w-full px-120 pb-[8.125vw] mt-[-6.25vw] relative max-md:mt-[3.7vw] px-mb10 max-md:pb-[20.8vw]'>
            <div className='flex justify-between items-end'>
                <div>
                    <span className='sub-title max-md:title-mb12-600-160 max-md:leading-[1.5] max-md:tracking-[0.6px] max-lg:title-tl12'>
                        {t.homepageNews.subtitle}
                    </span>
                    <h2 className='title56 text-den mt-[0.62vw] max-md:title-mb25-700-130 max-md:tracking-[-0.75px] max-md:mt-[2.1vw] max-md:normal-case max-lg:title-tl38'>
                        {t.homepageNews.title}
                    </h2>
                </div>
                {!isTablet && (
                    <Button
                        stroke='white'
                        className='bg-logo text-white border-none'
                        href={'/news'}
                    >
                        {t.homepageNews.button}
                    </Button>
                )}
            </div>
            <div className='mt-[3.5vw] grid grid-cols-3 grid-rows-[16.875vw_16.875vw_16.875vw] gap-[1.5vw] max-md:grid-cols-1 max-md:grid-rows-[68.5vw_44.2vw_44.2vw] max-md:gap-[4.2vw] max-md:mt-[4.2vw] max-lg:grid-cols-1 max-lg:grid-rows-[66.6vw_28.2vw_28.2vw]'>
                <div className='col-span-2 row-span-2 max-lg:col-span-1 max-lg:row-span-1'>
                    {dataCategorized && (
                        <LatestNewsItem
                            newsItem={dataCategorized[0]}
                            t={t}
                            lang={lang}
                        />
                    )}
                    {isLoading && (
                        <div className='group w-full h-full rounded-2xl flex overflow-hidden max-md:rounded-[10px] relative'>
                            <div className='w-full h-full absolute top-0 left-0'>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {isLoading &&
                    (isTablet? arrItem.slice(1,3) : arrItem).map((e, index) => (
                        <div key={index} className='w-full h-full bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[2.6vw] shadow-input max-md:shadow-newsDetailMb'>
                            <div className='flex h-[11vw] items-center max-md:h-[30.1vw] max-lg:h-[20vw]'>
                                <div className='w-[45%] h-full rounded-lg max-md:rounded-[6.5px]'>
                                    <Skeleton width={'100%'} height={'100%'}></Skeleton>
                                </div>
                                <div className='w-[50%] ml-[5%] flex flex-col'>
                                    <Skeleton count={2} width={'100%'}></Skeleton>
                                    <div className='mt-[0.5vw]'>
                                        <Skeleton count={3} width={'100%'}></Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-[1.125vw] max-md:mt-[2.1vw]'>
                                <div className='w-[4.437vw] h-[1.75vw] max-md:h-[6.1vw] max-md:w-[18.4vw]'>
                                    <Skeleton width={'100%'} height={'100%'}></Skeleton>
                                </div>
                                <div className='w-[8.625vw] h-[1.3125vw] max-md:h-[4.5vw] max-md:w-[29.8vw]'>
                                    <Skeleton width={'100%'} height={'100%'}></Skeleton>
                                </div>
                            </div>
                        </div>
                    ))}
                {!isTablet ?
                    dataCategorized?.slice(1, 6)?.map((news, index) => (
                        <div key={news?.id}>
                            <OtherNewsItem newsOtherItem={news} lang={lang} index={index}/>
                        </div>
                    ))
                    :
                    dataCategorized?.slice(1, 3)?.map((news, index) => (
                        <div key={news?.id}>
                            <OtherNewsItem newsOtherItem={news} lang={lang}/>
                        </div>
                    ))
                }
            </div>
            {isTablet && (
                <Button
                    stroke='white'
                    href={lang==='vn' ? '/news' : `/${lang}/news`}
                    span='max-md:text-14mb font-normal tracking-[-0.28px] max-lg:text-16tl'
                    icon='w-auto max-md:h-[4.5vw] max-lg:h-[2vw]'
                    className='bg-logo w-full mt-[8.26vw] justify-center text-white border-none max-md:gap-x-[3.2vw] max-md:py-[4.26vw]'
                >
                    {t.homepageNews.button}
                </Button>
            )}
        </section>
    )
}
