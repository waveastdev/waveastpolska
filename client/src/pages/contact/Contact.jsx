import { useState, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa"
import { validateForm } from "../../utils/validateForm"
import PageHeader from "../../components/pageHeader/PageHeader"
import useInform from "../../hooks/useInform"
import "./contact.css"

const contactDetails = [
    {id: 1, icon: <FaMapMarkerAlt />, title: "contact.contactInfo.address", content: ["contact.contactInfo.mainAddress"]},
    {id: 2, icon: <FaMapMarkerAlt />, title: "contact.contactInfo.office", content: ["contact.contactInfo.branchOffice"]},
    {id: 3, icon: <FaEnvelope />, title:"contact.contactInfo.email", content: ["we", "\u0040", "waveast.pl"]},
    {id: 4, icon: <FaPhoneAlt />, title:"contact.contactInfo.phone", content: ["contact.contactInfo.phoneNumberOne", "contact.contactInfo.phoneNumberTwo", "contact.contactInfo.phoneNumberThree"]}
]

function Contact() {

    const {t} = useTranslation()

    const [DialogSuccess, informSuccess] = useInform(
        t(`contact.modal.success.title`),
        t(`contact.modal.success.message`),
        t(`contact.modal.okayBtn`)
    )

    const [DialogError, informError] = useInform(
        t(`contact.modal.error.title`),
        t(`contact.modal.error.message`),
        t(`contact.modal.okayBtn`)
    )

    const [values, setValues] = useState({name: "", email: "", subject: "", message: ""})
    const [errors, setErrors] = useState({})
    const refName = useRef()
    const refEmail = useRef()
    const refSubject = useRef()
    const refMessage= useRef()

    const handleChange = (e) => {
        e.persist()
        const {name, value} = e.target
        validateForm(name, value, errors, setErrors, refName, refEmail, refSubject, refMessage, t )
        setValues({...values, [name]:value})
    }

    const sendMessage = async(e) => {
        e.preventDefault()
        try {
            if(Object.keys(errors).length === 0 && Object.keys(values).length !==0) {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/contact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                    body: JSON.stringify(values)
                })
                if(res.ok) {
                    setValues({name: "", email: "", subject: "", message: ""})
                    {
                        [refName, refEmail, refSubject, refMessage].map((refItem) => {
                            return refItem.current.classList.remove("contact__form-input--valid")
                        })
                    }
                    await informSuccess()
                }
            }
        } catch (error) {
            console.log(error)
            await informError()
        }
    }

    return (
        <>
        <Helmet>
            <title>Contact - Waveast</title>
            <link rel="canonical" href="/contact" />
            <meta name="description" 
                content="Waveast Installation & Park Services is a company that provides engineering, installation, maintenance, expansion, renovation, and consultancy services for amusement items and water parks. It was created in 2021 in Warsaw, Poland." />
        </Helmet>
        <div className="contact__page">
            <PageHeader pageTitle={t(`pageTitles.contact`)} />
            {/* <p className="contact__para container section__padding--block">{t(`contactCompany`)}</p> */}
            <div className="contact container section__padding--block">
                <div className="contact__info">
                    {contactDetails.map((contactDetail) => {
                        return (
                            <div className="contact__info-detail" key={contactDetail.id}>
                                <div className="contact__info-icon">{contactDetail.icon}</div>
                                <div className="contact__info-text">
                                    <h3 className="contact__info-title">{t(contactDetail.title)}</h3>
                                    {contactDetail.content[0] === "we" ? (
                                        contactDetail.content.map((item, index) => {
                                            return (<span key={`${contactDetail.id}-${index}`} className="contact__info-paragraph">{item}</span>)
                                        })) : (contactDetail.content.map((item, index) => {
                                            return (<p key={`${contactDetail.id}-${index}`} className="contact__info-paragraph">{t(item)}</p>)
                                        })
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <form className="contact__form" method="" onSubmit={(e) => sendMessage(e) }>
                    <div className="contact__form-detail">
                        <div className="contact__form-name">
                            <label className="contact__form-label" htmlFor="name">{t(`contact.contactForm.fullName.label`)}</label>
                            <input className="contact__form-input" 
                                ref={refName} 
                                value={values.name}
                                id="name" 
                                type="text" 
                                placeholder={t(`contact.contactForm.fullName.placeholder`)} 
                                name="name" 
                                onChange={(e) => handleChange(e)}
                                autoComplete="off" 
                                required 
                            />
                            {errors.name && <span className="contact__form-error">{errors.name}</span>}
                        </div>
                        <div className="contact__form-email">
                            <label className="contact__form-label" htmlFor="email">{t(`contact.contactForm.email.label`)}</label>
                            <input className="contact__form-input" 
                                ref={refEmail} 
                                value={values.email}
                                id="email" 
                                type="email" 
                                placeholder={t(`contact.contactForm.email.placeholder`)} 
                                name="email" 
                                onChange={(e) => handleChange(e)}
                                autoComplete="off" 
                                required 
                            />
                            {errors.email && <span className="contact__form-error">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="contact__form-subject">
                        <label className="contact__form-label" htmlFor="subject">{t(`contact.contactForm.subject.label`)}</label>
                        <input className="contact__form-input" 
                            ref={refSubject} 
                            value={values.subject}
                            id="subject"  
                            type="text" 
                            placeholder={t(`contact.contactForm.subject.placeholder`)} 
                            name="subject" 
                            onChange={(e) => handleChange(e)}
                            autoComplete="off" 
                            required 
                        />
                        {errors.subject && <span className="contact__form-error">{errors.subject}</span>}
                    </div>
                    <div className="contact__form-message">
                        <label className="contact__form-label" htmlFor="message">{t(`contact.contactForm.message.label`)}</label>
                        <textarea className="contact__form-input" 
                            ref={refMessage}
                            value={values.message}
                            id="message" 
                            rows={10} 
                            placeholder={t(`contact.contactForm.message.placeholder`)} 
                            name="message" 
                            onChange={(e) => handleChange(e)}
                            autoComplete="off"
                            required >
                        </textarea>
                        {errors.message && <span className="contact__form-error">{errors.message}</span>}
                    </div>
                    <div className="contact__form-btn">
                        <button className="btn btn--primary" type="submit" id="submit" value="submit" name="Submit">{t(`contact.contactForm.submitBtn`)} <FaPaperPlane/></button>
                    </div>
                </form>
            </div>
            <div className="contact__map-container container section__padding--bottom">
                <iframe className="contact__map" loading="lazy" src="https://maps.google.com/maps?q=Wr%C3%B3bla%206A%2C%2002-736%20Warszawa&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" title={t(`contact.map.address`)} aria-label={t(`contact.map.address`)} ></iframe>
            </div>
            <DialogSuccess />
            <DialogError />
        </div>
        </>
    )
}

export default Contact