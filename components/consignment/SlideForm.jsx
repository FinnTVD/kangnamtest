'use client'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import { useMediaQuery } from 'react-responsive'

export default function SlideForm({ t }) {
    const [indexSlider, setIndexSlider] = useState(0)
    const swiperRef = useRef()
    const isMobile = useMediaQuery({
        query: '(max-width: 767.9px)',
    })
    const isTablet = useMediaQuery({
        query: '(max-width: 1023px)',
    })

    const handleNextSlide = () => {
        swiperRef.current?.slideNext()
    }

    const handlePrevSlide = () => {
        swiperRef.current?.slidePrev()
    }

    const handleSlideChange = (swiper) => {
        setIndexSlider(swiper.realIndex)
    }

    return (
        <>
            <Swiper
                // direction={'vertical'}
                // slidesPerView={1}
                // spaceBetween={60}
                breakpoints={{
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    768: {
                        direction: 'vertical',
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                }}
                onSlideChange={handleSlideChange}
                speed={1000}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                }}
                allowTouchMove={false}
                className='w-full h-full max-md:h-fit'
            >
                <SwiperSlide className='!h-full max-md:!h-fit'>
                    <Form1
                        handleNextSlide={handleNextSlide}
                        t={t}
                        isMobile={isMobile}
                    />
                </SwiperSlide>
                <SwiperSlide className='!h-full max-md:!h-fit overflow-y-scroll'>
                    <Form2
                        handleNextSlide={handleNextSlide}
                        handlePrevSlide={handlePrevSlide}
                        isMobile={isMobile}
                    />
                </SwiperSlide>
                <SwiperSlide className='!h-full overflow-y-scroll !pb-[10vw] max-md:!h-fit'>
                    <Form3
                        handleNextSlide={handleNextSlide}
                        handlePrevSlide={handlePrevSlide}
                        isMobile={isMobile}
                    />
                </SwiperSlide>
            </Swiper>

            {!isTablet && (
                <div className='fixed top-[19vw] z-50 -translate-y-full left-[43.5625vw] bg-[rgba(214,162,121,0.1)] w-[48.5625vw] h-[0.25vw]'>
                    <div className='relative'>
                        <div
                            className={`${
                                indexSlider === 1 ? 'w-2/3' : indexSlider === 2 ? 'w-full' : 'w-1/3'
                            } absolute left-0 h-[0.375vw] -translate-y-1/2 opacity-100 bg-logo top-1/2 transition-all duration-[0.8s] ease-linear rounded-t-full`}
                        ></div>
                        <span className='text-nu title16-400-150 block absolute -top-[0.69vw] right-0 -translate-y-full'>
                            Hoàn thành {indexSlider + 1}/3
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
