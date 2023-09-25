'use client'
import classes from "./AgreementStyles.module.css"
import useStore from '@/app/[lang]/(store)/store'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Description({data, post, lang}){
    useEffect(() => {
        if(data)
            router.replace(`/${lang}/${data.slug}`, undefined, {shallow: true})
    }, lang)
    const router = useRouter()
    const description = "<p>This privacy policy sets out how OEI uses and protects any information that you give OEI when you use this website. OEI is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. OEI may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p><p><strong>What we collect</strong></p><p>We may collect the following information:</p><ul><li>Name;</li><li>Contact information including email address;</li><li>Demographic information such as postcode, preferences and interests;</li><li>Other information relevant to customer surveys and/or offers;</li><li>For the exhaustive list of cookies we collect see the List of cookies we collect section.</li></ul><p><strong>What we do with the information we gather</strong></p><p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p><ul><li>Internal record keeping.</li><li>We may use the information to improve our products and services.</li><li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li><li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li></ul><h2>Data Protection Notice</h2><p>This data protection notice describes how OEI with Swedish company registration number 556719-4914 (”OEI”) as the controller of this website processes your personal data in connection with your usage of this website.</p>"
    return(
        <section className={classes.description} dangerouslySetInnerHTML={{__html: data?.description}}>

        </section>
    )
}