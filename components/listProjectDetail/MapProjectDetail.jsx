'use client'
import { useEffect, useRef, useState } from 'react'
const apiKey = 'c6a8fb5d25f0f32c87d1469f6847388c445850643364b94e'

export default function MapProjectDetail({ dataDetail, data }) {
    const mapRef = useRef(null)
    const [marker, setMarker] = useState(null) // lưu các marker lại đê xoá

    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return
        const loadMap = () => {
            if (!window.vietmapgl || typeof window === 'undefined') return
            mapRef.current = new window.vietmapgl.Map({
                container: 'mapProjectDetail',
                style: `https://maps.vietmap.vn/mt/tm/style.json?apikey=${apiKey}`,
                center: [data?.address?.lng, data?.address?.lat], //ha noi center
                zoom: 16,
                pitch: 90, // góc nhìn từ trên cao nhìn xuống
            })
        }
        loadMap() //add map
    }, [])

    useEffect(() => {
        const addMarkerItem = (dataDetail, data) => {
            if (!dataDetail || !data) return
            const divElement = document.createElement('div')
            divElement.textContent = 1
            divElement.setAttribute('data-marker', data?.id)
            // Set options
            // if (!window.vietmapgl || typeof window === 'undefined') return
            const marker = new window.vietmapgl.Marker({
                // scale: [0.5], //size of marker
                element: divElement,
            })
                .setLngLat([data?.address?.lng || 0, data?.address?.lat || 0])
                .setPopup(
                    new window.vietmapgl.Popup().setHTML(`
                    <div style="width:fit-content;height:fit-content">
                        <div
                            key=${data?.id}
                            class="flex gap-x-[0.88vw]"
                        >
                            <img
                                class="w-[5.4375vw] h-[4.75vw] block object-cover"
                                src=${data?.firstImage || '/images/itemproject.jpg'}
                                alt=${dataDetail?.name || 'marker'}
                            />
                            <div class="w-[12.0625vw]">
                                <h2 class='line-clamp-1'>${dataDetail.name ?? ''}</h2>
                                <div
                                            title=${data?.address?.display}
                                            class='flex items-center'
                                        >
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150 whitespace-nowrap'>
                                                Địa chỉ:
                                            </span>
                                            <span class='capitalize text-black title14-400-150 line-clamp-1'>
                                                ${
                                                    data?.address?.name +
                                                    ', ' +
                                                    data?.address?.ward +
                                                    ', ' +
                                                    data?.address?.district
                                                }
                                            </span>
                                        </div>
                                        <div class='flex items-center my-[0.5vw]'>
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150'>
                                                Diện tích:
                                            </span>
                                            <span class=' text-black title14-400-150'>
                                                ${dataDetail.size + ' m²'}
                                            </span>
                                        </div>
                                        <div class='flex items-center'>
                                            
                                            <span class='ml-[0.5vw] mr-[0.25vw] text-black title14-700-150'>
                                                Mức giá:
                                            </span>
                                            <span class='capitalize text-black title14-400-150'>
                                                ${dataDetail.priceDisplay}
                                            </span>
                                        </div>
                            </div>
                        </div>
                    </div>
            `),
                )
                .addTo(mapRef.current)
            setMarker(marker)
        }
        dataDetail && addMarkerItem(dataDetail, data)
        // if data then render marker
        return () => marker?.remove()
    }, [dataDetail])
    return (
        <div
            ref={mapRef}
            style={{
                position: 'relative',
            }}
            id='mapProjectDetail'
            className='w-[56.1875vw] h-[25.3125vw] rounded-[1vw] mt-[1vw] max-md:mt-[4.27vw] max-md:h-[66.93vw] max-md:w-full max-md:rounded-[3.73vw]'
        ></div>
    )
}
