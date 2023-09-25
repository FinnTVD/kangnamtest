import Image from 'next/image'
import Link from 'next/link'

const listSocial = [
    {
        id: 1,
        src: '/images/talk.svg',
        title: 'kakaotalk',
    },
    {
        id: 2,
        src: '/images/wechat.svg',
        title: 'wechat',
    },
    {
        id: 3,
        src: '/images/zalo.svg',
        title: 'zalo',
    },
    {
        id: 4,
        src: '/images/telegram.svg',
        title: 'telegram',
    },
    {
        id: 5,
        src: '/images/skype.svg',
        title: 'skype',
    },
    {
        id: 6,
        src: '/images/linkedin.svg',
        title: 'linkedIn',
    },
]

export default function SocialMedia({ dataInfo }) {
    return (
        <ul
            id='list-social'
            className='group-hover:flex hidden flex-col gap-y-[0.63vw] absolute top-1/2 -left-full -translate-y-1/2 -translate-x-[0.62vw] z-20'
        >
            {listSocial &&
                listSocial.map((e, index) => (
                    <li
                        key={index}
                        className='relative group/item w-fit h-fit before:w-[3.5vw] before:h-[3.5vw] before:absolute before:transition-all before:duration-300 before:rounded-full before:bg-logo before:z-10 rounded-full overflow-hidden before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 hover:before:scale-110 border-[2px] border-solid border-[#D6A279] hover:border-white'
                    >
                        <Link
                            href={dataInfo[e?.title] || '/'}
                            target='_blank'
                            className='flex group justify-center items-center w-[3.5vw] h-[3.5vw] bg-white rounded-full relative'
                        >
                            <Image
                                className='relative z-20 object-contain w-[2vw] h-[2vw] group-hover/item:brightness-0 group-hover/item:invert'
                                src={e.src}
                                alt={e.title}
                                width={56}
                                height={56}
                                priority
                            />
                        </Link>
                    </li>
                ))}
        </ul>
    )
}
