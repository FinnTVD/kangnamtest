import NavBarV2 from '../general/NavBarV2'
import WrapperForm from './WrapperForm'
import { ToastContainer } from 'react-toastify'


export default function ConsignmentIndex({ t, lang }) {
    return (
        <>
            <header className='fixed top-0 left-0 w-screen bg-white h-fit shadow-boxFilter z-[999999999999]'>
                <NavBarV2
                    lang={lang}
                    t={t}
                />
            </header>
            <main className='overflow-hidden h-fit'>
                <WrapperForm t={t} />
                <ToastContainer style={{ zIndex: '999999999999999' }} />
            </main>
        </>
    )
}
