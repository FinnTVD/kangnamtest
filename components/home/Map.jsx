'use client'

import { useEffect, useState, useRef } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useSWR from 'swr'
// import { mutate } from 'swr'
// import mapJson from './map.json'
const arrMarker = [
    [105.9151962942141, 20.920931262916405],
    [106.9151962942141, 21.920931262916405],
    [106.9151962942141, 20.920931262916405],
]

const apiKey = 'c6a8fb5d25f0f32c87d1469f6847388c445850643364b94e'
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Map({ setIsToggle = () => {}, isToggle = false }) {
    const mapRef = useRef()
    const [levelZoom, setLevelZoom] = useState(9)
    const [cityId, setCityId] = useState(11)
    const [districtId, setDistrictId] = useState(null)
    const [wardId, setWardId] = useState(null)
    const [listMarker, setListMarker] = useState(null)
    const [listMarkerDistrict, setListMarkerDistrict] = useState(null)
    const [isCheck, setIsCheck] = useState(false) //check delete marker only one
    const [isCheck1, setIsCheck1] = useState(false) //check delete marker only one
    // const [centerView, setCenterView] = useState(null)
    const [value, setValue] = useState(null)
    const [data, setData] = useState(null)
    const debounceValue = useDebounce(value, 500)
    const searchRef = useRef()

    const {
        data: dataMap,
        error: errorMap,
        isLoading: isLoadingMap,
    } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${cityId}${
            districtId ? '&districtId=' + districtId : ''
        }${wardId ? '&wardId=' + wardId : ''}`,
        fetcher,
    )
    const {
        data: dataItemMap,
        error: errorItemMap,
        isLoading: isLoadingItemMap,
    } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/property?cityId=${cityId}${districtId ? '&districtId=' + districtId : ''}${
            wardId ? '&wardId=' + wardId : ''
        }`,
        fetcher,
    )

    const {
        data: dataProvinces,
        error: errorProvinces,
        isLoading: isLoadingProvinces,
    } = useSWR(`${process.env.NEXT_PUBLIC_API}/property/property-by-address`, fetcher)

    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return
        const loadMap = () => {
            if (!window.vietmapgl || typeof window === 'undefined') return
            mapRef.current = new window.vietmapgl.Map({
                container: 'map',
                // style: mapJson,
                style: `https://maps.vietmap.vn/mt/tm/style.json?apikey=${apiKey}`,
                center: [105.85379875200005, 21.028354507000074], //ha noi center
                zoom: 9,
                pitch: 0, // góc nhìn từ trên cao nhìn xuống
            })
            mapRef.current.areTilesLoaded()

            mapRef.current.on('zoomend', function () {
                setLevelZoom(mapRef.current.getZoom())
            })
        }
        loadMap()
        // addMarker2()
        // // addMarker3();
        // addGeojsonLine()
    }, [window?.vietmapgl])

    useEffect(() => {
        dataMap && dataItemMap && addMarkerItem(dataMap)
    }, [dataMap, dataItemMap])

    useEffect(() => {
        value !== null && callAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])

    useEffect(() => {
        // if (!listMarker && levelZoom > 7) {
        //     addMarker()
        // }
        // if (levelZoom < 7) {
        //     listMarker && listMarker.forEach((e) => e.remove())
        //     setTimeout(() => setListMarker(null), 500)
        // }
        if (levelZoom >= 13.5) {
            if (!isCheck1) {
                listMarkerDistrict && listMarkerDistrict?.ward?.forEach((e) => e.remove())
                setTimeout(
                    () =>
                        setListMarkerDistrict((prev) => ({
                            ...prev,
                            ward: null,
                        })),
                    10,
                )
                setIsCheck1(true)
            }
            getLocationCurrent()
            return
        }
        if (levelZoom >= 11.5 && levelZoom < 13.5) {
            if (wardId && isCheck1) {
                listMarkerDistrict && listMarkerDistrict?.detail?.forEach((e) => e.remove())
                setIsCheck1(false)
                setWardId(null)
            }
            if (!isCheck) {
                listMarkerDistrict && listMarkerDistrict?.district?.forEach((e) => e.remove())
                setTimeout(
                    () =>
                        setListMarkerDistrict((prev) => ({
                            ...prev,
                            district: null,
                        })),
                    10,
                )
                setIsCheck(true)
            }
            getLocationCurrent()
            return
        }
        if (districtId && levelZoom < 11.5) {
            if (isCheck) {
                listMarkerDistrict && listMarkerDistrict?.ward?.forEach((e) => e.remove())
                setTimeout(
                    () =>
                        setListMarkerDistrict((prev) => ({
                            ...prev,
                            ward: null,
                        })),
                    10,
                )
                setIsCheck(false)
            }
            setDistrictId(null)
            return
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [levelZoom])

    const callAPI = async () => {
        const res = await fetch(`https://maps.vietmap.vn/api/search?api-version=1.1&apikey=${apiKey}&text=${value}`)
        const { data } = await res.json()
        setData(data)
    }
    const getLocationCurrent = async () => {
        const ct = await mapRef?.current?.getCenter()
        const res = await fetch(`https://maps.vietmap.vn/api/reverse/v3?apikey=${apiKey}&lng=${ct?.lng}&lat=${ct?.lat}`)
        const data = await res.json()
        const one = dataMap?.find((e) => e?.district_id === data[0]?.boundaries[1]?.id)
        if (Number(one?.count <= 1)) return
        if (levelZoom >= 11.5) {
            setDistrictId(data[0]?.boundaries[1]?.id)
        }
        if (levelZoom >= 13.5) {
            setWardId(data[0]?.boundaries[0]?.id)
        }
    }

    // const addMarker = () => {
    //     //add marker to map
    //     const listMarkerNew = []
    //     arrMarker.forEach((e, index) => {
    //         const markerNew = new vietmapgl.Marker({
    //             color: 'red',
    //         })
    //             .setLngLat([e[0], e[1]])
    //             .setPopup(new vietmapgl.Popup().setHTML(`<h1>Hello World! ${index}</h1>`))
    //             .addTo(mapRef.current)
    //         listMarkerNew.push(markerNew)
    //     })
    //     const llb = new vietmapgl.LngLatBounds([...arrMarker])
    //     const center = llb.getCenter()
    //     const markerNewCenter = new vietmapgl.Marker({
    //         color: 'red',
    //     })
    //         .setLngLat([center?.lng, center?.lat])
    //         .setPopup(new vietmapgl.Popup().setHTML(`<h1>center</h1>`))
    //         .addTo(mapRef.current)
    //     listMarkerNew.push(markerNewCenter)
    //     setListMarker(listMarkerNew)
    // }

    // // const addMarker3 = () => {
    // // 	var el = document.createElement("div");

    // // 	el.className = "marker-icon";

    // // 	// el.style.backgroundImage = `url(assets/icon/marker-${item.name}.png)`;

    // // 	el.style.width = "28px";

    // // 	el.style.height = "40px";

    // // 	el.style.marginTop = "-20px !important";

    // // 	new vietmapgl.Marker(el, {})
    // // 		.setLngLat([106.78234226958115, 20.920931262916405])
    // // 		.addTo(mapRef.current);
    // // };

    // const addMarker2 = () => {
    //     const divElement = document.createElement('div')
    //     divElement.textContent = '4'
    //     divElement.setAttribute('data-marker', '4')
    //     // Set options
    //     new vietmapgl.Marker({
    //         // scale: [0.5], //size of marker
    //         element: divElement,
    //     })
    //         .setLngLat([105.78234226958115, 20.920931262916405])
    //         .setPopup(
    //             new vietmapgl.Popup().setHTML(`
    // 			<div style="display:flex;gap:0 20px;">
    // 				<img style="width:100px;height:100px;display:block" src="https://photo.rever.vn/v3/get/rvR1jXdw7H0hP421kBZHxZro33WX_3LZEyj3pgB0y3eVYSXsR5xV8shiKcRkasMNZU_1F3KsfBEMu185ODjL0WSg==/750x500/image.jpg" alt="map">
    // 				<div style="width:200px">
    // 					<h2>Căn hộ 2pn 75m2 HQC Hóc Môn hướng Đông Nam, diện tích 75m²</h2>
    // 					<p>Nguyễn Thị Sóc, Hóc Môn</p>
    // 					<h6>1.3 ty</h6>
    // 				</div>
    // 			</div>
    // 			`),
    //         )
    //         .addTo(mapRef.current)
    // }

    // const handleFetchDataPopup = async (id) => {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${id}`)
    //     const { data } = await res.json()
    // }
    const addMarkerItem = async (listMarker) => {
        if (levelZoom >= 13.5) {
            const listMarkerDistrictNew = []
            listMarker?.forEach((e) => {
                const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.id === e?.id)
                let childNode = ''
                if (listProjectIn) {
                    childNode = listProjectIn?.reduce(
                        (acc, itemProject) =>
                            acc +
                            `<div
                            key=${itemProject?.id}
                            class="flex gap-x-[0.88vw]"
                        >
                            <img
                                class="w-[5.4375vw] h-[4.75vw] block object-cover"
                                src=${itemProject?.firstImage ? itemProject?.firstImage : '/images/itemproject.jpg'}
                                alt=${itemProject?.translation?.name}
                            />
                            <div class="w-[12.0625vw]">
                                <h2 class='line-clamp-1'>${itemProject?.translation?.name ?? ''}</h2>
                                <div
                                            title=${itemProject?.address?.display}
                                            class='flex items-center'
                                        >
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150 whitespace-nowrap'>
                                                Địa chỉ:
                                            </span>
                                            <span class='capitalize text-den title14-400-150 line-clamp-1'>
                                                ${
                                                    itemProject?.address?.name +
                                                    ', ' +
                                                    itemProject?.address?.ward +
                                                    ', ' +
                                                    itemProject?.address?.district
                                                }
                                            </span>
                                        </div>
                                        <div class='flex items-center my-[0.5vw]'>
                                        <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='14'
                                                height='14'
                                                viewBox='0 0 14 14'
                                                fill='none'
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Diện tích:
                                            </span>
                                            <span class=' text-den title14-400-150'>
                                                ${itemProject?.translation?.size + ' m²'}
                                            </span>
                                        </div>
                                        <div class='flex items-center'>
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Mức giá:
                                            </span>
                                            <span class='capitalize text-den title14-400-150'>
                                                ${itemProject?.translation?.priceDisplay}
                                            </span>
                                        </div>
                            </div>
                        </div>`,
                        '',
                    )
                }
                const divElement = document.createElement('div')
                divElement.textContent = e?.count
                divElement.setAttribute('data-marker', `${e?.id}`)
                // Set options
                const marker = new vietmapgl.Marker({
                    // scale: [0.5], //size of marker
                    element: divElement,
                })
                    .setLngLat([e?.lng, e?.lat])
                    .setPopup(
                        new vietmapgl.Popup().setHTML(`
                        <div style="width:fit-content;${
                            listProjectIn?.length > 3
                                ? 'height:20.625vw;overflow-x:hidden;overflow-y:scroll'
                                : 'height:fit-content;'
                        }">
                            ${childNode}
                        </div>
                `),
                    )
                    .addTo(mapRef.current)
                listMarkerDistrictNew.push(marker)
            })
            setListMarkerDistrict((prev) => ({
                ...prev,
                detail: [...listMarkerDistrictNew],
            }))
            return
        } else if (levelZoom >= 11.5) {
            const listMarkerDistrictNew = []
            listMarker?.forEach((e) => {
                const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.wardId === e?.ward_id)
                let childNode = ''
                if (listProjectIn) {
                    childNode = listProjectIn?.reduce(
                        (acc, itemProject) =>
                            acc +
                            `<div
                            key=${itemProject?.id}
                            class="flex gap-x-[0.88vw]"
                        >
                            <img
                                class="w-[5.4375vw] h-[4.75vw] block object-cover"
                                src=${itemProject?.firstImage ? itemProject?.firstImage : '/images/itemproject.jpg'}
                                alt=${itemProject?.translation?.name}
                            />
                            <div class="w-[12.0625vw]">
                                <h2 class='line-clamp-1'>${itemProject?.translation?.name ?? ''}</h2>
                                <div
                                            title=${itemProject?.address?.display}
                                            class='flex items-center'
                                        >
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150 whitespace-nowrap'>
                                                Địa chỉ:
                                            </span>
                                            <span class='capitalize text-den title14-400-150 line-clamp-1'>
                                                ${
                                                    itemProject?.address?.name +
                                                    ', ' +
                                                    itemProject?.address?.ward +
                                                    ', ' +
                                                    itemProject?.address?.district
                                                }
                                            </span>
                                        </div>
                                        <div class='flex items-center my-[0.5vw]'>
                                        <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='14'
                                                height='14'
                                                viewBox='0 0 14 14'
                                                fill='none'
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Diện tích:
                                            </span>
                                            <span class=' text-den title14-400-150'>
                                                ${itemProject?.translation?.size + ' m²'}
                                            </span>
                                        </div>
                                        <div class='flex items-center'>
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Mức giá:
                                            </span>
                                            <span class='capitalize text-den title14-400-150'>
                                                ${itemProject?.translation?.priceDisplay}
                                            </span>
                                        </div>
                            </div>
                        </div>`,
                        '',
                    )
                }
                const divElement = document.createElement('div')
                divElement.textContent = e?.count
                divElement.setAttribute('data-marker', `${e?.ward_id}`)
                // Set options
                const marker = new vietmapgl.Marker({
                    // scale: [0.5], //size of marker
                    element: divElement,
                })
                    .setLngLat([e?.ward_lng, e?.ward_lat])
                    .setPopup(
                        new vietmapgl.Popup().setHTML(`
                        <div style="width:fit-content;${
                            listProjectIn?.length > 3
                                ? 'height:20.625vw;overflow-x:hidden;overflow-y:scroll'
                                : 'height:fit-content;'
                        }">
                            ${childNode}
                        </div>
                `),
                    )
                    .addTo(mapRef.current)
                listMarkerDistrictNew.push(marker)
            })
            setListMarkerDistrict((prev) => ({
                ...prev,
                ward: [...listMarkerDistrictNew],
            }))
            return
        } else {
            const listMarkerDistrictNew = []
            listMarker?.forEach((e) => {
                const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.districtId === e?.district_id)
                let childNode = ''
                if (listProjectIn) {
                    childNode = listProjectIn?.reduce(
                        (acc, itemProject) =>
                            acc +
                            `<div
                            key=${itemProject?.id}
                            class="flex gap-x-[0.88vw]"
                        >
                            <img
                                class="w-[5.4375vw] h-[4.75vw] block object-cover"
                                src=${itemProject?.firstImage ? itemProject?.firstImage : '/images/itemproject.jpg'}
                                alt=${itemProject?.translation?.name}
                            />
                            <div class="w-[12.0625vw]">
                                <h2 class='line-clamp-1'>${itemProject?.translation?.name ?? ''}</h2>
                                <div
                                            title=${itemProject?.address?.display}
                                            class='flex items-center'
                                        >
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150 whitespace-nowrap'>
                                                Địa chỉ:
                                            </span>
                                            <span class='capitalize text-den title14-400-150 line-clamp-1'>
                                                ${
                                                    itemProject?.address?.name +
                                                    ', ' +
                                                    itemProject?.address?.ward +
                                                    ', ' +
                                                    itemProject?.address?.district
                                                }
                                            </span>
                                        </div>
                                        <div class='flex items-center my-[0.5vw]'>
                                        <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='14'
                                                height='14'
                                                viewBox='0 0 14 14'
                                                fill='none'
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Diện tích:
                                            </span>
                                            <span class=' text-den title14-400-150'>
                                                ${itemProject?.translation?.size + ' m²'}
                                            </span>
                                        </div>
                                        <div class='flex items-center'>
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
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-nau-nhat title14-700-150'>
                                                Mức giá:
                                            </span>
                                            <span class='capitalize text-den title14-400-150'>
                                                ${itemProject?.translation?.priceDisplay}
                                            </span>
                                        </div>
                            </div>
                        </div>`,
                        '',
                    )
                }
                const divElement = document.createElement('div')
                divElement.textContent = e?.count
                divElement.setAttribute('data-marker', `${e?.district_id}`)
                // Set options
                const marker = new vietmapgl.Marker({
                    // scale: [0.5], //size of marker
                    element: divElement,
                })
                    .setLngLat([e?.district_lng, e?.district_lat])
                    .setPopup(
                        new vietmapgl.Popup().setHTML(`
                <div style="width:fit-content;${
                    listProjectIn?.length > 3
                        ? 'height:20.625vw;overflow-x:hidden;overflow-y:scroll'
                        : 'height:fit-content;'
                }">
                    ${childNode}
                </div>
                `),
                    )
                    .addTo(mapRef.current)
                listMarkerDistrictNew.push(marker)
            })
            setListMarkerDistrict((prev) => ({
                ...prev,
                district: [...listMarkerDistrictNew],
            }))
            return
        }
    }

    // const addGeojsonLine = () => {
    //     mapRef.current.on('load', function () {
    //         // mapRef.current.addSource("route", {
    //         // 	type: "geojson",
    //         // 	data: {
    //         // 		type: "Feature",
    //         // 		properties: {},
    //         // 		geometry: {
    //         // 			type: "LineString",
    //         // 			coordinates: [
    //         // 				[106.7061597962484, 10.770688562901288],
    //         // 				[106.69057544335796, 10.768747133937572],
    //         // 				[106.68189581514225, 10.764994908339784],
    //         // 				[106.67440708752872, 10.757690582434833],
    //         // 				[106.65985878585263, 10.7548236124389],
    //         // 			],
    //         // 		},
    //         // 	},
    //         // });
    //         // mapRef.current.addLayer({
    //         // 	id: "route",
    //         // 	type: "line",
    //         // 	source: "route",
    //         // 	layout: {
    //         // 		"line-join": "round",
    //         // 		"line-cap": "round",
    //         // 	},
    //         // 	paint: {
    //         // 		"line-color": "red",
    //         // 		"line-width": 8,
    //         // 	},
    //         // });
    //         mapRef.current.addSource('some id', {
    //             type: 'geojson',
    //             data: {
    //                 type: 'FeatureCollection',
    //                 features: [
    //                     {
    //                         type: 'Feature',
    //                         properties: { name: 'Null Island' },
    //                         geometry: {
    //                             type: 'Point',
    //                             coordinates: [105.78234226958115, 21.920931262916405],
    //                         },
    //                     },
    //                 ],
    //             },
    //         })
    //     })
    // }

    const flyMap = (lng = 104.78234226958115, lat = 22.920931262916405, zoom = 9) => {
        mapRef?.current.flyTo({
            center: [lng, lat],
            zoom: zoom,
            speed: 1.2,
            curve: 1,
            easing(t) {
                return t
            },
        })
        setLevelZoom(zoom)
    }
    const backDefault = () => {
        mapRef.current.flyTo({
            center: [105.78234226958115, 20.920931262916405],
            zoom: 9,
            speed: 0.2,
            curve: 1,
            easing(t) {
                return t
            },
        })
    }

    const handleChangeSearch = (e) => {
        setValue(e?.target?.value)
    }

    return (
        <>
            <div
                ref={mapRef}
                style={{
                    position: 'relative',
                }}
                id='map'
                className={`${isToggle ? 'active' : ''}`}
            >
                <div className='absolute top-0 left-0 flex w-fit h-fit z-[1000] bg-white'>
                    {dataProvinces &&
                        dataProvinces?.map((e) => (
                            <div
                                className='w-[50px] h-[50px] flex justify-center items-center text-den'
                                onClick={() => {
                                    flyMap(e?.city_lng, e?.city_lat)
                                    setCityId(e?.city_id)
                                }}
                            >
                                {e?.city}
                            </div>
                        ))}
                </div>
                <div
                    onClick={() => setIsToggle(!isToggle)}
                    className='absolute bottom-[2vw] right-[2vw] flex w-fit h-fit z-[1000] bg-white'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                    </svg>
                </div>

                {/* <div
                    id='back'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50px',
                        width: '50px',
                        height: '50px',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                    onClick={backDefault}
                >
                    back
                </div> */}
                {/* <div
                    className='absolute top-0 z-[1000] left-[100px] w-[50px] h-[50px] flex justify-center items-center bg-green-400 text-white'
                    onClick={() => {
                        const { lng, lat } = mapRef?.current?.getCenter()
                    }}
                >
                    center
                </div> */}

                {/* <input
                    ref={searchRef}
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 0,
                        left: '150px',
                        background: 'pink',
                        width: '500px',
                        height: '50px',
                        zIndex: 1000,
                        padding: '0 24px',
                    }}
                    type='text'
                    placeholder='Search ...'
                    onChange={handleChangeSearch}
                />
                <ul
                    id='list-address'
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '100px',
                        background: 'white',
                        width: '500px',
                        height: 'auto',
                        zIndex: 1000,
                        listStyle: 'none',
                    }}
                >
                    {data &&
                        data?.features.map((e, index) => (
                            <li
                                onClick={() => {
                                    flyMap(e?.geometry?.coordinates[0], e?.geometry?.coordinates[1], 18)
                                    searchRef.current.value = e?.properties?.name
                                    setData(null)
                                }}
                                key={index}
                            >
                                {e?.properties?.name}
                            </li>
                        ))}
                    {!data && <li>Tim kiem gan day</li>}
                </ul>*/}
            </div>
        </>
    )
}
