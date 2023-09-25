import { getDictionary } from '../dictionaries'
import Footer from '@/components/general/Footer'

export const metadata = {
    title: 'Danh sách dự án',
    description: 'KangNam by OkHub',
}

export default async function RootLayout({ children, params }) {
    const t = await getDictionary(params.lang)

    return (
        <>
            {children}
            <Footer
                lang={params.lang}
                t={t}
            />
        </>
    )
}
