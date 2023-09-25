'use client'
import Image from 'next/image'
import NavBar from './NavBar'
import FeatureHome from '../home/FeatureHome'
import SearchHome from '../home/SearchHome'
import classes from './headerV2.module.css'
import SlideBanner from '../home/SlideBanner'
// import video from '../../public/images/videoTest.mp4'
import NavBarFixed from './NavBarFixed'
import { useMediaQuery } from 'react-responsive'
import NavBarRes from './NavBarRes'
import NavBarFixedRes from './NavBarFixedRes'
import { useEffect, useRef } from 'react'
import useStore from '@/app/[lang]/(store)/store'

export default function Header({ lang, t, data, isHome, dataInfo }) {
    const videoRef = useRef(null)
    const setDataHomePage = useStore((state) => state.setDataHomePage)
    const isMobile = useMediaQuery({
        query: '(max-width: 767.9px)',
    })
    const isTablet = useMediaQuery({
        query: '(max-width: 1023px)',
    })

    useEffect(() => {
        data && setDataHomePage(data)
        // if (videoRef.current) {
        //     videoRef.current.src = 'https://youtu.be/RTd5mvn-4Is?si=_EHyyl4myQfA8G5p'
        // }
    }, [])

    const handleScrollDown = () => {
        if (typeof window !== 'undefined') {
            const e = document.getElementById('header')
            window.scrollTo({
                top: e.offsetHeight,
                behavior: 'smooth',
            })
        }
    }

    return (
        <header
            id='header'
            className='relative w-screen h-fit'
        >
            <div className={`h-screen max-md:h-[64vh] relative w-full`}>
                <SlideBanner data={data} />
                {/* <video
                    ref={videoRef}
                    autoPlay
                    // poster='/images/bg-header.jpg'
                    loop
                    className='top-0 left-0 z-[99999] w-full h-full'
                    type='video/mp4'
                    playsInline
                    muted
                >
                    <source src='/images/videoTest.mp4'></source>
                </video> */}
                {/* <iframe
                    width='1600'
                    height='800'
                    src='https://www.youtube.com/embed/7PIji8OubXU?si=3L0siIEBNN6UXnLu'
                    title='YouTube video player'
                    frameborder='0'
                    a
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowfullscreen
                ></iframe> */}
                <Image
                    data-aos='fade-left'
                    data-aos-delay='1500'
                    data-aos-duration='1200'
                    className='object-contain z-20 w-[23.4375vw] max-lg:w-[45.4vw] h-[59.8vh] max-lg:top-[13vw] max-lg:right-[6.56vw] absolute right-[7.56vw] top-[18vh] mix-blend-color-dodge max-md:w-[45.6vw] max-md:h-[64.26vw] max-md:top-[16.8vw] max-md:right-[4.8vw]'
                    src='/images/big-logo.png'
                    alt='big-logo'
                    width={350}
                    height={550}
                    priority
                />
                <div className={`bg-gradient-header1 absolute z-[2] top-0 left-0 w-full h-full`}></div>
                {/* linear-white */}
                <div className='absolute z-[1] bg-gradient-header2 top-0 left-0 w-full h-full'></div>
                {isTablet ? (
                    <NavBarRes
                        isHome={isHome}
                        lang={lang}
                        t={t}
                    />
                ) : (
                    <NavBar
                        isHome={isHome}
                        lang={lang}
                        t={t}
                    />
                )}
                {!isTablet ? (
                    <NavBarFixed
                        isHome={true}
                        lang={lang}
                        t={t}
                        isMobile={isMobile}
                    />
                ) : (
                    <NavBarFixedRes
                        isHome={isHome}
                        lang={lang}
                        t={t}
                    />
                )}
                <SearchHome
                    data={data}
                    lang={lang}
                />

                <div
                    onClick={handleScrollDown}
                    className='absolute bottom-[2vw] opacity-50 w-fit h-fit left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-y-[0.94vw] max-md:gap-y-[4vw] select-none cursor-pointer'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='25'
                        viewBox='0 0 24 25'
                        fill='none'
                        className={`${classes['btn-scroll-down']} w-[1.375vw] h-[1.375vw] max-lg:w-[3vw] max-lg:h-[3vw] max-md:w-[4.27vw] max-md:h-[4.27vw]`}
                    >
                        <path
                            d='M1 1L12 12L23 1'
                            stroke='white'
                            strokeWidth='2'
                        />
                        <path
                            d='M1 12L12 23L23 12'
                            stroke='white'
                            strokeWidth='2'
                        />
                    </svg>
                    <span className='uppercase text-14pc font-semibold leading-[1.28] tracking-[0.7px] max-md:text-10mb max-md:font-semibold max-md:leading-[1.8] max-md:tracking-[0.5px] max-md:uppercase text-white max-lg:title-tl14'>
                        Cuộn xuống
                    </span>
                </div>
                <div className='absolute z-[4] bottom-0 left-1/2 opacity-20 -translate-x-1/2 w-[72.625vw] h-[2px] bg-gradient-line-header'></div>
                {!isMobile && <FeatureHome dataInfo={dataInfo} />}
            </div>
        </header>
    )
}
