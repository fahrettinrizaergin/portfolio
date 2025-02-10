import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

export default function GlobalHelment({title = '',description='',keywords=''}) { 
    const {t} = useTranslation()
    return (
        <Helmet>
            <title>{String(title).length > 0 ? title + ' - Fahrettin Rıza Ergin' : 'Fahrettin Rıza Ergin'} - Full Stack Developer</title>
            <meta name="description" content={description || t('home.description')} />
            <meta name="keywords" content={keywords || "Full Stack Developer, Web Development, React, Node.js, JavaScript"} />
            <meta property="og:title" content={String(title).length > 0 ? title + ' - Fahrettin Rıza Ergin - Full Stack Developer' : 'Fahrettin Rıza Ergin - Full Stack Developer'} />
            <meta property="og:description" content={description || t('home.description')} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={String(title).length > 0 ? title + ' - Fahrettin Rıza Ergin - Full Stack Developer' : 'Fahrettin Rıza Ergin - Full Stack Developer'} />
            <meta name="twitter:description" content={description || t('home.description')} />
        </Helmet>
    )
}