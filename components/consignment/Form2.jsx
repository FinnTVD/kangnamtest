'use client'
import useResizeArea from '@/hooks/useResizeArea'
import classes from './form2.module.css'
import { useEffect, useState } from 'react'
import InputCustom from './InputCustom'
import useStore from '@/app/[lang]/(store)/store'

export default function Form2({ handlePrevSlide, handleNextSlide, isMobile }) {
    const setDataSubmitForm = useStore((state) => state.setDataSubmitForm)
    const dataSubmitForm = useStore((state) => state.dataSubmitForm)
    const triggerSubmit = useStore((state) => state.triggerSubmit)
    const [areaRef, heightArea, handleResizeHeight] = useResizeArea()
    const [isHost, setIsHost] = useState(false)
    const [valueFullName, setValueFullName] = useState({
        value: '',
        validate: false,
    })
    const [valuePhoneNumber, setValuePhoneNumber] = useState({
        value: '',
        validate: false,
    })
    const [valueEmail, setValueEmail] = useState({
        value: '',
        validate: false,
    })
    const [valueNote, setValueNote] = useState('')


    useEffect(()=>{
        setIsHost(false)
        setValueFullName({
            value:'',
            validate:false
        })
        setValuePhoneNumber({
            value:'',
            validate:false
        })
        setValueEmail({
            value:'',
            validate:false
        })
        setValueNote('')
    },[triggerSubmit])

    const validateEmail = (input) => {
        // Biểu thức chính quy để kiểm tra địa chỉ email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(input)
    }

    const handleChangeFullName = (e) => {
        setValueFullName({
            value: e?.target?.value,
            validate: false,
        })
    }

    const handleChangePhoneNumber = (e) => {
        if (/^\d*$/.test(e?.target?.value)) {
            setValuePhoneNumber({
                value: e?.target?.value,
                validate: false,
            })
        }
    }

    const handleChangeEmail = (e) => {
        setValueEmail({
            value: e?.target?.value,
            validate: false,
        })
    }
    const handleChangeNote = (e) => {
        handleResizeHeight(e)
        setValueNote(e?.target?.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!valueEmail?.value || !valueFullName?.value || !valuePhoneNumber?.value) {
            !valueFullName?.value &&
                setValueFullName({
                    ...valueFullName,
                    validate: true,
                })
            !valuePhoneNumber?.value &&
                setValuePhoneNumber({
                    ...valuePhoneNumber,
                    validate: true,
                })
            !valueEmail?.value &&
                setValueEmail({
                    ...valueEmail,
                    validate: true,
                })
            return
        }
        if (!validateEmail(valueEmail?.value)) {
            setValueEmail({
                ...valueEmail,
                validate: true,
            })
            return
        }

        const dataForm = {
            isHost: isHost,
            fullName: valueFullName?.value,
            phone: valuePhoneNumber?.value,
            email: valueEmail?.value,
            message: valueNote,
        }
        setDataSubmitForm({
            ...dataSubmitForm,
            ...dataForm,
        })
        handleNextSlide()
    }

    return (
        <>
            <article className='flex relative items-center shadow-input rounded-[1vw] w-full h-fit gap-x-[3.5vw] pt-[5.81vw] pb-[7.69vw] max-md:pb-[8.53vw] px-[2.5vw] pr-[7.5vw] max-md:pt-[14.93vw] max-md:px-[2.67vw] max-md:rounded-[2.13vw] max-lg:gap-y-[3vw]'>
                <div
                    onClick={handlePrevSlide}
                    className='absolute left-[2.75vw] top-[2.25vw] flex py-[0.56vw] gap-x-[0.75vw] max-md:gap-x-[2.4vw] items-center cursor-pointer pr-[1vw] border border-solid border-nu rounded-[10vw] px-[1.09vw] max-md:py-[1.56vw] max-md:px-[3.09vw]'
                >
                    <span className='text-nu title14-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'>Trở lại</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='11'
                        height='7'
                        viewBox='0 0 11 7'
                        fill='none'
                        className='rotate-180'
                    >
                        <path
                            d='M10.5 1L5.5 6L0.5 1'
                            stroke='#412A1A'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
                <div className='relative flex-1 max-lg:mt-[2vw] max-md:mt-0'>
                    <h3 className='title24-800-150 -tracking-[1.2px] text-den max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                        Thông tin liên hệ
                    </h3>
                    <form
                        autoComplete='false'
                        onSubmit={handleSubmit}
                    >
                        <div className='flex gap-x-[0.5vw] my-[1.25vw] max-md:my-[4.27vw] max-md:gap-x-[2.13vw] items-center'>
                            <input
                                type='checkbox'
                                name='ourHouse'
                                id='ourHouse'
                                checked={isHost}
                                onChange={() => setIsHost(!isHost)}
                                className={`${classes['ourHouse']} cursor-pointer max-md:w-[4.27vw] max-md:h-[4.27vw]`}
                            />
                            <label
                                htmlFor='ourHouse'
                                className={`${classes['label-ourHouse']} select-none text-[#9E9E9E] cursor-pointer title16-400-150 max-md:title-mb14-400-150 focus:text-den max-lg:title-tl14`}
                            >
                                Tôi là chủ nhà
                            </label>
                        </div>
                        <div className='flex gap-x-[1vw] mt-[2vw] max-md:mt-0 max-md:flex-col max-md:gap-y-[4.27vw]'>
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid text-den title16-400-150 max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                                }
                                labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                                labelContent={'Họ và tên'}
                                register={'fullName'}
                                value={valueFullName?.value}
                                validate={valueFullName?.validate}
                                onChange={handleChangeFullName}
                            />
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                                }
                                register={'numberPhone'}
                                labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                                labelContent={'Số điện thoại'}
                                value={valuePhoneNumber?.value}
                                validate={valuePhoneNumber?.validate}
                                type='tel'
                                onChange={handleChangePhoneNumber}
                            />
                        </div>
                        <InputCustom
                            boxClass={'w-full my-[1vw] max-md:my-[4.27vw]'}
                            inputClass={
                                'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12'
                            }
                            labelClass={'title16-400-150 max-md:title-mb12-400-150 max-lg:title-tl12'}
                            labelContent={'Email'}
                            register={'email'}
                            value={valueEmail?.value}
                            validate={valueEmail?.validate}
                            onChange={handleChangeEmail}
                        />
                        <div className='relative'>
                            <textarea
                                ref={areaRef}
                                onChange={handleChangeNote}
                                value={valueNote}
                                className={`${
                                    valueNote ? '' : 'focus-input-active'
                                } py-[1vw] px-[1.5vw] resize-none rounded-[1vw] text-den border border-solid border-[#C5C5C5] w-full outline-none max-md:title-mb12-400-150 max-md:px-[4.27vw] max-md:py-[2.93vw] max-lg:title-tl12`}
                                id='note'
                                name='note'
                                style={{
                                    height: heightArea ? `${heightArea}px` : `${isMobile ? '26vw' : '8.625vw'}`,
                                }}
                            ></textarea>
                            <label
                                htmlFor='note'
                                className={`${
                                    valueNote ? 'top-0 -translate-y-1/2' : 'top-[1vw]'
                                } absolute text-[#646464] left-[1vw] max-md:left-[3vw] max-md:px-[1.27vw] px-[0.5vw] bg-white cursor-pointer title16-400-150 max-md:title-mb12-400-150 transition-all duration-300 max-lg:title-tl12`}
                            >
                                Lời nhắn
                            </label>
                        </div>
                        <div className='flex justify-center'>
                            <button className='flex gap-x-[0.75vw] max-md:gap-x-[2.4vw] items-center py-[0.56vw] px-[1.09vw] mt-[2.44vw] w-fit h-fit border border-solid border-nu rounded-[10vw] max-md:mt-[4.27vw] max-md:py-[1.56vw] max-md:px-[3.09vw]'>
                                <span className='text-nu title14-400-150 max-md:title-mb16-600-150 max-lg:title-tl16'>Bước 3</span>
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
