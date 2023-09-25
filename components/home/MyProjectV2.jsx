'use client'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'
import Link from 'next/link'
import useToggleShowMap from '@/hooks/useToggleShowMap'
import Button from '../general/Button'
import { arrFilter, handleCheckLangCode, handleCheckParamsLanguage } from '@/utils'
import { useMediaQuery } from 'react-responsive'
import ReactPaginate from 'react-paginate'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useSWR, { mutate } from 'swr'
import classes from '../news/ListNewsStyles.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import BoxFilterV2 from '../general/filterV2/BoxFilterV2'
import useStore from '@/app/[lang]/(store)/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MapV3 from './MapV2/MapV3'

const arrItem = new Array(8).fill(0)
const fetcher = (url, langCode) => fetch(url, { headers: { 'x-language-code': langCode } }).then((res) => res.json())
let propertyTypeParams = ''
let propertyAreaTypeParams = ''
let propertyCategoryTypeParams = ''
// const handleFilterSlug = (selectSearch, valueSearch, valueSearchPrev, cityId, districtId, wardId) => {
//     if (valueSearch && selectSearch) {
//         if (selectSearch === 'area') {
//             return `${cityId ? '&cityId=' + cityId : ''}${districtId ? '&districtId=' + districtId : ''}${
//                 wardId ? '&wardId=' + wardId : ''
//             }`
//         }
//         if (selectSearch === 'word') {
//             return '&q=' + valueSearchPrev
//         }
//         return '&q=' + selectSearch
//     }
//     return ''
// }

