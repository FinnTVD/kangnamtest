import { create } from 'zustand'
const useStore = create((set, get) => ({
    language: 'vi',
    propertyAreaType: [],
    propertyCategory: [],
    propertyType: [],
    socialMedia: false,
    slugDetailProject: null,
    slugDetailNews: null,
    dataSubmitForm: null,
    triggerSubmit: false,
    cityId: 11,
    districtId: null,
    wardId: null,
    dataHomePage: null,
    valueSearch: '',
    valueSearchPrev: '',
    boxMap: null,
    isSubmit: false,
    selectSearch: '',
    dataProvinces: null,
    dataDistrict: null,
    dataWard: null,
    listData: '',
    isFeatureHome: false,
    listNav: [],
    mapRef: null,
    levelZoom: 9,
    isClose: true,
    setIsClose: (data) => {
        set((state) => {
            return {
                ...state,
                isClose: data,
            }
        })
    },
    setLevelZoom: (data) => {
        set((state) => {
            return {
                ...state,
                levelZoom: data,
            }
        })
    },
    setMapRef: (data) => {
        set((state) => {
            return {
                ...state,
                mapRef: data,
            }
        })
    },
    setListData: (data) => {
        set((state) => {
            return {
                ...state,
                listData: data,
            }
        })
    },
    setListNav: (data) => {
        set((state) => {
            return {
                ...state,
                listNav: data,
            }
        })
    },
    setIsFeatureHome: (data) => {
        set((state) => {
            return {
                ...state,
                isFeatureHome: data,
            }
        })
    },
    setDataWard: (data) => {
        set((state) => {
            return {
                ...state,
                dataWard: data,
            }
        })
    },
    setDataDistrict: (data) => {
        set((state) => {
            return {
                ...state,
                dataDistrict: data,
            }
        })
    },
    setDataProvinces: (data) => {
        set((state) => {
            return {
                ...state,
                dataProvinces: data,
            }
        })
    },
    setValueSearchPrev: (data) => {
        set((state) => {
            return {
                ...state,
                valueSearchPrev: data,
            }
        })
    },
    setSelectSearch: (data) => {
        set((state) => {
            return {
                ...state,
                selectSearch: data,
            }
        })
    },
    setIsSubmit: (data) => {
        set((state) => {
            return {
                ...state,
                isSubmit: data,
            }
        })
    },
    setBoxMap: (data) => {
        set((state) => {
            return {
                ...state,
                boxMap: data,
            }
        })
    },
    setValueSearch: (data) => {
        set((state) => {
            return {
                ...state,
                valueSearch: data,
            }
        })
    },
    setDataHomePage: (data) => {
        set((state) => {
            return {
                ...state,
                dataHomePage: data,
            }
        })
    },
    setCityId: (data) => {
        set((state) => {
            return {
                ...state,
                cityId: data,
            }
        })
    },
    setDistrictId: (data) => {
        set((state) => {
            return {
                ...state,
                districtId: data,
            }
        })
    },
    setWardId: (data) => {
        set((state) => {
            return {
                ...state,
                wardId: data,
            }
        })
    },
    setTriggerSubmit: (data) => {
        set((state) => {
            return {
                ...state,
                triggerSubmit: data,
            }
        })
    },
    setDataSubmitForm: (data) => {
        set((state) => {
            return {
                ...state,
                dataSubmitForm: data,
            }
        })
    },
    setSlugDetailProject: (data) => {
        set((state) => {
            return {
                ...state,
                slugDetailProject: data,
            }
        })
    },
    setSlugDetailNews: (data) => {
        set((state) => {
            return {
                ...state,
                slugDetailNews: data,
            }
        })
    },
    setLanguage: (lang) => {
        set((state) => {
            return {
                ...state,
                language: lang,
            }
        })
    },
    setPropertyAreaType: (area) => {
        set((state) => {
            return {
                ...state,
                propertyAreaType: [...area],
            }
        })
    },
    setPropertyType: (type) => {
        set((state) => {
            return {
                ...state,
                propertyType: [...type],
            }
        })
    },
    setPropertyCategory: (category) => {
        set((state) => {
            return {
                ...state,
                propertyCategory: [...category],
            }
        })
    },
}))

export default useStore
