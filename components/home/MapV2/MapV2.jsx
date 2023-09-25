'use client'
import { useEffect, useState, useRef } from 'react'
import SelectDistrict from './SelectDistrict'
import SelectWard from './SelectWard'
import SelectCity from './SelectCity'
import { toast } from 'react-toastify'
import useStore from '@/app/[lang]/(store)/store'
import useSWR from 'swr'

const apiKey = 'c6a8fb5d25f0f32c87d1469f6847388c445850643364b94e'

const handleGeoWKT = (str) => {
    return str
        ?.slice(16, str?.length - 3)
        ?.split(', ')
        ?.map((capSo) => {
            let [so1, so2] = capSo?.split(' ')?.map(parseFloat)
            return [so1, so2]
        })
}

const handlePopup = (itemProject) => {
    if (!itemProject) return
    return `<div
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
							<span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150 whitespace-nowrap'>
								Địa chỉ:
							</span>
							<span class='capitalize text-black title14-400-150 line-clamp-1'>
								${itemProject?.address?.name + ', ' + itemProject?.address?.ward + ', ' + itemProject?.address?.district}
							</span>
						</div>
						<div class='flex items-center my-[0.5vw]'>
							<span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150'>
								Diện tích:
							</span>
							<span class=' text-black title14-400-150'>
								${itemProject?.translation?.size + ' m²'}
							</span>
						</div>
						<div class='flex items-center'>
							
							<span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150'>
								Mức giá:
							</span>
							<span class='capitalize text-black title14-400-150'>
								${itemProject?.translation?.priceDisplay}
							</span>
						</div>
			</div>
		</div>`
}
const initial = {
    district: null,
    ward: null,
    detail: null,
}

