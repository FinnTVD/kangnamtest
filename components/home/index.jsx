'use client'
import Image from 'next/image'
import Deposit from './Deposit'
import ProjectProminent from './ProjectProminent'
import Prominent from './Prominent'
import Partner from './Partner'
import LatestNews from './LatestNews'
import WeAre from './WeAre'
import SellingRes from './SellingRes'
import Hiring from './Hiring'
import MyProjectV2 from './MyProjectV2'
import { ToastContainer } from 'react-toastify'

import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function IndexHome({ lang, t }) {
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
            duration: 800, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        })
        Aos.refresh()
    }, [])

    return (
        <main>
            <WeAre lang={lang} />
            <MyProjectV2 lang={lang} />
            <SellingRes lang={lang} />
            <Hiring lang={lang} />
            <div className='w-full max-md:flex max-md:flex-col-reverse'>
                <Deposit />
                <ProjectProminent lang={lang}>
                    <Image
                        src='/images/bg-sky.png'
                        alt='sky'
                        height={800}
                        width={1600}
                        className='absolute bottom-0 left-0 object-cover w-full h-[48.625vw] z-0 max-md:hidden'
                    />
                </ProjectProminent>
            </div>
            <Prominent />
            <Partner t={t} />
            <LatestNews
                t={t}
                lang={lang}
            />
            <ToastContainer style={{ zIndex: '999999999999999' }} />
        </main>
    )
}
