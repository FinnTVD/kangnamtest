'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useStore from '@/app/[lang]/(store)/store'

const arrHref = ['/en', '/kr', '/ch']
const arrLanguage = [
    {
        id: 1,
        title: 'Việt Nam',
        src: '/images/vn.svg',
        code: 'vi',
        languageCode: 'vi_VN',
    },
    {
        id: 2,
        title: 'English',
        src: '/images/english.svg',
        code: 'en',
        languageCode: 'en_US',
    },
    {
        id: 3,
        title: 'Korea',
        src: '/images/korea.svg',
        code: 'kr',
        languageCode: 'ko_KR',
    },
    {
        id: 4,
        title: 'China',
        src: '/images/china.svg',
        code: 'ch',
        languageCode: 'zh_CN',
    },
]

export default function SelectLanguage({ className, lang }) {
    const setLanguage = useStore((state) => state.setLanguage)
    const slugDetailProject = useStore((state) => state.slugDetailProject)
    const slugDetailNews = useStore((state) => state.slugDetailNews)
    const pathName = usePathname()

    const handleHref = (lg, lgCode) => {
        if (slugDetailProject) {
            const item = slugDetailProject?.translations?.find((e) => e?.languageCode?.includes(lgCode))
            const lgNew = lg === 'vi' ? '' : lg + '/'
            if (item?.slug) {
                return '/' + lgNew + slugDetailProject?.propertyCategory?.alias + '/' + item?.slug
            } else {
                const itemVN = slugDetailProject?.translations?.find((e) => e?.languageCode?.includes('vi_VN'))
                return '/' + lgNew + slugDetailProject?.propertyCategory?.alias + '/' + itemVN?.slug
            }
        }
        if (slugDetailNews) {
            const item = slugDetailNews?.translations?.find((e) => e?.languageCode?.includes(lgCode))
            const lgNew = lg === 'vi' ? '' : lg + '/'
            if (item?.slug) {
                return '/' + lgNew + 'news/' + item?.slug
            } else {
                const itemVN = slugDetailNews?.translations?.find((e) => e?.languageCode?.includes('vi_VN'))
                return '/' + lgNew + 'news/' + itemVN?.slug
            }
        }
        if (lg === 'vi') {
            if (lang === 'vi') {
                return pathName
            } else if (arrHref.includes(pathName)) {
                return '/'
            } else {
                return pathName.slice(3)
            }
        } else {
            if (lg === lang) {
                return pathName
            }
            if (lang === 'vi') {
                return lg + pathName
            } else {
                return '/' + lg + pathName.slice(3)
            }
        }
    }

    const handleChangeLanguage = (code) => {
        setLanguage(code)
    }

    return (
        <ul
            id='box-select-language'
            className={`${className} absolute flex flex-col -bottom-[0.5vw] left-0 translate-y-full bg-white rounded-md w-[8vw] max-lg:w-[12vw] h-fit py-[0.5vw] z-[99999] text-black max-md:w-[27.5vw] max-md:-left-[2.13vw] max-md:py-[1vw] max-md:-bottom-[1vw]`}
        >
            {arrLanguage &&
                arrLanguage?.map((e) => (
                    <li key={e?.id}>
                        <Link
                            className='cursor-pointer select-none max-md:py-[1vw] flex items-center gap-x-[0.5vw] max-md:px-[2.13vw] max-md:gap-x-[2.4vw] w-full px-[0.5vw] py-[0.25vw] hover:bg-[#57534e80]'
                            href={handleHref(e?.code, e?.languageCode)}
                            replace
                            scroll={false}
                            onClick={() => handleChangeLanguage(e?.code)}
                        >
                            <Image
                                className='w-[1.75vw] h-[1.125vw] max-lg:w-[2.5vw] max-lg:h-[1.875vw] max-md:w-[6.13vw] max-md:h-[3.73vw] object-cover rounded-[3px]'
                                src={e?.src}
                                alt={e?.title}
                                width={28}
                                height={18}
                            />
                            <span className='title16-600-150 max-md:title-mb14-600-150 whitespace-nowrap -tracking-[0.48px] block max-lg:title-tl12'>
                                {e?.title}
                            </span>
                        </Link>
                    </li>
                ))}
        </ul>
    )
}
