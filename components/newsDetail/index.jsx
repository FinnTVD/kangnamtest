import PostDetail from './PostDetail'
import RelatedNews from './RelatedNews'

export default function IndexNewsDetail({ lang, t, post, newsDetail, category }) {
    return (
        <>
            {post && (
                <PostDetail
                    t={t}
                    post={post}
                    newsDetail={newsDetail}
                    lang={lang}
                    category={category}
                ></PostDetail>
            )}
            {post && (
                <RelatedNews
                    t={t}
                    lang={lang}
                    post={post}
                ></RelatedNews>
            )}
        </>
    )
}
