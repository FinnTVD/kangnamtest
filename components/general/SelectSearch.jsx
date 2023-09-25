'use client'

import useClickOutSide from '@/hooks/useClickOutSide'
import { useCallback, useEffect, useState } from 'react'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useStore from '@/app/[lang]/(store)/store'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'

const objProject = {
    id: '',
    translations: [
        {
            languageCode: 'vi_VN',
            name: 'Dự án',
            alias: 'du-an',
            propertyCategoryId: '',
        },
        {
            languageCode: 'en_US',
            alias: 'du-an',
            name: 'Project',
            propertyCategoryId: '',
        },
        {
            languageCode: 'zh_CN',
            alias: 'du-an',
            name: 'Project',
            propertyCategoryId: '',
        },
        {
            languageCode: 'ko_KR',
            alias: 'du-an',
            name: 'Project',
            propertyCategoryId: '',
        },
    ],
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function SelectSearch({ type = 'dark', menu = false, lang }) {
    // const router = useRouter()
    const pathName = usePathname()
    // const searchParams = useSearchParams()
    const setListData = useStore((state) => state.setListData)
    const listData = useStore((state) => state.listData)
    const [isOpen, setIsOpen] = useState(false)
    const [sideRef, isOutSide] = useClickOutSide()
    useEffect(() => {
        isOutSide && setIsOpen(false)
    }, [isOutSide])

    // const createQueryString = useCallback(
    //     (name, value) => {
    //         const params = new URLSearchParams(searchParams)
    //         params.set(name, value)

    //         return params.toString()
    //     },
    //     [searchParams],
    // )

    // const handleCheckValueInput = (e) => {
    //     router.push(pathName + '?' + createQueryString('propertyCategoryIds', e?.id), {
    //         scroll: false,
    //     })
    // }

    const { data, isLoading, error } = useSWR('https://cms-kangnam.okhub.tech/api/v1/property-category', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    console.log('🚀 ~ file: SelectSearch.jsx:74 ~ SelectSearch ~ data:', data)

    useEffect(() => {
        // data && setListData([objProject, ...data?.data])
        if (data) {
            const dataNew = data?.data?.filter((e) =>
                e?.translations?.find((i) => i?.alias?.includes(pathName?.slice(1))),
            )
            console.log('🚀 ~ file: SelectSearch.jsx:81 ~ useEffect ~ dataNew:', dataNew)
            dataNew?.length === 1 ? setListData(dataNew) : setListData([objProject, ...data?.data])
        }
    }, [data, pathName])

    const handleChangeSearch = (item) => {
        setListData([listData?.find((e) => e.id === item.id), ...listData?.filter((e) => e.id !== item.id)])
        setIsOpen(false)
        // handleCheckValueInput(item)
    }

    return (
        <div
            ref={sideRef}
            onClick={() => setIsOpen(!isOpen)}
            className={`${type === 'white' ? 'text-white' : 'text-den'} ${
                menu ? 'max-md:title-mb12-400-130' : 'max-md:title-mb14-400-130'
            } gap-x-[0.13vw] select-none cursor-pointer flex items-center max-lg:title-tl12-400-130 title14-400-130 whitespace-nowrap relative`}
        >
            {listData[0]?.translations?.find((e) => e?.languageCode?.toLowerCase()?.includes(lang))?.name}
            {listData?.length > 1 && (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke={`${type === 'white' ? 'white' : '#D6A279'}`}
                    className='w-[1vw] h-[1vw] max-md:w-[5vw] max-md:h-[3vw] max-lg:w-[2.5vw] max-lg:h-auto'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                </svg>
            )}
            <ul
                style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                className={`${
                    !isOpen || isOutSide ? 'hidden' : ''
                } absolute top-[2.5vw] -left-[1vw] rounded-md bg-white py-[0.5vw] text-den max-md:top-[7.5vw] max-md:-left-[3vw] max-md:py-[1vw]`}
            >
                {listData?.length > 1 &&
                    listData?.slice(1)?.map((e, index) => (
                        <li
                            onClick={() => handleChangeSearch(e)}
                            key={index}
                            className={`${
                                menu ? 'title-mb12-400-130' : 'title-mb14-400-130'
                            } py-[0.5vw] max-md:py-[1.5vw] max-md:px-[3vw] px-[1vw] hover:bg-[#f3f4f7] title-tl12-400-130`}
                        >
                            {
                                e?.translations?.find((i) =>
                                    i?.languageCode?.toLowerCase()?.includes(lang === 'ch' ? 'cn' : lang),
                                )?.name
                            }
                        </li>
                    ))}
            </ul>
        </div>
    )
}
