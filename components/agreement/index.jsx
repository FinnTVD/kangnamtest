import Description from "./Description";

export default function IndexAgreement({agreementDetail, post, lang}) {

    return(
        <>
            <Description data={agreementDetail} post={post} lang={lang}></Description>
        </>
    )
}