gsap.registerPlugin(ScrollTrigger)
export default function MyProjectV2({ lang }) {
    const setBoxMap = useStore((state) => state.setBoxMap)
    const valueSearch = useStore((state) => state.valueSearch)
    const selectSearch = useStore((state) => state.selectSearch)
    const valueSearchPrev = useStore((state) => state.valueSearchPrev)
    const cityId = useStore((state) => state.cityId)
    const districtId = useStore((state) => state.districtId)
    const wardId = useStore((state) => state.wardId)
    const isSubmit = useStore((state) => state.isSubmit)
    const setIsFeatureHome = useStore((state) => state.setIsFeatureHome)
    const isTablet = useMediaQuery({
        query: '(max-width: 1023px)',
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const page = searchParams.get('page')
    const projectsRef = useRef()

    const propertyType = searchParams.getAll('propertyTypeIds')
    const propertyAreaType = searchParams.getAll('propertyAreaTypeIds')
    const propertyCategoryType = searchParams.getAll('propertyCategoryIds')
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams],
    )

    if (propertyType?.length > 0 && propertyType[0]) {
        propertyTypeParams = propertyType[0]
            .split('--')
            .reduce((accumulator, currentValue) => accumulator + '&propertyTypeIds=' + currentValue, '')
        router.push(pathName + '?' + createQueryString('page', 1), {
            scroll: false,
        })
    } else {
        propertyTypeParams = ''
    }

    if (propertyAreaType?.length > 0 && propertyAreaType[0]) {
        propertyAreaTypeParams = propertyAreaType[0]
            .split('--')
            .reduce((accumulator, currentValue) => accumulator + '&propertyAreaTypeIds=' + currentValue, '')
        router.push(pathName + '?' + createQueryString('page', 1), {
            scroll: false,
        })
    } else {
        propertyAreaTypeParams = ''
    }

    if (propertyCategoryType?.length > 0 && propertyCategoryType[0]) {
        propertyCategoryTypeParams = propertyCategoryType[0]
            .split('--')
            .reduce((accumulator, currentValue) => accumulator + '&propertyCategoryIds=' + currentValue, '')
        router.push(pathName + '?' + createQueryString('page', 1), {
            scroll: false,
        })
    } else {
        propertyCategoryTypeParams = ''
    }

    const [show, Element] = useToggleShowMap()
    const [isToggle, setIsToggle] = useState(false)
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/property?order=DESC&page=${page ? page : 1}&take=${show ? 6 : 8}${
            propertyCategoryTypeParams ? propertyCategoryTypeParams : ''
        }${propertyAreaTypeParams ? propertyAreaTypeParams : ''}${propertyTypeParams ? propertyTypeParams : ''}`,
        (url) => fetcher(url, handleCheckLangCode(lang)),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    useEffect(() => {
        // mutate(
        //     `${process.env.NEXT_PUBLIC_API}/property?order=DESC&page=${page ? page : 1}&take=${show ? 6 : 8}${
        //         propertyCategoryTypeParams ? propertyCategoryTypeParams : ''
        //     }${propertyAreaTypeParams ? propertyAreaTypeParams : ''}${
        //         propertyTypeParams ? propertyTypeParams : ''
        //     }${handleFilterSlug(selectSearch, valueSearch, valueSearchPrev, cityId, districtId, wardId)}`,
        // )
        mutate(
            `${process.env.NEXT_PUBLIC_API}/property?order=DESC&page=${page ? page : 1}&take=${show ? 6 : 8}${
                propertyCategoryTypeParams ? propertyCategoryTypeParams : ''
            }${propertyAreaTypeParams ? propertyAreaTypeParams : ''}${propertyTypeParams ? propertyTypeParams : ''}`,
        )
    }, [lang, isSubmit])

    useEffect(() => {
        projectsRef?.current && setBoxMap(projectsRef.current)
    }, [])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            setTimeout(() => {
                gsap.to(projectsRef.current, {
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: 'top bottom',
                        end: 'bottom 65%',
                        scrub: true,
                        onToggle: (self) => {
                            if (self.isActive) {
                                setIsFeatureHome(true)
                            } else {
                                setIsFeatureHome(false)
                            }
                        },
                    },
                })
            }, 500)
        }, projectsRef)
        return () => {
            ctx.revert()
        }
    }, [])

    if (isTablet) return

    return (
        <section
            ref={projectsRef}
            id='boxMap'
            className='pl-[7.5vw] text-den pt-[9.13vw] pb-[10.06vw] z-[9] relative bg-white max-lg:hidden'
        >
            <h2 className='pr-[7.5vw] title56'>Dự án của chúng tôi</h2>
            <div className='flex justify-between items-center pr-[7.5vw] mb-[2vw] mt-[1.5vw]'>
                <BoxFilterV2
                    arrFilter={arrFilter}
                    lang={lang}
                />
                <div className='flex gap-x-[1.5vw] items-center'>
                    <span className='text-black title16-400-150 h-fit'>Hiển thị bản đồ</span>
                    <div>{Element}</div>
                </div>
            </div>
            <div className={`${show ? '' : 'pr-[7.5vw]'} flex gap-x-[1.88vw]`}>
                <div className={`${isToggle ? 'hidden' : ''} flex-1`}>
                    <div
                        className={`${
                            show ? 'grid-cols-3' : 'grid-cols-4'
                        } w-full grid grid-rows-2 gap-x-[1.25vw] gap-y-[1.87vw] h-fit`}
                    >
                        {isLoading &&
                            arrItem.slice(0, show ? 6 : 8).map((e, index) => (
                                <div
                                    className='w-full'
                                    key={index}
                                >
                                    <div className='relative w-full h-[13.75vw] rounded-[0.5vw] overflow-hidden'>
                                        <Skeleton height={'13.75vw'} />
                                    </div>
                                    <div className='pt-[1.13vw]'>
                                        <Skeleton height={'1.4375vw'} />
                                    </div>
                                    <div className='mt-[0.63vw] flex flex-col gap-y-[0.5vw]'>
                                        <div>
                                            <Skeleton height={'1vw'} />
                                        </div>
                                        <div>
                                            <Skeleton height={'1vw'} />
                                        </div>
                                        <div>
                                            <Skeleton height={'1vw'} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {data &&
                            data?.data?.map((e, index) => (
                                <Link
                                    href={
                                        (lang === 'vi' ? '' : lang + '/') +
                                        e?.propertyCategory?.translations?.find((e) =>
                                            e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                                        )?.alias +
                                        '/' +
                                        e?.translation?.slug
                                    }
                                    className='w-full'
                                    key={index}
                                >
                                    <div className='relative w-full h-[13.75vw] rounded-[0.5vw] overflow-hidden'>
                                        <Image
                                            data-aos='zoom-out'
                                            data-aos-delay={`${(index % 3) * 300}`}
                                            className='z-0 object-cover'
                                            src={e?.firstImage || '/images/itemproject.jpg'}
                                            alt={e?.translation?.name || 'thumbnail project'}
                                            sizes='18vw'
                                            fill
                                        />
                                        <div className='block absolute rounded-[0.25vw] bg-logo top-[1vw] left-[1vw] text-white py-[0.38vw] px-[0.94vw] h-fit w-fit title10-600-150'>
                                            {e?.propertyCategory?.translations?.find((e) =>
                                                e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                                            )?.name || 'Dự án'}
                                        </div>
                                    </div>
                                    <div className='pt-[1.13vw]'>
                                        <h6
                                            title={e?.translation?.name}
                                            className='text-den title18-700-130 -tracking-[1px] mb-[0.63vw] line-clamp-1'
                                        >
                                            {e?.translation?.name || 'Chưa có thông tin!'}
                                        </h6>
                                        <div
                                            title={e?.address?.display}
                                            className='flex items-center'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='14'
                                                height='14'
                                                viewBox='0 0 14 14'
                                                fill='none'
                                                className='md:w-[1.1vw] h-auto'
                                            >
                                                <g clipPath='url(#clip0_546_2319)'>
                                                    <path
                                                        d='M10.1351 13.4157V11.0095H3.86426C3.63092 11.0095 3.42676 10.922 3.25176 10.747C3.07676 10.572 2.98926 10.3678 2.98926 10.1345V3.86365H0.583008V2.98865H2.98926V0.582397H3.86426V10.1345H13.4163V11.0095H11.0101V13.4157H10.1351ZM10.1351 9.25948V3.86365H4.73926V2.98865H10.1351C10.3684 2.98865 10.5726 3.07615 10.7476 3.25115C10.9226 3.42615 11.0101 3.63031 11.0101 3.86365V9.25948H10.1351Z'
                                                        fill='#926B4F'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_546_2319'>
                                                        <rect
                                                            width='14'
                                                            height='14'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150 whitespace-nowrap'>
                                                Địa chỉ:
                                            </span>
                                            <span className='capitalize text-den title14-400-150 line-clamp-1'>
                                                {e?.address?.ward +
                                                    ', ' +
                                                    e?.address?.district +
                                                    ', ' +
                                                    e?.address?.city}
                                            </span>
                                        </div>
                                        <div className='flex items-center my-[0.5vw]'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='15'
                                                height='14'
                                                viewBox='0 0 15 14'
                                                fill='none'
                                            >
                                                <path
                                                    d='M7.33422 6.8551C7.6153 6.8551 7.8555 6.75502 8.0548 6.55485C8.25411 6.35468 8.35376 6.11406 8.35376 5.83297C8.35376 5.55189 8.25367 5.3117 8.0535 5.11239C7.85334 4.91309 7.61272 4.81344 7.33163 4.81344C7.05055 4.81344 6.81036 4.91352 6.61105 5.11369C6.41175 5.31385 6.31209 5.55448 6.31209 5.83557C6.31209 6.11665 6.41218 6.35684 6.61235 6.55614C6.81251 6.75545 7.05314 6.8551 7.33422 6.8551ZM7.33293 11.6822C8.62598 10.5058 9.58119 9.43878 10.1986 8.48114C10.8159 7.52351 11.1246 6.6801 11.1246 5.95094C11.1246 4.80576 10.7586 3.86807 10.0266 3.13788C9.29459 2.4077 8.3967 2.0426 7.33293 2.0426C6.26915 2.0426 5.37126 2.4077 4.63927 3.13788C3.90726 3.86807 3.54126 4.80576 3.54126 5.95094C3.54126 6.6801 3.85723 7.52351 4.48918 8.48114C5.12112 9.43878 6.06904 10.5058 7.33293 11.6822ZM7.33293 12.8343C5.76765 11.5023 4.59855 10.2652 3.82563 9.12281C3.05272 7.98045 2.66626 6.92316 2.66626 5.95094C2.66626 4.4926 3.13536 3.3308 4.07355 2.46552C5.01175 1.60024 6.0982 1.1676 7.33293 1.1676C8.56765 1.1676 9.65411 1.60024 10.5923 2.46552C11.5305 3.3308 11.9996 4.4926 11.9996 5.95094C11.9996 6.92316 11.6131 7.98045 10.8402 9.12281C10.0673 10.2652 8.8982 11.5023 7.33293 12.8343Z'
                                                    fill='#926B4F'
                                                />
                                            </svg>
                                            <span className='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Diện tích:
                                            </span>
                                            <span className=' text-den title14-400-150'>
                                                {e?.translation?.size
                                                    ? e?.translation?.size + ' m²'
                                                    : 'Chưa có thông tin!'}
                                            </span>
                                        </div>
                                        <div className='flex items-center'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='14'
                                                height='14'
                                                viewBox='0 0 14 14'
                                                fill='none'
                                            >
                                                <path
                                                    d='M6.57741 11.1862H7.37949V10.4279C7.97255 10.3598 8.43435 10.1775 8.76491 9.88102C9.09546 9.58449 9.26074 9.18831 9.26074 8.69248C9.26074 8.19665 9.11977 7.79317 8.83783 7.48206C8.55588 7.17095 8.07949 6.87442 7.40866 6.59248C6.84477 6.35915 6.43644 6.15012 6.18366 5.9654C5.93088 5.78067 5.80449 5.53276 5.80449 5.22165C5.80449 4.92026 5.91387 4.68206 6.13262 4.50706C6.35137 4.33206 6.65033 4.24456 7.02949 4.24456C7.32116 4.24456 7.57394 4.31262 7.78783 4.44873C8.00171 4.58484 8.18158 4.78901 8.32741 5.06123L9.02741 4.72581C8.86213 4.38554 8.64338 4.11817 8.37116 3.92373C8.09894 3.72929 7.7781 3.61262 7.40866 3.57373V2.82998H6.60658V3.57373C6.11074 3.64179 5.71942 3.82408 5.43262 4.12061C5.14581 4.41713 5.00241 4.78415 5.00241 5.22165C5.00241 5.69804 5.14824 6.0772 5.43991 6.35915C5.73158 6.64109 6.16908 6.90359 6.75241 7.14665C7.4038 7.41887 7.85102 7.66436 8.09408 7.88311C8.33713 8.10186 8.45866 8.37165 8.45866 8.69248C8.45866 9.00359 8.32984 9.25394 8.0722 9.44352C7.81456 9.63311 7.4913 9.7279 7.10241 9.7279C6.72324 9.7279 6.38539 9.62095 6.08887 9.40706C5.79234 9.19317 5.58574 8.90151 5.46908 8.53206L4.72533 8.77998C4.92949 9.2272 5.17984 9.57963 5.47637 9.83727C5.77289 10.0949 6.13991 10.2821 6.57741 10.3987V11.1862ZM7.00033 12.8341C6.2031 12.8341 5.44963 12.681 4.73991 12.3748C4.03019 12.0685 3.41039 11.6505 2.88053 11.1206C2.35067 10.5907 1.93262 9.97095 1.62637 9.26123C1.32012 8.55151 1.16699 7.79804 1.16699 7.00081C1.16699 6.19387 1.32012 5.43554 1.62637 4.72581C1.93262 4.01609 2.35067 3.39873 2.88053 2.87373C3.41039 2.34873 4.03019 1.93311 4.73991 1.62686C5.44963 1.32061 6.2031 1.16748 7.00033 1.16748C7.80727 1.16748 8.5656 1.32061 9.27532 1.62686C9.98505 1.93311 10.6024 2.34873 11.1274 2.87373C11.6524 3.39873 12.068 4.01609 12.3743 4.72581C12.6805 5.43554 12.8337 6.19387 12.8337 7.00081C12.8337 7.79804 12.6805 8.55151 12.3743 9.26123C12.068 9.97095 11.6524 10.5907 11.1274 11.1206C10.6024 11.6505 9.98505 12.0685 9.27532 12.3748C8.5656 12.681 7.80727 12.8341 7.00033 12.8341ZM7.00033 11.9591C8.38088 11.9591 9.55241 11.4755 10.5149 10.5081C11.4774 9.54074 11.9587 8.37165 11.9587 7.00081C11.9587 5.62026 11.4774 4.44873 10.5149 3.48623C9.55241 2.52373 8.38088 2.04248 7.00033 2.04248C5.62949 2.04248 4.46039 2.52373 3.49303 3.48623C2.52567 4.44873 2.04199 5.62026 2.04199 7.00081C2.04199 8.37165 2.52567 9.54074 3.49303 10.5081C4.46039 11.4755 5.62949 11.9591 7.00033 11.9591Z'
                                                    fill='#926B4F'
                                                />
                                            </svg>
                                            <span className='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Mức giá:
                                            </span>
                                            <span className='capitalize text-den title14-400-150'>
                                                {e?.translation?.priceDisplay || 'Chưa có thông tin!'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                    <div className='flex justify-between items-center mt-[2.69vw]'>
                        {data ? (
                            <ReactPaginate
                                breakLabel='...'
                                nextLabel='Next'
                                onPageChange={(e) => {
                                    router.push(pathName + '?' + createQueryString('page', e?.selected + 1), {
                                        scroll: false,
                                    })
                                    projectsRef?.current?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                pageRangeDisplayed={5}
                                pageCount={Math.ceil(data?.meta?.pageCount) || 1}
                                renderOnZeroPageCount={null}
                                previousLabel='Previous'
                                forcePage={page ? page - 1 : 0}
                                pageClassName={classes.page}
                                activeClassName={classes.selected}
                                className={classes['news-pagination']}
                            />
                        ) : (
                            <div></div>
                        )}
                        <Button
                            href={handleCheckParamsLanguage(lang, '/projects')}
                            className='border-none bg-logo'
                            stroke='white'
                            span='text-white font-semibold -tracking-[0.32px]'
                        >
                            Xem tất cả
                        </Button>
                    </div>
                </div>
                <div
                    className={`${!show ? 'hidden' : ''} rounded-tl-[0.5vw] ${
                        isToggle ? 'w-full' : '!w-[35.5625vw]'
                    } !h-[46.9375vw] rounded-bl-[0.5vw] overflow-hidden relative `}
                >
                    {/* <Map
                        setIsToggle={setIsToggle}
                        isToggle={isToggle}
                    /> */}
                    <MapV3 />
                </div>
            </div>
        </section>
    )
}
