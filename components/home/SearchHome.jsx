'use client'
import Image from 'next/image'
import useStore from '@/app/[lang]/(store)/store'
import SearchGlobal from './SearchGlobal'

export default function SearchHome({ data, lang }) {
    const setValueSearch = useStore((state) => state.setValueSearch)
    const dataHomePage = useStore((state) => state.dataHomePage)
    const setIsClose = useStore((state) => state.setIsClose)
    return (
        <div className='absolute top-[45%] -translate-y-1/2 left-[7.5vw] w-[calc(100vw-15vw)] max-md:w-[calc(100vw-5.34vw)] z-10 max-md:z-40 max-md:left-[2.67vw] max-md:top-[37.87vw] max-md:translate-y-0'>
            <p className='title18-400-160 title-mb12-400-160 text-white max-md:-tracking-[0.6px] title-tl14-400-160'>
                An tâm với 100% bất động sản được xác thực tại KANGNAM
            </p>
            <h1 className='mt-[0.5vw] max-md:mt-[1.07vw] mb-[1.87vw] max-md:mb-[4.27vw] text-white capitalize title60 title-mb22-800-130 max-md:-tracking-[0.66px] title-tl42'>
                Lựa chọn căn nhà ưng ý của bạn
            </h1>
            <SearchGlobal
                isIcon={true}
                lang={lang}
            />
            <div className='flex items-center my-[1.88vw] max-md:mt-[4.27vw] max-md:mb-[2.67vw]'>
                <span className='mr-[0.81vw] max-md:mr-[4.27vw] text-white title16-600-160 max-lg:title-tl14-600-160 max-md:title-mb12-600-160'>
                    Gợi ý:
                </span>
                <ul className='flex gap-x-[0.5vw] max-md:gap-x-[1.33vw]'>
                    {data?.suggest?.slice(0, 6)?.map((e, index) => (
                        <li
                            key={index}
                            className='text-white px-[1.12vw] h-fit w-fit backdrop-blur-[3px] bg-suggest rounded-[6.25vw] py-[0.5vw] max-md:py-[1.33vw] max-md:px-[2.13vw] cursor-pointer title14-400-150 title-mb10-400-150 title-tl12-400-150'
                            onClick={() => {
                                setValueSearch(e)
                                setTimeout(() => {
                                    setIsClose(false)
                                }, 500)
                            }}
                        >
                            {e || arrSuggest[index]?.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex gap-x-[1.06vw] max-lg:gap-x-[3vw] max-md:gap-x-[2vw] max-md:gap-y-[2.67vw] max-md:flex-wrap'>
                {dataHomePage?.propertyTypes?.length > 0 &&
                    dataHomePage?.propertyTypes?.map((e, index) => (
                        <div
                            key={index}
                            className='py-[0.97vw] h-fit w-fit cursor-pointer px-[1.5vw] border border-solid border-logo flex gap-x-[1vw] max-md:gap-x-[2.13vw] max-md:py-[2.67vw] max-md:px-[4vw] rounded-[6.25vw] items-center bg-category backdrop-blur-[7.5px]'
                        >
                            <Image
                                src={e?.icon || '/images/px.png'}
                                alt={e?.title}
                                width={40}
                                height={40}
                                priority
                                className='object-cover w-[2vw] h-[2vw] max-md:w-[4.8vw] max-lg:w-[3vw] max-lg:h-[3vw] max-md:h-[4.8vw]'
                            />
                            <span className='text-white title14-400-150 title-mb12-400-150 title-tl12-400-150'>
                                {e?.title}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    )
}
