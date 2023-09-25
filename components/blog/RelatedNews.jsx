import Button from '../general/Button'
import SlideRelatedNews from './SlideRelatedNews'

export default function RelatedNews() {
    return (
        <section className='w-screen h-fit px-120 py-[6.25vw]'>
            <div className='w-full'>
                <div className='flex items-start justify-between mb-[1.87vw]'>
                    <div>
                        <span className='sub-title'>Tin tức về thị trường</span>
                        <h2 className='text-den title56'>Tin tức liên quan</h2>
                    </div>
                    <Button className=''>Xem tất cả</Button>
                </div>
                <SlideRelatedNews />
            </div>
        </section>
    )
}
