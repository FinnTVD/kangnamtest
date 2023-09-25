'use client'
import useSWR from 'swr'
import useStore from '@/app/[lang]/(store)/store'
import { useState } from 'react'
import ItemCheckBox from './ItemCheckBox'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function FilterCheckBox({ className, setIndexFilter, index, isOutSide }) {
    const setPropertyAreaType = useStore((state) => state.setPropertyAreaType)
    const setPropertyType = useStore((state) => state.setPropertyType)
    const setPropertyCategory = useStore((state) => state.setPropertyCategory)

    const [area, setArea] = useState([])
    const [type, setType] = useState([])
    const [category, setCategory] = useState([])
    const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_API +
            `${index === 1 ? '/property-area-type' : index === 0 ? '/property-type' : '/property-category'}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )
    const handleCheckbox = (event, id) => {
        if (index === 1) {
            if (!area.length) {
                setArea((prev) => [
                    ...prev,
                    {
                        id,
                        status: event.target.checked,
                    },
                ])
            } else {
                const areaNews = [...area]
                const index = areaNews?.findIndex((e) => e.id === id)
                if (index === -1) {
                    const areaNews = [...area]
                    areaNews.push({
                        id,
                        status: event.target.checked,
                    })
                    setArea([...areaNews])
                } else {
                    const areaNews = [...area]
                    areaNews[index].status = event.target.checked
                    setArea([...areaNews])
                }
            }
        }
        if (index === 0) {
            if (!setType.length) {
                setType((prev) => [
                    ...prev,
                    {
                        id,
                        status: event.target.checked,
                    },
                ])
            } else {
                const typeNews = [...type]
                const index = typeNews?.findIndex((e) => e.id === id)
                if (index === -1) {
                    const typeNews = [...type]
                    typeNews.push({
                        id,
                        status: event.target.checked,
                    })
                    setType([...typeNews])
                } else {
                    const typeNews = [...type]
                    typeNews[index].status = event.target.checked
                    setType([...typeNews])
                }
            }
        }
        if (index === 2) {
            if (!setCategory.length) {
                setCategory((prev) => [
                    ...prev,
                    {
                        id,
                        status: event.target.checked,
                    },
                ])
            } else {
                const categoryNews = [...category]
                const index = categoryNews?.findIndex((e) => e.id === id)
                if (index === -1) {
                    const categoryNews = [...category]
                    categoryNews.push({
                        id,
                        status: event.target.checked,
                    })
                    setCategory([...categoryNews])
                } else {
                    const categoryNews = [...category]
                    categoryNews[index].status = event.target.checked
                    setCategory([...categoryNews])
                }
            }
        }
    }

    const handleApply = () => {
        if (index === 1) {
            const areaType = []
            area.filter((e) => {
                if (e.status) {
                    areaType.push(e.id)
                }
            })
            setPropertyAreaType(areaType)
        }
        if (index === 0) {
            const typeList = []

            type.filter((e) => {
                if (e.status) {
                    typeList.push(e.id)
                }
            })
            setPropertyType(typeList)
        }
        if (index === 2) {
            const categoryList = []

            category.filter((e) => {
                if (e.status) {
                    categoryList.push(e.id)
                }
            })
            setPropertyCategory(categoryList)
        }

        setIndexFilter(-1)
    }
    return (
        <div
            className={`${className} absolute z-50 left-0 -bottom-[1.5vw] translate-y-full flex flex-col shadow-boxFilter rounded-[0.75vw] bg-white w-[20.875vw] gap-y-[2.3vw] max-md:gap-y-[6.4vw] transition-all duration-[2s] ease-linear max-md:w-[94vw] max-md:rounded-xl`}
        >
            <div className='px-[1.5vw] pt-[1.5vw] max-md:pt-[6.4vw] max-md:px-[5.87vw]'>
                <p className='text-den title16-600-150 whitespace-nowrap mb-[1.5vw] max-md:mb-[6.4vw] title-mb16-600-150'>
                    Chọn loại hình bất động sản
                </p>
                <div className='grid grid-cols-2 gap-x-[2.3vw] gap-y-[1vw] max-md:gap-x-[9.07vw] max-md:gap-y-[4.27vw]'>
                    {data &&
                        data?.data?.map((e, i) => (
                            <ItemCheckBox
                                key={i}
                                index={index}
                                e={e}
                                handleCheckbox={handleCheckbox}
                                isOutSide={isOutSide}
                            />
                        ))}
                </div>
            </div>
            <div className='border-t border-solid border-black01 flex justify-between items-center py-[1vw] px-[1.5vw] max-md:py-[5.6vw] max-md:px-[6.4vw]'>
                <span
                    onClick={() => {
                        if (index === 0) {
                            setPropertyType([])
                            setType([])
                        }
                        if (index === 1) {
                            setPropertyAreaType([])
                            setArea([])
                        }
                        if (index === 2) {
                            setPropertyCategory([])
                            setCategory([])
                        }
                    }}
                    className='cursor-pointer title14-400-150 text-den title-mb14-400-150 py-[0.28vw] pr-[1vw] max-md:py-[1.2vw] max-md:pr-[4.27vw]'
                >
                    Đặt lại
                </span>
                <div className='flex gap-x-[0.63vw] max-md:gap-x-[2.67vw]'>
                    <button
                        onClick={() => setIndexFilter(-1)}
                        className='py-[0.28vw] px-[1vw] rounded-[10vw] border border-solid border-logo text-den title14-400-150 title-mb14-400-150 max-md:py-[1.2vw] max-md:px-[4.27vw]'
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleApply}
                        className='py-[0.28vw] px-[1vw] rounded-[10vw] border border-solid border-logo text-logo title14-400-150 title-mb14-400-150 max-md:py-[1.2vw] max-md:px-[4.27vw]'
                    >
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    )
}
