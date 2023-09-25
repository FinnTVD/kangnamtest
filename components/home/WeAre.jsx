import { handleCheckParamsLanguage } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import src from '../../public/images/linear.png'

export default function WeAre({ lang }) {
    return (
        <>
            <section
                id='weAre'
                className='relative w-full h-screen bg-den-2 overflow-hidden'
            >
                <Image
                    className='z-0 object-cover'
                    src='/images/bg-we.png'
                    alt='bg-we'
                    sizes='100vw'
                    fill
                />
                <div className='relative z-10 flex justify-between h-full max-lg:flex-col'>
                    <div className='flex items-center pl-[7.5vw] px-mb10 max-lg:px-[3.2vw] max-md:pt-[13.33vw] max-lg:pt-[6vw]'>
                        <div data-aos="fade-right" data-aos-duration="1000" className='w-[40.2vw] h-fit max-lg:w-full'>
                            <span className='sub-title max-lg:tracking-[0.5px] max-lg:uppercase title-mb10-700-150 title-tl12-700-150'>
                                Câu chuyện thương hiệu
                            </span>
                            <h2 className='text-vang-nhe mt-[0.12vw] mb-[1vw] max-lg:mt-[1.07vw] max-lg:mb-[2.27vw] max-md:mb-[4.27vw] -tracking-[1.12px] title56 title-tl38 title-mb25-700-130 max-lg:-tracking-[1.25px]'>
                                Chúng tôi là ai
                            </h2>
                            <p className='text-vang-nhe title16-400-150 title-tl16-400-150 title-mb14-400-150 w-[38vw] max-lg:w-full'>
                                Công ty Cổ phần bất động sản Kangnam là đơn vị môi giới bất động sản chuyên nghiệp,
                                chuyên phân phối đa dạng các phân khúc bất động sản trải dài khắp miền Bắc và miền Trung
                                với đội ngũ chuyên viên môi giới giày dạn kinh nghiệm được đào tạo bài bản
                            </p>
                            <ul className='flex my-[2.5vw] max-md:mt-[6.4vw] max-md:mb-[8.8vw] max-lg:mt-[3.4vw] max-lg:mb-[4.8vw] max-md:justify-between'>
                                <li className='flex flex-col items-center gap-y-[1vw] max-lg:gap-y-[2.93vw] max-lg:text-center max-md:w-[18.67vw] max-lg:w-fit'>
                                    <Image
                                        src='/images/check.svg'
                                        alt='check'
                                        width={100}
                                        height={100}
                                        className='w-[4.375vw] h-[4.375vw] max-lg:w-[7vw] max-lg:h-[7vw] max-md:w-[10.67vw] max-md:h-[10.67vw] object-cover'
                                    />
                                    <span className='text-vang-nhe title18-600-130 title-tl14-600-130 title-mb12-600-130'>
                                        Cam kết xác thực
                                    </span>
                                </li>
                                <li className='flex flex-col items-center gap-y-[1vw] max-lg:gap-y-[2.93vw] max-lg:text-center ml-[3.75vw] mr-[3.12vw] max-md:w-[25.067vw] max-lg:w-fit'>
                                    <Image
                                        src='/images/pig.svg'
                                        alt='pig'
                                        width={100}
                                        height={100}
                                        className='w-[4.375vw] h-[4.375vw] max-lg:w-[7vw] max-lg:h-[7vw] max-md:w-[10.67vw] max-md:h-[10.67vw] object-cover'
                                    />
                                    <span className='text-vang-nhe title18-600-130 title-tl14-600-130 title-mb12-600-130'>
                                        Trọn hỗ trợ, chi phí thấp
                                    </span>
                                </li>
                                <li className='flex flex-col items-center gap-y-[1vw] max-lg:gap-y-[2.93vw] max-lg:text-center max-md:w-[20vw] max-lg:w-fit'>
                                    <Image
                                        src='/images/watch.svg'
                                        alt='watch'
                                        width={100}
                                        height={100}
                                        className='w-[4.375vw] h-[4.375vw] max-lg:w-[7vw] max-lg:h-[7vw] max-md:w-[10.67vw] max-md:h-[10.67vw] object-cover'
                                    />
                                    <span className='text-vang-nhe title18-600-130 title-tl14-600-130 title-mb12-600-130'>
                                        Thủ tục nhanh chóng
                                    </span>
                                </li>
                            </ul>
                            <div className='flex gap-x-[1.5vw] max-lg:gap-x-[2.67vw] relative z-[99999]'>
                                <Link
                                    href={handleCheckParamsLanguage(lang, '/projects')}
                                    className='flex justify-center items-center gap-x-[0.5vw] max-lg:gap-x-[1vw] max-md:gap-x-[2.13vw] rounded-[10vw] py-[1vw] px-[2.06vw] max-md:py-[4vw] max-lg:py-[2vw] max-lg:px-[4.41vw] title-tl14-400-150 bg-transparent text-logo border border-solid border-logo title16-400-150 hover:shadow-viewProject max-md:px-[8.41vw] max-md:box-content title-mb14-400-150 h-fit'
                                >
                                    Xem dự án
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='8'
                                        height='14'
                                        viewBox='0 0 8 14'
                                        fill='none'
                                        className=''
                                    >
                                        <path
                                            d='M1 1L7 7L1 13'
                                            stroke='#D6A279'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    href={handleCheckParamsLanguage(lang, '/about-us')}
                                    className='flex justify-center gap-x-[0.5vw] max-lg:gap-x-[1vw] items-center group relative rounded-[10vw] text-white py-[1vw] px-[2.06vw] bg-logo title16-400-150 overflow-hidden title-mb14-400-150 max-lg:py-[2vw] max-lg:px-[4.67vw] title-tl14-400-150 max-md:py-[4vw] max-md:px-[6.67vw] max-md:box-content max-md:gap-x-[3.2vw] h-fit'
                                >
                                    Về chúng tôi
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='8'
                                        height='14'
                                        viewBox='0 0 8 14'
                                        fill='none'
                                    >
                                        <path
                                            d='M1 1L7 7L1 13'
                                            stroke='white'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='28'
                                        height='36'
                                        viewBox='0 0 28 36'
                                        fill='none'
                                        stroke='white'
                                        className='absolute transition-all ease-linear duration-200 -bottom-[20%] opacity-0 left-0 w-[3vw] h-[3vw] translate-y-1/2 group-hover:translate-y-0 group-hover:opacity-50'
                                    >
                                        <path
                                            d='M22.9201 14.1638V9.30395L18.866 6.677H18.9378V3.19984L14.0003 0L9.06277 3.19984V6.677H9.13459L5.08055 9.30395V14.1638L0 17.4559V35.9983L7.47348 35.9994V35.2603V34.5211V26.3498L9.91903 27.9346V35.9994H12.6983V13.5459L9.91903 15.3477V26.122L7.62331 24.634L7.47348 24.5372V16.932L4.69422 18.7338V24.5503L5.99253 25.3914L4.69422 25.9939V34.5217H1.62273V18.2184L6.68966 14.9348H6.70328V14.9257L13.9997 10.1974L21.2961 14.9257V14.9348H21.3097L26.3766 18.2184V34.5211H23.3052V25.9939L22.0069 25.3914L23.3052 24.5503V18.7338L20.5259 16.932V24.5372L20.3761 24.634L18.0804 26.122V15.3477L15.3011 13.5459V36H18.0804V27.9352L20.5259 26.3504V34.5217V35.9994L28 35.9983V17.4559L22.9194 14.1632L22.9201 14.1638ZM10.6861 3.96178L14.0003 1.81432L17.3145 3.96178V5.67189L14.0003 3.52386L10.6861 5.67189V3.96178ZM14.0003 8.38369L6.7039 13.112V10.0659L14.0003 5.33762L21.2967 10.0659V13.112L14.0003 8.38369Z'
                                            fill='#D6A279'
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-end'>
                        <div className='h-[77.5vh] max-lg:h-[59.8vh] max-md:h-[38.8vh] w-[48.1875vw] max-lg:w-full relative z-10'>
                            <Image
                                data-aos="fade-up"
                                data-aos-delay="600"
                                src='/images/house.png'
                                alt='house'
                                className='object-fill z-[2]'
                                sizes='48.1875vw'
                                fill
                            />
                            <Image
                                data-aos="fade-down"
                                data-aos-delay="600"
                                src='/images/circle-house.png'
                                alt='circle'
                                className='object-cover w-[35.5vw] h-[35.5vw] max-lg:w-[44.6vw] max-md:w-[63.6vw] max-lg:h-[44.6vw] max-md:h-[63.6vw] absolute -top-[3.81vw] max-lg:top-[4.49vw] max-md:-top-[13.51vw] left-[2.69vw] z-[1] max-lg:left-[38.46vw] max-md:left-[23.46vw]'
                                width={600}
                                height={600}
                            />
                            <Image
                                data-aos="fade"
                                data-aos-duration='500'
                                data-aos-delay="1000"
                                src='/images/people.png'
                                alt='people'
                                className='object-cover w-[33.875vw] h-[38.5625vw] max-lg:w-[47.62vw] max-md:w-[62.62vw] max-lg:h-[53.29vw] max-md:h-[71.29vw] absolute bottom-0 left-[5.68vw] z-[3] max-lg:left-[37%] max-md:left-1/2 max-md:-translate-x-1/2'
                                width={600}
                                height={600}
                            />
                        </div>
                    </div>
                </div>
                <Image
                className='absolute top-0 left-0 object-cover z-[3] !h-[200vh] w-screen max-lg:!h-[164vh]'
                src={src}
                alt='linear'
                priority
                />
            </section>
        </>
    )
}