const notifyError = (title) =>
    toast.error(title || 'Something went wrong!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function MapV2() {
    const mapRef = useRef() //lưu lại dom map
    const cityId = useStore((state) => state.cityId)
    const districtId = useStore((state) => state.districtId)
    const wardId = useStore((state) => state.wardId)
    const setCityId = useStore((state) => state.setCityId)
    const setDistrictId = useStore((state) => state.setDistrictId)
    const setWardId = useStore((state) => state.setWardId)
    const setHandleChangeCity = useStore((state) => state.setHandleChangeCity)
    const setHandleChangeDistrict = useStore((state) => state.setHandleChangeDistrict)
    const setHandleChangeWard = useStore((state) => state.setHandleChangeWard)
    const setHandleFlyMap = useStore((state) => state.setHandleFlyMap)
    const [isFly, setIsFly] = useState(false) // trigger sự kiện fly to
    const [levelZoom, setLevelZoom] = useState(9) //lưu level zoom
    const [listMarkerDistrict, setListMarkerDistrict] = useState(initial) // lưu các marker lại đê xoá
    const [isDeleteDistrict, setIsDeleteDistrict] = useState(false) //nếu district id thay đổi thì biến thay đổi theo
    const [isDrag, setIsDrag] = useState(false) // trigger sự kiện drag
    const [dataItemMap, setDataItemMap] = useState(null)
    const [dataMap, setDataMap] = useState(null)
    const setDataProvinces = useStore((state) => state.setDataProvinces)
    const setDataDistrict = useStore((state) => state.setDataDistrict)
    const setDataWard = useStore((state) => state.setDataWard)
    const dataDistrict = useStore((state) => state.dataDistrict)
    const dataProvinces = useStore((state) => state.dataProvinces)
    const dataWard = useStore((state) => state.dataWard)
    const [isFirst, setIsFirst] = useState(true)
    const [isTest, setIsTest] = useState(false)

    // const [dataDistrict, setDataDistrict] = useState(null)
    // const [dataProvinces, setDataProvinces] = useState(null) // trả về danh sách các tỉnh có dự án
    // const [dataWard, setDataWard] = useState(null)
    const [titleCity, setTitleCity] = useState({
        title: '',
        id: null,
    })
    const [titleDistrict, setTitleDistrict] = useState({
        title: 'Quận/huyện',
        id: null,
    })
    const [titleWard, setTitleWard] = useState({
        title: 'Phường/xã',
        id: null,
    })

    const { data, error, isLoading } = useSWR(
        `https://maps.vietmap.vn/api/boundaries/v3/info/${wardId || districtId || cityId}?apikey=${apiKey}`,
        fetcher,
    )

    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return
        const loadMap = () => {
            if (!window.vietmapgl || typeof window === 'undefined') return
            mapRef.current = new window.vietmapgl.Map({
                container: 'map',
                style: `https://maps.vietmap.vn/mt/tm/style.json?apikey=${apiKey}`,
                center: [105.85379875200005, 21.028354507000074], //ha noi center
                zoom: 9,
                pitch: 0, // góc nhìn từ trên cao nhìn xuống,
                // bearing: 90,
            })

            mapRef?.current?.on('zoomstart', function () {
                setLevelZoom(mapRef?.current?.getZoom())
            })
            mapRef?.current?.on('dragstart', () => {
                setIsDrag((prev) => !prev)
            })
        }
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/property/property-by-address`)
                const data = await res.json()
                setDataProvinces(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
        loadMap() //add map
        addTileMap()
        let a = setTimeout(() => {
            setHandleChangeCity(handleChangeCity)
            setHandleChangeDistrict(handleChangeDistrict)
            setHandleChangeWard(handleChangeWard)
            setHandleFlyMap(flyMap)
        }, 500)
        return () => {
            clearTimeout(a)
            setCityId(11)
            setDistrictId(null)
            setWardId(null)
        }
    }, [])
    useEffect(() => {
        if (data) {
            // addGeojsonLine(handleGeoWKT(data?.geo_wkt))
            setIsFirst(false)
        }
    }, [data])

    useEffect(() => {
        !isTest && addMarkerTest()
        if (mapRef.current && isTest) {
            const markerData = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [105.84600288768753, 20.992231231173637], // Tọa độ của marker 1
                        },
                        properties: {
                            onclick: new window.vietmapgl.Marker()
                                .setLngLat([105.84600288768753, 20.992231231173637])
                                .setPopup(
                                    new window.vietmapgl.Popup().setHTML(`
                                        <div>
                                            sads
                                        </div>
                                `),
                                )
                                .addTo(mapRef.current),
                        },
                    },
                ],
            }
            mapRef.current?.getSource('marker1')?.setData(markerData)
        }
    }, [isTest])

    // useEffect(() => {
    //     if (mapRef.current && !isFirst) {
    //         const polygon = handleGeoWKT(data?.geo_wkt)
    //         if (polygon) {
    //             const newData = {
    //                 type: 'Feature',
    //                 properties: {},
    //                 geometry: {
    //                     type: 'LineString',
    //                     coordinates: polygon,
    //                 },
    //             }
    //             mapRef.current?.getSource('marker-source')?.setData(newData)
    //         }
    //     }
    // }, [data, cityId, districtId, cityId])

    // nếu có data chi tiết của dự án theo cityId, districtId và wardId thì add marker tương ứng
    useEffect(() => {
        const addMarkerItem = (listMarker) => {
            if (!dataItemMap || !listMarker) return
            if (levelZoom >= 13.5) {
                if (
                    listMarkerDistrict?.detail?.length &&
                    listMarkerDistrict?.detail[listMarkerDistrict?.detail?.length - 1] == wardId
                )
                    return
                const listMarkerDistrictNew = []
                listMarker?.forEach((e) => {
                    const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.id === e?.id)
                    let childNode = null
                    if (listProjectIn) {
                        childNode = listProjectIn?.reduce((acc, itemProject) => acc + handlePopup(itemProject), '')
                    }
                    const divElement = document.createElement('div')
                    divElement.textContent = e?.count
                    divElement.setAttribute('data-marker', `${e?.id}`)
                    // Set options
                    if (!window.vietmapgl || typeof window === 'undefined') return
                    const marker = new window.vietmapgl.Marker({
                        // scale: [0.5], //size of marker
                        element: divElement,
                    })
                        .setLngLat([e?.lng || 0, e?.lat || 0])
                        .setPopup(
                            new window.vietmapgl.Popup().setHTML(`
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
                    detail: [...listMarkerDistrictNew, wardId],
                }))
                setIsDeleteDistrict(!isDeleteDistrict)
                return
            } else if (levelZoom >= 11.5) {
                if (
                    listMarkerDistrict?.ward?.length &&
                    listMarkerDistrict?.ward[listMarkerDistrict?.ward?.length - 1] == districtId
                )
                    return
                const listMarkerDistrictNew = []
                listMarker?.forEach((e) => {
                    const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.wardId === e?.ward_id)
                    let childNode = ''
                    if (listProjectIn) {
                        childNode = listProjectIn?.reduce((acc, itemProject) => acc + handlePopup(itemProject), '')
                    }
                    const divElement = document.createElement('div')
                    divElement.textContent = e?.count
                    divElement.setAttribute('data-marker', `${e?.ward_id}`)
                    // Set options
                    if (!window.vietmapgl || typeof window === 'undefined') return
                    const marker = new window.vietmapgl.Marker({
                        // scale: [0.5], //size of marker
                        element: divElement,
                    })
                        .setLngLat([e?.ward_lng || 0, e?.ward_lat || 0])
                        .setPopup(
                            new window.vietmapgl.Popup().setHTML(`
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
                    ward: [...listMarkerDistrictNew, districtId],
                }))
                return
            } else {
                if (
                    listMarkerDistrict?.district?.length &&
                    listMarkerDistrict?.district[listMarkerDistrict?.district?.length - 1] == cityId
                )
                    return
                const listMarkerDistrictNew = []
                listMarker?.forEach((e) => {
                    const listProjectIn = dataItemMap?.data?.filter((i) => i?.address?.districtId === e?.district_id)
                    let childNode = ''
                    if (listProjectIn) {
                        childNode = listProjectIn?.reduce((acc, itemProject) => acc + handlePopup(itemProject), '')
                    }
                    const divElement = document.createElement('div')
                    divElement.textContent = e?.count
                    divElement.setAttribute('data-marker', `${e?.district_id}`)
                    // Set options
                    if (!window.vietmapgl || typeof window === 'undefined') return
                    const marker = new window.vietmapgl.Marker({
                        // scale: [0.5], //size of marker
                        element: divElement,
                    })
                        .setLngLat([e?.district_lng || 0, e?.district_lat || 0])
                        .setPopup(
                            new window.vietmapgl.Popup().setHTML(`
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
                    district: [...listMarkerDistrictNew, cityId],
                }))
                return
            }
        }
        dataItemMap && addMarkerItem(dataMap)
        // if data then render marker
    }, [dataItemMap])

    //get count và dự án chi tiết theo cityId, districtId và wardId
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/property?cityId=${cityId}${
                        districtId ? '&districtId=' + districtId : ''
                    }${wardId ? '&wardId=' + wardId : ''}`,
                )
                const data = await res.json()
                setDataItemMap(data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchData1 = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${cityId}${
                        districtId ? '&districtId=' + districtId : ''
                    }${wardId ? '&wardId=' + wardId : ''}`,
                )
                const data = await res.json()
                setDataMap(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        fetchData1()
        if (!districtId) {
            setTitleDistrict({
                title: 'Quận/huyện',
                id: null,
            })
        }
        if (!wardId) {
            setTitleWard({
                title: 'Phường/xã',
                id: null,
            })
        }
    }, [districtId, wardId, cityId])

    //get count các quận/huyện
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${cityId || 11}`,
                )
                const data = await res.json()
                setDataDistrict(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [cityId])

    //get count các phường/xã
    useEffect(() => {
        const fetchDataWard = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/property/property-by-address?cityId=${cityId}&districtId=${districtId}`,
                )
                const data = await res.json()
                setDataWard(data)
            } catch (error) {
                console.log(error)
            }
        }
        districtId && fetchDataWard()
    }, [cityId, districtId])

    // di chuyển qua các qh thì sẽ xoá các qh khác
    useEffect(() => {
        listMarkerDistrict?.district?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        listMarkerDistrict?.ward?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        return setListMarkerDistrict((prev) => ({
            ...prev,
            district: null,
            ward: null,
        }))
    }, [isDeleteDistrict])

    // xử lý các marker theo sự kiên zoom và drag
    useEffect(() => {
        if (isFly) return
        getLocationCurrent()
        if (levelZoom >= 13.5) {
            listMarkerDistrict?.ward?.forEach((e) => {
                if (typeof e === 'object') {
                    e?.remove()
                }
            })
        }
        if (levelZoom >= 11.5 && levelZoom < 13.5) {
            listMarkerDistrict?.district?.forEach((e) => {
                if (typeof e === 'object') {
                    e?.remove()
                }
            })
            listMarkerDistrict?.detail?.forEach((e) => {
                if (typeof e === 'object') {
                    e?.remove()
                }
            })
            setWardId(null)
        }
        if (districtId && levelZoom < 11.5) {
            listMarkerDistrict?.ward?.forEach((e) => {
                if (typeof e === 'object') {
                    e?.remove()
                }
            })
            setDistrictId(null)
        }
    }, [levelZoom, isDrag])

    const addTileMap = () => {
        mapRef.current.on('load', function () {
            mapRef.current.addSource('traffic-tiles', {
                type: 'raster',
                // tiles: [`https://maps.vietmap.vn/api/dm/{z}/{x}/{y}@2x.png?apikey=${apiKey}`],
                // tiles: [`https://maps.vietmap.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=${apiKey}`],
                tiles: [`https://maps.vietmap.vn/api/tf/{z}/{x}/{y}.png?apikey=${apiKey}`],
                tileSize: 256,
                // attribution: 'Map',
                id: 'vietmap.streets',
            })
            mapRef.current.addLayer({
                id: 'traffic-tiles',
                type: 'raster',
                source: 'traffic-tiles',
                minZoom: 8,
                maxZoom: 20,
            })
        })
    }

    const addGeojsonLine = (dataPolygon) => {
        if (!dataPolygon) return
        mapRef.current.on('load', function () {
            mapRef.current.addSource('marker-source', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: dataPolygon,
                    },
                },
            })
            mapRef.current.addLayer({
                id: 'marker-layer',
                type: 'line',
                source: 'marker-source',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': 'red',
                    'line-width': 1,
                },
            })
            //     // // mapRef.current.addSource('some id', {
            //     //     type: 'geojson',
            //     //     data: {
            //     //         type: 'FeatureCollection',
            //     //         features: [
            //     //             {
            //     //                 type: 'Feature',
            //     //                 properties: { name: 'Null Island' },
            //     //                 geometry: {
            //     //                     type: 'Point',
            //     //                     coordinates: [105.78234226958115, 21.920931262916405],
            //     //                 },
            //     //             },
            //     //         ],
            //     //     },
            //     // })
        })
    }

    const addMarkerTest = () => {
        mapRef.current.on('load', function () {
            const markerData = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [105.81922371274908, 21.02171763717562], // Tọa độ của marker 1
                        },
                        properties: {
                            // Các thuộc tính của marker 1
                            onclick: new window.vietmapgl.Marker()
                                .setLngLat([105.81922371274908, 21.02171763717562])
                                .setPopup(
                                    new window.vietmapgl.Popup().setHTML(`
                                        <div>
                                            asdsa
                                        </div>
                                `),
                                )
                                .addTo(mapRef.current),
                        },
                    },
                ],
            }
            mapRef.current.addSource('marker1', {
                type: 'geojson',
                data: markerData,
            })

            mapRef.current.addLayer({
                id: 'marker-point',
                type: 'circle', // Loại layer (có thể là 'symbol', 'circle', 'line', hoặc 'fill' tùy vào nhu cầu)
                source: 'marker1', // ID của nguồn dữ liệu
                paint: {
                    'circle-radius': 8, // Kích thước của marker
                    'circle-color': 'black', // Màu sắc của marker
                },
            })

            mapRef.current.on('click', 'marker1', function (e) {
                new vietmapgl.Popup()
                    .setLngLat([105.81922371274908, 21.02171763717562])
                    .setHTML(`Country name: test`)
                    .addTo(mapRef.current)
            })
        })
    }

    // kiểm tra xem điểm giữa của khung hình đang là quân/huyện nào hay là phường/xã nào
    const getLocationCurrent = async () => {
        try {
            const ct = await mapRef.current?.getCenter()
            // call api theo tạo độ center của view map
            const res = await fetch(
                `https://maps.vietmap.vn/api/reverse/v3?apikey=${apiKey}&lng=${ct?.lng}&lat=${ct?.lat}`,
            )
            // get data follow center viewport
            const data = await res.json()

            const one = dataMap?.find(
                (e) => Number(e?.district_id) === data[0]?.boundaries[1]?.id, // boundaries[1]<=> district
            )

            if (Number(one?.count) <= 1) return
            if (levelZoom >= 11.5) {
                setDistrictId(data[0]?.boundaries[1]?.id)
                if (data[0]?.boundaries[1]?.id !== districtId) {
                    listMarkerDistrict?.ward?.forEach((e) => {
                        if (typeof e === 'object') {
                            e?.remove()
                        }
                    })
                }
            }
            if (levelZoom >= 13.5) {
                setWardId(data[0]?.boundaries[0]?.id) // boundaries[1]<=> ward
                if (data[0]?.boundaries[0]?.id !== wardId) {
                    listMarkerDistrict?.detail?.forEach((e) => {
                        if (typeof e === 'object') {
                            e?.remove()
                        }
                    })
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    // fly đến tỉnh/quận/phươ
    const flyMap = (lat = 104.78234226958115, lon = 22.920931262916405, zoom = 9, time = 1000) => {
        mapRef.current.flyTo({
            center: [lat, lon],
            zoom: zoom,
            // speed: 0.2,
            curve: 1,
            // easing(t) {
            // 	return t;
            // },
        })
        setLevelZoom(zoom)
        setTimeout(() => {
            setIsFly(false)
        }, time)
    }

    // handle change city
    const handleChangeCity = (id, dataProvinces) => {
        if (!dataProvinces) return

        const itemCity = dataProvinces?.find((i) => i?.city_id == id)
        if (!itemCity) {
            return notifyError('No data project in address city search!')
        }
        //set lại cityid
        setCityId(Number(id))
        // khi chuyển city thì setDistrictId và setWardId về null
        setDistrictId(null)
        setWardId(null)

        // fly zoom to city
        flyMap(itemCity?.city_lng, itemCity?.city_lat)
        // khi đổi tỉnh thì xoá tất cả các marker đi
        listMarkerDistrict?.district?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        listMarkerDistrict?.ward?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        listMarkerDistrict?.detail?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        setListMarkerDistrict(initial)
    }

    //handle change district
    const handleChangeDistrict = (id, dataDistrict) => {
        if (!dataDistrict) return
        const itemDistrict = dataDistrict?.find((e) => e?.district_id == id)
        if (typeof itemDistrict !== 'object') {
            return notifyError('No data project in address district search!')
        }
        setIsDeleteDistrict(!isDeleteDistrict)
        setWardId(null)
        setIsFly(true)
        flyMap(itemDistrict?.district_lng, itemDistrict?.district_lat, 11.5)
        // nếu đã có px thì khi zoom về qh phải xoá px đi
        if (listMarkerDistrict?.detail && wardId) {
            listMarkerDistrict?.detail?.forEach((e) => {
                if (typeof e === 'object') {
                    e?.remove()
                }
            })
            setListMarkerDistrict((prev) => ({
                ...prev,
                detail: null,
            }))
        }
        // fly zoom to district
    }

    //handle change ward
    const handleChangeWard = (id, dataWard) => {
        if (!dataWard) return
        const itemCity = dataWard?.find((i) => i?.ward_id == id)
        if (!itemCity) {
            return notifyError('No data project in address ward search!')
        }
        //delete marker before fly to city other
        setIsFly(true)
        flyMap(itemCity?.ward_lng, itemCity?.ward_lat, 13.5)
        // fly zoom to ward
        listMarkerDistrict?.detail?.forEach((e) => {
            if (typeof e === 'object') {
                e?.remove()
            }
        })
        setListMarkerDistrict((prev) => ({
            ...prev,
            detail: null,
        }))
    }

    return (
        <>
            <div
                ref={mapRef}
                style={{
                    position: 'relative',
                }}
                id='map'
                className='h-screen'
            >
                <div className='absolute top-0 left-0 flex w-full h-fit z-[1000] bg-white'>
                    <SelectCity
                        data={dataProvinces}
                        handleChangeCity={handleChangeCity}
                        titleCity={titleCity}
                        setTitleCity={setTitleCity}
                        districtId={districtId}
                        wardId={wardId}
                        cityId={cityId}
                    />
                    {dataDistrict?.length > 0 && (
                        <SelectDistrict
                            data={dataDistrict?.filter((e) => e?.district_id != 0)}
                            districtId={districtId}
                            wardId={wardId}
                            setDistrictId={setDistrictId}
                            handleChangeDistrict={handleChangeDistrict}
                            titleDistrict={titleDistrict}
                            setTitleDistrict={setTitleDistrict}
                        />
                    )}
                    <SelectWard
                        className={`${districtId && dataWard ? '' : 'hidden'}`}
                        data={dataWard}
                        wardId={wardId}
                        setWardId={setWardId}
                        handleChangeWard={handleChangeWard}
                        titleWard={titleWard}
                        setTitleWard={setTitleWard}
                    />
                    <button
                        onClick={() => setIsTest(!isTest)}
                        className='bg-black text-white'
                    >
                        test marker
                    </button>
                </div>
            </div>
        </>
    )
}
