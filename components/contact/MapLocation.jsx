'use client'
export default function MapLocation() {
    return (
        <section className='w-screen h-[38.125vw] max-md:h-[162vw] max-lg:h-[60vw]'>
            <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4429.191018421094!2d105.77505852561382!3d21.013037119231313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454aa0fed56c7%3A0x1ba275bf03d4c1a9!2zVHJ1bmcgdMOibSB0aMawxqFuZyBt4bqhaSBUaGUgR2FyZGVu!5e0!3m2!1svi!2s!4v1691209031848!5m2!1svi!2s'
                width='600'
                height='450'
                style={{ border: '0' }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full h-full'
            ></iframe>
        </section>
    )
}
