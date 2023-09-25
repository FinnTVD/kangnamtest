'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import Link from 'next/link'

const arrLink = [
    {
        id: '823a2e96-0913-47a2-a25c-780eb911434f',
        slug: 'buy',
    },
    {
        id: '74caa33c-64dc-4d16-a9c7-b730ae377b75',
        slug: 'resale',
    },
    {
        id: '013b523f-e340-4e7e-80a6-99096a7ce3fe',
        slug: 'hire',
    },
]
const handleRenderItem = (data, key, lang) => {
    if (!data) return
    let slug = data?.translations?.find((e) => e?.languageCode?.toLowerCase()?.includes(lang))
    if (key === 'slug') {
        return arrLink?.find((e) => e?.id === data?.propertyCategoryId)?.slug + '/' + slug?.slug
    }
    return slug?.name || data?.title
}
export default function SlideProjectProminent({ lang, dataHomePage }) {
    const swiperRef = useRef()

    const handleNextSlide = () => {
        swiperRef.current?.slideNext()
    }

    const handlePrevSlide = () => {
        swiperRef.current?.slidePrev()
    }

    return (
        <div className='relative'>
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        freeMode: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                }}
                modules={[FreeMode]}
                className='max-md:px-[2.67vw]'
            >
                {Array.isArray(dataHomePage?.properties) &&
                    dataHomePage?.properties?.map((e, index) => (
                        <SwiperSlide
                            className='!h-[26.1825vw] max-lg:!h-[32.1825vw] max-md:!w-[77.6vw] max-md:!h-[88vw] overflow-hidden rounded-[1vw] max-md:rounded-[3.2vw]'
                            key={index}
                        >
                            <Link href={handleRenderItem(e, 'slug', lang) || '/'}>
                                <div className='h-full max-md:w-full relative select-none px-[1.5vw] py-[1.5vw] flex items-end max-md:px-[4.51vw] max-md:py-[6.47vw]'>
                                    <Image
                                        data-aos='zoom-out'
                                        data-aos-delay={`${index * 300}`}
                                        className='object-cover rounded-[1vw]'
                                        src={e?.firstImage || '/images/slideitem.jpg'}
                                        alt={`slide-${index}`}
                                        sizes='100vw'
                                        fill
                                    />
                                    <div className='absolute bottom-0 left-0 w-full h-[16.8125vw] max-md:h-[65.49vw] bg-gradient-slide z-[1]'></div>
                                    <div className='relative z-10'>
                                        <h2
                                            title={handleRenderItem(e, 'name', lang)}
                                            className='text-white title20-700-150 title-mb18-700-150 line-clamp-2 max-lg:title-tl18'
                                        >
                                            {handleRenderItem(e, 'name', lang) || 'No data'}
                                        </h2>
                                        <address
                                            title={e?.address?.display}
                                            className='text-white title-mb12-600-150 line-clamp-2 max-lg:title-tl12'
                                        >
                                            {e?.address?.display}
                                        </address>
                                        <span className='text-white max-md:title-mb12-400-150 max-lg:title-tl12'>
                                            값: 35tr/m2{' '}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <button
                onClick={handlePrevSlide}
                className={`${
                    dataHomePage?.properties?.length <= 4 ? 'hidden' : ''
                } absolute top-1/2 max-md:hidden left-0 -translate-x-1/2 -translate-y-1/2 w-[4vw] h-[4vw] max-lg:w-[6vw] max-lg:h-[6vw] rounded-full border border-solid border-[#D6A279] flex justify-center items-center bg-white z-20`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#444'
                    className='w-6 h-6 max-lg:w-[2.2vw] max-lg:h-[2.2vw]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                </svg>
            </button>
            <button
                onClick={handleNextSlide}
                className={`${
                    dataHomePage?.properties?.length <= 4 ? 'hidden' : ''
                } absolute top-1/2 max-md:hidden right-0 translate-x-1/2 -translate-y-1/2 w-[4vw] h-[4vw] max-lg:w-[6vw] max-lg:h-[6vw] rounded-full border border-solid border-[#D6A279] flex justify-center items-center bg-white z-20`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#444'
                    className='w-6 h-6 max-lg:w-[2.2vw] max-lg:h-[2.2vw]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                </svg>
            </button>
        </div>
    )
}
