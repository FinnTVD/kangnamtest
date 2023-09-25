'use client'

import { handleListPhone } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { handleCheckLangCode } from '@/utils'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Footer({ lang, t, dataInfo }) {
    const pathName = usePathname()
    const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' })
    const addr = 'Villa e11, The Manor, KĐT mới Mỹ Đình - Mễ Trì, Nam từ Liêm, Hà Nội'
    const phoneArr = ['0637 858 974', '0337 858 892', '0837 858 357']
    const menuArr = t.footerNav
    const serviceArr = ['Dự án mới', 'Thiết kế nhà đẹp', 'Ký gửi bất động sản']
    const copyright = '© 2023 Copyright. Powered by OKHUB Viet Nam'
    const languageCode = handleCheckLangCode(lang)
    const {
        data: agreementData,
        error: errorNews,
        isLoading: isLoading,
    } = useSWR(
        process.env.NEXT_PUBLIC_API + `/post?page=1&take=12&postTypeIds[]=95438eda-0e44-439c-96fd-343301f8b3f0`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )
    let agreementDataTranslation = []
    if (agreementData) {
        agreementData.data.forEach((item) => {
            item.translations.forEach((itm) => {
                if (itm.languageCode === languageCode)
                    agreementDataTranslation.push({ title: itm.title, slug: itm.slug })
            })
        })
    }

    const linkTalk = () => {
        window.open(dataInfo?.kakaotalk)
    }
    const linkWeChat = () => {
        window.open(dataInfo?.kakaotalk)
    }
    const linkZalo = () => {
        window.open(dataInfo?.zalo)
    }
    const linkTelegram = () => {
        window.open(dataInfo?.telegram)
    }
    const linkSkype = () => {
        window.open(dataInfo?.skype)
    }
    const linkLinkedIn = () => {
        window.open(dataInfo?.linkedIn)
    }

    if (!isMobile && pathName.includes('/deposit')) {
        return
    }

    return (
        //relative z-[999]
        <footer className='bg-[#FBF7F2] '>
            <div className='py-[5vw] px-[7.5625vw] flex max-md:flex-col px-mb10 max-md:pt-[16vw] max-md:pb-[0] max-lg:flex-col max-lg:px-120'>
                <div>
                    <div className='relative w-[24.0625vw] h-[6.625vw] max-md:w-[87.7vw] max-md:h-[25.6vw] max-lg:w-[70vw] max-lg:h-[20vw]'>
                        <Image
                            fill
                            src='/images/logoKangnam.svg'
                            alt='logo-kangnam'
                            className='top-0 left-0 object-contain'
                        ></Image>
                    </div>
                    <div className='flex mt-[2.5vw] max-lg:w-full max-md:mt-[4.2vw]'>
                        <div
                            onClick={linkTalk}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='21'
                                height='21'
                                viewBox='0 0 21 21'
                                fill='none'
                                className='w-1.3125vw h-auto max-md:w-[5.6vw] max-lg:w-[3.5vw]'
                            >
                                <g clipPath='url(#clip0_1280_454)'>
                                    <path
                                        className='transition-all duration-300 group-hover:fill-white'
                                        d='M10.5004 0C4.66674 0 1.15011 3.59625 0.254989 7.16012C-0.674261 10.8561 0.948864 14.3973 4.50311 16.513C3.71299 19.3795 3.23436 20.342 3.98949 20.8574C4.83649 21.4366 6.05624 20.2388 8.09411 18.6751L8.93149 18.0338C12.2119 18.459 15.5535 17.5149 17.9195 15.4849C19.9057 13.7804 20.9995 11.501 20.9995 9.06763C21.0004 4.067 16.2902 0 10.5004 0ZM17.0664 14.4883C14.9191 16.331 11.847 17.1561 8.85186 16.6968C8.43274 16.6294 6.58386 18.2481 5.07886 19.2964C5.24861 18.6532 5.58111 17.5709 5.90399 16.3625C5.94238 16.2197 5.93128 16.0681 5.87249 15.9324C5.8137 15.7967 5.71069 15.6849 5.58024 15.6153C1.61911 13.4881 0.888489 10.0188 1.52636 7.48037C2.29986 4.41087 5.37374 1.3125 10.5004 1.3125C15.5666 1.3125 19.6879 4.7915 19.6879 9.06675C19.6879 11.1125 18.7569 13.0375 17.0664 14.4883Z'
                                        fill='#926B4F'
                                    />
                                    <path
                                        className='transition-all duration-300 group-hover:fill-white'
                                        d='M5.68777 6.78141H3.06277C2.19477 6.78141 2.19389 8.09391 3.06277 8.09391H3.71902V11.8127C3.71902 12.6807 5.03152 12.6815 5.03152 11.8127V8.09391H5.68777C6.55577 8.09391 6.55664 6.78141 5.68777 6.78141ZM8.92177 7.19441L8.91739 7.18828C8.70214 6.66766 7.93214 6.64316 7.70727 7.18828L7.70377 7.19441L5.95377 11.5694C5.92175 11.6494 5.90582 11.735 5.90687 11.8212C5.90793 11.9074 5.92595 11.9925 5.95991 12.0717C5.99388 12.151 6.04312 12.2227 6.10482 12.2829C6.16652 12.3431 6.23948 12.3905 6.31952 12.4225C7.15777 12.7603 7.30739 11.5729 7.53227 11.1573H9.09414L9.45377 12.0568C9.77489 12.8618 10.9973 12.3779 10.6726 11.5694L8.92177 7.19441ZM8.05727 9.84391L8.31277 9.20428L8.56827 9.84391H8.05727ZM13.5628 11.1564H12.469V7.43766C12.469 6.56966 11.1565 6.56878 11.1565 7.43766V11.8127C11.1565 12.1749 11.4505 12.4689 11.8128 12.4689H13.5628C14.4308 12.4689 14.4316 11.1564 13.5628 11.1564ZM15.969 8.47803V7.43766C15.969 6.56966 14.6565 6.56878 14.6565 7.43766V11.8127C14.6565 12.6807 15.969 12.6815 15.969 11.8127V10.5273C17.3734 12.055 17.4189 12.4689 17.9378 12.4689C18.489 12.4689 18.8049 11.8153 18.4356 11.3848L16.8108 9.49216L18.4059 7.89703L18.412 7.89003L18.4146 7.88741C19.0105 7.26966 18.0883 6.35878 17.4784 6.96866L15.969 8.47803Z'
                                        fill='#926B4F'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_1280_454'>
                                        <rect
                                            width='21'
                                            height='21'
                                            fill='white'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div
                            onClick={linkWeChat}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center ml-[1vw] max-md:ml-[4.2vw] max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='26'
                                height='26'
                                viewBox='0 0 26 26'
                                fill='none'
                                className='w-[1.625vw] h-auto max-md:w-[6.93vw] max-lg:w-[3.8vw]'
                            >
                                <path
                                    className='transition-all duration-300 group-hover:fill-white'
                                    d='M9.75 1.625C4.37288 1.625 0 5.26988 0 9.75C0 12.1176 1.209 14.3146 3.34262 15.8746L2.52362 17.5126C2.37087 17.8165 2.4245 18.1854 2.6585 18.4324C2.73453 18.5129 2.8262 18.5771 2.92792 18.621C3.02963 18.6649 3.13923 18.6875 3.25 18.6875C3.35725 18.6875 3.46613 18.6664 3.57013 18.6225L6.44312 17.3924C7.79025 17.8003 9.22675 17.9237 10.6681 17.8409C11.1166 17.8181 11.4611 17.4346 11.4368 16.9861C11.4124 16.536 10.9866 16.1687 10.582 16.2191C9.2365 16.2874 7.90075 16.1687 6.65925 15.7544C6.47075 15.6926 6.266 15.7024 6.08238 15.7788L4.96925 16.2565L5.1155 15.9624C5.30237 15.5886 5.174 15.132 4.81812 14.911C2.7885 13.6435 1.625 11.7634 1.625 9.75C1.625 6.16525 5.26988 3.25 9.75 3.25C14.2301 3.25 17.875 6.16525 17.875 9.75C17.875 9.99375 17.8636 10.2229 17.823 10.452C17.7434 10.894 18.0391 11.3165 18.4795 11.3945C18.928 11.4774 19.3424 11.18 19.422 10.738C19.4789 10.4146 19.5 10.0913 19.5 9.75C19.5 5.26988 15.1271 1.625 9.75 1.625Z'
                                    fill='#926B4F'
                                />
                                <path
                                    className='transition-all duration-300 group-hover:fill-white'
                                    d='M23.2456 21.1104C24.9827 19.8819 26 18.1106 26 16.25C26 12.6652 22.3551 9.75 17.875 9.75C13.3949 9.75 9.74998 12.6652 9.74998 16.25C9.74998 20.2199 14.17 23.4244 19.344 22.6379L23.2424 24.31C23.3447 24.3522 23.4552 24.375 23.5625 24.375C23.7819 24.375 23.998 24.2856 24.154 24.1182C24.3896 23.8713 24.4432 23.504 24.2905 23.1985L23.2456 21.1104ZM21.788 20.1143C21.4142 20.3288 21.2729 20.7968 21.4646 21.1819L21.8432 21.9424L19.7665 21.0503C19.6651 21.0077 19.5563 20.9856 19.4464 20.9852C19.3992 20.9852 19.3537 20.9885 19.3082 20.9966C18.8094 21.0844 18.3397 21.125 17.875 21.125C14.2902 21.125 11.375 18.9377 11.375 16.25C11.375 13.5623 14.2902 11.375 17.875 11.375C21.4597 11.375 24.375 13.5623 24.375 16.25C24.375 17.7645 23.4325 19.1734 21.788 20.1143ZM6.53248 6.5H6.51623C6.06773 6.5 5.71185 6.864 5.71185 7.3125C5.71185 7.761 6.08398 8.125 6.53248 8.125C6.98098 8.125 7.34498 7.761 7.34498 7.3125C7.34498 6.864 6.98098 6.5 6.53248 6.5ZM13.0325 6.5H13.0162C12.5677 6.5 12.2119 6.864 12.2119 7.3125C12.2119 7.761 12.584 8.125 13.0325 8.125C13.481 8.125 13.845 7.761 13.845 7.3125C13.845 6.864 13.481 6.5 13.0325 6.5Z'
                                    fill='#926B4F'
                                />
                                <path
                                    className='transition-all duration-300 group-hover:fill-white'
                                    d='M15.47 13.8125H15.4537C15.0036 13.8125 14.6494 14.1765 14.6494 14.625C14.6494 15.0735 15.0215 15.4375 15.47 15.4375C15.9185 15.4375 16.2825 15.0735 16.2825 14.625C16.2825 14.1765 15.9185 13.8125 15.47 13.8125ZM20.345 13.8125H20.3287C19.8802 13.8125 19.5244 14.1765 19.5244 14.625C19.5244 15.0735 19.8981 15.4375 20.345 15.4375C20.7935 15.4375 21.1575 15.0735 21.1575 14.625C21.1575 14.1765 20.7935 13.8125 20.345 13.8125Z'
                                    fill='#926B4F'
                                />
                            </svg>
                        </div>
                        <div
                            onClick={linkZalo}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center ml-[1vw] max-md:ml-[4.2vw] max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='29'
                                height='13'
                                viewBox='0 0 29 13'
                                fill='none'
                                className='w-[1.875vw] h-auto max-md:w-[8vw] max-lg:w-[3.5vw]'
                            >
                                <path
                                    className='transition-all duration-300 group-hover:fill-white'
                                    d='M0.855469 12V10.575L6.09047 2.99996L6.07547 2.96996H1.09547V1.34996H8.47547V2.74496L3.15047 10.335L3.18047 10.38H8.50547V12H0.855469ZM12.4736 12.12C10.4486 12.12 8.93356 10.635 8.93356 8.36996C8.93356 6.16496 10.4486 4.57496 12.4586 4.57496C13.3886 4.57496 14.1986 4.91996 14.7236 5.57996L14.7536 5.56496V4.67996H16.4336V12H14.8286V11.04L14.7986 11.025C14.2736 11.73 13.4936 12.12 12.4736 12.12ZM12.7436 10.59C13.8836 10.59 14.8286 9.70496 14.8286 8.38496C14.8286 7.07996 13.9436 6.08996 12.7436 6.08996C11.5736 6.08996 10.6436 6.97496 10.6436 8.38496C10.6436 9.67496 11.4986 10.59 12.7436 10.59ZM17.9085 12V0.959961H19.5885V12H17.9085ZM24.5454 12.12C22.2354 12.12 20.7054 10.5 20.7054 8.35496C20.7054 6.19496 22.2354 4.57496 24.5454 4.57496C26.7954 4.57496 28.3854 6.10496 28.3854 8.35496C28.3854 10.575 26.7954 12.12 24.5454 12.12ZM24.5454 10.59C25.7304 10.59 26.6754 9.67496 26.6754 8.35496C26.6754 7.00496 25.7454 6.08996 24.5454 6.08996C23.2704 6.08996 22.4154 7.07996 22.4154 8.35496C22.4154 9.59996 23.2854 10.59 24.5454 10.59Z'
                                    fill='#926B4F'
                                />
                            </svg>
                        </div>
                        <div
                            onClick={linkTelegram}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center ml-[1vw] max-md:ml-[4.2vw] max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='23'
                                height='23'
                                viewBox='0 0 23 23'
                                fill='none'
                                className='w-[1.4375vw] h-auto max-md:w-[6.13vw] max-lg:w-[3.5vw]'
                            >
                                <g clipPath='url(#clip0_1280_468)'>
                                    <path
                                        className='transition-all duration-300 group-hover:fill-white'
                                        d='M22.5496 1.88453C22.3676 1.71797 22.1445 1.60286 21.9033 1.55103C21.6621 1.4992 21.4114 1.51252 21.177 1.58962L0.953747 8.25607C0.4026 8.43774 0.0288501 8.92972 0.00158248 9.50935C-0.0256402 10.089 0.300268 10.6139 0.831873 10.8466L5.83325 13.0348L7.34222 20.0334C7.40489 20.3242 7.55246 20.5831 7.86507 20.6628C8.18127 20.7433 8.40467 20.5705 8.6406 20.3939L12.352 17.6148L16.691 21.1654C16.9437 21.3723 17.2526 21.4802 17.5676 21.4802C17.7202 21.48 17.8717 21.4549 18.0162 21.4057C18.4728 21.2509 18.8114 20.8782 18.9217 20.4088L22.9632 3.22608C23.0195 2.98589 23.0109 2.73502 22.9382 2.49925C22.8656 2.26349 22.7314 2.05132 22.5496 1.88453ZM8.9639 14.2887C8.96143 14.2946 8.959 14.3012 8.95671 14.3091L8.12009 17.232L7.18643 12.9018L13.6065 9.33478L9.11789 14.0281C9.0475 14.1022 8.99485 14.1913 8.9639 14.2887ZM9.22943 18.2654L9.60943 16.9378L9.97289 15.6679L11.2752 16.7336L9.22943 18.2654ZM21.6482 2.91675L17.6068 20.0995C17.6048 20.108 17.6021 20.1198 17.5823 20.1265C17.5628 20.1331 17.5532 20.1255 17.5465 20.1199L12.7987 16.2347L12.7983 16.2344L10.5985 14.4343L17.6658 7.04476C17.7775 6.92796 17.8436 6.77499 17.8521 6.61361C17.8606 6.45224 17.811 6.29315 17.7123 6.16523C17.6135 6.0373 17.4722 5.94901 17.3139 5.91641C17.1556 5.88381 16.9908 5.90906 16.8496 5.98756L6.38498 11.8018L1.37336 9.60898C1.35809 9.60234 1.34969 9.59861 1.3509 9.57278C1.35211 9.54704 1.36083 9.54412 1.37664 9.53891L21.5999 2.8725C21.6097 2.86931 21.6208 2.86563 21.637 2.88045C21.6533 2.89537 21.6506 2.90669 21.6482 2.91675Z'
                                        fill='#926B4F'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_1280_468'>
                                        <rect
                                            width='23'
                                            height='23'
                                            fill='white'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div
                            onClick={linkSkype}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center ml-[1vw] max-md:ml-[4.2vw] max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='19'
                                height='19'
                                viewBox='0 0 19 19'
                                fill='none'
                                className='w-[1.1875vw] h-auto max-md:w-[5.06vw] max-lg:w-[3.5vw]'
                            >
                                <g clipPath='url(#clip0_1280_473)'>
                                    <path
                                        className='transition-all duration-300 group-hover:fill-white'
                                        d='M18.2404 11.3525C18.5326 9.96685 18.4924 8.52081 18.1217 7.15359C17.7161 5.65767 16.9192 4.28452 15.8172 3.18252C14.7152 2.08055 13.342 1.28363 11.8461 0.878062C10.4789 0.507339 9.03287 0.46715 7.64717 0.759312C6.74003 0.191724 5.66412 -0.0711217 4.58865 0.0165306C3.41039 0.112607 2.30056 0.626497 1.46352 1.46354C0.626485 2.30058 0.112631 3.41037 0.0165551 4.58863C-0.0711714 5.66413 0.191674 6.73993 0.759336 7.64715C0.467137 9.03277 0.507401 10.4789 0.878086 11.8461C1.28365 13.342 2.08054 14.7152 3.18254 15.8172C4.28454 16.9191 5.6577 17.716 7.15358 18.1216C8.5208 18.4924 9.96688 18.5326 11.3525 18.2404C12.1454 18.7366 13.067 19 14.0047 19C14.1399 19 14.2756 18.9945 14.4111 18.9835C15.5895 18.8874 16.6994 18.3735 17.5364 17.5364C18.3735 16.6993 18.8874 15.5894 18.9835 14.4111C19.0711 13.3356 18.8081 12.2597 18.2404 11.3525ZM16.7105 16.7105C15.3908 18.0302 13.3269 18.2101 11.8032 17.1381C11.7353 17.0904 11.658 17.0576 11.5764 17.0421C11.4948 17.0266 11.4109 17.0286 11.3302 17.0481C8.67454 17.6891 5.93747 16.9202 4.00848 14.9912C2.0795 13.0623 1.31063 10.3252 1.9517 7.66952C1.99111 7.50624 1.95827 7.33387 1.86167 7.19645C0.789914 5.67278 0.969821 3.60905 2.28947 2.28944C3.60908 0.969833 5.67277 0.789816 7.19648 1.86165C7.26439 1.90941 7.34172 1.94215 7.42328 1.95768C7.50485 1.9732 7.5888 1.97115 7.66951 1.95167C10.3252 1.31065 13.0622 2.07951 14.9912 4.00853C16.9202 5.93748 17.6891 8.67456 17.0481 11.3301C17.0286 11.4109 17.0265 11.4948 17.0421 11.5764C17.0576 11.658 17.0903 11.7353 17.1381 11.8032C18.2101 13.327 18.0303 15.3908 16.7105 16.7105Z'
                                        fill='#926B4F'
                                    />
                                    <path
                                        className='transition-all duration-300 group-hover:fill-white'
                                        d='M9.60933 8.86127C8.40316 8.45329 7.03613 7.99079 7.03613 7.30698C7.03613 6.43468 8.16444 5.69777 9.50008 5.69777C10.8357 5.69777 11.964 6.43472 11.964 7.30698C11.964 7.62949 12.2255 7.891 12.5481 7.891C12.8706 7.891 13.1321 7.62953 13.1321 7.30698C13.1321 6.52816 12.7288 5.80909 11.9964 5.2821C11.3222 4.79694 10.4356 4.52979 9.50008 4.52979C8.56451 4.52979 7.67797 4.79697 7.00373 5.2821C6.27138 5.80906 5.86807 6.52816 5.86807 7.30698C5.86807 8.01714 6.27587 8.61638 7.08006 9.08808C7.68703 9.44407 8.47397 9.71025 9.23501 9.96768C10.5767 10.4215 11.964 10.8909 11.964 11.6934C11.964 12.5657 10.8357 13.3026 9.50008 13.3026C8.16448 13.3026 7.03613 12.5656 7.03613 11.6934C7.03613 11.3709 6.77465 11.1094 6.4521 11.1094C6.12955 11.1094 5.86807 11.3708 5.86807 11.6934C5.86807 12.4722 6.27134 13.1913 7.00373 13.7183C7.67797 14.2034 8.56451 14.4706 9.50008 14.4706C10.4357 14.4706 11.3222 14.2034 11.9964 13.7183C12.7288 13.1913 13.1321 12.4722 13.1321 11.6934C13.1321 10.053 11.2605 9.41987 9.60933 8.86127Z'
                                        fill='#926B4F'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_1280_473'>
                                        <rect
                                            width='19'
                                            height='19'
                                            fill='white'
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div
                            onClick={linkLinkedIn}
                            className='group hover:bg-[#926B4F] transition-all duration-300 cursor-pointer border-[0.7px] border-nau-nhat rounded-[50%] w-[2.6875vw] h-[2.6875vw] flex items-center justify-center ml-[1vw] max-md:ml-[4.2vw] max-md:w-[11.46vw] max-md:h-[11.46vw] max-lg:w-[7vw] max-lg:h-[7vw]'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='17'
                                height='17'
                                viewBox='0 0 17 17'
                                fill='none'
                                className='w-[1.0625vw] h-auto max-md:w-[4.53vw] max-lg:w-[3.5vw]'
                            >
                                <path
                                    className='transition-all duration-300 group-hover:fill-white'
                                    d='M4.17342 5.03441H1.30753C0.986254 5.03441 0.724945 5.29576 0.724945 5.61703V16.4175C0.724945 16.7386 0.986287 17 1.30756 17H4.17339C4.49453 17 4.75587 16.7386 4.75587 16.4175V5.61703C4.75587 5.29576 4.4946 5.03441 4.17342 5.03441ZM3.75838 16.0024H1.72243V6.03193H3.75832L3.75838 16.0024ZM2.74047 0C1.61987 0 0.708344 0.911524 0.708344 2.03203C0.708344 3.15263 1.61987 4.06412 2.74047 4.06412C3.86081 4.06412 4.77251 3.1526 4.77251 2.03199C4.77247 0.911524 3.86095 0 2.74047 0ZM2.74047 3.06663C2.16995 3.06663 1.70586 2.60256 1.70586 2.03203C1.70586 1.4616 2.16995 0.99752 2.74047 0.99752C3.3109 0.99752 3.77495 1.4616 3.77495 2.03199C3.77495 2.60242 3.3109 3.06663 2.74047 3.06663ZM14.0244 6.30068C13.3393 5.72882 12.4684 5.42299 11.5729 5.43959C11.0202 5.44997 10.4766 5.58216 9.98081 5.82674V5.59096C9.98081 5.2837 9.73169 5.03455 9.42443 5.03455H6.50644C6.19918 5.03455 5.95002 5.2837 5.95002 5.59096V16.4436C5.95002 16.7509 6.19918 17 6.50644 17H9.482C9.75749 17 9.98085 16.7766 9.98085 16.5013V10.0307C9.98085 9.47675 10.4143 9.00802 10.9678 8.99156C11.5432 8.97456 12.0166 9.43747 12.0166 10.009V16.5117C12.0166 16.7813 12.2353 17 12.5049 17H15.3647C15.6343 17 15.853 16.7813 15.853 16.5117V10.2068C15.853 8.69452 15.1865 7.27067 14.0244 6.30068ZM14.8555 16.0024H13.0143V10.009C13.0143 8.89776 12.1101 7.99364 10.9987 7.99364C9.88745 7.99364 8.98329 8.89776 8.98329 10.0091V16.0024H6.94754V6.03193H8.98333V6.75682H8.98399C8.98361 6.8786 9.028 6.99626 9.10873 7.08743C9.29122 7.29365 9.60652 7.31287 9.81274 7.13026C10.3044 6.69517 10.9349 6.44936 11.5913 6.43685C12.2475 6.42439 12.8843 6.64825 13.3852 7.06641C14.3197 7.84642 14.8555 8.99102 14.8555 10.2068V16.0024Z'
                                    fill='#926B4F'
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between flex-grow ml-[4.625vw] max-md:flex-col max-lg:justify-normal max-lg:ml-0 max-lg:flex-wrap max-lg:mt-[2vw] max-lg:gap-[2vw]'>
                    <div className='max-w-[19.6875vw] max-md:max-w-full max-md:py-[6.4vw] max-lg:max-w-[50%]'>
                        <h2 className='uppercase text-nau-nhat title18-700-130 max-md:title-mb18-700-130 max-lg:title-tl18'>
                            {' '}
                            {t.footer.title1}{' '}
                        </h2>
                        <div className='mt-[1.25vw] flex flex-col gap-[0.75vw] max-md:mt-[4.2vw] max-md:gap-[2.6vw]'>
                            <div className='flex items-center'>
                                <div className='relative w-[1.25vw] h-[2.5vw] flex max-md:w-[5.3vw] max-md:h-[10.6vw] max-lg:w-[4.25vw] max-lg:h-[8.5vw]'>
                                    <Image
                                        fill
                                        src='/images/location.svg'
                                        alt='location'
                                        className='object-contain'
                                    ></Image>
                                </div>
                                <span className='ml-[0.5vw] text-den-2 title16-400-150 max-w-[91%] max-md:title-mb16-400-150 max-md:ml-[2.1vw] max-lg:title-tl16'>
                                    {' '}
                                    {dataInfo?.address || addr}{' '}
                                </span>
                            </div>
                            {handleListPhone(dataInfo?.phone)?.map((phone, index) => (
                                <Link
                                    key={index}
                                    className='flex items-center'
                                    href={`tel: ${phone}`}
                                >
                                    <div className='relative w-[1.25vw] h-[1.25vw] flex max-md:w-[5.3vw] max-md:h-[5.3vw] max-lg:w-[4.25vw] max-lg:h-[4.25vw]'>
                                        <Image
                                            fill
                                            src='/images/call-footer.svg'
                                            alt='phone'
                                            className='object-contain'
                                        ></Image>
                                    </div>
                                    <span className='ml-[0.5vw] text-den-2 title16-400-130 max-md:title-mb16-400-130 max-md:ml-[2.1vw] max-lg:title-tl16'>
                                        {' '}
                                        {phone}{' '}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='max-md:max-w-full max-md:border-t max-md:border-[#57534E] max-md:border-opacity-10 max-md:py-[6.4vw] max-lg:max-w-[50%]'>
                        <h2 className='uppercase text-nau-nhat title18-700-130 max-md:title-mb18-700-130 max-lg:title-tl18'>
                            {' '}
                            {t.footer.title2}{' '}
                        </h2>
                        <div className='mt-[1.25vw] flex flex-col items-baseline gap-[0.75vw] max-md:mt-[4.2vw] max-md:gap-[2.6vw]'>
                            {menuArr.map((menu, index) => (
                                <Link
                                    href={lang === 'vi' ? menu.href : `/${lang + menu.href}`}
                                    key={index}
                                    className="cursor-pointer inline-flex relative text-den-2 title16-400-130 before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:border-b before:border-den-2 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left max-md:title-mb16-400-130 max-lg:title-tl16"
                                >
                                    {menu.title}
                                </Link>
                            ))}
                            {agreementDataTranslation?.map((menu, index) => (
                                <Link
                                    href={lang === 'vi' ? menu.slug : `/${lang + menu.slug}`}
                                    key={index}
                                    className="cursor-pointer inline-flex relative text-den-2 title16-400-130 before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:border-b before:border-den-2 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left max-md:title-mb16-400-130 max-lg:title-tl16"
                                >
                                    {menu.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='max-md:border-t max-md:border-[#57534E] max-md:border-opacity-10 max-md:py-[6.4vw]'>
                        <h2 className='uppercase text-nau-nhat title18-700-130 max-md:title-mb18-700-130 max-lg:title-tl18'>
                            {' '}
                            {t.footer.title3}{' '}
                        </h2>
                        <div className='mt-[1.25vw] flex flex-col gap-[0.75vw] max-md:mt-[4.2vw] max-md:gap-[2.6vw]'>
                            {serviceArr.map((service, index) => (
                                <span
                                    key={index}
                                    className='text-den-2 title16-400-130 max-md:title-mb16-400-130 max-lg:title-tl16'
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t border-den-2 border-opacity-40 py-[0.625vw] flex justify-center max-md:pt-[4.2vw] max-md:pb-[6.1vw] max-md:border-opacity-40'>
                <span className='text-center title14-400-160 text-den-2 max-md:title-mb14-400-160 max-lg:title-tl14'>
                    {copyright}
                </span>
            </div>
        </footer>
    )
}
