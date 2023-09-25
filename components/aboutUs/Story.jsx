'use client'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

export default function Story({ t }) {
    const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' })
    const description =
        'Ra đời chính thức từ năm 2018, Kangnam là công ty công nghệ đầu tiên ở Đông Nam Á trong lĩnh vực môi giới bất động sản. Tại Kangnam, chúng tôi sử dụng công nghệ giúp quá trình mua bán được dễ dàng hơn và xây dựng lòng tin cho khách hàng thông qua việc cung cấp các công cụ so sánh giá bằng cách sử dụng hệ thống phân tích dữ liệu thị trường, theo dõi danh sách tài sản đang niêm yết, kết hợp với công nghệ truyền thông tương tác, quản lý giao dịch trực tuyến để mang lại giá trị tốt nhất cho người mua và người bán nhà. Đồng thời, Kangnam còn trang bị cho các môi giới hệ thống quản lý khách hàng (Smart CRM) và cơ sở dữ liệu, nhằm mục đích trở thành điểm đến cho mọi nhu cầu liên quan đến chỗ ở.'
    return (
        <section className='relative flex justify-between items-center px-120 pt-[1.25vw] pb-[6.125vw] px-mb10 max-lg:flex-col max-md:items-start max-md:pt-[10.6vw] max-md:pb-[15.2vw] max-lg:pt-[5vw]'>
            <div className='flex-col w-[41.625vw] max-lg:w-full'>
                <div>
                    <span
                        data-aos='fade-up'
                        className='sub-title max-md:title-mb12-700-150 max-lg:title-tl12'
                    >
                        {t.aboutUsStory.subtitle}
                    </span>
                    <h2
                        data-aos='fade-up'
                        data-aos-delay='300'
                        className='title56 text-den mt-[0.125vw] max-md:title-mb25-700-130 max-md:mt-[1.1vw] max-lg:title-tl38'
                    >
                        {t.aboutUsStory.title}
                    </h2>
                </div>
                <span
                    data-aos='fade-up'
                    data-aos-delay='600'
                    className='mt-[1vw] text-den title16-400-150 inline-block max-md:title-mb14-400-150 max-md:mt-[2.6vw] max-lg:title-tl16'
                >
                    {description}
                </span>
            </div>
            <div
                data-aos={!isMobile ? 'fade-left' : 'fade-up'}
                className='relative w-[32.125vw] h-[30.6875vw] max-md:w-full max-md:h-[86.9vw] max-md:mt-[9.3vw] max-lg:w-[55vw] max-lg:h-[50vw]'
            >
                <Image
                    fill
                    src='/images/about-us-logo.svg'
                    className='object-contain'
                    alt='about-us-logo'
                ></Image>
            </div>
            <Image
                fill
                src='/images/partner-bg.jpg'
                className={
                    !isMobile
                        ? 'top-0 left-0 z-[-2] opacity-20 object-cover'
                        : 'top-0 left-0 z-[-2] opacity-10 object-cover'
                }
                alt='partner-background'
            ></Image>
            <div
                className={
                    !isMobile
                        ? 'bg-opacity-20 z-[-1] absolute top-0 left-0 w-full h-full'
                        : 'bg-opacity-10 z-[-1] absolute top-0 left-0 w-full h-full'
                }
                style={{ background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 53.44%, #FFF 100%)' }}
            ></div>
        </section>
    )
}
