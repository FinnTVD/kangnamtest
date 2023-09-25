'use client'
import { useState } from 'react'
import Button from '../general/Button'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

const arrArea = [
    '01. Khu vực Bắc Từ Liêm, Hà Nội',
    '02. Khu vực Thanh Xuân, Hà Nội',
    '03. Khu vực Hà Đông, Hà Nội',
    '04. Khu vực Đống Đa, Hà Nội',
]

const arrProminent = [
    { id: 1, src: '/images/bg-prominent.jpg', alt: 'bg header primary' },
    { id: 2, src: '/images/bg-header.jpg', alt: 'bg header' },
    { id: 3, src: '/images/bg-header1.jfif', alt: 'bg-header1' },
    { id: 4, src: '/images/bg-header2.jfif', alt: 'bg-header2' },
]

export default function Prominent() {
    const [indexSlider, setIndexSlider] = useState(0)
    const swiperRef = useRef()
    const isMobile = useMediaQuery({
        query: '(max-width: 767.9px)',
    })

    const handleSlideChange = (swiper) => {
        setIndexSlider(swiper.realIndex)
    }

    const handleSlideClick = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index)
        }
    }

    return (
        <section
            id='prominent'
            className='relative flex h-screen md:items-end max-md:mt-[13.067vw] max-md:h-[80vh]'
        >
            <Swiper
                slidesPerView={1}
                loop={true}
                effect={'fade'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                onSlideChange={handleSlideChange}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                }}
                modules={[EffectFade, Autoplay]}
                className='!absolute top-0 left-0 z-0 w-full h-full mySwiper'
            >
                {arrProminent &&
                    arrProminent?.map((e, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative w-full h-full overflow-hidden box-img-slide'>
                                <Image
                                    className={`${
                                        indexSlider === index ? 'active' : ''
                                    } object-cover w-[110vw] h-[110vh] scale-110`}
                                    src={e.src}
                                    alt={e.alt}
                                    sizes='100vw'
                                    fill
                                />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <div className='absolute bottom-0 left-0 w-full h-[76vh] max-md:h-full bg-gradient-slide z-[1]'></div>
            <div className='relative z-10 px-120 flex flex-col gap-y-[4.25vw] max-md:gap-y-[30.4vw] items-center w-full mb-[3.19vw] max-md:mt-[10.4vw] px-mb10 max-lg:mb-[4.29vw]'>
                {isMobile && (
                    <div className='w-full md:hidden'>
                        <span className='text-white title-mb14-600-160'>{arrArea[indexSlider]}</span>
                        <ul className='flex gap-x-[2.4vw] w-full mt-[2.67vw]'>
                            {arrArea &&
                                arrArea?.map((e, index) => (
                                    <li
                                        onClick={() => handleSlideClick(index)}
                                        key={index}
                                        className={`${
                                            indexSlider === index ? 'active' : ''
                                        } flex-1 border-t-[2px] border-solid border-white02 pt-[0.5vw] relative before:h-[2px] before:w-0 before:bg-white before:absolute before:-top-[2px] before:left-0 transition-all duration-[5s] cursor-pointer`}
                                    ></li>
                                ))}
                        </ul>
                    </div>
                )}
                <div className='flex flex-col items-center max-md:w-[77.8vw]'>
                    <h2 className='capitalize title60 title-tl42 title-mb30-800-130 max-md:-tracking-[0.9px] text-white'>
                        Nổi bật theo khu vực
                    </h2>
                    <span className='mt-[0.75vw] max-md:mt-[2.13vw] mb-[1.5vw] max-lg:mt-[1.75vw] max-lg:max-lg:mb-[2.5vw] max-md:mb-[6.4vw] w-[21.5vw] max-md:w-full max-lg:w-[34.5vw] text-24pc max-lg:text-20tl font-normal leading-[1.3] block text-center max-md:text-20mb'>
                        Căn hộ Vinhomes Grand Park hướng Bắc
                    </span>
                    <Button
                        href='/'
                        className='text-white border-white'
                        stroke='white'
                    >
                        Chi tiết dự án
                    </Button>
                </div>
                {!isMobile && (
                    <ul className='flex gap-x-[1.5vw] w-full max-md:hidden'>
                        {arrArea &&
                            arrArea?.map((e, index) => (
                                <li
                                    onClick={() => handleSlideClick(index)}
                                    key={index}
                                    className={`${
                                        indexSlider === index ? 'active' : ''
                                    } flex-1 border-t-[2px] border-solid border-white02 pt-[0.5vw] relative before:h-[2px] before:w-0 before:bg-white before:absolute before:-top-[2px] before:left-0 transition-all duration-[5s] max-lg:text-center cursor-pointer title16-600-160 title-tl16-600-160 max-lg:pt-[1.5vw]`}
                                >
                                    {e}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
