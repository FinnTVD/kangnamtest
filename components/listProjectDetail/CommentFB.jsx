'use client'

import { useEffect } from 'react'

export default function CommentFB({ data }) {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }, [])
    return (
        <section
            id='box-comment'
            className='h-fit px-120 min-h-[500px] mt-[2.5vw] px-mb10'
        >
            <h2 className='title32-600-127 text-den max-md:title-mb25-700-150 max-lg:title-tl25'>Comments</h2>
            <div id='fb-root'></div>
            <div
                className='fb-comments'
                data-href={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.id}`}
                data-width='800'
                data-numposts='5'
            ></div>
        </section>
    )
}
