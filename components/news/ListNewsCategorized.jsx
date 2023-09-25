import NewsItem from './NewsItem'
import LatestNewsItem from '../general/LatestNewsItem'
import OtherNewsItem from '../general/OtherNewsItem'

export default function ListNewsCategorized({ list, t, lang }) {
    
    return (
        <div className='max-md:pr-[2.6vw]'>
            <div className='mt-[3.5vw] grid grid-cols-3 grid-rows-[16.875vw_16.875vw] gap-[1.5vw] max-md:grid-cols-1 max-md:grid-rows-[68.5vw_44.2vw_44.2vw] max-md:gap-[4.2vw] max-lg:grid-cols-1 max-lg:grid-rows-[66.6vw_28.2vw_28.2vw]'>
                {list[0] && 
                    <div className='col-span-2 row-span-2 max-lg:col-span-1 max-lg:row-span-1'>
                        <LatestNewsItem
                            newsItem={list[0]}
                            id={list[0].id}
                            t={t}
                            lang={lang}
                        ></LatestNewsItem>
                    </div>
                }
                {list?.slice(1, 3)?.map((news, index) => (
                    <div key={news.id}>
                        <OtherNewsItem newsOtherItem={news} lang={lang} index={index}/>
                    </div>
                ))}
            </div>
            <div className='mt-[3.75vw] grid grid-cols-3 gap-[1.5vw] max-lg:grid-cols-1 max-md:gap-[4.2vw] max-md:mt-[4.2vw]'>
                {list?.slice(3, 12)?.map((item, index) => (
                    <NewsItem
                        key={item.id}
                        newsOtherItem={item}
                        lang={lang}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
