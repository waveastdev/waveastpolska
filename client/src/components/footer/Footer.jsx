import { useState, useContext, memo, useEffect } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { BiLinkAlt } from "react-icons/bi"
import { FaXTwitter } from "react-icons/fa6"
import { useTranslation } from "react-i18next"
import { LanguageContext } from "../../contexts/LanguageContext"
import "./footer.css"

const currentYear = new Date().getFullYear().toString()

const Footer = memo(function Footer() {

    const [catalogueLink, setCatalogueLink] = useState("")
    const {currentLanguage} = useContext(LanguageContext)
    const {t} = useTranslation()

    useEffect(() => {
        setCatalogueLink(`https://waveast.pl/pdf/${currentLanguage}.pdf`)
    }, [currentLanguage])

    return (
        <section className="footer section__padding--top">
            <div className="footer__inner container">
                <div className="footer__info" >
                    <h3 className="footer__title">{t(`footer.information`)}</h3>
                    <ul className="footer__list">
                        <li className="footer__listItem">
                            <LinkRouter className="footer__link" to="/about">{t('footer.about')}</LinkRouter>
                        </li>
                        <li className="footer__listItem">
                            <LinkRouter className="footer__link" to="/contact">{t('footer.contact')}</LinkRouter>
                        </li>
                        <li className="footer__listItem">
                            <LinkRouter className="footer__link" to="/bhp">{t('footer.bhp')}</LinkRouter>
                        </li>
                        <li className="footer__listItem">
                            <a className="footer__link footer__link--catalogue" href={catalogueLink} target="_blank" rel="noopener noreferrer">
                                {t('footer.catalogue')}
                                <BiLinkAlt />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer__costumer" >
                    <h3 className="footer__title">{t(`footer.expertise`)}</h3>
                    <ul className="footer__list">
                        <li className="footer__listItem">
                            <LinkRouter className="footer__link" to="/services">{t(`footer.services`)}</LinkRouter>
                        </li>
                        <li className="footer__listItem">
                            <LinkRouter className="footer__link" to="/projects">{t(`footer.projects`)}</LinkRouter>
                        </li>
                    </ul>
                </div>
                <div className="footer__follow">
                    <h3 className="footer__title">{t(`footer.follow`)}</h3>
                    <ul className="footer__list">
                        <li className="footer__listItem footer__listItem--social" >
                            <a href="https://www.linkedin.com/company/waveastpolska" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label={t(`footer.LinkedInAriaLabel`)} >
                                <FaLinkedinIn />
                            </a>
                        </li>
                        <li className="footer__listItem footer__listItem--social" >
                            <a href="https://www.instagram.com/waveastpolska" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label={t(`footer.InstagramAriaLabel`)} >
                                <FaInstagram />
                            </a>
                        </li>
                        <li className="footer__listItem footer__listItem--social" >
                            <a href="https://www.facebook.com/waveastpolska" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label={t(`footer.FacebookAriaLabel`)} >
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className="footer__listItem footer__listItem--social" >
                            <a href="https://www.twitter.com/waveastpolska" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label={t(`footer.TwitterAriaLabel`)} >
                                <FaXTwitter />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <p>&copy; Copyright {currentYear}</p>
                Waveast Installation & Park Services
            </div>
        </section>
    )
})

export default Footer