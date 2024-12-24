import { useState, useRef, memo } from "react"
import { useTranslation } from "react-i18next"
import { validateEmail } from "../../utils/validateEmail"
import SpecialHeading from "../specialHeading/SpecialHeading"
import useInform from "../../hooks/useInform"
import "./newsLetter.css"

const NewsLetter = memo(function NewsLetter() {

    const [input, setInput] = useState("")
    const [errors, setErrors] = useState("")
    const refEmail = useRef()
    
    const {t} = useTranslation()

    const [ DialogSuccess, informSuccess ] = useInform(
        t(`newsLetter.modal.success.title`),
        t(`newsLetter.modal.success.message`),
        t(`newsLetter.modal.okayBtn`)
    )

    const [ DialogError, informError ] = useInform(
        t(`newsLetter.modal.error.title`),
        t(`newsLetter.modal.error.message`),
        t(`newsLetter.modal.okayBtn`)
    )

    const handleChange = (e) => {
        const value = e.target.value
        validateEmail(value, refEmail, setErrors, t)
        setInput(value)
    }

    const subscribeHandler = async(e) => {
        e.preventDefault()
        try {
            if(errors === "") {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/newsletter`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({email: input})
                })
                if(res.ok) {
                    setInput("")
                    refEmail.current.classList.remove("newsletter__input--valid")
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
        <div className="newsletter section__padding--block">
            <div className="container">
                <SpecialHeading title={t(`sectionHeadings.newsletter.title`)} subtitle={t(`sectionHeadings.newsletter.subTitle`)} />
                <form className="newsletter__form" method="" onSubmit={(e) => subscribeHandler(e)}>
                    <div className="newsletter__div" >
                        <input className="newsletter__input"
                            id="email"
                            ref={refEmail}
                            value={input}
                            onChange={handleChange}
                            autoComplete="on"
                            type="email"  
                            placeholder= {t(`newsLetter.placeHolder`)}
                            required />
                        <button className="newsletter__btn" type="submit" id="submit" value="submit" name="Submit">{t(`newsLetter.subscribeBtn`)}</button>
                        {errors && <div className="newsletter__form-error">{errors}</div>}
                    </div>
                </form>
            </div>
        </div>
        <DialogSuccess />
        <DialogError />
        </>
    )
})

export default NewsLetter