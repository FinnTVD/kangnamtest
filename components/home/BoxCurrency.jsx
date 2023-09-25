'use client'
import useDebounce from '@/hooks/useDebounce'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const listCurrency = [
    {
        id: 1,
        code: 'VND',
        src: '/images/vnd.svg',
    },
    {
        id: 2,
        code: 'USD',
        src: '/images/usd.svg',
    },
    {
        id: 3,
        code: 'KRW',
        src: '/images/krw.png',
    },
    {
        id: 4,
        code: 'CNY',
        src: '/images/cny.png',
    },
]

const handleRenderCode = (codeFrom, codeTo, status) => {
    if (status === 'from') {
        if (codeFrom === 'USD' || codeTo === 'USD') {
            return 'USD'
        }
        if (codeFrom === 'CNY' || codeTo === 'CNY') {
            return 'CNY'
        }
        if (codeFrom === 'KRW' || codeTo === 'KRW') {
            return 'KRW'
        }
    } else {
        if (codeFrom === 'VND' || codeTo === 'VND') {
            return 'VND'
        }
        if (codeFrom === 'KRW' || codeTo === 'KRW') {
            return 'KRW'
        }
        if (codeFrom === 'CNY' || codeTo === 'CNY') {
            return 'CNY'
        }
    }
}

const handleCurrency = (codeFrom, codeTo, input, value) => {
    if (!input) return ''
    if (codeFrom === 'VND') {
        return handleFormat((Number(input) / Number(value)).toFixed(3))
    }
    if (codeFrom === 'KRW' && codeTo !== 'VND') return handleFormat((Number(input) / Number(value)).toFixed(3))
    if (codeFrom === 'CNY' && codeTo !== 'KRW' && codeTo !== 'VND')
        return handleFormat((Number(input) / Number(value)).toFixed(3))
    if (codeFrom === 'USD') return handleFormat(Number(input) * Number(value))
    if (codeFrom === 'CNY' && codeFrom !== 'USD') return handleFormat(Number(input) * Number(value))
    if (codeFrom === 'KRW' && codeFrom !== 'USD' && codeFrom !== 'CNY') {
        return handleFormat(Number(input) * Number(value))
    }
}

