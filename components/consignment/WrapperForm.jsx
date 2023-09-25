import Image from 'next/image'
import SlideForm from './SlideForm'
import src from '../../public/images/bg-dang-tin.jpg'

export default function WrapperForm({ t }) {
    return (
        <section className='flex w-full h-screen md:overflow-hidden max-lg:flex-col max-lg:h-fit'>
            <aside className='h-[calc(100vh-5.8vw)] w-[42.0625vw] max-lg:w-full max-md:!h-[126.3vw] md:fixed max-lg:!relative z-50 md:top-[5.8vw] md:left-0 max-md:mt-[18vw] max-lg:h-[55.8vw]'>
                cx
                <Image
                    className='z-0 object-cover max-md:!h-[126.3vw]'
                    src={src}
                    alt='dang tin'
                    fill
                    sizes='42vw'
                    placeholder='blur'
                    priority
                />
                <div className='absolute left-0 z-10 w-full -translate-y-1/2 top-1/2'>
                    <div className='px-[4.75vw] relative z-10 max-md:px-[2.67vw]'>
                        <h1 className='title32-700-125 -tracking-[1.6px] text-white text-center mb-[2.5vw] max-md:title-mb20-700-111 max-md:-tracking-[1px] max-md:px-[3.86vw] max-md:mb-[7.64vw] max-lg:title-tl20'>
                            Bán và cho thuê nhà đất nhanh chóng, dễ dàng cùng Kangnam
                        </h1>
                        <span className='text-white title16-600-150 -tracking-[0.8px] max-md:title-mb12-600-150 max-md:-tracking-[0.6px] max-lg:title-tl12'>
                            Cam kết với khách hàng
                        </span>
                        <ul className='flex flex-col gap-y-[0.75vw] max-md:gap-y-[1.78vw] mt-[1vw] max-md:mt-[2.38vw]'>
                            <li className='flex gap-x-[0.75vw] items-center max-md:gap-x-[1.78vw]'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='w-[1.5vw] h-[1.5vw] max-md:w-[3.56vw] max-md:h-[3.56vw] max-lg:w-[3.5vw] max-lg:h-[3.5vw]'
                                >
                                    <path
                                        d='M9 12L11 14L15 10'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M11.9999 3C14.3357 5.06658 17.3844 6.14257 20.4999 6C20.9535 7.54302 21.0923 9.16147 20.908 10.7592C20.7237 12.3569 20.2202 13.9013 19.4273 15.3005C18.6344 16.6998 17.5683 17.9254 16.2923 18.9045C15.0164 19.8836 13.5567 20.5962 11.9999 21C10.4431 20.5962 8.98331 19.8836 7.70737 18.9045C6.43144 17.9254 5.36534 16.6998 4.57242 15.3005C3.77951 13.9013 3.27596 12.3569 3.0917 10.7592C2.90745 9.16147 3.04624 7.54302 3.49983 6C6.61536 6.14257 9.66401 5.06658 11.9999 3Z'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span className='text-white title16-400-125 -tracking-[0.8px] w-[24.5vw] max-lg:w-[78.4vw] max-md:title-mb12-400-150 max-md:-tracking-[0.6px] max-lg:title-tl12'>
                                    Đặt khách hàng làm trọng tâm trong mọi quyết định
                                </span>
                            </li>
                            <li className='flex gap-x-[0.75vw] items-center max-md:gap-x-[1.78vw]'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='w-[1.5vw] h-[1.5vw] max-md:w-[3.56vw] max-md:h-[3.56vw] max-lg:w-[3.5vw] max-lg:h-[3.5vw]'
                                >
                                    <path
                                        d='M9 12L11 14L15 10'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M11.9999 3C14.3357 5.06658 17.3844 6.14257 20.4999 6C20.9535 7.54302 21.0923 9.16147 20.908 10.7592C20.7237 12.3569 20.2202 13.9013 19.4273 15.3005C18.6344 16.6998 17.5683 17.9254 16.2923 18.9045C15.0164 19.8836 13.5567 20.5962 11.9999 21C10.4431 20.5962 8.98331 19.8836 7.70737 18.9045C6.43144 17.9254 5.36534 16.6998 4.57242 15.3005C3.77951 13.9013 3.27596 12.3569 3.0917 10.7592C2.90745 9.16147 3.04624 7.54302 3.49983 6C6.61536 6.14257 9.66401 5.06658 11.9999 3Z'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span className='text-white title16-400-125 -tracking-[0.8px] w-[24.5vw] max-lg:w-[78.4vw] max-md:title-mb12-400-150 max-md:-tracking-[0.6px] max-lg:title-tl12'>
                                    Những điều đã nói là những điều được làm
                                </span>
                            </li>
                            <li className='flex gap-x-[0.75vw] items-center max-md:gap-x-[1.78vw]'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='w-[1.5vw] h-[1.5vw] max-md:w-[3.56vw] max-md:h-[3.56vw] max-lg:w-[3.5vw] max-lg:h-[3.5vw]'
                                >
                                    <path
                                        d='M9 12L11 14L15 10'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M11.9999 3C14.3357 5.06658 17.3844 6.14257 20.4999 6C20.9535 7.54302 21.0923 9.16147 20.908 10.7592C20.7237 12.3569 20.2202 13.9013 19.4273 15.3005C18.6344 16.6998 17.5683 17.9254 16.2923 18.9045C15.0164 19.8836 13.5567 20.5962 11.9999 21C10.4431 20.5962 8.98331 19.8836 7.70737 18.9045C6.43144 17.9254 5.36534 16.6998 4.57242 15.3005C3.77951 13.9013 3.27596 12.3569 3.0917 10.7592C2.90745 9.16147 3.04624 7.54302 3.49983 6C6.61536 6.14257 9.66401 5.06658 11.9999 3Z'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span className='text-white title16-400-125 -tracking-[0.8px] w-[24.5vw] max-lg:w-[78.4vw] max-md:title-mb12-400-150 max-md:-tracking-[0.6px] max-lg:title-tl12'>
                                    Đảm bảo thực thi (Miễn phí các dịch vụ cao cấp nếu không bán được nhà)
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className='pl-[4.5vw] pr-[2.31vw] relative z-10 mt-[2.19vw] max-md:mt-[4.46vw]'>
                        <span className='text-white title16-600-150 max-md:title-mb12-600-150 max-lg:title-tl12'>
                            Miễn phí các dịch vụ bổ sung
                        </span>
                        <div className='mt-[1vw] max-md:mt-[1.87vw] flex justify-between'>
                            <div className='flex gap-x-[0.75vw] max-md:gap-x-[2.21vw] w-full'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='max-md:w-[3.56vw] max-md:h-[3.56vw] max-md:mt-[1w] max-lg:w-[3.5vw] max-lg:h-[3.5vw]'
                                >
                                    <path
                                        d='M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M12 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5C9 5.53043 8.78929 6.03914 8.41421 6.41421C8.03914 6.78929 7.53043 7 7 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V11'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M15 6H21'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M18 3V9'
                                        stroke='white'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <div className='w-full'>
                                    <div className='flex justify-between w-full'>
                                        <span className='text-white title16-400-125 -tracking-[0.8px] max-md:title-mb12-600-150 max-md:-tracking-[0.6px] max-lg:title-tl12'>
                                            Dịch vụ chụp ảnh chuyên nghiệp
                                        </span>
                                        <div className='flex gap-x-[1.69vw] items-center max-md:gap-x-[4vw]'>
                                            <span className='text-white title16-600-125 max-md:title-mb12-600-150 max-lg:title-tl12'>
                                                Tìm hiểu thêm
                                            </span>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                fill='none'
                                                className='max-md:w-[2.38vw] max-md:h-[3.38vw] max-lg:w-[3vw] max-lg:h-auto'
                                            >
                                                <path
                                                    d='M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z'
                                                    stroke='white'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M10.6666 7.99992L8 5.33325'
                                                    stroke='white'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M10.6673 8H5.33398'
                                                    stroke='white'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M8 10.6667L10.6666 8'
                                                    stroke='white'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <p className='mt-[0.25vw] text-white opacity-75 title16-400-125 max-md:title-mb12-400-150 max-md:-tracking-[0.6px] -tracking-[0.8px] max-lg:title-tl12'>
                                            Hình ảnh chất lượng cao, chuyên nghiệp
                                        </p>
                                        <p className='mt-[0.25vw] text-white opacity-75 title16-400-125 max-md:title-mb12-400-150 max-md:-tracking-[0.6px] -tracking-[0.8px] max-lg:title-tl12'>
                                            Tiết kiệm đến 1.000.000 đồng so với thị trường
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div className='h-full w-[42.0625vw] relative max-md:hidden'></div>
            <div className='fixed z-50 md:top-[5.8vw] md:left-[42.0625vw] w-[calc(100vw-42.0625vw)] h-fit overflow-hidden pr-[7.5vw] pl-[1.5vw] pt-[3.75vw] max-md:pt-[16.05vw] flex flex-col justify-between bg-white max-lg:relative max-md:w-full max-md:px-[2.67vw] max-lg:!left-0 max-lg:w-full max-lg:px-[3.2vw]'>
                <div>
                    <h2 className='title32-800-130 text-den -tracking-[1.6px] max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                        Ký gửi nhà đất với Kangnam
                    </h2>
                    <p className='text-den title16-400-150 mb-[3.4vw] mt-[0.5vw] max-md:hidden max-lg:title-tl16'>
                        Do hạn chế về khu vực hoạt động của các sàn giao dịch, KangNam xin phép chỉ tiếp nhận nhà đất ký
                        gửi từ khu vực A và B.
                    </p>
                </div>
            </div>
            <div className='flex-1 h-full md:overflow-hidden max-md:h-fit pl-[1.5vw] max-md:px-[2.67vw] mt-[19vw] max-md:mt-[4.27vw] flex flex-col justify-between max-lg:mt-[5vw]'>
                <div className='w-full h-[calc(100vh-13.19vw)] max-md:!h-fit relative max-lg:h-[calc(50vh-13.19vw)]'>
                    <SlideForm t={t} />
                </div>
            </div>
        </section>
    )
}
