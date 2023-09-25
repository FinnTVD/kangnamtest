'use client'
import Image from 'next/image'
import Button from '../general/Button'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useResizeArea from '@/hooks/useResizeArea'
import SelectCategory from './SelectCategory'
import { useState } from 'react'
import src from '../../public/images/form-contact.jpg'
import postData from '@/utils/postData'
import { notifyError, notifySuccess } from '@/utils'
import { ToastContainer } from 'react-toastify'



const listSocial = [
    {
        id: 1,
        src: '/images/talk.svg',
        title: 'kakao talk',
    },
    {
        id: 2,
        src: '/images/wechat.svg',
        title: 'wechat',
    },
    {
        id: 3,
        src: '/images/zalo.svg',
        title: 'zalo',
    },
    {
        id: 4,
        src: '/images/telegram.svg',
        title: 'telegram',
    },
    {
        id: 5,
        src: '/images/skype.svg',
        title: 'skype',
    },
    {
        id: 6,
        src: '/images/linkedin.svg',
        title: 'linkedin',
    },
]

const schema = yup
    .object({
        name: yup.string().required('Vui lòng điền họ tên!'),
        phone: yup
            .string()
            .test('is-number', 'Số điện thoại không hợp lệ!', (value) => {
                if (value && isNaN(value)) {
                    return false
                }
                return true
            })
            .required('Vui lòng điền số điện thoại!'),
        email: yup
            .string()
            .required('Vui lòng điền email!')
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ!'),
    })
    .required()

