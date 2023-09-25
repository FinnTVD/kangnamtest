'use client'

import 'swiper/css/effect-fade'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

const arrBanner = [
    { id: 1, src: '/images/bg-header.jpg', alt: 'bg header' },
    { id: 2, src: '/images/bg-header1.jfif', alt: 'bg-header1' },
    { id: 3, src: '/images/bg-header2.jfif', alt: 'bg-header2' },
]
export default function SlideBanner({ data }) {
    return (
        <>
            <Swiper
                data-aos='zoom-out'
                // data-aos-delay='500'
                data-aos-duration='1500'
                slidesPerView={1}
                loop={true}
                effect={'fade'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                modules={[EffectFade, Autoplay]}
                className='absolute top-0 left-0 z-0 w-full h-full mySwiper'
            >
                {data?.slideBanner?.map((e, index) => (
                    <SwiperSlide key={index}>
                        <div className='relative w-full h-full'>
                            <Image
                                className='object-cover'
                                src={e || arrBanner[index]?.src}
                                alt={arrBanner[index]}
                                sizes='(max-width: 767px) 35vw, (max-width: 1280px) 70vw, 100vw'
                                fill
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
