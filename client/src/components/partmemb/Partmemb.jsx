import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import "./partmemb.css"
import SpecialHeadingThree from "../specialHeadingThree/SpecialHeadingThree"

const currentYear = new Date().getFullYear().toString();

function Partmemb({ items }) {
    const {t} = useTranslation()
    const [displayedItems, setDisplayedItems] = useState([])

    useEffect(() => {
        const duplicates = items.map(item => ({...item, id: `${item.id}-duplicate`}))
        setDisplayedItems([...items, ...duplicates])
    }, [items])

    return (
        <div className="section__padding--block container">
            <SpecialHeadingThree title={t(`sectionHeadings.partners&memberships.title`)} subtitle={t(`sectionHeadings.partners&memberships.subTitle`)} />
            <div className="scroller" data-direction="left" data-speed="medium" data-animated="true">
                <div className="scroller__inner">
                    {displayedItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className={`partmemb-item partmemb-item--${item.category}`}>
                            <img className="partmemb-img" src={item.src} alt={t(item.altKey)} />
                            {item.altKey === "iaapaAlt" ? (<span className="partmemb-img-span">{currentYear}</span>) : ""}
                            {item.altKey === "partners" ? (<span className="partmemb-img-title">{t(`partners`)}</span>) : ""}
                            {item.altKey === "memberships" ? (<span className="partmemb-img-title">{t(`memberships`)}</span>) : ""}
                        </div>
                    ))}
                </div>
            </div>             
        </div>
    )
}

Partmemb.propTypes = {
    items: PropTypes.array.isRequired
}

export default Partmemb