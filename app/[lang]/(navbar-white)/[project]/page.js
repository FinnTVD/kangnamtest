import IndexListProject from '@/components/listProject'
import { getDictionary } from '../../dictionaries'
import getData from '@/utils/getData'
import { ToastContainer } from 'react-toastify'

export default async function Page({ params: { lang } }) {
    const t = await getDictionary(lang)
    const data = await getData('/property-category')
    return (
        <>
            <IndexListProject
                lang={lang}
                t={t}
                dataSlug={data?.data}
            />
            <ToastContainer style={{ zIndex: '999999999999999' }} />
        </>
    )
}
