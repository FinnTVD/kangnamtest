'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SelectSearch from '../general/SelectSearch'
import useSWR from 'swr'
import useStore from '@/app/[lang]/(store)/store'
import { handleCheckLangCode, notifyError } from '@/utils'
import useClickOutSide from '@/hooks/useClickOutSide'
import { usePathname, useRouter } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'

const apiKey = 'c6a8fb5d25f0f32c87d1469f6847388c445850643364b94e'

const handleCheckPage = (pathName, listData) => {
    if (pathName === '/') return true
    //nếu ko đứng ỏ các page nằm ở listPage thì sẽ chuyển sang page có maphandleCheckPage
    for (const item of listData) {
        for (const translation of item?.translations) {
            if (translation?.alias?.toLowerCase()?.includes(pathName?.slice(1))) {
                return false
            }
        }
    }
    // Trường hợp không tìm thấy khớp nào
    return true
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const fetcherLang = (url, langCode) =>
    fetch(url, { headers: { 'x-language-code': langCode } }).then((res) => res.json())
export default function SearchGlobal({
    lang,
    iconSmall = false,
    classContainer,
    classLine,
    classForm,
    isIcon = false,
    classInput,
    classList,
}) {
    const router = useRouter()
    const pathName = usePathname()
    console.log('🚀 ~ file: SearchGlobal.jsx:43 ~ pathName:', pathName)
    const [dataProject, setDataProject] = useState([])
    const valueSearch = useStore((state) => state.valueSearch)
    const debounceValue = useDebounce(valueSearch, 500)

    const isClose = useStore((state) => state.isClose)
    const setIsClose = useStore((state) => state.setIsClose)
    const setValueSearch = useStore((state) => state.setValueSearch)
    const setValueSearchPrev = useStore((state) => state.setValueSearchPrev)
    const cityId = useStore((state) => state.cityId)
    const districtId = useStore((state) => state.districtId)
    const wardId = useStore((state) => state.wardId)
    const setCityId = useStore((state) => state.setCityId)
    const setDistrictId = useStore((state) => state.setDistrictId)
    const setWardId = useStore((state) => state.setWardId)
    const setSelectSearch = useStore((state) => state.setSelectSearch)
    const dataDistrict = useStore((state) => state.dataDistrict)
    const dataProvinces = useStore((state) => state.dataProvinces)
    const levelZoom = useStore((state) => state.levelZoom)
    const setLevelZoom = useStore((state) => state.setLevelZoom)
    const setIsSubmit = useStore((state) => state.setIsSubmit)
    const isSubmit = useStore((state) => state.isSubmit)
    const listData = useStore((state) => state.listData)
    console.log('🚀 ~ file: SearchGlobal.jsx:66 ~ listData:', listData)
    const mapRef = useStore((state) => state.mapRef)

    const [sideRef, isOutSide] = useClickOutSide()

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        error: errorSearch,
    } = useSWR(
        `https://maps.vietmap.vn/api/search/v3?apikey=${apiKey}${debounceValue ? '&text=' + debounceValue : ''}`,
        fetcher,
    )

    const {
        data: dataProjectCode,
        isLoading: isLoadingProjectCode,
        error: errorProjectCode,
    } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/property?page=1&take=10${debounceValue ? '&q=' + debounceValue : ''}${
            listData[0]?.id ? '&propertyCategoryIds=' + listData[0]?.id : ''
        }`,
        (url) => fetcherLang(url, handleCheckLangCode(lang)),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    useEffect(() => {
        if (dataSearch?.length && debounceValue) {
            if (dataSearch[0]?.boundaries?.length === 1) {
                const obj1 = {
                    cityIdSearch: dataSearch[0]?.boundaries[0]?.id,
                }
                callDataProject(obj1)
            }
            if (dataSearch[0]?.boundaries?.length === 2) {
                const obj2 = {
                    districtIdSearch: dataSearch[0]?.boundaries[0]?.id,
                    cityIdSearch: dataSearch[0]?.boundaries[1]?.id,
                }
                callDataProject(obj2)
            }
            if (dataSearch[0]?.boundaries?.length === 3) {
                const obj3 = {
                    wardIdSearch: dataSearch[0]?.boundaries[0]?.id,
                    districtIdSearch: dataSearch[0]?.boundaries[1]?.id,
                    cityIdSearch: dataSearch[0]?.boundaries[2]?.id,
                }
                callDataProject(obj3)
            }
        }
    }, [dataSearch])

    useEffect(() => {
        isOutSide && setIsClose(true)
    }, [isOutSide])

    const callDataProject = async ({ cityIdSearch, districtIdSearch, wardIdSearch }) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/property?page=1&take=15${cityIdSearch ? '&cityId=' + cityIdSearch : ''}${
                districtIdSearch ? '&districtId=' + districtIdSearch : ''
            }${wardIdSearch ? '&wardId=' + wardIdSearch : ''}${
                listData[0]?.id ? '&propertyCategoryIds=' + listData[0]?.id : ''
            }`,
        )
        const data = await res.json()
        setDataProject(data)
    }

    const callDataWard = async (cityIdWard, districtIdWard, wardIdWard) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${cityIdWard}&districtId=${districtIdWard}`,
        )
        const data = await res.json()
        const itemWard = data?.find((i) => i?.ward_id == wardIdWard)
        if (!itemWard) {
            return notifyError('No data project in address ward search!')
        }
        //delete marker before fly to city other
        mapRef?.flyTo({
            center: [Number(itemWard?.ward_lng), Number(itemWard?.ward_lat)],
            zoom: 13.5,
            curve: 1,
        })
        levelZoom !== 13.5 && setLevelZoom(13.5)
    }
    console.log(
        listData[0]?.translations?.find((e) => e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang))
            ?.alias,
    )

    const handleSubmit = (e) => {
        e?.preventDefault()
        if (!valueSearch) {
            notifyError('Vui lòng nhập dữ liệu để tìm kiếm!')
            return
        }
        // handleCheckPage(pathName, listData) &&
        //     router.push(
        //         '/' +
        //             listData[0]?.translations?.find((e) =>
        //                 e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
        //             )?.alias,
        //     )
        console.log(handleCheckPage(pathName, listData))
        handleCheckPage(pathName, listData) &&
            router.replace(
                '/' +
                    listData[0]?.translations?.find((e) =>
                        e?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                    )?.alias,
                undefined,
                { shallow: true },
            )

        setIsSubmit(!isSubmit)
        if (dataSearch?.length >= 0) {
            handleSelectValueSearch(dataSearch[0])
        } else if (dataProjectCode?.data?.length >= 0) {
            handleSelectValueProject(dataProjectCode?.data[0])
        } else if (dataProject?.data?.length >= 0) {
            handleSelectValueProject(dataProject?.data[0])
        }
        setIsClose(true)
    }

    const handleSelectValueSearch = (e) => {
        if (!e) return
        if (e?.ref_id?.includes('CITY')) {
            //set lại cityid
            cityId !== Number(e?.boundaries[0]?.id) && setCityId(Number(e?.boundaries[0]?.id))
            // khi chuyển city thì setDistrictId và setWardId về null
            setDistrictId(null)
            setWardId(null)
            setValueSearch(e?.address)
            if (!dataProvinces || !e?.boundaries[0]?.id) return
            //nếu đang ở tỉnh đó và ở level zoom city thì không fly
            // if (e?.boundaries[0]?.id === cityId && !cityId && !wardId) return notifyError('Now, in current city!')
            // if (e?.boundaries[0]?.id === cityId && !districtId) return notifyError('Now, in current city!')
            const itemCity = dataProvinces?.find((i) => i?.city_id == e?.boundaries[0]?.id)
            if (!itemCity) {
                return notifyError('No data project in address city search!')
            }
            mapRef?.flyTo({
                center: [Number(itemCity?.city_lng), Number(itemCity?.city_lat)],
                zoom: 9,
                curve: 1,
            })
            levelZoom !== 9 && setLevelZoom(9)
            return
        }
        if (e?.ref_id?.includes('DIST')) {
            setDistrictId(e?.boundaries[0]?.id)
            e?.boundaries[1]?.id !== cityId && setCityId(e?.boundaries[1]?.id)
            !wardId && setWardId(null)
            if (!dataDistrict || !e?.boundaries[0]?.id) return
            // nếu đang là districtid đó và đang ở cấp quận thì return
            // if (e?.boundaries[0]?.id === districtId && !wardId) return notifyError('Now, in current district!')
            const itemDistrict = dataDistrict?.find((i) => i?.district_id == e?.boundaries[0]?.id)
            if (typeof itemDistrict !== 'object') {
                return notifyError('No data project in address district search!')
            }
            mapRef?.flyTo({
                center: [Number(itemDistrict?.district_lng), Number(itemDistrict?.district_lat)],
                zoom: 11.5,
                curve: 1,
            })
            levelZoom !== 11.5 && setLevelZoom(11.5)
            return
        }
        if (e?.ref_id?.includes('WARD')) {
            if (e?.boundaries[2]?.id !== cityId) {
                setCityId(e?.boundaries[2]?.id)
            }
            if (e?.boundaries[1]?.id !== districtId) {
                setDistrictId(e?.boundaries[1]?.id)
            }
            setWardId(e?.boundaries[0]?.id)
            callDataWard(e?.boundaries[2]?.id, e?.boundaries[1]?.id, e?.boundaries[0]?.id)
            return
        }
    }

    const handleSelectValueProject = (e) => {
        setValueSearch(e?.address?.display)
        if (Number(e?.address?.cityId) !== cityId) {
            setCityId(Number(e?.address?.cityId))
        }
        if (Number(e?.address?.districtId) !== districtId) {
            setDistrictId(Number(e?.address?.districtId))
        }
        if (Number(e?.address?.wardId) !== wardId) {
            setWardId(Number(e?.address?.wardId))
        }
        mapRef?.flyTo({
            center: [Number(e?.address?.lng), Number(e?.address?.lat)],
            zoom: 17,
            curve: 1,
        })
        levelZoom !== 17 && setLevelZoom(17)
    }

    return (
        <div
            className={`${
                classContainer ||
                'w-[54vw] max-md:w-full py-[0.62vw] max-md:py-[4.27vw] max-md:px-[6.4vw] pl-[2.5vw] pr-[1.5vw] bg-white rounded-[6.25vw] backdrop-blur-[7.5px] flex justify-between items-center relative z-40'
            }`}
        >
            <div className='flex items-center w-full'>
                <SelectSearch lang={lang} />
                <div
                    className={`${
                        classLine ||
                        'border-l border-solid border-[#57534E] max-md:border-den02 opacity-30 h-[1.6875vw] max-md:h-[4.53vw] mx-[1vw] max-md:mx-[4.27vw]'
                    }`}
                ></div>
                <form
                    ref={sideRef}
                    onSubmit={handleSubmit}
                    className={`${
                        classForm || 'flex-1 flex items-center gap-x-[0.62vw] max-md:gap-x-[1.07vw] relative'
                    }`}
                >
                    <label htmlFor='search'>
                        {iconSmall && (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='17'
                                viewBox='0 0 16 17'
                                fill='none'
                                className='w-[1vw] h-[1vw] max-md:w-[4.2vw] max-md:h-[4.2vw]'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M7.19929 2.72722C6.58212 2.72003 5.96965 2.83469 5.39737 3.06456C4.82509 3.29442 4.30438 3.63492 3.8654 4.06632C3.42642 4.49773 3.0779 5.01146 2.84003 5.57776C2.60217 6.14405 2.47969 6.75165 2.47969 7.36536C2.47969 7.97906 2.60217 8.58666 2.84003 9.15296C3.0779 9.71925 3.42642 10.233 3.8654 10.6644C4.30438 11.0958 4.82509 11.4363 5.39737 11.6662C5.96965 11.896 6.58212 12.0107 7.19929 12.0035C8.42696 11.9892 9.59947 11.4942 10.4625 10.626C11.3256 9.75771 11.8096 8.58614 11.8096 7.36536C11.8096 6.14457 11.3256 4.973 10.4625 4.10474C9.59947 3.23647 8.42696 2.74152 7.19929 2.72722ZM1.57497 7.36631C1.56703 6.62685 1.70666 5.89316 1.98577 5.20771C2.26487 4.52226 2.67792 3.89864 3.201 3.37295C3.72409 2.84726 4.34682 2.42994 5.03318 2.14512C5.71953 1.8603 6.45588 1.71365 7.19961 1.71365C7.94333 1.71365 8.67968 1.8603 9.36603 2.14512C10.0524 2.42994 10.6751 2.84726 11.1982 3.37295C11.7213 3.89864 12.1343 4.52226 12.4134 5.20771C12.6926 5.89316 12.8322 6.62685 12.8242 7.36631C12.8084 8.83925 12.2089 10.2465 11.1558 11.2825C10.1027 12.3186 8.68104 12.8997 7.19961 12.8997C5.71817 12.8997 4.29654 12.3186 3.24343 11.2825C2.19032 10.2465 1.59077 8.83925 1.57497 7.36631Z'
                                    fill='#D6A279'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M10.7105 10.4576L14.3041 14.0212L13.6263 14.6977L10.0327 11.1334L10.7105 10.4576Z'
                                    fill='#D6A279'
                                />
                            </svg>
                        )}
                    </label>
                    <input
                        className={`${
                            classInput || 'w-full outline-none text-den title18-400-150 title-mb14-400-130 pr-[2vw]'
                        }`}
                        type='text'
                        name='search'
                        id='search'
                        placeholder='Thành phố Hà Nội'
                        value={valueSearch}
                        onFocus={() => {
                            setIsClose(false)
                        }}
                        onChange={(e) => {
                            e?.target?.value && setIsClose(false)
                            setValueSearch(e?.target?.value)
                            setValueSearchPrev(e?.target?.value)
                        }}
                    />
                    {dataSearch && valueSearch && (
                        <ul
                            className={`${isClose ? 'hidden' : ''} ${
                                classList ||
                                'absolute bottom-[-0.5vw] left-0 translate-y-full z-[1000] bg-white text-black w-full px-[1.5vw] py-[1vw] rounded-[0.5vw] shadow-input max-md:title-mb12-400-150'
                            }`}
                        >
                            {dataSearch && <li className='font-bold text-black max-md:my-[1vw]'>Khu vực</li>}
                            {Array.isArray(dataSearch) &&
                                dataSearch?.slice(0, 3)?.map((e, index) => (
                                    <li
                                        className='pl-[0.5vw] line-clamp-2 max-md:py-[1vw]'
                                        onClick={() => {
                                            handleCheckPage(pathName, listData) &&
                                                router.push(
                                                    '/' +
                                                        listData[0]?.translations?.find((e) =>
                                                            e?.languageCode
                                                                ?.toLowerCase()
                                                                ?.includes(lang === 'ch' ? 'cn' : lang),
                                                        )?.alias,
                                                )
                                            handleSelectValueSearch(e)
                                            setIsSubmit(!isSubmit)
                                            setIsClose(true)
                                            setSelectSearch('area')
                                        }}
                                        key={index}
                                    >
                                        {e?.address}
                                    </li>
                                ))}
                            {Array.isArray(dataProjectCode?.data) && (
                                <li className='font-bold text-black max-md:my-[1vw]'>Từ khoá</li>
                            )}
                            {Array.isArray(dataProjectCode?.data) &&
                                dataProjectCode?.data?.map((e, index) => (
                                    <li
                                        className='pl-[0.5vw] line-clamp-1 max-md:py-[1vw]'
                                        title={e?.translation?.name}
                                        onClick={() => {
                                            handleCheckPage(pathName, listData) &&
                                                router.push(
                                                    '/' +
                                                        listData[0]?.translations?.find((e) =>
                                                            e?.languageCode
                                                                ?.toLowerCase()
                                                                ?.includes(lang === 'ch' ? 'cn' : lang),
                                                        )?.alias,
                                                )
                                            handleSelectValueProject(e)
                                            setIsSubmit(!isSubmit)
                                            setIsClose(true)
                                            setSelectSearch('word')
                                        }}
                                        key={index}
                                    >
                                        {e?.translation?.name}
                                    </li>
                                ))}
                            {Array.isArray(dataProjectCode?.data) && (
                                <li className='font-bold text-black max-md:my-[1vw]'>Dự án</li>
                            )}
                            {Array.isArray(dataProject?.data) &&
                                dataSearch?.length > 0 &&
                                dataProject?.data?.map((e, index) => (
                                    <li
                                        className='pl-[0.5vw] line-clamp-1 max-md:py-[1vw]'
                                        title={e?.translation?.name}
                                        onClick={() => {
                                            handleCheckPage(pathName, listData) &&
                                                router.push(
                                                    '/' +
                                                        listData[0]?.translations?.find((e) =>
                                                            e?.languageCode
                                                                ?.toLowerCase()
                                                                ?.includes(lang === 'ch' ? 'cn' : lang),
                                                        )?.alias,
                                                )
                                            setIsSubmit(!isSubmit)
                                            setIsClose(true)
                                            handleSelectValueProject(e)
                                            setSelectSearch(e?.translation?.name)
                                        }}
                                        key={index}
                                    >
                                        {e?.translation?.name}
                                    </li>
                                ))}
                        </ul>
                    )}
                </form>
                {isIcon && (
                    <div
                        onClick={() => handleSubmit()}
                        className='w-[3.125vw] max-md:hidden cursor-pointer h-[3.125vw] rounded-full bg-logo flex justify-center items-center'
                    >
                        <Image
                            className='object-cover h-[2.3125vw] w-[2.3125vw]'
                            src={'/images/marker-search.svg'}
                            alt='marker search'
                            width={40}
                            height={40}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
