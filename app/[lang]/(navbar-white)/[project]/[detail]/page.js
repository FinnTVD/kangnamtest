import IndexProjectDetail from '@/components/listProjectDetail'
import getData from '@/utils/getData'
export async function generateMetadata({ params: { lang, detail } }) {
    const data = await getData(`/property/property-by-slug/${detail}`)
    if (!data) return
    const dataDetail = data?.translations?.find((e) => e?.slug === detail)
    return {
        title: dataDetail?.titleSeo || 'Detail Project',
        description: dataDetail?.descSeo,
        applicationName: process.env.SITE_NAME,
        openGraph: {
            title: dataDetail?.titleSeo,
            description: dataDetail?.descSeo,
            url: process.env.DOMAIN,
            siteName: process.env.SITE_NAME,
            images: [
                {
                    url: data?.firstImage,
                    alt: dataDetail?.name || dataDetail?.titleSeo,
                },
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dataDetail?.titleSeo,
            description: dataDetail?.descSeo,
            creator: process.env.SITE_NAME,
            images: [
                {
                    url: data?.firstImage,
                    alt: dataDetail?.name || dataDetail?.titleSeo,
                },
            ],
        },
        robots: {
            index: false,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}
export default function DetailPage({ params: { lang, detail } }) {
    return (
        <IndexProjectDetail
            lang={lang}
            detail={detail}
        />
    )
}
