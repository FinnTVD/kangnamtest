import IndexAgreement from '@/components/agreement'
import HeaderV2 from '@/components/general/HeaderV2'
import { getDictionary } from '../../dictionaries'
import { handleCheckLangCode } from '@/utils'
import getData from '@/utils/getData'
const src = '/images/bg-agreement.jpg'
export default async function Agreement({ params }) {
    const t = await getDictionary(params.lang)
    const post = await getData(`/post/post-by-slug/${params.agreement}`)
    const langCode = handleCheckLangCode(params.lang)
    const agreementDetail = post?.translations?.find((item) => item?.languageCode === langCode)

    return (
        <>
            <HeaderV2
                lang={params.lang}
                t={t}
                post={post}
                newsDetail={agreementDetail}
                breadcrumb={agreementDetail.title}
            />
            {agreementDetail && (
                <IndexAgreement
                    agreementDetail={agreementDetail}
                    post={post}
                    lang={params.lang}
                />
            )}
        </>
    )
}
