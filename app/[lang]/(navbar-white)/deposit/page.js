import ConsignmentIndex from '@/components/consignment'
import { getDictionary } from '../../dictionaries'

export default async function DepositPage({ params: { lang } }) {
    const t = await getDictionary(lang)
    return (
        <>
            <ConsignmentIndex
                t={t}
                lang={lang}
            />
        </>
    )
}
