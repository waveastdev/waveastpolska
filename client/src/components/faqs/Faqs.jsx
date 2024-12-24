import { useState, memo } from "react" 
import { FaCaretDown } from "react-icons/fa"
import { BiPlus, BiMinus } from "react-icons/bi"
import { useTranslation } from "react-i18next"
import SpecialHeading from "../specialHeading/SpecialHeading"
import "./faqs.css"

const faqs = [
    {id: 1, questionKey: "faqs.accordion.0.question", answerKey: "faqs.accordion.0.answer"},
    {id: 2, questionKey: "faqs.accordion.1.question", answerKey: "faqs.accordion.1.answer"},
    {id: 3, questionKey: "faqs.accordion.2.question", answerKey: "faqs.accordion.2.answer"},
    {id: 4, questionKey: "faqs.accordion.3.question", answerKey: "faqs.accordion.3.answer"},
    {id: 5, questionKey: "faqs.accordion.4.question", answerKey: "faqs.accordion.4.answer"},
    {id: 6, questionKey: "faqs.accordion.5.question", answerKey: "faqs.accordion.5.answer"},
    {id: 7, questionKey: "faqs.accordion.6.question", answerKey: "faqs.accordion.6.answer"},
    {id: 8, questionKey: "faqs.accordion.7.question", answerKey: "faqs.accordion.7.answer"}
]

const Faqs = memo(function Faqs() {

    const [itemsToShow, setItemsToShow] = useState(3)
    const [expandedItems, setExpandedItems] = useState([])

    const {t} = useTranslation()

    const handleShowMore = () => {
        setItemsToShow((prevItems) => prevItems + 3)
    }

    const handleClick = (faqId) => {
        setExpandedItems((prevExpandedItems) => {
            if (prevExpandedItems.includes(faqId)) {
                return prevExpandedItems.filter((id) => id !== faqId)
            } else {
                return [...prevExpandedItems, faqId]
            }
        })
    }

    return (
        <div className="section__padding--block container">
            <SpecialHeading title={t(`sectionHeadings.faqs.title`)} subtitle={t(`sectionHeadings.faqs.subTitle`)} />
            <div className="faqs">
                {faqs.slice(0, itemsToShow).map((faq) => {
                    const isExpanded = expandedItems.includes(faq.id)
                    return (
                        <div key={faq.id} className={`faq ${isExpanded ? "faq--clicked" : ""}`} >
                            <p className={`faq__question ${isExpanded ? "faq__question--clicked" : ""}`} onClick={() => handleClick(faq.id)}>
                                {t(faq.questionKey)}
                                <span className='faq__extend'>
                                    <BiPlus className={`faq__icon ${isExpanded ? "faq__icon--hide" : ""}`} />
                                    <BiMinus className={`faq__icon ${isExpanded ? "" : "faq__icon--hide"}`}/>
                                </span>
                            </p>
                            <p className={`faq__answer ${isExpanded ? "faq__answer--show" : ""}`}>{t(faq.answerKey)}</p>
                        </div>
                    )
                })}
                {itemsToShow < faqs.length && (
                    <div className="faq__show-more">
                        <button className="btn btn--primary" onClick={handleShowMore}>{t(`faqs.showBtn`)}<FaCaretDown /></button>
                    </div>
                )}
            </div>
        </div>
    )
})

export default Faqs