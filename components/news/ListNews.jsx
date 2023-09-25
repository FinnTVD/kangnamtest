'use client'
import ListNewsCategorized from './ListNewsCategorized'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import classes from './ListNewsStyles.module.css'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import { data } from 'autoprefixer'
import { handleCheckLangCode } from '@/utils'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const listNews = new Array(12).fill(0)

export default function ListNews({ t, lang }) {
    const [category, setCategory] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const langCode = handleCheckLangCode(lang)

    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
    } = useSWR(process.env.NEXT_PUBLIC_API + `/post-type`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const {
        data: dataNewsCategorized,
        error: errorNewsCategorized,
        isLoading: isLoadingNewsCategorized,
    } = useSWR(process.env.NEXT_PUBLIC_API + `/post?page=${pageNumber}&take=12&postTypeIds[]=${category?.id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        })
    
    const {
        data: allDataNews,
        error: errorAllNews,
        isLoading: isLoadingAllNews,
    } = useSWR(process.env.NEXT_PUBLIC_API + `/post?page=1&take=500`, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        })
    
    let newsCategorized
    let pageCount
    let categoryTranslation = []
    let cTr 
    
    if(allDataNews){
        newsCategorized = allDataNews.data.filter((item) => item.postType.id!=='95438eda-0e44-439c-96fd-343301f8b3f0')
        pageCount = Math.ceil(newsCategorized.length/12)
    }
    if(categories){
        categories.data.forEach((item, index) => {
            if(item.id!=='95438eda-0e44-439c-96fd-343301f8b3f0'){
                if(item.translations.length>0){
                    item.translations.forEach((itm) => {
                        if(itm.languageCode === langCode )
                            categoryTranslation.push({id: item.id, title: itm.name})
                    })
                }
                else{
                    categoryTranslation.push({id: item.id, title: item.title})
                }
            }
        })
    }

    // let newsCategorized
    // let pageCount
    // if(dataNews){
    //     newsCategorized = dataNews.data.filter((item) => item.postType.id!=='95438eda-0e44-439c-96fd-343301f8b3f0')
    //     pageCount = Math.ceil(newsCategorized.length/12)
    // }
        // useSWR(process.env.NEXT_PUBLIC_API + `/post?page=${pageNumber}&take=12`, fetcher, {
        //     revalidateIfStale: false,
        //     revalidateOnFocus: false,
        //     revalidateOnReconnect: false,
        // })

    // useEffect(() => {
    //     if(categories){
    //         setCategory(categories.data[0])
    //     }
    // }, [categories])
    // console.log(isLoadingNews)
    const categoryStyle =
        'border border-[#D6A279] rounded-full py-[0.625vw] px-[1.5vw] title14-400-150 cursor-pointer max-md:title-mb14-400-150 max-md:py-[2.6vw] max-md:px-[6.4vw] whitespace-nowrap max-lg:title-tl14'
    const newsCategorizedRef = useRef()
    return (
        <section
            className='px-120 pt-[6.875vw] pb-[8.125vw] max-md:pl-[2.6vw] max-md:pr-0 max-md:pb-[16vw] max-md:pt-[13.3vw]'
            ref={newsCategorizedRef}
        >
            <div className='flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-normal'>
                <div>
                    <span className='sub-title max-md:title-mb10-700-150 max-md:tracking-[0.5px] max-lg:title-tl12'>
                        {t.newsList.subtitle} {category?.title}
                    </span>
                    <h2 className='title56 text-den mt-[0.62vw] max-md:title-mb25-700-130 max-md:tracking-[-1.25px] max-md:normal-case max-md:mt-[1.1vw] max-lg:title-tl38'>
                        {t.newsList.title} {category?.title} 
                    </h2>
                </div>
                <div
                    className={`${classes['news-categories']} flex gap-[1.5vw] max-md:gap-[2.6vw] max-md:mt-[2.6vw] max-w-[60%] flex-wrap max-lg:flex-nowrap max-lg:max-w-full max-lg:overflow-scroll max-lg:w-full max-lg:mt-[1vw]`}
                >
                    {categoryTranslation?.map((e, index) => (
                        <span
                            key={index}
                            className={
                                e?.title === category?.title
                                    ? `${categoryStyle} bg-[#D6A279] text-white`
                                    : `${categoryStyle} bg-transparent text-den`
                            }
                            onClick={() => {
                                setCategory(e)
                                setPageNumber(1)
                            }}
                        >
                            {e?.title}
                        </span>
                    ))}
                </div>
            </div>
            {(isLoadingAllNews || isLoadingNewsCategorized) && (
                // <div className='mt-[2.5vw] max-md:mt-[4.2vw] max-md:pr-[2.6vw]'>
                //     <div className='flex gap-x-[1.5vw] h-[35.25vw] mb-[3.75vw] max-md:w-full max-md:h-[165.6vw] max-md:flex-col max-md:gap-y-[4.2vw]'>
                //         <div className=' w-[56.1875vw] h-full max-md:h-[68.5vw] max-md:w-full'>
                //             <Skeleton className='w-full h-full' />
                //         </div>
                //         <div className='flex flex-1 flex-col gap-y-[1.5vw] h-full max-md:gap-y-[3.2vw] max-md:h-[92.8vw]'>
                //             <div className='flex-1 max-md-[44.2vw]'>
                //                 <Skeleton className='h-full' />
                //             </div>
                //             <div className='flex-1 max-md-[44.2vw]'>
                //                 <Skeleton className='h-full' />
                //             </div>
                //         </div>
                //     </div>
                //     <div className='grid grid-cols-3 grid-rows-3 gap-x-[1.56vw] gap-y-[2vw] max-md:grid-cols-1 max-md:grid-rows-none max-md:gap-y-[4.2vw]'>
                //         {listNews &&
                //             listNews.map((e, index) => (
                //                 <div
                //                     className='w-full h-[31.4375vw] max-md:h-[108.8vw]'
                //                     key={index}
                //                 >
                //                     <Skeleton className='h-full' />
                //                 </div>
                //             ))}
                //     </div>
                // </div>
                <div className='max-md:pr-[2.6vw]'>
                    <div className='mt-[3.5vw] grid grid-cols-3 grid-rows-[16.875vw_16.875vw] gap-[1.5vw] max-md:grid-cols-1 max-md:grid-rows-[68.5vw_44.2vw_44.2vw] max-md:gap-[4.2vw] max-lg:grid-cols-1 max-lg:grid-rows-[66.6vw_28.2vw_28.2vw]'>
                        <div className='col-span-2 row-span-2 max-lg:col-span-1 max-lg:row-span-1'>
                            <div className='h-full'>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                ></Skeleton>
                            </div>
                        </div>
                        {listNews.slice(1, 3).map((item, index) => (
                            <div
                                key={index}
                                className='w-full h-full bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[2.6vw] shadow-input max-md:shadow-newsDetailMb'
                            >
                                <div className='flex h-[11vw] items-center max-md:h-[30.1vw] max-lg:h-[20vw]'>
                                    <div className='w-[45%] h-full rounded-lg max-md:rounded-[6.5px]'>
                                        <Skeleton
                                            width={'100%'}
                                            height={'100%'}
                                        ></Skeleton>
                                    </div>
                                    <div className='w-[50%] ml-[5%] flex flex-col'>
                                        <Skeleton
                                            count={2}
                                            width={'100%'}
                                        ></Skeleton>
                                        <div className='mt-[0.5vw]'>
                                            <Skeleton
                                                count={3}
                                                width={'100%'}
                                            ></Skeleton>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-[1.125vw] max-md:mt-[2.1vw]'>
                                    <div className='w-[4.437vw] h-[1.75vw] max-md:h-[6.1vw] max-md:w-[18.4vw]'>
                                        <Skeleton
                                            width={'100%'}
                                            height={'100%'}
                                        ></Skeleton>
                                    </div>
                                    <div className='w-[8.625vw] h-[1.3125vw] max-md:h-[4.5vw] max-md:w-[29.8vw]'>
                                        <Skeleton
                                            width={'100%'}
                                            height={'100%'}
                                        ></Skeleton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-[3.75vw] grid grid-cols-3 gap-[1.5vw] max-lg:grid-cols-1 max-md:gap-[4.2vw] max-md:mt-[4.2vw]'>
                        {listNews?.slice(3, 12)?.map((item, index) => (
                            <div
                                key={index}
                                className='w-full h-full bg-white rounded-2xl backdrop-blur-2xl p-[1.5vw] max-md:rounded-[13px] max-md:p-[5.3vw] max-md:py-mb10 shadow-input max-md:shadow-newsDetailMb'
                            >
                                <div className='w-full h-[16.1875vw] rounded-lg max-md:h-[56vw] max-lg:h-[40vw]'>
                                    <Skeleton
                                        width={'100%'}
                                        height={'100%'}
                                    ></Skeleton>
                                </div>
                                <div className='w-[4.4375vw] h-[1.75vw] mt-[0.5vw] max-lg:mt-[1vw] max-md:w-[15.2vw] max-md:h-[6.1vw]'>
                                    <Skeleton
                                        width={'100%'}
                                        height={'100%'}
                                    ></Skeleton>
                                </div>
                                <div className='w-full mt-[0.2625vw] flex flex-col max-lg:mt-[0.8vw]'>
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
                                {/* </div> */}
                                <div className='w-[8.625vw] h-[1.3125vw] mt-[0.5vw] max-md:mt-[1.7vw] max-md:w-[29.8vw] max-md:h-[4.5vw]'>
                                    <Skeleton
                                        width={'100%'}
                                        height={'100%'}
                                    ></Skeleton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* {category && (
                <> */}
                    {(dataNewsCategorized && newsCategorized) && 
                        <ListNewsCategorized
                            list={category ? dataNewsCategorized?.data : newsCategorized?.slice((pageNumber-1)*12, pageNumber*12)}
                            t={t}
                            lang={lang}
                        />
                    }
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='Next'
                        onPageChange={(e) => setPageNumber(e.selected + 1)}
                        pageRangeDisplayed={5}
                        pageCount={category ? dataNewsCategorized?.meta?.pageCount : pageCount}
                        renderOnZeroPageCount={null}
                        previousLabel='Previous'
                        forcePage={pageNumber - 1}
                        pageClassName={classes.page}
                        activeClassName={classes.selected}
                        onClick={() => {
                            newsCategorizedRef?.current?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={classes['news-pagination']}
                    />
                {/* </>
            )} */}
        </section>
    )
}
