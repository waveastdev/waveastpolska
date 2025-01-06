
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import PageHeader from "../../components/pageHeader/PageHeader"
import "./privacy.css"


function Privacy() {

    const [date, setDate] = useState(new Date("November 2, 2024"))
    const {t} = useTranslation()

    const highlightText = (text) => {
        if (!text) {
            return null
        }

        const regex = /--(.*?)--/g
        const parts = text.split(regex)

        return parts.map((part, index) => {
            if (index % 2 !== 0) {
                return <span key={index} className="privacy__highlight">{part}</span>
            }
            return part
        })
    }

    useEffect(() => {
        if (date === null) {
            return
        }

        const interval = setInterval(() => {
            setDate(prevDate => {
                const newDate = new Date(prevDate)
                newDate.setFullYear(newDate.getFullYear() + 1)
                return newDate
            })
        }, 365 * 24 * 60 * 60 * 1000)

        return () => clearInterval(interval)
    }, [date])

    return (

    <>
    <Helmet>
        <title>Privacy - Waveast</title>
        <link rel="canonical" href="/privacy" />
        <meta name="description" content="This Privacy Policy explains how Waveast Sp. z o.o. collects, uses, and shares your information when you use our website (https://waveast.pl/)." />
    </Helmet>
    <div className="privacy__page">
        <div className="privacy">
            <PageHeader pageTitle={t(`pageTitles.privacy`)} />
            <div className="container section__padding--top">
                <p className="privacy__update"><span>{t(`privacy.lastUpdated`)}</span> {date?.toLocaleDateString('en-GB')}</p>
                <div className="privacy__text">
                    <p>{highlightText(t(`privacy.privacyTextOne`))} </p>
                    <p>{t(`privacy.privacyTextTwo`)}</p>
                </div>
            </div>
            <div className="privacy__text container privacy__padding--top">
                <h2 className="privacy__title">{t(`privacy.privacyOneTitle`)}</h2>
                <p>{t(`privacy.privacyOneParagraphOne`)}</p>
                <ul className="privacy__list">
                    <li>{t(`privacy.privacyOneFirstListItem`)}</li>
                    <li>{t(`privacy.privacyOneSecondListItem`)}</li>
                    <li>{t(`privacy.privacyOneThirdListItem`)}</li>
                </ul>
                <p>{highlightText(t(`privacy.privacyOneParagraphTwo`))}</p>
                <p>{highlightText(t(`privacy.privacyOneParagraphThree`))}</p>
                <p>{t(`privacy.privacyOneParagraphFour`)}</p>
            </div>
            <div className="privacy__text container privacy__padding--top">
                <h2 className="privacy__title">{t(`privacy.privacyTwoTitle`)}</h2>
                <p>{t(`privacy.privacyTwoParagraphOne`)}</p>
                <ul className="privacy__list">
                    <li>{t(`privacy.privacyTwoFirstListItem`)}</li>
                    <li>{t(`privacy.privacyTwoSecondListItem`)}</li>
                    <li>{t(`privacy.privacyTwoThirdListItem`)}</li>
                    <li>{t(`privacy.privacyTwoFourthListItem`)}</li>
                    <li>{t(`privacy.privacyTwoFifthListItem`)}</li>
                </ul>
            </div>
            <div className="privacy__text container privacy__padding--top">
                <h2 className="privacy__title">{t(`privacy.privacyThreeTitle`)}</h2>
                <p>{t(`privacy.privacyThreeParagraphOne`)}</p>
                <ul className="privacy__list">
                    <li>{t(`privacy.privacyThreeFirstListItem`)}</li>
                    <li>{t(`privacy.privacyThreeSecondListItem`)}</li>
                    <li>{t(`privacy.privacyThreeThirdListItem`)}</li>
                    <li>{t(`privacy.privacyThreeFourthListItem`)}</li>
                    <li>{t(`privacy.privacyThreeFifthListItem`)}.</li>
                </ul>
                <p>{t(`privacy.privacyThreeParagraphTwo`)}</p>
            </div>
            <div className="privacy__text container privacy__padding--top">
                <h2 className="privacy__title">{t(`privacy.privacyFourTitle`)}</h2>
                <p>{highlightText(t(`privacy.privacyFourParagraphOne`))}</p>
            </div>
            <div className="privacy__text container privacy__padding--top">
                <h2 className="privacy__title">{t(`privacy.privacyFiveTitle`)}</h2>
                <p>{highlightText(t(`privacy.privacyFiveParagraphOne`))}</p>
                <p>{t(`privacy.privacyFiveParagraphTwo`)}</p>
            </div>
        </div>
    </div>
    </>
    )
}

export default Privacy
