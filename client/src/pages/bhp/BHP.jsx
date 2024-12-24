import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import PageHeader from "../../components/pageHeader/PageHeader"
import "./bhp.css"

function BHP() {

    const {t} = useTranslation()

    return (
        <>
        <Helmet>
            <title>BHP - Waveast</title>
            <link rel="canonical" href="/bhp" />
            <meta name="description" 
                content="Waveast Installation & Park Services is a company that provides engineering, installation, maintenance, expansion, renovation, and consultancy services for amusement items and water parks. It was created in 2021 in Warsaw, Poland." />
        </Helmet>
        <div className="bhp__page">
            <PageHeader pageTitle={t(`pageTitles.bhp`)} />
            <div className="bhp__overview container section__padding--block">
                <p>{t(`bhp.paragraphOne`)}</p>
                <div>
                    <div className="bhp__subtitle">{t(`bhp.subTitleOne`)}</div>
                    <ul className="bhp__list">
                        <li className="bhp__list-item">{t(`bhp.listOne.0`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.1`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.2`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.3`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.4`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.5`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.6`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.7`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.8`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.9`)}</li>
                        <li className="bhp__list-item">{t(`bhp.listOne.10`)}</li>
                    </ul>
                </div>
                <div>
                    <div className="bhp__subtitle">{t(`bhp.subTitleTwo`)}</div>
                    <ul className="bhp__list">  
                    <li className="bhp__list-item">{t(`bhp.listTwo.0`)}</li>
                    <li className="bhp__list-item">{t(`bhp.listTwo.1`)}</li>
                    <li className="bhp__list-item">{t(`bhp.listTwo.2`)}</li>
                    <li className="bhp__list-item">{t(`bhp.listTwo.3`)}</li>
                    <li className="bhp__list-item">{t(`bhp.listTwo.4`)}</li>
                    </ul>
                </div>
                <p>{t(`bhp.paragraphTwo`)}</p>
            </div>
        </div>
        </>
    )
}

export default BHP