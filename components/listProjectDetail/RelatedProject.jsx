import Button from '../general/Button'
import SlideRelatedNews from './SlideRelatedProject'

export default function RelatedProject({ lang, detail }) {
    return (
        <section className='w-screen h-fit px-120 py-[6.25vw] max-md:px-0'>
            <div className='w-full'>
                <div className='flex items-start justify-between mb-[1.87vw] max-md:mb-[6.4vw]'>
                    <div className='px-mb10 max-md:w-full'>
                        <span className='text-logo sub-title max-md:title-mb12-700-150 max-md:tracking-[0.6px] max-lg:title-tl12'>
                            Danh sách dự án
                        </span>
                        <h2 className='text-den title56 mt-[0.62vw] max-md:mt-[1.07vw] max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                            Dự án Liên quan
                        </h2>
                    </div>
                    <Button
                        href='/projects'
                        className='border-none bg-logo max-md:hidden'
                        span='text-white'
                        stroke='white'
                    >
                        Xem tất cả
                    </Button>
                </div>
                <SlideRelatedNews
                    lang={lang}
                    detail={detail}
                />
            </div>
        </section>
    )
}