export default function FormContact() {
    const [valueCategory, setValueCategory] = useState('')
    const [areaRef, heightArea, handleResizeHeight] = useResizeArea()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePostDataForm = async (api, data) => {
        const res = await postData(api, data)
        if (res?.statusCode) {
            return notifyError(res?.error)
        }
        notifySuccess()
    }

    const onSubmit = (e) => {
        const dataForm = {
            ...e,
            category: valueCategory,
        }
        handlePostDataForm('/contact', dataForm)
    }

    return (
        <section className='px-120 pt-[8.12vw] pb-[6.88vw] px-mb10 max-md:pb-[16vw]'>
            <div className='flex gap-x-[2.25vw] max-lg:flex-col max-md:gap-y-[10.13vw] max-lg:gap-y-[5vw]'>
                <div className='w-[41vw] h-[46.8125vw] max-md:h-[102.13vw] flex items-end rounded-[1vw] max-md:rounded-[4.27vw] overflow-hidden px-[1.75vw] py-[2.44vw] relative max-lg:w-full max-md:px-[4.53vw] max-md:py-[6.4vw] max-lg:h-[70vw]'>
                    <Image
                        src={src}
                        alt='form-contact'
                        sizes='41vw'
                        fill
                        placeholder='blur'
                        className='z-0 object-cover'
                    />
                    <div className='relative z-10 px-[1.75vw] pt-[1.5vw] pb-[2.31vw] rounded-[1vw] border border-solid border-white09 backdrop-blur-[11.1199px] bg-white07 w-full h-fit max-md:px-[3.2vw] max-md:pt-[5.6vw] max-md:pb-[4.53vw]'>
                        <span className='sub-title block mb-[1.25vw] max-md:mb-[4.27vw] max-md:title-mb14-700-130 max-lg:title-tl14'>
                            Thông tin liên hệ
                        </span>
                        <ul className='flex flex-col gap-y-[1vw] max-md:gap-y-[3.2vw]'>
                            <li className='flex gap-x-[0.5vw] max-md:gap-x-[1.07vw] items-center max-md:items-start'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    className='w-[1.25vw] h-[1.25vw] max-md:w-[5vw] max-md:h-[5vw] max-lg:w-[2.5vw] max-lg:h-[2.5vw]'
                                >
                                    <path
                                        d='M10.0006 9.79297C10.4021 9.79297 10.7452 9.64999 11.0299 9.36403C11.3147 9.07809 11.457 8.73434 11.457 8.33278C11.457 7.93124 11.3141 7.58811 11.0281 7.30339C10.7422 7.01866 10.3984 6.8763 9.99684 6.8763C9.5953 6.8763 9.25217 7.01928 8.96745 7.30524C8.68273 7.59118 8.54037 7.93493 8.54037 8.33649C8.54037 8.73803 8.68334 9.08116 8.9693 9.36588C9.25525 9.65061 9.599 9.79297 10.0006 9.79297ZM9.9987 16.6888C11.8459 15.0082 13.2105 13.4839 14.0924 12.1159C14.9744 10.7478 15.4154 9.54297 15.4154 8.5013C15.4154 6.86533 14.8925 5.52578 13.8468 4.48266C12.8011 3.43953 11.5184 2.91797 9.9987 2.91797C8.47902 2.91797 7.19632 3.43953 6.15061 4.48266C5.10489 5.52578 4.58203 6.86533 4.58203 8.5013C4.58203 9.54297 5.03342 10.7478 5.9362 12.1159C6.83898 13.4839 8.19314 15.0082 9.9987 16.6888ZM9.9987 18.3346C7.76259 16.4319 6.09245 14.6645 4.98828 13.0326C3.88411 11.4006 3.33203 9.89019 3.33203 8.5013C3.33203 6.41797 4.00217 4.75825 5.34245 3.52214C6.68273 2.28602 8.23481 1.66797 9.9987 1.66797C11.7626 1.66797 13.3147 2.28602 14.6549 3.52214C15.9952 4.75825 16.6654 6.41797 16.6654 8.5013C16.6654 9.89019 16.1133 11.4006 15.0091 13.0326C13.9049 14.6645 12.2348 16.4319 9.9987 18.3346Z'
                                        fill='#57534E'
                                    />
                                </svg>
                                <span className='text-den-2 title16-400-150 max-md:title-mb14-400-150 max-lg:title-tl14'>
                                    Villa e11, The Manor, KĐT mới Mỹ Đình - Mễ Trì, Nam từ Liêm, Hà Nội
                                </span>
                            </li>
                            <li className='flex gap-x-[0.5vw] max-md:gap-x-[1.07vw] items-center'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='21'
                                    viewBox='0 0 20 21'
                                    fill='none'
                                    className='max-md:w-[5vw] max-md:h-[5vw]'
                                >
                                    <path
                                        d='M16.5625 18C14.8681 18 13.184 17.5833 11.5104 16.75C9.83681 15.9167 8.33333 14.8333 7 13.5C5.66667 12.1667 4.58333 10.6632 3.75 8.98958C2.91667 7.31597 2.5 5.63194 2.5 3.9375C2.5 3.66964 2.58928 3.44642 2.76785 3.26785C2.94642 3.08928 3.16964 3 3.4375 3H6.35417C6.54321 3 6.712 3.06597 6.86054 3.19792C7.00907 3.32986 7.10417 3.50694 7.14583 3.72917L7.70833 6.35417C7.73611 6.54861 7.73264 6.72569 7.69792 6.88542C7.66319 7.04514 7.59028 7.18056 7.47917 7.29167L5.39583 9.39583C6.17361 10.6875 7.04514 11.8125 8.01042 12.7708C8.97569 13.7292 10.0694 14.5417 11.2917 15.2083L13.2708 13.1667C13.4097 13.0139 13.5694 12.9062 13.75 12.8438C13.9306 12.7812 14.1111 12.7708 14.2917 12.8125L16.7708 13.3542C16.9835 13.401 17.1582 13.5065 17.2949 13.6706C17.4316 13.8346 17.5 14.0278 17.5 14.25V17.0625C17.5 17.3304 17.4107 17.5536 17.2321 17.7321C17.0536 17.9107 16.8304 18 16.5625 18ZM4.77083 8.25L6.45833 6.54167L5.97917 4.25H3.75C3.75 4.79167 3.83333 5.38542 4 6.03125C4.16667 6.67708 4.42361 7.41667 4.77083 8.25ZM12.4583 15.8125C13.0278 16.0764 13.6458 16.2917 14.3125 16.4583C14.9792 16.625 15.625 16.7222 16.25 16.75V14.5208L14.1042 14.0833L12.4583 15.8125Z'
                                        fill='#57534E'
                                    />
                                </svg>
                                <span className='text-den-2 title16-400-130 max-md:title-mb14-400-130 max-lg:title-tl14'>
                                    +84 337858021 / +84 339625612
                                </span>
                            </li>
                            <li className='flex gap-x-[0.5vw] max-md:gap-x-[1.07vw] items-center'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='21'
                                    viewBox='0 0 20 21'
                                    fill='none'
                                    className='max-md:w-[5vw] max-md:h-[5vw]'
                                >
                                    <path
                                        d='M16.5625 18C14.8681 18 13.184 17.5833 11.5104 16.75C9.83681 15.9167 8.33333 14.8333 7 13.5C5.66667 12.1667 4.58333 10.6632 3.75 8.98958C2.91667 7.31597 2.5 5.63194 2.5 3.9375C2.5 3.66964 2.58928 3.44642 2.76785 3.26785C2.94642 3.08928 3.16964 3 3.4375 3H6.35417C6.54321 3 6.712 3.06597 6.86054 3.19792C7.00907 3.32986 7.10417 3.50694 7.14583 3.72917L7.70833 6.35417C7.73611 6.54861 7.73264 6.72569 7.69792 6.88542C7.66319 7.04514 7.59028 7.18056 7.47917 7.29167L5.39583 9.39583C6.17361 10.6875 7.04514 11.8125 8.01042 12.7708C8.97569 13.7292 10.0694 14.5417 11.2917 15.2083L13.2708 13.1667C13.4097 13.0139 13.5694 12.9062 13.75 12.8438C13.9306 12.7812 14.1111 12.7708 14.2917 12.8125L16.7708 13.3542C16.9835 13.401 17.1582 13.5065 17.2949 13.6706C17.4316 13.8346 17.5 14.0278 17.5 14.25V17.0625C17.5 17.3304 17.4107 17.5536 17.2321 17.7321C17.0536 17.9107 16.8304 18 16.5625 18ZM4.77083 8.25L6.45833 6.54167L5.97917 4.25H3.75C3.75 4.79167 3.83333 5.38542 4 6.03125C4.16667 6.67708 4.42361 7.41667 4.77083 8.25ZM12.4583 15.8125C13.0278 16.0764 13.6458 16.2917 14.3125 16.4583C14.9792 16.625 15.625 16.7222 16.25 16.75V14.5208L14.1042 14.0833L12.4583 15.8125Z'
                                        fill='#57534E'
                                    />
                                </svg>
                                <span className='text-den-2 title16-400-130 max-md:title-mb14-400-130 max-lg:title-tl14'>+82 10-8413-1981</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex-1'>
                    <span className='sub-title max-md:title-mb12-700-150 max-md:tracking-[0.6px] max-lg:title-tl12'>Kết nối với chúng tôi</span>
                    <h2 className='text-den title56 max-md:mt-[1.07vw] max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                        Điền thông tin
                    </h2>
                    <form
                        className='flex flex-col gap-y-[2vw] mt-[1.25vw] max-md:mt-[4.27vw] max-md:gap-y-[5.33vw]'
                        autoComplete='false'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='flex flex-1 gap-x-[1.5vw] max-md:gap-x-0 max-md:flex-col max-md:gap-y-[5.33vw]'>
                            <div className='relative flex-1'>
                                <input
                                    type='text'
                                    placeholder={`${errors.name?.message ?? 'Họ và tên *'}`}
                                    className={`${
                                        errors.name?.message
                                            ? 'border-red-400 placeholder:text-red-400'
                                            : 'placeholder:text-den border-den03 placeholder:opacity-70'
                                    } w-full placeholder:text-16pc placeholder:font-normal text-den title16-600-150 placeholder:leading-normal py-[1vw] px-[2vw] flex-1 rounded-[10vw] outline-none shadow-input border border-solid focus:border-[#d6a279] max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14 max-md:placeholder:text-14mb max-lg:placeholder:text-[1.8vw]`}
                                    {...register('name')}
                                />
                            </div>
                            <div className='relative flex-1'>
                                <input
                                    type='text'
                                    placeholder={`${errors.phone?.message ?? 'Số điện thoại *'}`}
                                    className={`${
                                        errors.phone?.message
                                            ? 'border-red-400 placeholder:text-red-400'
                                            : 'placeholder:text-den border-den03 placeholder:opacity-70'
                                    } w-full placeholder:text-16pc placeholder:font-normal text-den title16-600-150 placeholder:leading-normal py-[1vw] px-[2vw] flex-1 rounded-[10vw] outline-none shadow-input border border-solid focus:border-[#d6a279] max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14 max-md:placeholder:text-14mb max-lg:placeholder:text-[1.8vw]`}
                                    {...register('phone')}
                                />
                            </div>
                        </div>
                        <div className='flex flex-1 gap-x-[1.5vw] max-md:flex-col max-md:gap-y-[5.33vw]'>
                            <div className='relative flex-1'>
                                <input
                                    type='text'
                                    placeholder={`${errors.email?.message ?? 'Email *'}`}
                                    className={`${
                                        errors.email?.message
                                            ? 'border-red-400 placeholder:text-red-400'
                                            : 'placeholder:text-den border-den03 placeholder:opacity-70'
                                    } w-full placeholder:text-16pc placeholder:font-normal text-den title16-600-150 placeholder:leading-normal py-[1vw] px-[2vw] flex-1 rounded-[10vw] outline-none shadow-input border border-solid focus:border-[#d6a279] max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14 max-md:placeholder:text-14mb max-lg:placeholder:text-[1.8vw]`}
                                    {...register('email')}
                                />
                            </div>
                            <SelectCategory
                                setValueCategory={setValueCategory}
                                valueCategory={valueCategory}
                            />
                        </div>
                        <input
                            type='text'
                            placeholder='Địa chỉ'
                            className='placeholder:text-16pc placeholder:font-normal text-den title16-600-150 placeholder:leading-normal placeholder:opacity-70 placeholder:text-den py-[1vw] px-[2vw] flex-1 rounded-[10vw] outline-none shadow-input border border-solid border-den03 focus:border-[#d6a279] max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14 max-md:placeholder:text-14mb max-lg:placeholder:text-[1.8vw]'
                            {...register('address')}
                        />
                        <textarea
                            onChange={handleResizeHeight}
                            ref={areaRef}
                            placeholder='Nội dung'
                            className={`${
                                heightArea ? 'h-[' + heightArea + 'px]' : 'h-[10.375vw] max-md:h-[42.93vw]'
                            } placeholder:text-16pc placeholder:font-normal border border-solid border-den03 text-den title16-600-150 placeholder:leading-normal placeholder:opacity-70 placeholder:text-den py-[1vw] px-[2vw] w-full rounded-[1vw] outline-none shadow-input focus:border-[#d6a279] resize-none max-md:py-[4.27vw] max-md:px-[6.4vw] max-md:title-mb14-400-150 max-lg:title-tl14 max-md:placeholder:text-14mb max-lg:placeholder:text-[1.8vw]`}
                            // style={{
                            //     height: heightArea ? `${heightArea}px` : '10.375vw',
                            // }}
                            {...register('content')}
                        ></textarea>
                        <Button
                            span='-tracking-[0.32px] text-white'
                            className='border-none bg-logo md:shadow-submit'
                            stroke='white'
                            full={true}
                            type='submit'
                        >
                            Gửi thông tin
                        </Button>
                    </form>
                    <hr className='bg-[#D9D9D9] mt-[2.13vw] mb-[1.5vw] max-md:mb-[6.4vw] max-md:mt-[4.27vw] max-lg:mt-[4vw] max-lg:mb-[3vw]' />
                    <div className='flex items-start justify-between max-md:flex-col'>
                        <span className='w-fit text-20pc leading-[1.4] font-extrabold text-den max-md:text-20mb max-lg:title-tl20'>
                            Liên hệ ngay:
                        </span>
                        <ul className='flex gap-x-[1vw] max-md:gap-x-[4.27vw] max-md:mt-[2.67vw]'>
                            {listSocial &&
                                listSocial?.map((e, index) => (
                                    <li
                                        key={index}
                                        className='overflow-hidden rounded-full bg-logo w-[2.6875vw] h-[2.6875vw] max-md:w-[10.67vw] max-md:h-[10.67vw] max-lg:w-[5vw] max-lg:h-[5vw]'
                                        title={e.title}
                                    >
                                        <Link
                                            href='/'
                                            className='flex items-center justify-center w-full h-full '
                                        >
                                            <Image
                                                className='w-[1.5vw] h-[1.5vw] max-md:w-[5vw] max-md:h-[5vw] object-contain brightness-0 invert max-lg:w-[3vw] max-lg:h-[3vw]'
                                                src={e.src}
                                                alt={e.title || 'icon social media'}
                                                width={36}
                                                height={36}
                                            />
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer style={{ zIndex: '999999999999999' }} />
        </section>
    )
}
