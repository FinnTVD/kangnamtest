'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
const arrProject = new Array(6).fill(0)
export default function SlideRelatedNews() {
    return (
        <>
            <Swiper
                loop={true}
                slidesPerView={3}
                spaceBetween={26}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={500}
                modules={[Autoplay]}
            >
                {arrProject &&
                    arrProject.map((e, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-full bg-white h-fit pt-[1.5vw] px-[1.47vw] pb-[1.47vw] rounded-[1vw] shadow-input'>
                                <div className='w-full h-[16.23vw] relative rounded-[0.5vw] overflow-hidden'>
                                    <Image
                                        className='object-cover '
                                        src='/images/itemproject.jpg'
                                        alt='itemProject'
                                        sizes='33vw'
                                        fill
                                    />
                                </div>
                                <div className='mt-[1.02vw]'>
                                    <span className='block rounded-[6.25vw] bg-duan text-nau-nhat py-[0.31vw] px-[1.13vw] w-fit h-fit title12-400-150'>
                                        Dự án
                                    </span>
                                    <h6 className='font-bold my-[0.25vw] text-den-2 line-clamp-2 text-20pc leading-[1.35] capitalize'>
                                        Không gian sống tinh tế ở căn hộ 4 phòng ngủ Thu Thiem Zeit River
                                    </h6>
                                    <p className='text-den-2 line-clamp-2 leading-[1.6] title14-400-150'>
                                        Đáp ứng tiêu chí an cư cao cấp của những gia đình đa thế hệ, dự án Thu Thiem
                                        Zeit River mang tới dòng sản phẩm căn hộ 4 phòng ngủ được bố trí thông minh, tối
                                        ưu công năng cùng hệ thống nội thất tiện nghi, đẳng cấp
                                    </p>
                                    <div className='flex gap-x-[0.38vw] mt-[0.5vw]'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='21'
                                            height='21'
                                            viewBox='0 0 21 21'
                                            fill='none'
                                            className='w-[1.3125vw] h-[1.3125vw]'
                                        >
                                            <g opacity='0.7'>
                                                <path
                                                    d='M7.00146 1.75037V4.37537'
                                                    stroke='#656263'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M13.9985 1.75037V4.37537'
                                                    stroke='#656263'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M3.06396 7.95422H17.939'
                                                    stroke='#656263'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M18.375 7.43787V14.8754C18.375 17.5004 17.0625 19.2504 14 19.2504H7C3.9375 19.2504 2.625 17.5004 2.625 14.8754V7.43787C2.625 4.81287 3.9375 3.06287 7 3.06287H14C17.0625 3.06287 18.375 4.81287 18.375 7.43787Z'
                                                    stroke='#656263'
                                                    strokeMiterlimit='10'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M13.732 11.9873H13.7399'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M13.732 14.6123H13.7399'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M10.4949 11.9873H10.5028'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M10.4949 14.6123H10.5028'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M7.25667 11.9873H7.26453'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M7.25667 14.6123H7.26453'
                                                    stroke='#656263'
                                                    strokeWidth='1.5'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </g>
                                        </svg>
                                        <span className='opacity-70 text-[#656263] title14-400-150'>
                                            21/07/2023 - 11:23
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    )
}
