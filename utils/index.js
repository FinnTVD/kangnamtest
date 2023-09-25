import { toast } from 'react-toastify'

const handleCheckParamsLanguage = (lang, href) => {
    switch (lang) {
        case 'vi':
            return href
        case 'en':
            return '/en' + href
        case 'kr':
            return '/kr' + href
        case 'ch':
            return '/ch' + href
        default:
            return '/'
    }
}
const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} - ${hours}:${minutes}`
}

const handleCheckLangCode = (lang) => {
    switch (lang) {
        case 'vi':
            return 'vi_VN'
        case 'en':
            return 'en_US'
        case 'kr':
            return 'ko_KR'
        case 'ch':
            return 'zh_CN'
        default:
            return 'vi_VN'
    }
}

const handleCheckParams = (pathName, dataSlug) => {
    if (!dataSlug || !pathName) return
    let pathNew = pathName?.toString()?.slice(1)?.toLowerCase()

    dataSlug?.data?.forEach((e) => {
        if (e?.translations?.find((i) => i?.alias?.toLowerCase()?.includes(pathNew))) {
            return '&propertyCategoryIds=' + e?.id
        }
    })
    // if (pathName?.includes('buy')) return '&propertyCategoryIds=87dd143a-695b-44f9-94a1-c8a9af862154'
    // if (pathName?.includes('hire')) return '&propertyCategoryIds=05d52397-71a8-4ecf-9a86-ee37965332ef'
    // if (pathName?.includes('resale')) return '&propertyCategoryIds=7fec6f07-be5c-49e1-8ceb-d87ebccaf9a6'
    // return ''
}

const findIdByAlias = (pathName, dataSlug) => {
    for (const item of dataSlug) {
        for (const translation of item?.translations) {
            if (translation?.alias?.toLowerCase()?.includes(pathName?.slice(1))) {
                return '&propertyCategoryIds=' + item?.id
            }
        }
    }
    // Trường hợp không tìm thấy khớp nào
    return ''
}

const arrFilter = [
    {
        id: 1,
        title: 'Loại hình',
        slug: 'propertyTypeIds',
        api: '/property-type',
    },
    {
        id: 2,
        title: 'Địa điểm',
        slug: 'propertyAreaTypeIds',
        api: '/property-area-type',
    },
    {
        id: 3,
        title: 'Hình thức',
        slug: 'propertyCategoryIds',
        api: '/property-category',
    },
]
const arrFilterV2 = [
    {
        id: 1,
        title: 'Loại hình',
        slug: 'propertyTypeIds',
        api: '/property-type',
    },
    {
        id: 2,
        title: 'Địa điểm',
        slug: 'propertyAreaTypeIds',
        api: '/property-area-type',
    },
]
const handleCheckIsHome = (pathName) => {
    switch (pathName) {
        case '/vi':
            return true
        case '/en':
            return true
        case '/kr':
            return true
        case '/ch':
            return true
        default:
            return false
    }
}

const notifySuccess = (title) =>
    toast.success(title || 'Successful form submission!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
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

const scrollToSection = (element) => {
    element.scrollIntoView({
        behavior: 'smooth',
    })
}

const handleListPhone = (str) => {
    if (!str) return
    if (str.split('|')?.length) return str.split('|')
    if (str.split('/')?.length) return str.split('/')
    if (str.split('--')?.length) return str.split('--')
    if (str.split('-')?.length) return str.split('-')
}

const listIdNav = [
    '87dd143a-695b-44f9-94a1-c8a9af862154',
    '7fec6f07-be5c-49e1-8ceb-d87ebccaf9a6',
    '05d52397-71a8-4ecf-9a86-ee37965332ef',
]

export {
    handleCheckParamsLanguage,
    formatDateTime,
    handleCheckLangCode,
    handleCheckParams,
    handleCheckIsHome,
    arrFilter,
    arrFilterV2,
    notifyError,
    notifySuccess,
    scrollToSection,
    handleListPhone,
    listIdNav,
    findIdByAlias,
}
