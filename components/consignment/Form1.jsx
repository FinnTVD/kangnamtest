'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import InputCustom from './InputCustom'
import useStore from '@/app/[lang]/(store)/store'

export default function Form1({ t, handleNextSlide, isMobile }) {
    const setDataSubmitForm = useStore((state) => state.setDataSubmitForm)
    const dataSubmitForm = useStore((state) => state.dataSubmitForm)
    const triggerSubmit = useStore((state) => state.triggerSubmit)
    const [selectedOption, setSelectedOption] = useState('sell')
    const [inputValue, setInputValue] = useState('')
    const [inputValueHire, setInputValueHire] = useState('')
    const [inputValueAddress, setInputValueAddress] = useState({
        value: '',
        validate: false,
    })
    const [inputNameHouse, setInputNameHouse] = useState('')
    const [validatePrice, setValidatePrice] = useState({
        status: false,
        validate: false,
        title: '',
    })
    const [validatePriceHire, setValidatePriceHire] = useState({
        status: false,
        validate: false,
        title: '',
    })

    useEffect(()=>{
        setSelectedOption('sell')
        setInputValue('')
        setInputValueHire('')
        setInputValueAddress({
            value:'',
            validate:false
        })
        setInputNameHouse('')
        setValidatePrice({
            status: false,
            validate: false,
            title: '',
        })
        setValidatePriceHire({
            status: false,
            validate: false,
            title: '',
        })
    },[triggerSubmit])

    const handleInputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        // Kiểm tra nếu giá trị nhập vào chỉ bao gồm các ký tự số
        if (/^\d*$/.test(value)) {
            if (name === 'price') {
                setInputValue(value)
                if (value.length >= 10) {
                    const ty = handleCheckPrice(value, 'ty')
                    setValidatePrice({
                        status: true,
                        title: ty,
                        validate: false,
                    })
                } else if (value.length >= 7) {
                    const tr = handleCheckPrice(value)
                    setValidatePrice({
                        status: true,
                        title: tr,
                        validate: false,
                    })
                } else {
                    setValidatePrice({
                        status: false,
                        title: '',
                        validate: false,
                    })
                }
            }
            if (name === 'priceHire') {
                setInputValueHire(value)
                if (value.length >= 10) {
                    const ty = handleCheckPrice(value, 'ty')
                    setValidatePriceHire({
                        status: true,
                        validate: false,
                        title: ty,
                    })
                } else if (value.length >= 7) {
                    const tr = handleCheckPrice(value)
                    setValidatePriceHire({
                        status: true,
                        validate: false,
                        title: tr,
                    })
                } else {
                    setValidatePriceHire({
                        status: false,
                        title: '',
                        validate: false,
                    })
                }
            }
        }
    }

    const handleCheckPrice = (value, options) => {
        if (!value) return
        const rank = options === 'ty' ? 1000000000 : 1000000
        const content = options === 'ty' ? ' tỷ' : ' triệu'
        const du = Number(value) % rank
        const chia = Number(value) / rank
        if (du === 0) {
            return chia + content
        } else {
            const a = chia.toFixed(3).toString().split('.')
            const str = a[1].split('')
            str[2] === '0' && str.pop()
            if (str.length === 2) {
                str[1] === '0' && str.pop()
            }
            if (str.length === 1) {
                str[0] === '0' && str.pop()
            }
            return a[0] + ',' + str.join('') + content
        }
    }
    const handleInputAddressChange = (event) => {
        setInputValueAddress({
            value: event.target.value,
            validate: false,
        })
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleDemand = (title) => {
        switch (title) {
            case 'sell':
                return 'Bán'
            case 'hire':
                return 'Cho thuê'
            case 'sellandhire':
                return 'Bán và cho thuê'
            default:
                break
        }
    }

    const handlePriceWhenSubmitForm = () => {
        if (selectedOption === 'sell') {
            return `${inputValue ? `Giá bán: ${inputValue} (${validatePrice?.title})` : ''}`
        }
        if (selectedOption === 'hire') {
            return `${inputValueHire ? `Cho thuê: ${inputValueHire} (${validatePriceHire?.title})` : ''}`
        }
        if (selectedOption === 'sellandhire') {
            return `${inputValue ? `Giá bán: ${inputValue} (${validatePrice?.title})` : ''}${
                inputValue && inputValueHire ? ' -- ' : ''
            }${inputValueHire ? `Cho thuê: ${inputValueHire} (${validatePriceHire?.title})` : ''}`
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue || !inputValueAddress?.value || (!inputValueHire && selectedOption === 'sellandhire')) {
            !inputValue && setValidatePrice({ status: false, title: '', validate: true })
            !inputValueHire &&
                selectedOption === 'sellandhire' &&
                setValidatePriceHire({ status: false, title: '', validate: true })
            !inputValueAddress?.value &&
                setInputValueAddress({
                    ...inputValueAddress,
                    validate: true,
                })
            return
        }
        const dataForm = {
            name: inputNameHouse,
            price: handlePriceWhenSubmitForm(),
            demand: handleDemand(selectedOption),
            address: inputValueAddress?.value,
        }
        setDataSubmitForm({
            ...dataSubmitForm,
            ...dataForm,
        })
        handleNextSlide()
    }

    return (
        <>
            <article className='flex shadow-input rounded-[0.5vw] max-md:rounded-[2.13vw] max-md:pt-[8.53vw] max-md:px-[2.67vw] w-full h-fit pt-[2.5vw]  pr-[7.5vw] pb-[2.19vw] px-[1.5vw] max-md:pb-[9.6vw]'>
                <div className='flex-1'>
                    <h3 className='title24-800-150 -tracking-[1.2px] text-den max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                        Thông tin cơ bản
                    </h3>
                    <span className='text-black mt-[1.5vw] mb-[1vw] max-md:mt-[5.33vw] max-md:mb-[4.27vw] title16-400-150 max-md:title-mb14-400-150 block max-lg:title-tl16'>
                        Nhu cầu của bạn là gì?
                    </span>
                    <form
                        autoComplete='false'
                        onSubmit={handleSubmit}
                    >
                        <div className='flex gap-x-[1.87vw] max-md:gap-x-[8vw]'>
                            <div className='flex gap-x-[0.69vw] items-center max-md:gap-x-[2.93vw]'>
                                <input
                                    type='radio'
                                    name='sell'
                                    id='sell'
                                    value='sell'
                                    checked={selectedOption === 'sell'}
                                    onChange={handleOptionChange}
                                    className='cursor-pointer w-[1.5vw] h-[1.5vw] accent-[#383838] max-md:w-[4.27vw] max-md:h-[4.27vw]'
                                />
                                <label
                                    htmlFor='sell'
                                    className='text-black cursor-pointer title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'
                                >
                                    Bán
                                </label>
                            </div>

                            <div className='flex gap-x-[0.69vw] items-center max-md:gap-x-[2.93vw]'>
                                <input
                                    type='radio'
                                    name='hire'
                                    id='hire'
                                    value='hire'
                                    checked={selectedOption === 'hire'}
                                    onChange={handleOptionChange}
                                    className='cursor-pointer w-[1.5vw] h-[1.5vw] accent-[#383838] max-md:w-[4.27vw] max-md:h-[4.27vw]'
                                />
                                <label
                                    htmlFor='hire'
                                    className='text-black cursor-pointer title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'
                                >
                                    Cho thuê
                                </label>
                            </div>
                            <div className='flex gap-x-[0.69vw] items-center max-md:gap-x-[2.93vw]'>
                                <input
                                    type='radio'
                                    name='sellandhire'
                                    id='sellandhire'
                                    value='sellandhire'
                                    checked={selectedOption === 'sellandhire'}
                                    onChange={handleOptionChange}
                                    className='cursor-pointer w-[1.5vw] h-[1.5vw] accent-[#383838] max-md:w-[4.27vw] max-md:h-[4.27vw]'
                                />
                                <label
                                    htmlFor='sellandhire'
                                    className='text-black cursor-pointer title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'
                                >
                                    Bán và cho thuê
                                </label>
                            </div>
                        </div>
                        <div
                            className={`flex gap-x-[1.5vw] max-md:gap-y-[4.27vw] mt-[2vw] max-md:mt-[4.27vw] max-md:flex-col ${
                                selectedOption === 'sellandhire' ? 'flex-wrap' : ''
                            }`}
                        >
                            <InputCustom
                                boxClass={'w-[17.1875vw] max-md:w-full flex justify-between items-center '}
                                labelContent={'Căn hộ'}
                                labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid text-den title16-400-150 focus:border-logo bg-white max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                                }
                                required={false}
                                register={'name'}
                                value={inputNameHouse}
                                onChange={(e) => setInputNameHouse(e?.target?.value)}
                            />
                            <InputCustom
                                boxClass={'flex-1'}
                                labelContent={t?.Form1?.sell}
                                labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                                status={validatePrice?.status}
                                title={validatePrice?.title}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid text-den title16-400-150 focus:border-logo bg-white max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                                }
                                register={'price'}
                                value={inputValue}
                                validate={validatePrice?.validate}
                                onChange={handleInputChange}
                            />
                            {selectedOption === 'sellandhire' && (
                                <InputCustom
                                    boxClass={'flex-1'}
                                    labelContent={t?.Form1?.hire}
                                    labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                                    status={validatePriceHire?.status}
                                    title={validatePriceHire?.title}
                                    inputClass={
                                        'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid text-den title16-400-150 focus:border-logo bg-white max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                                    }
                                    register={'priceHire'}
                                    value={inputValueHire}
                                    validate={validatePriceHire?.validate}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                        <InputCustom
                            boxClass={'w-full h-fit mt-[1.5vw] max-md:mt-[4.27vw] '}
                            labelContent={'Địa chỉ'}
                            labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                            inputClass={
                                'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid text-den focus:border-logo title16-400-150 max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                            }
                            register={'address'}
                            value={inputValueAddress?.value}
                            validate={inputValueAddress?.validate}
                            onChange={handleInputAddressChange}
                        />
                        {isMobile && (
                            <div className='w-full h-[63.2vw] rounded-[2.13vw] relative mt-[4.27vw]'>
                                <Image
                                    src='/images/form1.jpg'
                                    alt='bg-form'
                                    sizes='100vw'
                                    fill
                                />
                            </div>
                        )}
                        <div className='flex justify-center'>
                            <button className='flex gap-x-[0.75vw] max-md:gap-x-[2.4vw] items-center py-[0.56vw] px-[1.09vw] mt-[2.44vw] max-md:mt-[5.33vw] max-md:py-[1.56vw] max-md:px-[3.09vw] w-fit h-fit border border-solid border-nu rounded-[10vw]'>
                                <span className='text-nu title14-400-150 max-md:title-mb16-600-150 max-lg:title-tl16'>Bước 2</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='11'
                                    height='7'
                                    viewBox='0 0 11 7'
                                    fill='none'
                                >
                                    <path
                                        d='M10.5 1L5.5 6L0.5 1'
                                        stroke='#412A1A'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </article>
        </>
    )
}
