'use client'
import Image from 'next/image'
import NavBar from './NavBar'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ContentPageOther from './ContentPageOther'
import classes from './headerV2.module.css'
import NavBarFixed from './NavBarFixed'
import { useMediaQuery } from 'react-responsive'
import NavBarRes from './NavBarRes'
import NavBarFixedRes from './NavBarFixedRes'
import Aos from "aos";
import 'aos/dist/aos.css';

const isCheckPathName = (pathName) => {
    switch (pathName) {
        case '/':
            return true
        case '/en':
            return true
        case '/kr':
            return true
        case '/ch':
            return true
        default:
            return false
    }
}

export default function HeaderV2({ lang, t, post, newsDetail, src, breadcrumb }) {
    const [isHome, setIsHome] = useState(true) // neu la home page isHome = true
    const pathName = usePathname()
    const isMobile = useMediaQuery({
        query: '(max-width: 767.9px)',
    })
    const isTablet = useMediaQuery({
        query: '(max-width: 1023px)',
    })

    useEffect(() => {
        if (!pathName) return
        setIsHome(isCheckPathName(pathName))
    }, [pathName])

    useEffect(() => {
        Aos.init({
            disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            

            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 1500, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
        Aos.refresh();
      }, []);

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
            <div className={`h-[80vh] max-md:h-[55vh] relative w-full overflow-hidden`}>
                <Image
                    data-aos='zoom-out'
                    className='z-0 object-cover'
                    src={post?.image || src || '/images/bg-header.jpg'}
                    alt={newsDetail?.title || 'bg-header'}
                    sizes='100vw'
                    fill
                    priority
                />
                {/* <SlideBanner /> */}
                {/* {isHome && (
                    <Image
                        className='object-contain z-20 w-[23.4375vw] h-[59.8vh] absolute right-[7.56vw] top-[18vh] mix-blend-color-dodge max-md:w-[45.6vw] max-md:h-[64.26vw] max-md:top-[16.8vw] max-md:right-[4.8vw]'
                        src='/images/big-logo.png'
                        alt='big-logo'
                        width={350}
                        height={550}
                        priority
                    />
                )} */}
                <div className={`bg-gradient-header-other absolute z-[2] top-0 left-0 w-full h-full`}></div>
                {/* linear-white */}
                {/* {isHome && <div className='absolute z-[1] bg-gradient-header2 top-0 left-0 w-full h-full'></div>} */}
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
                        isHome={isHome}
                        lang={lang}
                        t={t}
                    />
                ) : (
                    <NavBarFixedRes
                        isHome={isHome}
                        lang={lang}
                        t={t}
                    />
                )}
                <ContentPageOther
                    post={post}
                    newsDetail={newsDetail}
                    lang={lang}
                    breadcrumb={breadcrumb}
                />
                {isHome ? (
                    <></>
                ) : (
                    <div
                        onClick={handleScrollDown}
                        className='absolute bottom-[2vw] opacity-50 w-fit h-fit left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-y-[0.94vw] max-md:gap-y-[4vw] select-none'
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
                )}
                {/* {isHome && (
                    <div className='absolute z-[4] bottom-0 left-1/2 opacity-20 -translate-x-1/2 w-[72.625vw] h-[2px] bg-gradient-line-header'></div>
                )}
                {isHome && !isMobile && <FeatureHome />} */}
            </div>
        </header>
    )
}
