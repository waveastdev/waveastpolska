import { useState } from "react"
import { BiX, BiCheck, BiChevronDown } from "react-icons/bi"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import "./cookieConsent.css"

function SecondBanner({preferences, handleCloseModal, handleCloseModalEnter, handleCheckboxChange, handleSaveSettings}) {

    const [openAccordion, setOpenAccordion] = useState(null)
    const {t} = useTranslation()

    const handleAccordionToggle = (index) => {
        setOpenAccordion(openAccordion === index ? null : index)
    };

    const handleAccordionEnter = (e, index) => {
        if (e.keyCode === 13) {
            handleAccordionToggle(index)
        }
    }

    return (
        
    <div className="banner__overlay">
        <div className="banner">
            <div className="banner__header">
                <span className="banner__title">{t(`cookieConsent.secondBannerTitle`)}</span>
                <div className="banner__icon banner__icon--second" aria-label="close" onClick={handleCloseModal} onKeyDown={handleCloseModalEnter}><BiX /></div>
            </div>
            <div className="second-banner__content">
                <div className="second-banner__usage">
                    <div className="banner__subtitle">{t(`cookieConsent.secondBannerSubtitle`)}</div>
                    <div className="banner__text">{t(`cookieConsent.secondBannerText`)} <a target="_blank" className="banner__link" href="/privacy">{t(`cookieConsent.secondBannerLink`)}</a>
                    </div>
                </div>
                <div className="second-banner__accordion">
                    <div className={`second-banner__accordion-top ${openAccordion === 0 ? "second-banner__accordion-top--open" : ""}`} onClick={() => handleAccordionToggle(0)} onKeyDown={() => handleAccordionEnter(0)} role="button" tabIndex={0}>
                        <BiChevronDown className={`second-banner__accordion-chevron ${openAccordion === 0 ? "second-banner__accordion-chevron--open" : ""}`} />
                        <span className="second-banner__accordion-span">{t(`cookieConsent.firstAccordionTitle`)}</span>
                        <div className="second-banner__accordion-checkbox" onClick={(e) => e.stopPropagation()}>
                            <BiCheck className="second-banner__accordion-svg" />
                            <input className="second-banner__accordion-input second-banner__accordion-input--notallowed" type="checkbox" checked readOnly />
                            <BiX className="second-banner__accordion-svg" />
                        </div>
                    </div>
                    <div className={`second-banner__accordion-bottom ${openAccordion === 0 ? "second-banner__accordion-bottom--open" : ""}`}>
                        {t(`cookieConsent.firstAccordionText`)}
                    </div>
                </div>
                <div className="second-banner__accordion">
                    <div className={`second-banner__accordion-top ${openAccordion === 1 ? "second-banner__accordion-top--open" : ""}`} onClick={() => handleAccordionToggle(1)} onKeyDown={() => handleAccordionEnter(1)} role="button" tabIndex={0}>
                        <BiChevronDown className={`second-banner__accordion-chevron ${openAccordion === 1 ? "second-banner__accordion-chevron--open" : ""}`} />
                        <span className="second-banner__accordion-span">{t(`cookieConsent.secondAccordionTitle`)}</span>
                        <div className="second-banner__accordion-checkbox" onClick={(e) => e.stopPropagation()}>
                            <BiCheck className="second-banner__accordion-svg" />
                            <input className="second-banner__accordion-input" type="checkbox" checked={preferences.analytics}  onChange={(e) => handleCheckboxChange('analytics', e.target.checked)} />
                            <BiX className="second-banner__accordion-svg" />
                        </div>
                    </div>
                    <div className={`second-banner__accordion-bottom ${openAccordion === 1 ? "second-banner__accordion-bottom--open" : ""}`}>
                        {t(`cookieConsent.secondAccordionText`)}
                        <ul>
                            <li className="second-banner__accordion-bottom-li">
                                <span className="second-banner__accordion-bottom-span">^_ga</span>
                                <span>{t(`cookieConsent.gaDescription`)}</span>
                            </li>
                            <li className="second-banner__accordion-bottom-li">
                                <span className="second-banner__accordion-bottom-span">_gat</span>
                                <span>{t(`cookieConsent.gatDescription`)}</span>
                            </li>
                            <li className="second-banner__accordion-bottom-li">
                                <span className="second-banner__accordion-bottom-span">_gid</span>
                                <span>{t(`cookieConsent.gidDescription`)}</span>
                            </li>
                            <li className="second-banner__accordion-bottom-li">
                                <span className="second-banner__accordion-bottom-span">lng</span> 
                                <span>{t(`cookieConsent.lngDescription`)}</span>
                            </li>
                            <li className="second-banner__accordion-bottom-li">
                                <span className="second-banner__accordion-bottom-span">dark-mode</span> 
                                <span>{t(`cookieConsent.darkModeDescription`)}</span>
                            </li>
                        </ul>   
                    </div>
                </div>
                <div className="second-banner__accordion">
                    <div className={`second-banner__accordion-top ${openAccordion === 2 ? "second-banner__accordion-top--open" : ""}`} onClick={() => handleAccordionToggle(2)} onKeyDown={() => handleAccordionEnter(2)} role="button" tabIndex={0}>
                        <BiChevronDown className={`second-banner__accordion-chevron ${openAccordion === 2 ? "second-banner__accordion-chevron--open" : ""}`} />
                        <span className="second-banner__accordion-span">{t(`cookieConsent.thirdAccordionTitle`)}</span>
                        <div className="second-banner__accordion-checkbox" onClick={(e) => e.stopPropagation()}>
                            <BiCheck className="second-banner__accordion-svg" />
                            <input className="second-banner__accordion-input" type="checkbox" checked={preferences.targeting}  onChange={(e) => {handleCheckboxChange('targeting', e.target.checked)}} />
                            <BiX className="second-banner__accordion-svg" />
                        </div>
                    </div>
                    <div className={`second-banner__accordion-bottom ${openAccordion === 2 ? "second-banner__accordion-bottom--open" : ""}`}>
                        {t(`cookieConsent.thirdAccordionText`)}
                    </div>
                </div>
            </div>
            <div className="second-banner__action">
                <button className="btn second-banner__save-btn" onClick={handleSaveSettings}>{t(`cookieConsent.secondBannerSave`)}</button>
            </div>
        </div>
    </div>
    )
}

export default SecondBanner


SecondBanner.propTypes = {
    preferences: PropTypes.object.isRequired, 
    handleCloseModal: PropTypes.func.isRequired,
    handleCloseModalEnter: PropTypes.func.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleSaveSettings: PropTypes.func.isRequired
}