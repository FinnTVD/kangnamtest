import IndexHome from '@/components/home'
import { getDictionary } from '../dictionaries'

export default async function Home({ params: { lang } }) {
    const t = await getDictionary(lang)
    return (
        <IndexHome
            lang={lang}
            t={t}
        />
    )
}
