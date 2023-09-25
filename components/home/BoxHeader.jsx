import getData from '@/utils/getData'
import Header from '../general/Header'
// import { headers } from 'next/headers'
export default async function BoxHeader({ lang, t, dataInfo }) {
    const data = await getData('/home-page')
    // const headersList = headers()
    // const referer = headersList.get('referer')
    return (
        <>
            {/* <div className='text-black'>Referer: {referer}</div> */}
            <Header
                lang={lang}
                t={t}
                data={data}
                isHome={true}
                dataInfo={dataInfo}
            />
        </>
    )
}
