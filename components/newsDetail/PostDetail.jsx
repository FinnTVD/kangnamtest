'use client'
import { formatDateTime, handleCheckLangCode } from '@/utils'
import classes from './NewsDetailStyle.module.css'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/app/[lang]/(store)/store'
export default function PostDetail({ t, post, newsDetail, lang, category }) {
    const langCode = handleCheckLangCode(lang)
    let categoryTranslation
    if(category){
        categoryTranslation = category.translations.length>0 ? category.translations.find((item) => item.langCode===langCode).name : category.title
    }
    const router = useRouter()
    const urlRef = useRef('')
    const setSlugDetailNews = useStore((state) => state.setSlugDetailNews)

    const fbShareHandler = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlRef.current}`)
    }
    const twitterShareHandler = () => {
        window.open(`https://twitter.com/intent/tweet?url=${urlRef.current}`)
    }
    const linkedinShareHandler = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${urlRef.current}`)
    }
    useEffect(() => {
        urlRef.current = window.location.href
        if (window.FB) {
            window.FB.XFBML.parse()
        }
        setSlugDetailNews(post)
        return () => {
            setSlugDetailNews(null)
        }
    }, [])

    // useEffect(() => {
    //     if (newsDetail) {
    //         router.replace(`/${lang}/news/${newsDetail?.slug}`, undefined, { shallow: true })
    //     }
    // }, [newsDetail])

    return (
        <section className='px-[16.25vw] pt-[6.875vw] px-mb10 max-md:pt-[13.3vw]'>
            <div className=''>
                <span className='text-den-2 text-20pc font-normal leading-[1.7] max-md:title-mb16-400-150 max-lg:title-tl20'>
                    {formatDateTime(post?.createdAt).slice(0, 10)} /
                </span>
                <span className='text-den-2 uppercase text-20pc font-normal leading-[1.7] max-md:title-mb16-400-150 max-lg:title-tl20'>
                    {' '}
                    {categoryTranslation} -{' '}
                </span>
                <span className='text-den-2 text-20pc font-normal leading-[1.7] max-md:title-mb16-400-150 max-lg:title-tl20'>
                    {' '}
                    {t?.newsDetailDes?.byAuthor} {post?.user?.lastName + ' ' + post?.user?.firstName}
                </span>
            </div>
            <div
                className={`${classes['post-detail']} mt-[0.625vw] pt-[1vw] pb-[2vw] border-b border-t border-neutral-700 border-opacity-10 max-md:pt-[2.6vw] max-md:pb-[4.2vw] max-md:mt-[2.6vw]`}
                dangerouslySetInnerHTML={{ __html: newsDetail?.description }}
            ></div>
            <div className='flex justify-end items-center mt-[1.625vw] max-md:mt-[4.8vw]'>
                <span className='title14-700-150 text-[#394854] uppercase max-md:title-mb13-700-150 max-lg:title-tl14'>
                    {' '}
                    {t?.newsDetailDes?.share}:{' '}
                </span>
                <div className='flex gap-[0.5vw] ml-[0.8125vw] max-md:gap-[2.1vw] max-md:ml-[2.4vw]'>
                    <div
                        onClick={twitterShareHandler}
                        className='cursor-pointer'
                    >
                        <svg
                            className='w-[1.5vw] max-md:w-[6.4vw] max-lg:w-[5vw]'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M20 7.03899C19.4009 7.30434 18.7655 7.47843 18.1148 7.55545C18.8001 7.14544 19.313 6.50026 19.5578 5.74016C18.9136 6.12253 18.2087 6.39178 17.4736 6.53625C17.1664 6.20872 16.7953 5.94774 16.3831 5.76949C15.971 5.59124 15.5266 5.49952 15.0776 5.5C13.2649 5.5 11.795 6.96919 11.795 8.78199C11.795 9.03898 11.8241 9.28973 11.8802 9.53009C9.15201 9.39319 6.7334 8.08646 5.11435 6.1006C4.82242 6.60149 4.66903 7.17101 4.6699 7.75074C4.66947 8.29109 4.80254 8.82318 5.0573 9.29973C5.31206 9.77629 5.68061 10.1825 6.1302 10.4824C5.60902 10.4659 5.09932 10.3251 4.64351 10.0719C4.64309 10.0856 4.64309 10.0991 4.64309 10.1132C4.64309 11.7029 5.77448 13.0294 7.27592 13.3312C6.79246 13.4621 6.28556 13.4813 5.79359 13.3873C6.21124 14.6909 7.42345 15.6401 8.85986 15.6667C7.69709 16.5791 6.26121 17.0739 4.78314 17.0717C4.51821 17.0717 4.25703 17.0564 4 17.0258C5.50089 17.99 7.2477 18.5018 9.0317 18.5C15.0695 18.5 18.3712 13.4993 18.3712 9.16279C18.3712 9.02069 18.3679 8.8788 18.3616 8.73774C19.0046 8.27361 19.5595 7.69832 20 7.03899Z'
                                fill='#394854'
                            />
                        </svg>
                    </div>
                    <div
                        onClick={fbShareHandler}
                        className='cursor-pointer'
                    >
                        <svg
                            className='w-[1.5vw] max-md:w-[6.4vw] max-lg:w-[5vw]'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M13.3333 10.125H16V12.9375H13.3333V19.5H10.6667V12.9375H8V10.125H10.6667V8.94844C10.6667 7.83375 10.9991 6.42562 11.6604 5.65594C12.3218 4.88437 13.1476 4.5 14.1369 4.5H16V7.3125H14.1333C13.6907 7.3125 13.3333 7.68938 13.3333 8.15531V10.125Z'
                                fill='#394854'
                            />
                        </svg>
                    </div>
                    <div
                        onClick={linkedinShareHandler}
                        className='cursor-pointer'
                    >
                        <svg
                            className='w-[1.5vw] max-md:w-[6.4vw] max-lg:w-[5vw]'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M8.57143 18.5H6V9.5H8.57143V18.5ZM18 18.5H15.4286V13.6922C15.4286 12.4394 15.0034 11.8157 14.1609 11.8157C13.4931 11.8157 13.0697 12.1649 12.8571 12.8642V18.5H10.2857C10.2857 18.5 10.32 10.4 10.2857 9.5H12.3154L12.4723 11.3H12.5254C13.0526 10.4 13.8951 9.7898 15.0506 9.7898C15.9291 9.7898 16.6397 10.0463 17.1823 10.6907C17.7283 11.336 18 12.2018 18 13.4177V18.5Z'
                                fill='#394854'
                            />
                            <path
                                d='M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z'
                                fill='#394854'
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                className='fb-comments mt-[2.5vw] max-md:mt-[10.6vw] !block'
                data-href={`${process.env.NEXT_PUBLIC_DOMAIN}${post?.id}`}
                data-width='100%'
                data-numposts='5'
            ></div>
        </section>
    )
}
