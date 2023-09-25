'use client'
import useResizeArea from '@/hooks/useResizeArea'
import Button from '../general/Button'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import InputCustom from './InputCustom'
import useStore from '@/app/[lang]/(store)/store'
import useSWR from 'swr'
import postData from '@/utils/postData'
import { notifyError, notifySuccess } from '@/utils'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Form3({ handlePrevSlide, isMobile }) {
    const dataSubmitForm = useStore((state) => state.dataSubmitForm)
    const setTriggerSubmit = useStore((state) => state.setTriggerSubmit)
    const triggerSubmit = useStore((state) => state.triggerSubmit)
    const [areaRef, heightArea, handleResizeHeight] = useResizeArea()
    const [selectedImage, setSelectedImage] = useState([])
    const [files, setFiles] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [valueType, setValueType] = useState({
        title:"Loại hình",
        id:null
    })
    const [valueArea, setValueArea] = useState('')
    const [valueNumberFloors, setValueNumberFloors] = useState('')
    const [valueHomeOrientation, setValueHomeOrientation] = useState('')
    const [valueBuildingType, setValueBuildingType] = useState('')
    const [valueBalconyOrientation, setValueBalconyOrientation] = useState('')
    const [valueInterior, setValueInterior] = useState('')
    const [valueLegal, setValueLegal] = useState('')
    const [valueDescription, setValueDescription] = useState({
        value: '',
        validate: false,
    })
    const [validateFiles, setValidateFiles] = useState({
        status: false,
        title: 'Cần ít nhất 3 ảnh để xuất bản!',
    })
    const fileRef = useRef()

    const {
        data: dataType,
        isLoading: isLoadingType,
        error: errorType,
    } = useSWR(`${process.env.NEXT_PUBLIC_API}/property-type?page=1&take=50`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    

    useEffect(()=>{
        setValueArea('')
        setSelectedImage([])
        setFiles([])
        setValueType({
            title:"Loại hình",
            id:null
        })
        setValueArea('')
        setValueNumberFloors('')
        setValueHomeOrientation('')
        setValueBuildingType('')
        setValueBalconyOrientation('')
        setValueInterior('')
        setValueLegal('')
        setValueDescription({
            value: '',
            validate: false,
        })
    },[triggerSubmit])

    const handleChangeArea = (e) => {
        setValueArea(e?.target?.value)
    }
    const handleChangeNumberFloors = (e) => {
        setValueNumberFloors(e?.target?.value)
    }
    const handleChangeHomeOrientation = (e) => {
        setValueHomeOrientation(e?.target?.value)
    }
    const handleChangeBuildingType = (e) => {
        setValueBuildingType(e?.target?.value)
    }
    const handleChangeBalconyOrientation = (e) => {
        setValueBalconyOrientation(e?.target?.value)
    }
    const handleChangeInterior = (e) => {
        setValueInterior(e?.target?.value)
    }
    const handleChangeLegal = (e) => {
        setValueLegal(e?.target?.value)
    }

    const handleChangeFile = (e) => {
        const file = e?.target?.files
        if (file?.length >= 1) {
            handleImageChange(file)
        }
    }

    const handleDeleteImage = (index) => {
        const fileNew = [...files]
        const selectedImageNew = [...selectedImage]
        fileNew.splice(index, 1)
        selectedImageNew.splice(index, 1)
        setFiles(fileNew)
        setSelectedImage(selectedImageNew)
    }

    const handleImageChange = (file) => {
        setValidateFiles((prev) => ({ ...prev, status: false }))
        const listSrc = []
        const fileNew = [...file]
        if (file) {
            fileNew.forEach((e, index) => {
                // 1MB (1048576 bytes)
                if (e?.size <= 2 * 1048576) {
                    listSrc.push(URL.createObjectURL(e))
                } else {
                    fileNew[index] = null
                }
            })
            const fileResult = fileNew?.filter((e) => e !== null)
            setSelectedImage((prev) => [...prev, ...listSrc])
            setFiles((prev) => [...prev, ...fileResult])
        } else {
            setSelectedImage([])
        }
    }
    const handleChangeDescription = (e) => {
        handleResizeHeight(e)
        setValueDescription({
            validate:false,
            value: e?.target?.value,
        })
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        setFiles(event?.dataTransfer?.files)
    }

    const handleUpLoadImage = async () => {
        const formData = new FormData()
        files?.forEach((e) => {
            formData.append('files', e)
        })
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/file/multiple`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        })
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        const data = await res.json()
        if(data){
            const listLinkImg = []
            data?.forEach(e=>listLinkImg.push(e?.url))
            const dataForm ={
                propertyDescription:valueDescription?.value,
                propertyTypeId:valueType?.id,
                size:Number(valueArea),
                floor:Number(valueNumberFloors),
                orientHouse:valueHomeOrientation,
                constructionType:valueBuildingType,
                orientBalcony:valueBalconyOrientation,
                furniture:valueInterior,
                policy:valueLegal,
                images:listLinkImg,
            }
            
            const post = await postData('/deposit',{
                ...dataSubmitForm,
                ...dataForm,
            })
            if (post?.statusCode) {
                return notifyError(post?.error)
            }
            notifySuccess()
            setTriggerSubmit(!triggerSubmit)
            handlePrevSlide()
            handlePrevSlide()
        }
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!valueDescription?.value){
            setValueDescription({
                ...valueDescription,
                validate:true,
            })
        }
        if (files?.length < 3 || !files){
            setValidateFiles((prev) => ({ ...prev, status: true }))
        }
        if(valueDescription?.value && files?.length >= 3){
            handleUpLoadImage()
        }
    }

    return (
        <>
            <article className='relative shadow-input rounded-[1vw] pr-[7.5vw] w-full h-fit pt-[5.81vw] pb-[2.06vw] pl-[2.5vw] max-md:px-[2.67vw] max-md:rounded-[2.13vw] max-md:pt-[14.93vw] max-md:pb-[8.53vw]'>
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
                <form
                    autoComplete='false'
                    onSubmit={handleSubmit}
                    className='w-full gap-x-[3.5vw]'
                >
                    <div className='relative'>
                        <h3 className='title24-800-150 -tracking-[1.2px] text-den max-md:title-mb25-700-130 max-md:-tracking-[1.25px] max-lg:title-tl25'>
                            Thông tin bất động sản
                        </h3>
                        <div className='relative w-full mt-[1.25vw] max-md:mt-[4.27vw]'>
                            <textarea
                                ref={areaRef}
                                onChange={handleChangeDescription}
                                className={`${valueDescription?.validate ? 'border-red-400 ' : 'border-[#C5C5C5]'} ${
                                    valueDescription?.value ? '' : 'focus-input-active'
                                } rounded-[0.625vw] py-[1vw] resize-none outline-none px-[1.5vw] border border-solid w-full text-den max-md:rounded-[1.067vw] max-md:p-[4.27vw] max-md:title-mb12-400-150 max-lg:title-tl12`}
                                style={{
                                    height: heightArea ? `${heightArea}px` : `${isMobile ? '24vw' : '7.75vw'}`,
                                }}
                                value={valueDescription?.value}
                                id='description'
                                name='description'
                            ></textarea>
                            <label
                                htmlFor='description'
                                className={`${
                                    valueDescription?.value ? 'top-0 -translate-y-1/2' : 'top-[1vw] max-md:top-[4.27vw]'
                                } ${
                                    valueDescription?.validate ? 'text-red-400 ' : 'text-[#646464]'
                                } absolute left-[1vw] px-[0.5vw] max-md:px-[1.27vw] max-md:left-[3vw] bg-white cursor-pointer title16-400-150 max-md:title-mb12-400-150 transition-all duration-300 max-lg:title-tl12`}
                            >
                                Mô tả nhà đất <span className='text-red-400'> *</span>
                            </label>
                        </div>
                        <span className='block mt-[1.5vw] max-md:mt-[4.27vw] mb-[1vw] max-md:mb-[2.67vw] text-black title16-600-150 max-md:title-mb14-600-150 max-lg:title-tl14'>
                            Thông tin chi tiết
                        </span>
                        <div className='flex gap-x-[1.25vw] max-md:flex-col max-md:gap-y-[2.67vw]'>
                            <div className='relative flex flex-1'>
                                <div onClick={()=>setIsOpen(!isOpen)} className='w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw] max-lg:title-tl12'>
                                    {valueType?.title}
                                </div>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='#444'
                                    className='w-6 h-6 absolute right-[1.5vw] top-1/2 -translate-y-1/2'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                    />
                                </svg>
                                <ul className={`${dataType?.data ? '' : 'hidden'} ${isOpen?'':'hidden'} z-[10] rounded-[1vw] overflow-hidden shadow-input bg-white text-den absolute bottom-[-0.5vw] translate-y-full left-0 py-[0.5vw] flex flex-col`}>
                                    {dataType?.data?.map((e, index) => (
                                        <li onClick={()=>{
                                            setValueType({
                                            title:e?.name,
                                            id:e?.id
                                        })
                                        setIsOpen(false)
                                        }} className='text-den px-[1vw] py-[0.5vw] hover:bg-gray-200' key={index}>{e?.name}</li>
                                    ))}
                                    
                                </ul>
                            </div>
                            
                            {/* <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw]'
                                }
                                labelClass={'title16-400-500 title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw]'}
                                labelContent={'Loại hình'}
                                onChange={handleChangeType}
                                value={valueType?.value}
                                validate={valueType?.validate}
                                register={'type'}
                                required={false}
                            /> */}
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw] max-lg:title-tl12'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Diện tích'}
                                onChange={handleChangeArea}
                                value={valueArea}
                                register={'area'}
                                type='number'
                                required={false}
                            />
                        </div>
                        <div className='flex gap-x-[1.25vw] max-md:flex-col max-md:gap-y-[2.67vw] mt-[1vw] max-md:mt-[2.67vw]'>
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw]'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Số tầng'}
                                onChange={handleChangeNumberFloors}
                                value={valueNumberFloors}
                                register={'numberFloors'}
                                type='number'
                                required={false}
                            />
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw]'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Hướng nhà'}
                                onChange={handleChangeHomeOrientation}
                                value={valueHomeOrientation}
                                register={'homeOrientation'}
                                required={false}
                            />
                        </div>
                        <div className='flex gap-x-[1.25vw] max-md:flex-col max-md:gap-y-[2.67vw] mt-[1vw] max-md:mt-[2.67vw]'>
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw]'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Loại công trình'}
                                onChange={handleChangeBuildingType}
                                value={valueBuildingType}
                                register={'buildingType'}
                                required={false}
                            />
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw] max-lg:title-tl12'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Hướng ban công'}
                                onChange={handleChangeBalconyOrientation}
                                value={valueBalconyOrientation}
                                register={'balconyOrientation'}
                                required={false}
                            />
                        </div>
                        <div className='flex gap-x-[1.25vw] max-md:flex-col max-md:gap-y-[2.67vw] mt-[1vw] max-md:mt-[2.67vw]'>
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 max-md:title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw] max-lg:title-tl12'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Nội thất'}
                                value={valueInterior}
                                onChange={handleChangeInterior}
                                register={'interior'}
                                required={false}
                            />
                            <InputCustom
                                boxClass={'flex-1'}
                                inputClass={
                                    'w-full py-[1vw] px-[1.5vw] rounded-[10vw] outline-none border border-solid border-[#C5C5C5] text-den title16-400-150 title-mb12-400-150 max-md:py-[2.93vw] max-md:px-[6.4vw]'
                                }
                                labelClass={'title16-400-500 max-md:title-mb12-400-150 max-md:px-[1.4vw] max-md:left-[5vw] max-lg:title-tl12'}
                                labelContent={'Pháp lý'}
                                onChange={handleChangeLegal}
                                value={valueLegal}
                                register={'legal'}
                                required={false}
                            />
                        </div>
                    </div>
                    <div className='relative mt-[5.5vw] max-md:mt-[4.4vw]'>
                        <div className='flex justify-between mb-[1vw] max-md:mb-[4.13vw]'>
                            <label
                                htmlFor='file'
                                className={`${
                                    validateFiles.status && validateFiles.title ? 'text-red-400' : 'text-[#646464]'
                                } cursor-pointer max-md:title-mb14-400-150 title16-400-150 max-lg:title-tl14`}
                            >
                                Hình ảnh *
                            </label>
                            <div className='flex gap-x-[0.5vw] items-center title16-400-150'>
                                <span className='border border-solid text-12pc text-black border-black rounded-full w-[1vw] h-[1vw] max-md:w-[3vw] max-md:h-[3vw] flex justify-center items-center max-md:text-10mb max-md:font-normal max-md:leading-normal max-lg:title-tl10 max-lg:w-[2vw] max-lg:h-[2vw]'>
                                    !
                                </span>
                                <span className='text-[#313131] underline title16-600-150 max-md:title-mb14-400-150 max-lg:title-tl14'>
                                    Tiêu chuẩn hình ảnh
                                </span>
                            </div>
                        </div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileRef?.current.click()}
                            className={`${
                                validateFiles.status && validateFiles.title ? 'border-red-400' : 'border-[#c5c5c5]'
                            } w-full relative cursor-pointer flex items-center justify-center h-[18vw] max-md:h-[53.6vw] outline-none rounded-[1vw] max-md:rounded-[4.27vw] border border-dotted max-md:px-[4.135vw]`}
                        >
                            <input
                                multiple
                                onChange={handleChangeFile}
                                ref={fileRef}
                                type='file'
                                id='fileImage'
                                name='fileImage'
                                className='hidden'
                                accept='image/png, image/jpeg, image/svg+xml'
                            />
                            <div className='flex flex-col items-center'>
                                <div
                                    title='Tải ảnh lên'
                                    className='w-fit h-fit'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='25'
                                        height='24'
                                        viewBox='0 0 25 24'
                                        fill='none'
                                        className='w-[1.5vw] h-[1.5vw] max-md:w-[6.4vw] max-md:h-[6.4vw] max-lg:w-[2.5vw] max-lg:h-[2.5vw]'
                                        stroke={`${validateFiles.status && validateFiles.title ? '#f87171' : ''}`}
                                    >
                                        <path
                                            d='M18.3124 8.28305C17.9883 6.98732 17.2405 5.83703 16.1879 5.01483C15.1353 4.19263 13.8382 3.74565 12.5026 3.74487C11.1669 3.7441 9.86927 4.18957 8.81571 5.01055C7.76216 5.83153 7.01308 6.98095 6.68742 8.2763C5.15129 8.42046 3.72974 9.15084 2.71804 10.3157C1.70634 11.4806 1.18226 12.9904 1.25466 14.5316C1.32706 16.0728 1.99038 17.5268 3.10683 18.5917C4.22328 19.6566 5.70704 20.2505 7.24992 20.25H9.49992C9.69883 20.25 9.8896 20.171 10.0303 20.0304C10.1709 19.8897 10.2499 19.699 10.2499 19.5C10.2499 19.3011 10.1709 19.1104 10.0303 18.9697C9.8896 18.8291 9.69883 18.75 9.49992 18.75H7.24992C6.65897 18.7518 6.07347 18.6371 5.52685 18.4125C4.98022 18.188 4.48318 17.858 4.0641 17.4413C3.21772 16.5999 2.74028 15.4566 2.7368 14.2632C2.73332 13.0697 3.20408 11.9237 4.04554 11.0773C4.88699 10.231 6.0302 9.75353 7.22367 9.75005C7.41612 9.76454 7.60708 9.70703 7.75952 9.58868C7.91196 9.47033 8.01501 9.29958 8.04867 9.10955C8.20139 8.0386 8.73536 7.05869 9.55251 6.3498C10.3697 5.64091 11.4151 5.25062 12.4969 5.25062C13.5787 5.25062 14.6242 5.64091 15.4413 6.3498C16.2585 7.05869 16.7925 8.0386 16.9452 9.10955C16.9844 9.29298 17.0861 9.45711 17.2328 9.57392C17.3796 9.69073 17.5624 9.75298 17.7499 9.75005C18.9434 9.75005 20.088 10.2242 20.9319 11.0681C21.7758 11.912 22.2499 13.0566 22.2499 14.25C22.2499 15.4435 21.7758 16.5881 20.9319 17.432C20.088 18.2759 18.9434 18.75 17.7499 18.75H15.4999C15.301 18.75 15.1102 18.8291 14.9696 18.9697C14.8289 19.1104 14.7499 19.3011 14.7499 19.5C14.7499 19.699 14.8289 19.8897 14.9696 20.0304C15.1102 20.171 15.301 20.25 15.4999 20.25H17.7499C19.2815 20.234 20.749 19.6329 21.8516 18.5697C22.9543 17.5066 23.6086 16.0621 23.6805 14.5321C23.7524 13.0021 23.2365 11.5025 22.2384 10.3407C21.2404 9.17884 19.8358 8.44267 18.3124 8.28305Z'
                                            fill='#444444'
                                        />
                                        <path
                                            d='M15.7203 14.7803C15.8618 14.917 16.0512 14.9925 16.2478 14.9908C16.4445 14.9891 16.6326 14.9103 16.7717 14.7712C16.9107 14.6321 16.9896 14.444 16.9913 14.2474C16.993 14.0507 16.9174 13.8613 16.7808 13.7198L13.0308 9.96983C12.8902 9.82923 12.6994 9.75024 12.5005 9.75024C12.3017 9.75024 12.1109 9.82923 11.9703 9.96983L8.2203 13.7198C8.08368 13.8613 8.00809 14.0507 8.00979 14.2474C8.0115 14.444 8.09038 14.6321 8.22944 14.7712C8.36849 14.9103 8.5566 14.9891 8.75325 14.9908C8.9499 14.9925 9.13935 14.917 9.2808 14.7803L11.7505 12.3106V21.7501C11.7505 21.949 11.8296 22.1398 11.9702 22.2804C12.1109 22.4211 12.3016 22.5001 12.5005 22.5001C12.6995 22.5001 12.8902 22.4211 13.0309 22.2804C13.1715 22.1398 13.2505 21.949 13.2505 21.7501V12.3106L15.7203 14.7803Z'
                                            fill='#444444'
                                        />
                                    </svg>
                                </div>
                                <p
                                    className={`${
                                        validateFiles.status && validateFiles.title ? 'text-red-400' : 'text-[#454545]'
                                    } mt-[0.5vw] max-md:mt-[2.13vw] max-md:mb-[1.07vw] mb-[0.25vw] title14-700-150 select-none max-md:title-mb12-700-150 max-md:text-center max-lg:title-tl12`}
                                >
                                    Kéo thả hình ảnh nhà đất hoặc bấm vào đây để tải lên
                                </p>
                                <p
                                    className={`${
                                        validateFiles.status && validateFiles.title ? 'text-red-400' : 'text-[#C7C7C7]'
                                    } title12-400-150 select-none max-md:title-mb10-400-150 max-md:text-center max-md:px-[6.67vw] max-lg:title-tl10`}
                                >
                                    Đề xuất tỉ lệ hình ảnh tốt nhất là 1600 x 900 (16:9). Giới hạn 2MB/ ảnh
                                </p>
                            </div>
                            <div className='absolute bottom-[1vw] left-0'>
                                <p className='pl-[1.5vw] text-red-400 title14-600-150'>
                                    {validateFiles.status && validateFiles.title}
                                </p>
                            </div>
                        </div>

                        {selectedImage?.length >= 1 && (
                            <article
                                id='list-img-preview'
                                className={`${
                                    selectedImage?.length > 9 && 'overflow-y-scroll'
                                } mt-[0.8vw] h-[19vw] max-md:h-[45vw] w-full max-md:mt-[2.13vw]`}
                            >
                                <ul className='grid grid-cols-3 gap-[0.5vw] max-md:gap-[1.5vw]'>
                                    {selectedImage?.map((src, index) => (
                                        <li
                                            key={index}
                                            className='w-full !h-[6vw] max-md:!h-[14vw] max-md: relative rounded-md'
                                            style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                                        >
                                            <Image
                                                className='object-cover rounded-md z-[1]'
                                                src={src}
                                                alt={`image preview ${index + 1}`}
                                                sizes='50vw'
                                                fill
                                            />
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 20 20'
                                                fill='#444'
                                                className='w-[1.25vw] h-[1.25vw] max-md:w-[4vw] max-md:h-[4vw] cursor-pointer absolute right-0 top-0 z-10 p-[0.5vw] max-md:p-[1vw] box-content'
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )}
                        <div className='flex justify-center'>
                            <Button
                                type='submit'
                                stroke='white'
                                className='bg-logo border-none mt-[2.13vw] max-md:mt-[6.4vw] max-md:py-[4.13vw] max-md:w-full max-md:flex max-md:justify-center'
                                span='text-white font-semibold -tracking-[0.32px] title-mb14-600-150 max-md:-tracking-[0.28px]'
                                icon='w-[1vw] h-[1vw]'
                            >
                                Gửi thông tin
                            </Button>
                        </div>
                    </div>
                </form>
            </article>
        </>
    )
}
