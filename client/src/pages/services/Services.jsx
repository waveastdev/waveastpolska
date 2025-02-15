import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { wrapCompanyName } from "../../utils/wrapCompanyName"
import PageHeader from "../../components/pageHeader/PageHeader"
import servicesItems from "../../data/servicesItems"
import "./services.css"

function Services() {

    const {t} = useTranslation()

    return (
        <>
        <Helmet>
            <title>Services - Waveast</title>
            <link rel="canonical" href="/services" />
            <meta name="description" content="Waveast is a leading provider of comprehensive solutions for the amusement and entertainment industry.  We offer waterslide installation & maintenance, theming & design, and more." />
        </Helmet>
        <div className="services__page">
            <PageHeader pageTitle={t(`pageTitles.services`)} />
            <div className="services__overview container section__padding--block">
                <p>{wrapCompanyName(t(`servicesCompany.0`))}</p>
                <p>{wrapCompanyName(t(`servicesCompany.1`))}</p>
            </div>

            <div className="services__container section__padding--bottom container">
                {servicesItems.map((service) => {
                    return (
                        <div key={service.id} className="services__service" id={service.idTag} >
                            <div className="services__icon">
                                {service.icon}
                            </div>
                            <div className="services__content">
                                <h3 className="services__title">{t(service.titleKey)}</h3>
                                <ul className="services__para">
                                    {service.contentKey.map((contentKey, index) => (
                                        <li key={index} className="services__para-item">
                                            <span>{t(contentKey.subTitleKey)}</span>
                                            <span>{t(contentKey.subContentKey)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
        </>
    )
}

export default Services