export default function BoxCurrency({ className = '' }) {
    const [codeFrom, setCodeFrom] = useState('VND')
    const [codeTo, setCodeTo] = useState('USD')
    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value, 500)
    const { data, isLoading, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/currency/get-by-code?codeFrom=${handleRenderCode(
            codeFrom,
            codeTo,
            'from',
        )}&codeTo=${handleRenderCode(codeFrom, codeTo, 'to')}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    const handleSwapCurrency = () => {
        setCodeTo(codeFrom)
        setCodeFrom(codeTo)
    }

    const handleRenderTime = (time) => {
        const date = new Date(time)
        const hour = date.getHours().toString().padStart(2, '0')
        const minus = date.getMinutes().toString().padStart(2, '0')
        return hour + ':' + minus
    }

    const handleFormat = (value) => {
        if (!value) return
        let a = value?.toString()?.split('.')
        let b = a[0].split('').reverse()
        const str = []
        for (let i = 0; i < b.length; i++) {
            if (i % 3 === 2 && b.length - 1 > i) {
                str.push(b[i])
                str.push(',')
            } else {
                str.push(b[i])
            }
        }
        let c = str.reverse()
        let d = a?.length === 1 ? '' : '.' + a[1]
        return c.join('') + d
    }

    const handleSrcIcon = (code) => {
        let a = listCurrency?.find((e) => e?.code === code)
        return a?.src
    }
    return (
        <div
            className={`${className} absolute -left-[1.88vw] top-1/2 -translate-y-1/2 -translate-x-full py-[1.69vw] px-[1.5vw] rounded-[0.75vw] bg-white`}
        >
            <span className='block mx-auto text-den title20-700-130'>Chuyển đổi tiền tệ</span>
            <label
                htmlFor='currency-default'
                className='text-den title10-400-150 opacity-50 mb-[0.31vw] cursor-pointer block'
            >
                Số tiền
            </label>
            <div className='w-[15.8125vw] rounded-[6.25vw] px-[1vw] py-[0.6vw] flex shadow-currency'>
                <input
                    type='number'
                    className='outline-none w-[80%] text-den title14-400-150 placeholder:opacity-50 placeholder:font-normal placeholder:leading-[1.5]'
                    id='currency-default'
                    placeholder='Nhập số tiền'
                    value={value}
                    onChange={(e) => {
                        setValue(e?.target?.value)
                    }}
                />
                <div className='flex items-center'>
                    <Image
                        src={handleSrcIcon(codeFrom)}
                        alt={codeFrom}
                        width={16}
                        height={16}
                        className='object-cover w-[1vw] h-[1vw] rounded-full'
                    />
                    <select
                        name=''
                        id=''
                        className='outline-none text-den'
                        onChange={(e) => setCodeFrom(e?.target?.value)}
                        defaultValue={codeFrom}
                        value={codeFrom}
                    >
                        {listCurrency
                            ?.filter((e) => e?.code !== codeTo)
                            ?.map((e, index) => (
                                <option
                                    key={index}
                                    value={e?.code}
                                >
                                    {e?.code}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='17'
                height='13'
                viewBox='0 0 17 13'
                fill='none'
                className='py-[0.75vw] px-[0.5vw] mx-auto cursor-pointer box-content'
                onClick={handleSwapCurrency}
            >
                <path
                    d='M3.64645 12.3536C3.84171 12.5488 4.15829 12.5488 4.35355 12.3536L7.53553 9.17157C7.7308 8.97631 7.7308 8.65973 7.53553 8.46447C7.34027 8.2692 7.02369 8.2692 6.82843 8.46447L4 11.2929L1.17157 8.46447C0.97631 8.2692 0.659728 8.2692 0.464466 8.46447C0.269204 8.65973 0.269204 8.97631 0.464466 9.17157L3.64645 12.3536ZM3.5 1L3.5 12L4.5 12L4.5 1L3.5 1Z'
                    fill='#D6A279'
                />
                <path
                    d='M13.3536 0.646446C13.1583 0.451184 12.8417 0.451184 12.6464 0.646446L9.46447 3.82843C9.2692 4.02369 9.2692 4.34027 9.46447 4.53553C9.65973 4.7308 9.97631 4.7308 10.1716 4.53553L13 1.70711L15.8284 4.53553C16.0237 4.7308 16.3403 4.7308 16.5355 4.53553C16.7308 4.34027 16.7308 4.02369 16.5355 3.82843L13.3536 0.646446ZM13.5 12L13.5 1H12.5L12.5 12H13.5Z'
                    fill='#D6A279'
                />
            </svg>
            <label
                htmlFor='currency-new'
                className='text-den title10-400-150 opacity-50 mb-[0.31vw] block cursor-pointer'
            >
                Chuyển đổi thành
            </label>

            <div className='w-[15.8125vw] rounded-[6.25vw] px-[1vw] py-[0.6vw] flex shadow-currency'>
                <input
                    type='text'
                    placeholder='Thành tiền'
                    id='currency-new'
                    className='outline-none w-[80%] text-den title14-400-150 placeholder:opacity-50 placeholder:font-normal placeholder:leading-[1.5] pointer-events-none'
                    value={handleCurrency(codeFrom, codeTo, debounceValue, data?.value)}
                />
                <div className='flex items-center'>
                    <Image
                        src={handleSrcIcon(codeTo)}
                        alt={codeTo}
                        width={16}
                        height={16}
                        className='object-cover w-[1vw] h-[1vw] rounded-full'
                    />
                    <select
                        name=''
                        id=''
                        className='outline-none text-den'
                        onChange={(e) => setCodeTo(e?.target?.value)}
                        defaultValue={codeTo}
                        value={codeTo}
                    >
                        {listCurrency
                            ?.filter((e) => e?.code !== codeFrom)
                            ?.map((e, index) => (
                                <option
                                    key={index}
                                    value={e?.code}
                                    disabled={e?.code === codeFrom}
                                >
                                    {e?.code}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className='text-13pc text-den leading-[1.5] font-normal mt-[2vw] mb-[0.5vw] flex justify-center'>
                <span>1 {data?.codeFrom}</span>
                <span className='mx-[0.5vw]'>=</span>
                <span className='text-nau-nhat'>{handleFormat(data?.value)}</span>
                <span className='ml-[2px] text-nau-nhat'>{data?.codeTo}</span>
            </div>
            <p className='text-center text-den opacity-70 title10-400-150'>
                Tỷ giá chuyển đổi thực vào lúc {handleRenderTime(data?.updatedAt)} UTC
            </p>
        </div>
    )
}
