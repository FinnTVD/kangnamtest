'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const dataHeader = [
    {
        id: 1,
        title: 'Thông tin nhanh chóng theo nhịp thị trường',
        des: 'Không thể bỏ lỡ những thông tin quan trọng của thị trường theo dòng sự kiện',
        end: 'Tin tức',
        slug: 'news',
    },
    {
        id: 2,
        title: 'Chúng tôi luôn hỗ trợ khách hàng một cách nhanh chóng',
        des: 'Quý khách hàng vui lòng điền đầy đủ thông tin để được đội ngũ chúng tôi tư vấn miễn phí',
        end: 'Liên hệ',
        slug: 'contact',
    },
    {
        id: 3,
        title: 'Chúng tôi theo đuổi sự hoàn hảo trên từng dự án',
        des: 'Công ty Cổ phần bất động sản Kangnam là đơn vị môi giới bất động sản chuyên nghiệp giàu kinh nghiệm',
        end: 'Giới thiệu',
        slug: 'about-us',
    },
    {
        id: 4,
        title: 'Thỏa thuận & pháp lý',
        des: 'Quý khách hàng vui lòng điền đầy đủ thông tin để được đội nguc chúng tôi tư vấn miễn phí',
        end: 'Pháp lý',
        slug: 'agreement',
    },
]

export default function ContentPageOther({ post, lang, newsDetail, breadcrumb }) {
    const pathName = usePathname()
    const [data, setData] = useState(null)

    useEffect(() => {
        const data = dataHeader.filter((e) => pathName?.includes(e?.slug))
        setData(data[0])
    }, [pathName])

    return (
        <>
            <div className='absolute top-[30%] left-[7.5vw] w-fit z-10 px-mb10 max-md:left-0 max-md:w-full max-md:top-1/2 max-md:-translate-y-1/2'>
                <h1 className='leading-[1.23] -tracking-[3px] title60 w-[51.1875vw] mb-[1.87vw] line-clamp-3 title-mb25-700-150 max-lg:w-full max-md:-tracking-[1.25px] max-md:mb-[2.13vw] max-lg:title-tl42'>
                    {newsDetail ? newsDetail?.title : data?.title}
                </h1>
                <p className='w-[26.25vw] title20-400-150 line-clamp-3 max-lg:w-full max-md:title-mb14-400-150 max-lg:title-tl14'>{data?.des}</p>
            </div>
            <div className='absolute right-[2.87vw] z-10 bottom-[1.94vw] bg-gradient-mark-home h-fit max-lg:hidden'>
                <div className='flex justify-normal pl-[9.5vw] pr-[3vw] gap-x-[3px] my-[0.35vw]'>
                    <span className='text-white font-bold title18-400-150 opacity-[0.65]'>Trang chủ </span>
                    <span className='font-extrabold text-white title18-400-150'> / {breadcrumb? breadcrumb : data?.end} </span>
                </div>
            </div>
        </>
    )
}
